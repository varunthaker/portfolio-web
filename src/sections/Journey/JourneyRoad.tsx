import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { isSoftwareEra, journey } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { ChapterCard } from './ChapterCard'
import { JourneyHeader } from './JourneyHeader'
import { Robot } from './Robot'

const N = journey.length
/** Share of each chapter's scroll spent driving; the rest the robot waits at the open station. */
const DRIVE = 0.4
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

type RoadState = { x: number; active: number; carrying: number }

/** Where the robot is for a given scroll progress (0..1) and station spacing (px). */
function roadState(p: number, spacing: number): RoadState {
  const seg = Math.min(Math.max(p, 0) * N, N - 1e-6)
  const i = Math.floor(seg)
  const drive = Math.min(1, (seg - i) / DRIVE)
  const from = i === 0 ? -spacing * 0.75 : (i - 1) * spacing
  return {
    x: from + (i * spacing - from) * ease(drive),
    active: drive >= 1 ? i : -1,
    carrying: drive > 0.5 ? i : Math.max(0, i - 1),
  }
}

function useWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(1200) // same on server and first client render
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return width
}

/** Scroll-driven road: the robot drives from station to station, each station opens its chapter. */
export function JourneyRoad() {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const container = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const width = useWidth(stage)
  const spacing = Math.round(Math.min(520, Math.max(300, width * 0.8)))
  const cardWidth = Math.min(width - 32, 440)

  const { scrollYProgress } = useScroll({ target: container, offset: ['0 56px', 'end end'] }) // 56px = header
  const spacingMV = useMotionValue(spacing)
  const widthMV = useMotionValue(width)
  useEffect(() => {
    spacingMV.set(spacing)
    widthMV.set(width)
  }, [spacing, width, spacingMV, widthMV])

  const robotX = useTransform([scrollYProgress, spacingMV], ([p, s]: number[]) => roadState(p, s).x)
  const camera = useTransform([robotX, widthMV], ([x, w]: number[]) => w / 2 - x)

  const [state, setState] = useState<Omit<RoadState, 'x'>>({ active: -1, carrying: 0 })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const { active, carrying } = roadState(p, spacingMV.get())
    setState((prev) => (prev.active === active && prev.carrying === carrying ? prev : { active, carrying }))
  })

  const color = isSoftwareEra(state.carrying) ? 'var(--cyan)' : 'var(--amber)'
  const roadStart = -spacing * 0.75 - 400
  const roadEnd = (N - 1) * spacing + 400

  return (
    <div ref={container} className="relative" style={{ height: `calc(${N} * 90svh + 100svh - 3.5rem)` }}>
      <div ref={stage} className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
          <JourneyHeader id="journey-heading" />
        </div>

        {/* the world moves so the robot stays centred */}
        <motion.div className="absolute top-[44%] left-0 sm:top-[46%]" style={{ x: camera }}>
          {/* road */}
          <div
            aria-hidden="true"
            className="absolute -top-[3px] h-1.5 rounded-full"
            style={{
              left: roadStart,
              width: roadEnd - roadStart,
              background: `linear-gradient(90deg, var(--amber) 0%, var(--amber) ${((3.5 * spacing - roadStart) / (roadEnd - roadStart)) * 100}%, var(--cyan) ${((4.2 * spacing - roadStart) / (roadEnd - roadStart)) * 100}%, var(--cyan) 100%)`,
              opacity: 0.55,
            }}
          />
          {/* start flag */}
          <div aria-hidden="true" className="absolute top-5 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted" style={{ left: -spacing * 0.75 }}>
            start
          </div>

          {journey.map((chapter, i) => {
            const open = state.active === i
            const accent = isSoftwareEra(i) ? 'var(--cyan)' : 'var(--amber)'
            return (
              <div key={chapter.id} className="absolute top-0" style={{ left: i * spacing }}>
                {/* station */}
                <motion.div
                  aria-hidden="true"
                  className="absolute -top-[9px] -left-[9px] size-[18px] rounded-full border-[3px] bg-bg"
                  style={{ borderColor: accent }}
                  animate={{ scale: open ? 1.35 : 1, boxShadow: open ? `0 0 0 6px color-mix(in srgb, ${accent} 25%, transparent)` : '0 0 0 0px transparent' }}
                />
                {/* closed label */}
                <motion.p
                  aria-hidden="true"
                  className="absolute top-6 w-48 -translate-x-1/2 text-center"
                  animate={{ opacity: open ? 0 : 0.85 }}
                >
                  <span className="block font-mono text-[11px] tracking-[0.15em]" style={{ color: accent }}>
                    {chapter.period.replace('{now}', t('journey.now'))}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{tl(chapter.title)}</span>
                </motion.p>
                {/* opened station = chapter card */}
                <motion.div
                  className="absolute top-8"
                  style={{ width: cardWidth, left: -cardWidth / 2, transformOrigin: 'top center', pointerEvents: open ? 'auto' : 'none' }}
                  initial={false}
                  animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.6, y: open ? 0 : -24 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <ChapterCard chapter={chapter} index={i} active />
                </motion.div>
              </div>
            )
          })}

          {/* the robot */}
          <motion.div className="absolute bottom-0 -left-[52px] w-[104px] sm:-left-[70px] sm:w-[140px]" style={{ x: robotX }}>
            <Robot item={journey[state.carrying].item} color={color} travel={robotX} className="block h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* station progress */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {journey.map((c, i) => (
            <span
              key={c.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                state.active === i ? 'w-6 bg-cyan' : i <= state.carrying ? 'w-1.5 bg-fg/50' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
