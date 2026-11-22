import { useTranslation } from 'react-i18next'

const CYCLE = 8 // seconds; four steps of 2s each
const MONO = 'JetBrains Mono, monospace'

type Pulse = {
  path: string
  /** Fraction of the cycle when the pulse starts and ends. */
  from: number
  to: number
  color: string
}

/* Node boxes (viewBox 640 × 300) */
const CLIENT = { x: 16, y: 112, w: 156, h: 76 }
const SERVER = { x: 248, y: 112, w: 156, h: 76 }
const AUTH = { x: 474, y: 16, w: 150, h: 70 }
const SYSTEMS = { x: 474, y: 214, w: 150, h: 70 }

const P_CONNECT = 'M172 150H248'
const P_AUTH = 'M404 132C440 132 440 51 474 51'
const P_AUTH_BACK = 'M474 51C440 51 440 132 404 132'
const P_TOOL = 'M404 168C440 168 440 249 474 249'
const P_RESULT = 'M474 249C440 249 440 168 404 168H172'

const PULSES: Pulse[] = [
  { path: P_CONNECT, from: 0.02, to: 0.2, color: 'var(--cyan)' },
  { path: P_AUTH, from: 0.27, to: 0.37, color: 'var(--amber)' },
  { path: P_AUTH_BACK, from: 0.38, to: 0.48, color: 'var(--amber)' },
  { path: P_TOOL, from: 0.52, to: 0.6, color: 'var(--violet)' },
  { path: P_TOOL, from: 0.6, to: 0.68, color: 'var(--violet)' },
  { path: P_TOOL, from: 0.68, to: 0.74, color: 'var(--violet)' },
  { path: P_RESULT, from: 0.77, to: 0.97, color: 'var(--cyan)' },
]

function PulseDot({ p }: { p: Pulse }) {
  const dur = `${CYCLE}s`
  return (
    <circle r="6" fill={p.color} opacity="0">
      <animateMotion dur={dur} repeatCount="indefinite" path={p.path} keyPoints="0;0;1;1" keyTimes={`0;${p.from};${p.to};1`} calcMode="linear" />
      <animate attributeName="opacity" dur={dur} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${p.from};${p.from + 0.005};${p.to};${p.to + 0.005};1`} />
    </circle>
  )
}

function Box({
  b,
  title,
  sub,
  stroke,
}: {
  b: { x: number; y: number; w: number; h: number }
  title: string
  sub: string
  stroke: string
}) {
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="12" fill="var(--bg-elev)" stroke={stroke} strokeWidth="1.8" />
      <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 2} textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="600" fill="var(--fg)">
        {title}
      </text>
      <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 18} textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">
        {sub}
      </text>
    </g>
  )
}

function Lock({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth="2">
      <rect x="-8" y="-2" width="16" height="12" rx="2" fill={color} fillOpacity="0.15" />
      <path d="M-5 -2v-4a5 5 0 0 1 10 0v4" />
    </g>
  )
}

/** MCP + OAuth flow: connect → authenticate → scoped tool calls → results. */
export function McpAuthDiagram({ animate }: { animate: boolean }) {
  const { t } = useTranslation()
  const steps = [t('mcp.step1'), t('mcp.step2'), t('mcp.step3'), t('mcp.step4')]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <svg viewBox="0 0 640 300" className="h-auto w-full" role="img" aria-label={t('mcp.diagramLabel')}>
        {/* connectors */}
        <g fill="none" stroke="var(--border)" strokeWidth="2">
          <path d={P_CONNECT} />
          <path d={P_AUTH} />
          <path d={P_TOOL} />
        </g>
        <g fontFamily={MONO} fontSize="11" fill="var(--muted)">
          <text x="210" y="140" textAnchor="middle">1</text>
          <text x="430" y="80" textAnchor="middle">2 · OAuth</text>
          <text x="430" y="230" textAnchor="middle">3 · tools</text>
        </g>

        <Box b={CLIENT} title={t('mcp.client')} sub={t('mcp.clientSub')} stroke="var(--cyan)" />
        <Box b={SERVER} title={t('mcp.server')} sub={t('mcp.serverSub')} stroke="var(--violet)" />
        <Box b={AUTH} title={t('mcp.auth')} sub={t('mcp.authSub')} stroke="var(--amber)" />
        <Box b={SYSTEMS} title={t('mcp.systems')} sub={t('mcp.systemsSub')} stroke="var(--border)" />

        {/* Lock on the server: grey until auth succeeds, then green */}
        <Lock x={SERVER.x + SERVER.w - 18} y={SERVER.y + 18} color="var(--muted)" />
        <g opacity={animate ? 0 : 1}>
          <Lock x={SERVER.x + SERVER.w - 18} y={SERVER.y + 18} color="#22c55e" />
          {animate && (
            <animate attributeName="opacity" dur={`${CYCLE}s`} repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;0.48;0.5;0.97;1" />
          )}
        </g>

        {animate && PULSES.map((p, i) => <PulseDot key={i} p={p} />)}
      </svg>

      <ol className="grid gap-2 text-sm">
        {steps.map((step, i) => (
          <li
            key={i}
            className={`flex gap-3 rounded-xl border border-border bg-bg-elev px-4 py-3 ${animate ? 'anim-step' : ''}`}
            // negative delay: step i lights up at i × 2s, in sync with the SVG pulses
            style={animate ? { animationDelay: `${-((CYCLE - i * (CYCLE / 4)) % CYCLE)}s` } : undefined}
          >
            <span className="font-mono text-cyan">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
