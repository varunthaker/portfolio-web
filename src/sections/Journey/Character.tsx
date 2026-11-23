import type { Look } from '../../content/journey'

/*
 * An original chibi-style character drawn in SVG (viewBox 120 × 140).
 * Same face and hair in every phase; the outfit and props change with the `look`.
 */

const SKIN = '#c98d63'
const SKIN_SHADE = '#b07650'
const HAIR = '#1d1b26'
const INK = '#1d1b26'

type Outfit = { shirt: string; trim: string }

const OUTFITS: Record<Look, Outfit> = {
  engineer: { shirt: '#3b6fb6', trim: '#f59e0b' },
  student: { shirt: '#334155', trim: '#e2e8f0' },
  planner: { shirt: '#e2e8f0', trim: '#c2410c' },
  automator: { shirt: '#4d7c5f', trim: '#e2e8f0' },
  learner: { shirt: '#7c3aed', trim: '#c4b5fd' },
  developer: { shirt: '#1e293b', trim: '#22d3ee' },
  ai: { shirt: '#0f172a', trim: '#a78bfa' },
}

function Body({ look }: { look: Look }) {
  const { shirt, trim } = OUTFITS[look]
  return (
    <g>
      {/* neck */}
      <rect x="53" y="82" width="14" height="10" rx="3" fill={SKIN_SHADE} />
      {/* torso */}
      <path d="M34 134 C34 104 42 92 60 92 C78 92 86 104 86 134 Z" fill={shirt} />
      {/* arms */}
      <path d="M38 104 C30 112 28 122 32 130" stroke={shirt} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M82 104 C90 112 92 122 88 130" stroke={shirt} strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="131" r="5" fill={SKIN} />
      <circle cx="88" cy="131" r="5" fill={SKIN} />

      {look === 'engineer' && (
        <g>
          {/* overall straps + pocket */}
          <path d="M48 93 L50 134 M72 93 L70 134" stroke={trim} strokeWidth="4" />
          <rect x="52" y="112" width="16" height="12" rx="2" fill={trim} />
        </g>
      )}
      {look === 'student' && (
        <g>
          {/* blazer lapels + shirt */}
          <path d="M53 93 L60 112 L67 93 Z" fill={trim} />
          <path d="M52 93 L60 118 L46 108 Z M68 93 L60 118 L74 108 Z" fill="#1e293b" />
        </g>
      )}
      {look === 'planner' && (
        <g>
          {/* tie */}
          <path d="M57 93 H63 L61 98 L64 118 L60 122 L56 118 L59 98 Z" fill={trim} />
        </g>
      )}
      {look === 'automator' && (
        <g>
          {/* collar */}
          <path d="M51 92 L60 101 L69 92" stroke={trim} strokeWidth="3" fill="none" />
        </g>
      )}
      {look === 'learner' && (
        <g>
          {/* hoodie strings + backpack straps */}
          <path d="M55 94 V108 M65 94 V108" stroke={trim} strokeWidth="2" strokeLinecap="round" />
          <path d="M44 96 L42 134 M76 96 L78 134" stroke="#f59e0b" strokeWidth="4" />
        </g>
      )}
      {look === 'developer' && (
        <text x="60" y="120" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill={trim}>
          {'</>'}
        </text>
      )}
      {look === 'ai' && (
        <g>
          {/* jacket zip + glowing chest badge */}
          <path d="M60 94 V134" stroke={trim} strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="72" cy="106" r="3.5" fill={trim} />
        </g>
      )}
    </g>
  )
}

function Head({ look }: { look: Look }) {
  const hood = look === 'learner'
  return (
    <g>
      {/* hood behind the head */}
      {hood && <path d="M22 60 C22 22 98 22 98 60 C98 80 90 90 80 92 H40 C30 90 22 80 22 60 Z" fill="#6d28d9" />}
      {/* back hair */}
      <path d="M27 54 C25 26 95 26 93 54 L94 70 L26 70 Z" fill={HAIR} />
      {/* face */}
      <ellipse cx="60" cy="56" rx="31" ry="30" fill={SKIN} />
      {/* ears */}
      <ellipse cx="29" cy="60" rx="4" ry="6" fill={SKIN_SHADE} />
      <ellipse cx="91" cy="60" rx="4" ry="6" fill={SKIN_SHADE} />
      {/* spiky fringe */}
      <path
        d="M27 52 C26 26 50 18 66 22 C82 24 96 36 93 54 L86 42 L82 52 L74 38 L68 50 L60 36 L54 50 L46 38 L42 52 L36 42 Z"
        fill={HAIR}
      />
      {/* eyes — big anime eyes with highlights */}
      <g>
        <ellipse cx="47" cy="60" rx="6.5" ry="8" fill={INK} />
        <ellipse cx="73" cy="60" rx="6.5" ry="8" fill={INK} />
        <ellipse cx="47" cy="62" rx="4" ry="5" fill="#5b3a29" />
        <ellipse cx="73" cy="62" rx="4" ry="5" fill="#5b3a29" />
        <circle cx="49.5" cy="56.5" r="2.4" fill="#fff" />
        <circle cx="75.5" cy="56.5" r="2.4" fill="#fff" />
        <circle cx="45" cy="64" r="1.1" fill="#fff" />
        <circle cx="71" cy="64" r="1.1" fill="#fff" />
        {/* brows */}
        <path d="M40 48 Q47 45 53 48 M67 48 Q73 45 80 48" stroke={HAIR} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      {/* blush + smile */}
      <ellipse cx="39" cy="70" rx="4" ry="2" fill="#e8796b" opacity="0.45" />
      <ellipse cx="81" cy="70" rx="4" ry="2" fill="#e8796b" opacity="0.45" />
      <path d="M54 73 Q60 78 66 73" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  )
}

/** Hats, glasses, headphones … drawn over the head. */
function Headwear({ look }: { look: Look }) {
  switch (look) {
    case 'engineer':
      return (
        <g>
          {/* hard hat */}
          <path d="M28 40 C28 14 92 14 92 40 Z" fill="#facc15" />
          <rect x="22" y="38" width="76" height="7" rx="3.5" fill="#eab308" />
          <rect x="57" y="18" width="6" height="21" rx="3" fill="#eab308" />
        </g>
      )
    case 'student':
      return (
        <g>
          {/* graduation cap with tassel */}
          <path d="M60 14 L100 28 L60 42 L20 28 Z" fill="#1e293b" />
          <path d="M38 34 V44 C38 48 82 48 82 44 V34 L60 42 Z" fill="#0f172a" />
          <path d="M60 28 L92 36 V52" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <circle cx="92" cy="54" r="3" fill="#f59e0b" />
        </g>
      )
    case 'planner':
      return (
        <g stroke={INK} strokeWidth="2" fill="rgba(255,255,255,0.18)">
          {/* glasses */}
          <rect x="37" y="52" width="20" height="16" rx="5" />
          <rect x="63" y="52" width="20" height="16" rx="5" />
          <path d="M57 59 H63" fill="none" />
        </g>
      )
    case 'automator':
      return (
        <g>
          {/* pencil behind the ear */}
          <rect x="84" y="40" width="5" height="22" rx="1.5" fill="#facc15" transform="rotate(20 86 51)" />
        </g>
      )
    case 'developer':
      return (
        <g>
          {/* headphones */}
          <path d="M26 58 C24 18 96 18 94 58" stroke="#475569" strokeWidth="5" fill="none" />
          <rect x="20" y="52" width="12" height="20" rx="5" fill="#22d3ee" />
          <rect x="88" y="52" width="12" height="20" rx="5" fill="#22d3ee" />
        </g>
      )
    case 'ai':
      return (
        <g>
          {/* glowing visor + earpiece */}
          <rect x="34" y="51" width="52" height="17" rx="8.5" fill="#a78bfa" opacity="0.35" />
          <rect x="34" y="51" width="52" height="17" rx="8.5" fill="none" stroke="#a78bfa" strokeWidth="2" />
          <circle cx="91" cy="62" r="4" fill="#a78bfa" />
        </g>
      )
    default:
      return null
  }
}

/** Something held in the hands or floating next to the character. */
function Prop({ look }: { look: Look }) {
  switch (look) {
    case 'engineer':
      return (
        // wrench
        <g transform="rotate(-35 96 118)">
          <rect x="93" y="108" width="6" height="26" rx="2" fill="#94a3b8" />
          <path d="M88 102 a8 8 0 1 0 16 0 l-4 0 l0 5 l-8 0 l0 -5 Z" fill="#94a3b8" />
        </g>
      )
    case 'student':
      return (
        // books
        <g>
          <rect x="6" y="116" width="26" height="7" rx="1.5" fill="#f59e0b" />
          <rect x="8" y="109" width="24" height="7" rx="1.5" fill="#22d3ee" />
          <rect x="7" y="102" width="22" height="7" rx="1.5" fill="#a78bfa" />
        </g>
      )
    case 'planner':
      return (
        // clipboard with a small bar chart
        <g>
          <rect x="88" y="98" width="26" height="34" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="96" y="95" width="10" height="5" rx="1.5" fill="#94a3b8" />
          <rect x="93" y="118" width="4" height="9" fill="#f59e0b" />
          <rect x="99" y="112" width="4" height="15" fill="#f59e0b" />
          <rect x="105" y="106" width="4" height="21" fill="#f59e0b" />
        </g>
      )
    case 'automator':
      return (
        // spreadsheet with a play button = macro
        <g>
          <rect x="84" y="100" width="32" height="26" rx="3" fill="#f8fafc" stroke="#4d7c5f" strokeWidth="1.5" />
          <path d="M84 108 H116 M84 116 H116 M95 100 V126 M106 100 V126" stroke="#4d7c5f" strokeWidth="0.8" />
          <circle cx="100" cy="113" r="7" fill="#16a34a" />
          <path d="M98 109.5 L104 113 L98 116.5 Z" fill="#fff" />
        </g>
      )
    case 'learner':
      return (
        // book labelled JS
        <g>
          <rect x="4" y="104" width="28" height="22" rx="2" fill="#facc15" />
          <rect x="17" y="104" width="2" height="22" fill="#ca8a04" />
          <text x="25" y="119" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700" fill="#1d1b26">
            JS
          </text>
        </g>
      )
    case 'developer':
      return (
        // laptop
        <g>
          <path d="M82 104 H116 V124 H82 Z" fill="#334155" />
          <rect x="85" y="107" width="28" height="14" rx="1" fill="#0f172a" />
          <path d="M88 111 H98 M88 115 H106 M88 119 H95" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M78 124 H120 L117 129 H81 Z" fill="#475569" />
        </g>
      )
    case 'ai':
      return (
        // small floating robot companion
        <g className="anim-bob-alt">
          <path d="M101 82 V76" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="101" cy="75" r="2" fill="#a78bfa" />
          <rect x="89" y="82" width="24" height="20" rx="7" fill="#e2e8f0" />
          <rect x="93" y="87" width="16" height="9" rx="4.5" fill="#0f172a" />
          <circle cx="98" cy="91.5" r="1.8" fill="#22d3ee" />
          <circle cx="104" cy="91.5" r="1.8" fill="#22d3ee" />
        </g>
      )
    default:
      return null
  }
}

export function Character({ look, className = '' }: { look: Look; className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <g className="anim-bob">
        <Body look={look} />
        <Head look={look} />
        <Headwear look={look} />
        <Prop look={look} />
      </g>
    </svg>
  )
}
