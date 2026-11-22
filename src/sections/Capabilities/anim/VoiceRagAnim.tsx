const BARS = [0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75]

/** Voice → text → documents → grounded answer. */
export function VoiceRagAnim({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      {/* waveform */}
      <g transform="translate(20 90)">
        {BARS.map((h, i) => (
          <rect
            key={i}
            x={i * 9}
            y={-28 * h}
            width="5"
            height={56 * h}
            rx="2.5"
            fill="var(--cyan)"
            className={animate ? 'anim-wave' : undefined}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </g>
      <path d="M92 90h22" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#vr-arrow)" />
      {/* transcript */}
      <g transform="translate(124 64)">
        <rect width="64" height="52" rx="8" fill="var(--bg-elev)" stroke="var(--border)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="10" y={12 + i * 12} width={i === 2 ? 26 : 44} height="5" rx="2.5" fill="var(--muted)" className={animate ? 'anim-fade' : undefined} style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      <path d="M194 90h18" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#vr-arrow)" />
      {/* documents */}
      <g transform="translate(222 56)">
        <rect x="10" y="-6" width="44" height="56" rx="5" fill="var(--bg-elev)" stroke="var(--amber)" strokeOpacity="0.5" />
        <rect x="4" y="0" width="44" height="56" rx="5" fill="var(--bg-elev)" stroke="var(--amber)" strokeOpacity="0.75" />
        <rect x="-2" y="6" width="44" height="56" rx="5" fill="var(--bg-elev)" stroke="var(--amber)" />
        <path d="M6 22h28M6 32h28M6 42h18" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* answer bubble */}
      <g transform="translate(150 138)">
        <rect width="150" height="30" rx="15" fill="var(--cyan-soft)" stroke="var(--cyan)" />
        <text x="75" y="19" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="var(--fg)">
          answer · p. 4
        </text>
      </g>
      <defs>
        <marker id="vr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
        </marker>
      </defs>
    </svg>
  )
}
