import { useId } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { Gear } from '../../components/ui/Gear'
import { useChapters, useWindow } from './sceneTimeline'

type SceneProps = {
  /** Scroll progress through the journey, 0..1. */
  progress: MotionValue<number>
  /** Run looping SMIL/CSS motion (off for static, reduced-motion thumbnails). */
  animate?: boolean
  className?: string
}

const AMBER = 'var(--amber)'
const CYAN = 'var(--cyan)'
const VIOLET = 'var(--violet)'
const MONO = 'JetBrains Mono, ui-monospace, monospace'

/* Layout anchors (viewBox 600 × 600) */
const GEARS = [
  { x: 200, y: 250, r: 80, teeth: 12, dir: 1 },
  { x: 318, y: 172, r: 50, teeth: 9, dir: -1 },
  { x: 334, y: 322, r: 40, teeth: 8, dir: -1 },
] as const
/** Where each gear's node goes in the "services" and "agents" chapters. */
const SERVICE_POS = [
  { x: 120, y: 300, label: 'React' },
  { x: 300, y: 300, label: 'Go API' },
  { x: 480, y: 300, label: 'PostgreSQL' },
] as const
const HUB = { x: 300, y: 300 }
const ORBIT = 170
const orbit = (deg: number) => ({
  x: HUB.x + ORBIT * Math.cos((deg * Math.PI) / 180),
  y: HUB.y + ORBIT * Math.sin((deg * Math.PI) / 180),
})
const AGENT_POS = [orbit(150), orbit(-90), orbit(30)] as const
const EXTRA_AGENTS = [
  { ...orbit(-30), label: 'LLM' },
  { ...orbit(-150), label: 'Docs' },
  { ...orbit(90), label: 'API' },
] as const
const AGENT_LABELS = ['Agent', 'Tools', 'DB'] as const

/* ---------- Pieces with their own hooks ---------- */

function SpinningGear({
  progress,
  g,
  animate,
}: {
  progress: MotionValue<number>
  g: (typeof GEARS)[number]
  animate: boolean
}) {
  const rotate = useTransform(progress, [0, 1], [0, 720 * g.dir * (80 / g.r)])
  const scale = useChapters(progress, [3.4, 4.3], [1, 0.25])
  const opacity = useWindow(progress, undefined, [3.5, 4.3])
  return (
    <g transform={`translate(${g.x} ${g.y})`}>
      <motion.g style={{ rotate, scale, opacity }}>
        <Gear r={g.r} teeth={g.teeth} stroke={AMBER} still={!animate} />
      </motion.g>
    </g>
  )
}

/** A gear centre that becomes a node, then a service, then an agent around the MCP hub. */
function MorphNode({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const g = GEARS[index]
  const s = SERVICE_POS[index]
  const a = AGENT_POS[index]
  const keys = [4.3, 5, 5.35, 6]
  const x = useChapters(progress, keys, [0, s.x - g.x, s.x - g.x, a.x - g.x])
  const y = useChapters(progress, keys, [0, s.y - g.y, s.y - g.y, a.y - g.y])
  const scale = useChapters(progress, [3.7, 4.3, 4.8, 5.1, 5.5, 6], [0.2, 0.7, 0.7, 1.15, 1.15, 0.85])
  const opacity = useWindow(progress, [3.7, 4.2])
  return (
    <g transform={`translate(${g.x} ${g.y})`}>
      <motion.g style={{ x, y, scale, opacity }}>
        <circle r="24" fill="var(--scene-bg)" stroke={CYAN} strokeWidth="2.5" />
        <circle r="7" fill={CYAN} />
      </motion.g>
    </g>
  )
}

function Particles({ progress }: { progress: MotionValue<number> }) {
  const spread = useChapters(progress, [3.5, 4.6], [0, 1])
  const opacity = useWindow(progress, [3.5, 3.9], [4.2, 4.7])
  const dots = Array.from({ length: 18 }, (_, i) => {
    const gear = GEARS[i % 3]
    const angle = (i * 137.5 * Math.PI) / 180
    return { gx: gear.x + Math.cos(angle) * gear.r, gy: gear.y + Math.sin(angle) * gear.r, angle, i }
  })
  return (
    <motion.g style={{ opacity }}>
      {dots.map((d) => (
        <Particle key={d.i} spread={spread} {...d} />
      ))}
    </motion.g>
  )
}

function Particle({
  spread,
  gx,
  gy,
  angle,
  i,
}: {
  spread: MotionValue<number>
  gx: number
  gy: number
  angle: number
  i: number
}) {
  const dist = 40 + (i % 5) * 14
  const x = useTransform(spread, (v) => Math.cos(angle) * dist * v)
  const y = useTransform(spread, (v) => Math.sin(angle) * dist * v)
  return (
    <motion.rect
      x={gx - 3}
      y={gy - 3}
      width="6"
      height="6"
      rx="1"
      fill={i % 2 ? AMBER : CYAN}
      style={{ x, y }}
    />
  )
}

function CodeLine({
  progress,
  index,
  text,
  uid,
}: {
  progress: MotionValue<number>
  index: number
  text: string
  uid: string
}) {
  const start = 2.55 + index * 0.12
  const clip = useChapters(progress, [start, start + 0.25], [0, 1])
  const width = useTransform(clip, (v) => `${v * 100}%`)
  return (
    <g>
      <clipPath id={`${uid}-code-${index}`}>
        <motion.rect x="56" y={70 + index * 20} height="20" style={{ width }} />
      </clipPath>
      <text
        x="60"
        y={84 + index * 20}
        fontFamily={MONO}
        fontSize="13"
        fill={index === 0 || index === 3 ? VIOLET : 'var(--fg)'}
        clipPath={`url(#${uid}-code-${index})`}
      >
        {text}
      </text>
    </g>
  )
}

/* ---------- Scene ---------- */

export function FactoryScene({ progress, animate = true, className = '' }: SceneProps) {
  // Unique ids so several scenes (reduced-motion thumbnails) can share a page.
  const uid = 'fs' + useId().replace(/[^a-zA-Z0-9]/g, '')
  // Ambient glow shifts from amber (factory) to cyan (software).
  const amberGlow = useWindow(progress, undefined, [3.4, 4.6])
  const cyanGlow = useWindow(progress, [3.6, 4.8])

  // Chapter 1 — machine & blueprint
  const machine = useWindow(progress, undefined, [0.45, 1.05])
  // Chapter 2 — conveyor, boxes, KPI gauge
  const conveyor = useWindow(progress, [0.35, 0.95], [3.6, 4.25])
  const boxes = useWindow(progress, [0.5, 1], [1.6, 2.1])
  const boxShift = useChapters(progress, [0.6, 2], [0, 220])
  const rollerSpin = useTransform(progress, [0, 1], [0, 1440])
  const gauge = useWindow(progress, [0.7, 1.1], [2.7, 3.3])
  const needle = useChapters(progress, [1, 2.6], [-70, 65])
  // Chapter 3 — spreadsheet cells
  const cells = useWindow(progress, [1.55, 2.05], [3.6, 4.2])
  const values = useWindow(progress, [1.9, 2.3])
  // Chapter 4 — VBA code panel
  const code = useWindow(progress, [2.45, 2.75], [3.65, 4.2])
  // Chapter 5–6 — pipeline & services
  const pipeline = useWindow(progress, [4.2, 4.8], [5.4, 5.8])
  const serviceLabels = useWindow(progress, [4.8, 5], [5.3, 5.5])
  // Chapter 7 — MCP hub & agents
  const hub = useWindow(progress, [5.4, 5.9])
  const hubScale = useChapters(progress, [5.4, 6], [0.4, 1])
  const extraAgents = useWindow(progress, [5.6, 6])

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={`${uid}-amber`}>
          <stop offset="0" stopColor="var(--amber)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--amber)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-cyan`}>
          <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.24" />
          <stop offset="1" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--grid)" strokeWidth="1" />
        </pattern>
      </defs>

      <motion.circle cx="300" cy="300" r="300" fill={`url(#${uid}-amber)`} style={{ opacity: amberGlow }} />
      <motion.circle cx="300" cy="300" r="300" fill={`url(#${uid}-cyan)`} style={{ opacity: cyanGlow }} />
      <rect x="20" y="20" width="560" height="560" rx="28" fill={`url(#${uid}-grid)`} />

      {/* ---- Chapter 1: machine + blueprint dimensions ---- */}
      <motion.g style={{ opacity: machine }} stroke={AMBER} fill="none" strokeWidth="2">
        <rect x="70" y="420" width="300" height="60" rx="6" />
        <rect x="90" y="380" width="70" height="40" rx="4" />
        <path d="M160 400h150M310 392v16" />
        <path d="M100 480v30M340 480v30" />
        <g strokeWidth="1" strokeDasharray="4 4" opacity="0.7">
          <path d="M120 140v-40M280 140v-40M120 110h160" />
        </g>
        <text x="200" y="102" fill={AMBER} stroke="none" fontFamily={MONO} fontSize="12" textAnchor="middle">
          Ø 160
        </text>
        <text x="440" y="470" fill={AMBER} stroke="none" fontFamily={MONO} fontSize="11">
          DRW-001 · REV A
        </text>
      </motion.g>

      {/* ---- Gears (chapters 1–4), dissolving in chapter 5 ---- */}
      {GEARS.map((g, i) => (
        <SpinningGear key={i} progress={progress} g={g} animate={animate} />
      ))}

      {/* ---- Chapter 2: conveyor belt + boxes ---- */}
      <motion.g style={{ opacity: conveyor }}>
        <rect x="50" y="490" width="500" height="22" rx="11" fill="none" stroke={AMBER} strokeWidth="2" />
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`translate(${76 + i * 64} 501)`}>
            <motion.g style={{ rotate: rollerSpin }}>
              <circle r="7" fill="none" stroke={AMBER} strokeWidth="1.5" />
              <path d="M-7 0h14" stroke={AMBER} strokeWidth="1.5" />
            </motion.g>
          </g>
        ))}
        <path d="M80 540h440" stroke={AMBER} strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
      </motion.g>
      <motion.g style={{ opacity: boxes, x: boxShift }}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${70 + i * 70} 452)`}>
            <rect width="40" height="36" rx="3" fill="var(--amber-soft)" stroke={AMBER} strokeWidth="2" />
            <path d="M0 12h40M20 0v12" stroke={AMBER} strokeWidth="1.5" />
          </g>
        ))}
      </motion.g>

      {/* KPI gauge */}
      <g transform="translate(480 130)">
      <motion.g style={{ opacity: gauge }}>
        <path d="M-50 0a50 50 0 0 1 100 0" fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
        <path d="M-50 0a50 50 0 0 1 70 -46" fill="none" stroke={AMBER} strokeWidth="8" strokeLinecap="round" />
        <motion.g style={{ rotate: needle }}>
          {/* invisible circle centres the bounding box on the pivot */}
          <circle r="40" fill="none" />
          <path d="M0 0v-40" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <circle r="5" fill="var(--fg)" />
        <text y="26" textAnchor="middle" fontFamily={MONO} fontSize="12" fill={AMBER}>
          KPI
        </text>
      </motion.g>
      </g>

      {/* ---- Chapter 3: spreadsheet ---- */}
      <motion.g style={{ opacity: cells }}>
        <g transform="translate(60 380)">
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 96}
                y={r * 30}
                width="96"
                height="30"
                fill={r === 0 ? 'var(--amber-soft)' : 'var(--scene-bg)'}
                stroke={AMBER}
                strokeWidth="1"
              />
            )),
          )}
          <g fontFamily={MONO} fontSize="12" fill="var(--fg)">
            {['Material', 'Stock', 'Demand', 'Buffer', 'Status'].map((h, c) => (
              <text key={h} x={c * 96 + 8} y="20" fill={AMBER}>
                {h}
              </text>
            ))}
            <motion.g style={{ opacity: values }}>
              {[
                ['Pallet', '120', '95', '25', 'OK'],
                ['Cable', '40', '62', '−22', 'LOW'],
              ].map((row, r) =>
                row.map((v, c) => (
                  <text
                    key={`${r}-${c}`}
                    x={c * 96 + 8}
                    y={50 + r * 30}
                    fill={v === 'LOW' ? AMBER : 'var(--fg)'}
                  >
                    {v}
                  </text>
                )),
              )}
            </motion.g>
          </g>
        </g>
      </motion.g>

      {/* ---- Chapter 4: VBA macro (first code) ---- */}
      <motion.g style={{ opacity: code }}>
        <rect x="36" y="52" width="222" height="104" rx="10" fill="var(--scene-bg)" stroke={VIOLET} strokeWidth="1.5" />
        {['Sub BuildReport()', '  For Each row In Data', '    Report.Add row', 'End Sub'].map((line, i) => (
          <CodeLine key={i} progress={progress} index={i} text={line} uid={uid} />
        ))}
        <text x="520" y="460" textAnchor="middle" fontFamily={MONO} fontSize="40" fill={VIOLET} opacity="0.9">
          {'{ }'}
        </text>
      </motion.g>

      {/* ---- Chapter 5: gears break apart ---- */}
      <Particles progress={progress} />

      {/* ---- Chapter 6: services pipeline ---- */}
      <motion.g style={{ opacity: pipeline }}>
        <path
          d="M120 300H480"
          stroke={CYAN}
          strokeWidth="3"
          fill="none"
          className={animate ? 'anim-dash' : undefined}
          strokeDasharray="6 14"
        />
        {animate &&
          [0, 0.8, 1.6].map((delay) => (
            <circle key={delay} r="5" fill={CYAN}>
              <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" path="M120 300H480" />
            </circle>
          ))}
      </motion.g>
      <motion.g style={{ opacity: serviceLabels }} fontFamily={MONO} fontSize="14" fill="var(--fg)" textAnchor="middle">
        {SERVICE_POS.map((s) => (
          <text key={s.label} x={s.x} y={s.y + 52}>
            {s.label}
          </text>
        ))}
        <text x="300" y="220" fill={CYAN} fontSize="12">
          request → response
        </text>
      </motion.g>

      {/* ---- Chapter 7: MCP hub with agents ---- */}
      <motion.g style={{ opacity: hub }}>
        {[...AGENT_POS, ...EXTRA_AGENTS].map((p, i) => {
          const path = `M${HUB.x} ${HUB.y}L${p.x.toFixed(1)} ${p.y.toFixed(1)}`
          return (
            <g key={i}>
              <path d={path} stroke={CYAN} strokeOpacity="0.5" strokeWidth="2" className={animate ? 'anim-dash' : undefined} strokeDasharray="6 14" />
              {animate && (
                <circle r="4" fill={VIOLET}>
                  <animateMotion dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" path={path} />
                </circle>
              )}
            </g>
          )
        })}
        <g fontFamily={MONO} fontSize="12" fill="var(--muted)" textAnchor="middle">
          {AGENT_POS.map((p, i) => (
            <text key={i} x={p.x} y={p.y + 40}>
              {AGENT_LABELS[i]}
            </text>
          ))}
        </g>
      </motion.g>
      <motion.g style={{ opacity: extraAgents }}>
        {EXTRA_AGENTS.map((p) => (
          <g key={p.label} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <circle r="20" fill="var(--scene-bg)" stroke={CYAN} strokeWidth="2.5" />
            <circle r="6" fill={CYAN} />
            <text y="40" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="var(--muted)">
              {p.label}
            </text>
          </g>
        ))}
      </motion.g>

      {/* Morphing nodes (gear centres → services → agents) */}
      {GEARS.map((_, i) => (
        <MorphNode key={i} progress={progress} index={i} />
      ))}

      <g transform={`translate(${HUB.x} ${HUB.y})`}>
      <motion.g style={{ opacity: hub, scale: hubScale }}>
        <circle r="46" fill="var(--scene-bg)" stroke={VIOLET} strokeWidth="3" />
        <circle r="56" fill="none" stroke={VIOLET} strokeOpacity="0.35" className={animate ? 'anim-pulse' : undefined} />
        <text y="6" textAnchor="middle" fontFamily={MONO} fontSize="18" fontWeight="600" fill="var(--fg)">
          MCP
        </text>
      </motion.g>
      </g>
    </svg>
  )
}

