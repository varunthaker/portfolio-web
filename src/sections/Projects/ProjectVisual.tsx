import type { ProjectVisualKind } from '../../content/projects'

const MONO = 'JetBrains Mono, monospace'

/** Stylised, lightweight illustration per project (no screenshots needed). */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      {kind === 'waveform' && (
        <g>
          {Array.from({ length: 22 }, (_, i) => {
            const h = 14 + Math.abs(Math.sin(i * 0.9)) * 52
            return (
              <rect key={i} x={50 + i * 10} y={80 - h / 2} width="5" height={h} rx="2.5" fill="var(--cyan)" className="anim-wave" style={{ animationDelay: `${(i % 7) * 0.1}s` }} />
            )
          })}
          <text x="160" y="148" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--muted)">
            „Wie hoch ist die Provision?“
          </text>
        </g>
      )}
      {kind === 'agent' && (
        <g>
          <circle cx="160" cy="80" r="26" fill="var(--bg-elev)" stroke="var(--violet)" strokeWidth="2" />
          <text x="160" y="85" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="var(--fg)">agent</text>
          {[
            { x: 50, y: 40, l: 'stock' },
            { x: 50, y: 120, l: 'suppliers' },
            { x: 270, y: 40, l: 'policies.pdf' },
            { x: 270, y: 120, l: 'orders' },
          ].map((n) => (
            <g key={n.l}>
              <path d={`M160 80L${n.x} ${n.y}`} stroke="var(--cyan)" strokeOpacity="0.5" strokeWidth="1.5" className="anim-dash" />
              <rect x={n.x - 42} y={n.y - 13} width="84" height="26" rx="6" fill="var(--bg-elev)" stroke="var(--cyan)" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--fg)">{n.l}</text>
            </g>
          ))}
        </g>
      )}
      {kind === 'payments' && (
        <g>
          <rect x="70" y="24" width="180" height="112" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
          <rect x="88" y="42" width="90" height="8" rx="4" fill="var(--muted)" opacity="0.6" />
          <rect x="88" y="58" width="140" height="6" rx="3" fill="var(--muted)" opacity="0.3" />
          <rect x="88" y="80" width="68" height="28" rx="8" fill="var(--violet)" opacity="0.9" />
          <text x="122" y="98" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="#fff">Stripe</text>
          <rect x="164" y="80" width="68" height="28" rx="8" fill="none" stroke="var(--cyan)" />
          <text x="198" y="98" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--fg)">PayPal</text>
          <circle cx="250" cy="30" r="14" fill="#22c55e" className="anim-pulse" />
          <path d="M243 30l5 5 9-10" stroke="#fff" strokeWidth="2.5" fill="none" />
        </g>
      )}
      {kind === 'invoice' && (
        <g>
          <rect x="104" y="14" width="112" height="134" rx="8" fill="var(--bg-elev)" stroke="var(--amber)" />
          <text x="118" y="38" fontFamily={MONO} fontSize="11" fill="var(--amber)">RECHNUNG</text>
          <text x="118" y="54" fontFamily={MONO} fontSize="9" fill="var(--muted)">Nr. 2026-0042</text>
          {[70, 84, 98].map((y) => (
            <g key={y}>
              <rect x="118" y={y} width="50" height="5" rx="2.5" fill="var(--muted)" opacity="0.4" />
              <rect x="180" y={y} width="22" height="5" rx="2.5" fill="var(--muted)" opacity="0.4" />
            </g>
          ))}
          <path d="M118 114h84" stroke="var(--border)" />
          <text x="202" y="132" textAnchor="end" fontFamily={MONO} fontSize="11" fill="var(--fg)">€ 1.190,00</text>
          <g transform="translate(232 112) rotate(-12)">
            <rect x="-30" y="-12" width="60" height="24" rx="4" fill="none" stroke="var(--cyan)" strokeWidth="2" />
            <text y="4" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--cyan)">FINAL</text>
          </g>
        </g>
      )}
      {kind === 'dashboard' && (
        <g>
          <rect x="40" y="18" width="240" height="124" rx="10" fill="var(--bg-elev)" stroke="var(--border)" />
          <rect x="40" y="18" width="52" height="124" rx="10" fill="var(--cyan-soft)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={106 + i * 58} y="32" width="48" height="30" rx="6" fill="none" stroke="var(--cyan)" strokeOpacity={0.4 + i * 0.25} />
          ))}
          <polyline points="108,124 140,104 170,112 200,86 232,92 264,70" fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  )
}
