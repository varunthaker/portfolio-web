const TOOLS = [
  { y: 34, label: 'search_docs' },
  { y: 90, label: 'get_process' },
  { y: 146, label: 'create_task' },
] as const
const CYCLE = 4.5

/** An agent calling three tools one after another. */
export function AgentAnim({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      {TOOLS.map((tool, i) => {
        const path = `M84 90C150 90 150 ${tool.y} 196 ${tool.y}`
        const start = i / TOOLS.length
        const end = start + 0.22
        return (
          <g key={tool.label}>
            <path d={path} fill="none" stroke="var(--border)" strokeWidth="2" />
            {animate && (
              <circle r="5" fill="var(--violet)" opacity="0">
                <animateMotion dur={`${CYCLE}s`} repeatCount="indefinite" path={path} keyPoints="0;0;1;1" keyTimes={`0;${start};${end};1`} calcMode="linear" />
                <animate attributeName="opacity" dur={`${CYCLE}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${start};${start + 0.01};${end};${end + 0.01};1`} />
              </circle>
            )}
            <rect x="196" y={tool.y - 18} width="112" height="36" rx="8" fill="var(--bg-elev)" stroke="var(--cyan)" strokeWidth="1.5">
              {animate && (
                <animate attributeName="stroke-width" dur={`${CYCLE}s`} repeatCount="indefinite" values="1.5;1.5;3.5;1.5;1.5" keyTimes={`0;${end};${end + 0.04};${end + 0.14};1`} />
              )}
            </rect>
            <text x="252" y={tool.y + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="var(--fg)">
              {tool.label}()
            </text>
          </g>
        )
      })}
      <circle cx="56" cy="90" r="30" fill="var(--bg-elev)" stroke="var(--violet)" strokeWidth="2.5" />
      <circle cx="56" cy="90" r="38" fill="none" stroke="var(--violet)" strokeOpacity="0.35" className={animate ? 'anim-pulse' : undefined} />
      <text x="56" y="95" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="600" fill="var(--fg)">
        Agent
      </text>
    </svg>
  )
}
