const LAYERS = [
  { y: 18, label: 'React · TypeScript', color: 'var(--cyan)' },
  { y: 72, label: 'Go · Python API', color: 'var(--violet)' },
  { y: 126, label: 'PostgreSQL', color: 'var(--amber)' },
] as const

/** A request travelling down the stack and back. */
export function StackAnim({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <path d="M262 36V144" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 6" />
      {LAYERS.map((l) => (
        <g key={l.label}>
          <rect x="30" y={l.y} width="210" height="36" rx="8" fill="var(--bg-elev)" stroke={l.color} strokeWidth="1.5" />
          <circle cx="50" cy={l.y + 18} r="5" fill={l.color} />
          <text x="66" y={l.y + 23} fontFamily="JetBrains Mono, monospace" fontSize="13" fill="var(--fg)">
            {l.label}
          </text>
        </g>
      ))}
      {animate ? (
        <circle r="6" fill="var(--cyan)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M262 36V144" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
        </circle>
      ) : (
        <circle cx="262" cy="90" r="6" fill="var(--cyan)" />
      )}
    </svg>
  )
}
