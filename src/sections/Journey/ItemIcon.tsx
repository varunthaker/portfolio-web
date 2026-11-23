import type { JourneyItem } from '../../content/journey'

const MONO = 'JetBrains Mono, ui-monospace, monospace'

/** Small line icon for what the character carries at each milestone. */
export function ItemIcon({ item, color }: { item: JourneyItem; color: string }) {
  const s = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  switch (item) {
    case 'blueprint': // rolled technical drawing
      return (
        <g>
          <rect x="0" y="4" width="30" height="22" rx="3" {...s} />
          <path d="M5 10h12M5 15h20M5 20h9" {...s} strokeWidth={1.5} />
          <circle cx="24" cy="10" r="2.5" {...s} strokeWidth={1.5} />
        </g>
      )
    case 'flow': // process map
      return (
        <g {...s}>
          <rect x="0" y="9" width="10" height="10" rx="2" />
          <path d="M10 14h5" />
          <path d="M21 8l6 6-6 6-6-6z" />
        </g>
      )
    case 'sheet': // spreadsheet
      return (
        <g {...s}>
          <rect x="0" y="3" width="30" height="24" rx="3" />
          <path d="M0 11h30M0 19h30M10 3v24M20 3v24" strokeWidth={1.4} />
        </g>
      )
    case 'macro': // report screen with a play/macro button
      return (
        <g {...s}>
          <rect x="0" y="3" width="30" height="21" rx="3" />
          <path d="M12 9l7 4.5-7 4.5z" fill={color} />
          <path d="M10 28h10" />
        </g>
      )
    case 'laptop':
      return (
        <g>
          <rect x="3" y="4" width="24" height="16" rx="2" {...s} />
          <path d="M0 24h30" {...s} />
          <text x="15" y="16" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={color}>
            {'{ }'}
          </text>
        </g>
      )
    case 'server': // service rack
      return (
        <g {...s}>
          <rect x="2" y="2" width="26" height="8" rx="2" />
          <rect x="2" y="12" width="26" height="8" rx="2" />
          <rect x="2" y="22" width="26" height="6" rx="2" />
          <circle cx="7" cy="6" r="1" fill={color} />
          <circle cx="7" cy="16" r="1" fill={color} />
        </g>
      )
    case 'mcp': // hub with connected nodes
      return (
        <g {...s} strokeWidth={1.6}>
          <path d="M15 15L4 5M15 15L26 5M15 15L4 25M15 15L26 25" />
          <circle cx="15" cy="15" r="5.5" fill={color} fillOpacity="0.25" />
          <circle cx="4" cy="5" r="2.5" />
          <circle cx="26" cy="5" r="2.5" />
          <circle cx="4" cy="25" r="2.5" />
          <circle cx="26" cy="25" r="2.5" />
        </g>
      )
  }
}
