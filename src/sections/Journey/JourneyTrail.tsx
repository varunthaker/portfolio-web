import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { isSoftwareEra, journey } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { JourneyHeader } from './JourneyHeader'
import { Walker } from './Walker'

const N = journey.length
/** Share of each chapter's scroll spent walking; the rest he stands at the milestone. */
const WALK = 0.45
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

type TrailState = { x: number; active: number; carrying: number }

/** Character position for scroll progress p (0..1) with milestone spacing s (px). */
function trailState(p: number, s: number): TrailState {
  const seg = Math.min(Math.max(p, 0) * N, N - 1e-6)
  const i = Math.floor(seg)
  const walk = Math.min(1, (seg - i) / WALK)
  const from = i === 0 ? -s * 0.7 : (i - 1) * s
  return {
    x: from + (i * s - from) * ease(walk),
    active: walk >= 1 ? i : -1,
    carrying: walk > 0.5 ? i : Math.max(0, i - 1),
  }
}

function useWidth(ref: RefObject<HTMLElement | null>) {
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

/** Horizontal, scroll-driven trail: the character walks left → right past compact milestones. */
export function JourneyTrail() {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const container = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const width = useWidth(stage)
  const spacing = Math.round(Math.min(360, Math.max(250, width * 0.3)))
  // keep the character a bit left of centre so the next milestones are visible
  const compact = width < 640
  const anchor = compact ? 0.5 : 0.38

  const { scrollYProgress } = useScroll({ target: container, offset: ['0 56px', 'end end'] }) // 56px = header
  const spacingMV = useMotionValue(spacing)
  const anchorMV = useMotionValue(width * anchor)
  useEffect(() => {
    spacingMV.set(spacing)
    anchorMV.set(width * anchor)
  }, [spacing, width, anchor, spacingMV, anchorMV])

  const walkerX = useTransform([scrollYProgress, spacingMV], ([p, s]: number[]) => trailState(p, s).x)
  const camera = useTransform([walkerX, anchorMV], ([x, a]: number[]) => a - x)

  const [state, setState] = useState<Omit<TrailState, 'x'>>({ active: -1, carrying: 0 })
  const [facing, setFacing] = useState<1 | -1>(1)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const { active, carrying } = trailState(p, spacingMV.get())
    setState((prev) => (prev.active === active && prev.carrying === carrying ? prev : { active, carrying }))
    const dir = p >= (scrollYProgress.getPrevious() ?? p) ? 1 : -1
    setFacing((f) => (f === dir ? f : dir))
  })

  const color = isSoftwareEra(state.carrying) ? 'var(--cyan)' : 'var(--amber)'
  const trailStart = -spacing * 0.7 - 600
  const trailEnd = (N - 1) * spacing + 700
  const pct = (x: number) => ((x - trailStart) / (trailEnd - trailStart)) * 100

  return (
    <div ref={container} className="relative" style={{ height: `calc(${N} * 70svh + 100svh - 3.5rem)` }}>
      <div ref={stage} className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
          <JourneyHeader id="journey-heading" />
        </div>

        {/* the world moves; the character stays put on screen */}
        <motion.div className="absolute top-[50%] left-0" style={{ x: camera }}>
          {/* trail */}
          <div
            aria-hidden="true"
            className="absolute -top-px h-0.5"
            style={{
              left: trailStart,
              width: trailEnd - trailStart,
              backgroundImage: `linear-gradient(90deg, transparent 0%, var(--amber) ${pct(-spacing * 0.7)}%, var(--amber) ${pct(3.3 * spacing)}%, var(--cyan) ${pct(4.2 * spacing)}%, var(--cyan) ${pct((N - 1) * spacing)}%, transparent 100%)`,
              opacity: 0.6,
            }}
          />

          {/* milestones: time · title · one line */}
          <ol>
            {journey.map((chapter, i) => {
              const accent = isSoftwareEra(i) ? 'var(--cyan)' : 'var(--amber)'
              const here = state.active === i
              const passed = i <= state.carrying
              return (
                <li key={chapter.id} className="absolute top-0" style={{ left: i * spacing }} aria-current={here ? 'step' : undefined}>
                  <motion.span
                    aria-hidden="true"
                    className="absolute -top-[7px] -left-[7px] size-3.5 rounded-full border-2 bg-bg"
                    style={{ borderColor: accent }}
                    animate={{ scale: here ? 1.5 : 1, backgroundColor: passed ? accent : 'var(--bg)' }}
                  />
                  <motion.div
                    className="absolute top-6 w-[220px] -translate-x-1/2 text-center"
                    // phones: only the current milestone's text, so neighbours don't get cut off at the edges
                    animate={{
                      opacity: compact ? (here ? 1 : 0) : here ? 1 : passed ? 0.6 : 0.4,
                      y: here ? 0 : 6,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="font-mono text-[11px] tracking-[0.15em]" style={{ color: accent }}>
                      {chapter.period.replace('{now}', t('journey.now'))}
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-snug">{tl(chapter.title)}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted">{tl(chapter.short)}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>

          {/* the character */}
          <motion.div className="absolute bottom-0 -left-[46px] w-[92px] sm:-left-[60px] sm:w-[120px]" style={{ x: walkerX }}>
            <Walker item={journey[state.carrying].item} color={color} travel={walkerX} facing={facing} className="block h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* progress dots */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
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
