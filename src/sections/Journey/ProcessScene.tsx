import { useId } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
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

/* ---------- Layout (viewBox 600 × 600) ---------- */

/** The three process steps that later become services, then agents. */
const STEPS = [
  { x: 180, y: 170 }, // "Check stock" box
  { x: 310, y: 170 }, // "OK?" decision
  { x: 435, y: 170 }, // "Ship" box
] as const
const HUB = { x: 300, y: 270 }
const SERVICE_POS = [
  { x: 120, y: 270, label: 'React' },
  { x: 300, y: 270, label: 'Go API' },
  { x: 480, y: 270, label: 'PostgreSQL' },
] as const
const ORBIT = 135
const orbit = (deg: number) => ({
  x: HUB.x + ORBIT * Math.cos((deg * Math.PI) / 180),
  y: HUB.y + ORBIT * Math.sin((deg * Math.PI) / 180),
})
const AGENT_POS = [orbit(150), orbit(-90), orbit(30)] as const
const AGENT_LABELS = ['Agent', 'Tools', 'DB'] as const
const EXTRA_AGENTS = [
  { ...orbit(-30), label: 'LLM' },
  { ...orbit(-150), label: 'Docs' },
  { ...orbit(90), label: 'API' },
] as const

/** Code typed into the editor panel, one snippet per chapter (by chapter index). */
const SNIPPETS: { chapter: number; file: string; lines: string[] }[] = [
  { chapter: 3, file: 'report.bas', lines: ['Sub BuildReport()', '  For Each row In Data', '    Report.Add row', 'End Sub'] },
  { chapter: 4, file: 'Flow.tsx', lines: ['function Flow({ steps }) {', '  return steps.map((s) =>', '    <Step key={s.id} {...s} />)', '}'] },
  { chapter: 5, file: 'process.go', lines: ['type Process struct{ Steps []Step }', '', 'func (p *Process) Run() error {', '  return p.repo.Save(p)'] },
  { chapter: 6, file: 'agent.py', lines: ['agent = Agent(tools=mcp.tools())', 'agent.run("analyse process")', '', '# → 3 improvements found'] },
]
const PANEL = { x: 30, y: 466, w: 380, h: 112 }

/* ---------- Pieces with their own hooks ---------- */

function TypedLine({
  progress,
  uid,
  id,
  text,
  y,
  from,
  to,
  color,
}: {
  progress: MotionValue<number>
  uid: string
  id: string
  text: string
  y: number
  from: number
  to: number
  color: string
}) {
  const reveal = useChapters(progress, [from, to], [0, 1])
  const width = useTransform(reveal, (v) => `${v * 100}%`)
  const clipId = `${uid}-${id}`
  return (
    <g>
      <clipPath id={clipId}>
        <motion.rect x={PANEL.x + 14} y={y - 14} height="20" style={{ width }} />
      </clipPath>
      <text x={PANEL.x + 18} y={y} fontFamily={MONO} fontSize="12.5" fill={color} clipPath={`url(#${clipId})`}>
        {text}
      </text>
    </g>
  )
}

/** One chapter's snippet: types itself in as you scroll into the chapter, fades on the next. */
function Snippet({
  progress,
  uid,
  snippet,
  isLast,
}: {
  progress: MotionValue<number>
  uid: string
  snippet: (typeof SNIPPETS)[number]
  isLast: boolean
}) {
  const k = snippet.chapter
  const opacity = useWindow(progress, [k - 0.55, k - 0.45], isLast ? undefined : [k + 0.45, k + 0.55])
  const step = 0.4 / snippet.lines.length
  return (
    <motion.g style={{ opacity }}>
      <text x={PANEL.x + PANEL.w - 14} y={PANEL.y + 18} textAnchor="end" fontFamily={MONO} fontSize="11" fill="var(--muted)">
        {snippet.file}
      </text>
      {snippet.lines.map((line, i) =>
        line ? (
          <TypedLine
            key={i}
            progress={progress}
            uid={uid}
            id={`${k}-${i}`}
            text={line}
            y={PANEL.y + 40 + i * 19}
            from={k - 0.45 + i * step}
            to={k - 0.45 + (i + 1) * step}
            color={line.startsWith('#') ? 'var(--muted)' : i === 0 ? VIOLET : 'var(--fg)'}
          />
        ) : null,
      )}
    </motion.g>
  )
}

/** A process step that becomes a node, then a service, then an agent around the MCP hub. */
function MorphNode({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const g = STEPS[index]
  const s = SERVICE_POS[index]
  const a = AGENT_POS[index]
  const keys = [4.3, 5, 5.35, 6]
  const x = useChapters(progress, keys, [0, s.x - g.x, s.x - g.x, a.x - g.x])
  const y = useChapters(progress, keys, [0, s.y - g.y, s.y - g.y, a.y - g.y])
  const scale = useChapters(progress, [3.7, 4.3, 4.8, 5.1, 5.5, 6], [0.2, 0.7, 0.7, 1.1, 1.1, 0.8])
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
    const step = STEPS[i % 3]
    const angle = (i * 137.5 * Math.PI) / 180
    return { gx: step.x + Math.cos(angle) * 36, gy: step.y + Math.sin(angle) * 26, angle, i }
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
  const dist = 30 + (i % 5) * 12
  const x = useTransform(spread, (v) => Math.cos(angle) * dist * v)
  const y = useTransform(spread, (v) => Math.sin(angle) * dist * v)
  return <motion.rect x={gx - 3} y={gy - 3} width="6" height="6" rx="1" fill={i % 2 ? AMBER : CYAN} style={{ x, y }} />
}

function FlowBox({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="48" rx="10" fill="var(--scene-bg)" stroke={AMBER} strokeWidth="2" />
      <text x={x + w / 2} y={y + 29} textAnchor="middle" fontFamily={MONO} fontSize="13" fill="var(--fg)">
        {label}
      </text>
    </g>
  )
}

function Kpi({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-38" y="-12" width="76" height="24" rx="12" fill="var(--amber-soft)" stroke={AMBER} strokeWidth="1" />
      <text y="4" textAnchor="middle" fontFamily={MONO} fontSize="11" fill={AMBER}>
        {text}
      </text>
    </g>
  )
}

/* ---------- Scene ---------- */

export function ProcessScene({ progress, animate = true, className = '' }: SceneProps) {
  // Unique ids so several scenes (reduced-motion thumbnails) can share a page.
  const uid = 'ps' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const arrow = `url(#${uid}-arrow)`

  // Ambient glow shifts from amber (process era) to cyan (software era).
  const amberGlow = useWindow(progress, undefined, [3.4, 4.6])
  const cyanGlow = useWindow(progress, [3.6, 4.8])

  // Chapters 1–4: the process diagram
  const flow = useWindow(progress, undefined, [3.6, 4.3])
  const loop = useChapters(progress, [0.45, 1.05], [0, 1])
  const loopLabel = useWindow(progress, [0.8, 1.05])
  const loopArrow = useWindow(progress, [0.45, 0.55]) // hides the arrowhead before the line draws
  // Early chapters show only the diagram, so centre it; it rises when the spreadsheet arrives.
  const lift = useChapters(progress, [1.2, 1.8], [110, 0])
  const kpis = useWindow(progress, [0.75, 1.1], [3.6, 4.2])
  const tokens = useWindow(progress, [0.6, 1], [3.4, 3.9])
  // Chapter 3: spreadsheet
  const cells = useWindow(progress, [1.55, 2.05], [3.6, 4.2])
  const values = useWindow(progress, [1.9, 2.3])
  // Chapters 4–7: the editor panel that types code
  const panel = useWindow(progress, [2.4, 2.6])
  // Chapters 6–7: services, then MCP hub with agents
  const pipeline = useWindow(progress, [4.2, 4.8], [5.4, 5.8])
  const serviceLabels = useWindow(progress, [4.8, 5], [5.3, 5.5])
  const hub = useWindow(progress, [5.4, 5.9])
  const hubScale = useChapters(progress, [5.4, 6], [0.4, 1])
  const extraAgents = useWindow(progress, [5.6, 6])

  const mainPath = 'M70 170H530'

  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${uid}-amber`}>
          <stop offset="0" stopColor="var(--amber)" stopOpacity="0.24" />
          <stop offset="1" stopColor="var(--amber)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-cyan`}>
          <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.24" />
          <stop offset="1" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--grid)" strokeWidth="1" />
        </pattern>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={AMBER} />
        </marker>
      </defs>

      <motion.circle cx="300" cy="300" r="300" fill={`url(#${uid}-amber)`} style={{ opacity: amberGlow }} />
      <motion.circle cx="300" cy="300" r="300" fill={`url(#${uid}-cyan)`} style={{ opacity: cyanGlow }} />
      <rect x="20" y="20" width="560" height="560" rx="28" fill={`url(#${uid}-grid)`} />

      {/* ---- Chapters 1–4: process diagram (blueprint) ---- */}
      <motion.g style={{ opacity: flow, y: lift }}>
        <text x="40" y="104" fontFamily={MONO} fontSize="12" fill={AMBER}>
          process.bpmn
        </text>
        <path d="M40 112H170" stroke={AMBER} strokeOpacity="0.4" />

        <g stroke={AMBER} strokeWidth="2" fill="none">
          <path d="M86 170H118" markerEnd={arrow} />
          <path d="M240 170H278" markerEnd={arrow} />
          <path d="M340 170H378" markerEnd={arrow} />
          <path d="M490 170H514" markerEnd={arrow} />
        </g>
        {/* start / end events */}
        <circle cx="70" cy="170" r="16" fill="var(--scene-bg)" stroke={AMBER} strokeWidth="2" />
        <circle cx="530" cy="170" r="14" fill="var(--scene-bg)" stroke={AMBER} strokeWidth="4" />
        <text x="70" y="206" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">
          order
        </text>
        <text x="530" y="206" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">
          done
        </text>
        <FlowBox x={120} y={146} w={120} label="Check stock" />
        {/* decision */}
        <path d="M310 140L340 170L310 200L280 170Z" fill="var(--scene-bg)" stroke={AMBER} strokeWidth="2" />
        <text x="310" y="175" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="var(--fg)">
          OK?
        </text>
        <text x="359" y="160" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--muted)">
          yes
        </text>
        <FlowBox x={380} y={146} w={110} label="Ship" />

        {/* Chapter 2: the reorder loop draws itself in */}
        <motion.path
          d="M310 200V244M250 268H180V196"
          stroke={AMBER}
          strokeWidth="2"
          fill="none"
          markerEnd={arrow}
          style={{ pathLength: loop, opacity: loopArrow }}
        />
        <motion.g style={{ opacity: loopLabel }}>
          <FlowBox x={250} y={244} w={120} label="Reorder" />
          <text x="322" y="226" fontFamily={MONO} fontSize="10" fill="var(--muted)">
            no
          </text>
        </motion.g>
      </motion.g>

      {/* KPIs on the process */}
      <motion.g style={{ opacity: kpis, y: lift }}>
        <Kpi x={180} y={124} text="⌀ 2.4 d" />
        <Kpi x={435} y={124} text="98 % OTD" />
        <Kpi x={440} y={268} text="−12 % stock" />
      </motion.g>

      {/* Work items flowing through the process */}
      <motion.g style={{ opacity: tokens, y: lift }}>
        {animate ? (
          [0, 1.2, 2.4].map((delay) => (
            <circle key={delay} r="5" fill={AMBER}>
              <animateMotion dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" path={mainPath} />
            </circle>
          ))
        ) : (
          <>
            <circle cx="100" cy="170" r="5" fill={AMBER} />
            <circle cx="262" cy="170" r="5" fill={AMBER} />
          </>
        )}
      </motion.g>

      {/* ---- Chapter 3: spreadsheet ---- */}
      <motion.g style={{ opacity: cells }}>
        <g transform="translate(60 340)">
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
          <g fontFamily={MONO} fontSize="12">
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
                  <text key={`${r}-${c}`} x={c * 96 + 8} y={50 + r * 30} fill={v === 'LOW' ? AMBER : 'var(--fg)'}>
                    {v}
                  </text>
                )),
              )}
            </motion.g>
          </g>
        </g>
      </motion.g>

      {/* ---- Chapter 5: the diagram breaks into nodes ---- */}
      <Particles progress={progress} />

      {/* ---- Chapter 6: services pipeline ---- */}
      <motion.g style={{ opacity: pipeline }}>
        <path
          d="M120 270H480"
          stroke={CYAN}
          strokeWidth="3"
          fill="none"
          className={animate ? 'anim-dash' : undefined}
          strokeDasharray="6 14"
        />
        {animate &&
          [0, 0.8, 1.6].map((delay) => (
            <circle key={delay} r="5" fill={CYAN}>
              <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" path="M120 270H480" />
            </circle>
          ))}
      </motion.g>
      <motion.g style={{ opacity: serviceLabels }} fontFamily={MONO} fontSize="14" fill="var(--fg)" textAnchor="middle">
        {SERVICE_POS.map((s) => (
          <text key={s.label} x={s.x} y={s.y + 50}>
            {s.label}
          </text>
        ))}
        <text x="300" y="200" fill={CYAN} fontSize="12">
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
            <text key={i} x={p.x} y={p.y + 38}>
              {AGENT_LABELS[i]}
            </text>
          ))}
        </g>
      </motion.g>
      <motion.g style={{ opacity: extraAgents }}>
        {EXTRA_AGENTS.map((p) => (
          <g key={p.label} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <circle r="18" fill="var(--scene-bg)" stroke={CYAN} strokeWidth="2.5" />
            <circle r="5" fill={CYAN} />
            <text y="36" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="var(--muted)">
              {p.label}
            </text>
          </g>
        ))}
      </motion.g>

      {STEPS.map((_, i) => (
        <MorphNode key={i} progress={progress} index={i} />
      ))}

      <g transform={`translate(${HUB.x} ${HUB.y})`}>
        <motion.g style={{ opacity: hub, scale: hubScale }}>
          <circle r="42" fill="var(--scene-bg)" stroke={VIOLET} strokeWidth="3" />
          <circle r="52" fill="none" stroke={VIOLET} strokeOpacity="0.35" className={animate ? 'anim-pulse' : undefined} />
          <text y="6" textAnchor="middle" fontFamily={MONO} fontSize="18" fontWeight="600" fill="var(--fg)">
            MCP
          </text>
        </motion.g>
      </g>

      {/* ---- Chapters 4–7: editor panel typing code ---- */}
      <motion.g style={{ opacity: panel }}>
        <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx="10" fill="var(--scene-bg)" stroke={VIOLET} strokeWidth="1.5" />
        <g transform={`translate(${PANEL.x + 16} ${PANEL.y + 14})`}>
          <circle r="3.5" fill="#f87171" />
          <circle cx="12" r="3.5" fill="#fbbf24" />
          <circle cx="24" r="3.5" fill="#34d399" />
        </g>
        {SNIPPETS.map((s, i) => (
          <Snippet key={s.file} progress={progress} uid={uid} snippet={s} isLast={i === SNIPPETS.length - 1} />
        ))}
      </motion.g>
    </svg>
  )
}

