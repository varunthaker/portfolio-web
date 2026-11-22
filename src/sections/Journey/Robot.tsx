import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import type { RobotItem } from '../../content/journey'

const MONO = 'JetBrains Mono, ui-monospace, monospace'

/** The thing the robot carries at each station — one per chapter. */
export function ItemIcon({ item, color }: { item: RobotItem; color: string }) {
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

type RobotProps = {
  item: RobotItem
  /** amber for the process era, cyan for the software era */
  color: string
  /** Distance travelled in px — drives wheel rotation and the little bob. */
  travel?: MotionValue<number>
  animate?: boolean
  className?: string
}

/**
 * "Bit", an original little helper robot: screen face, antenna, two wheels.
 * It carries a different item at every station of the journey.
 */
export function Robot({ item, color, travel, animate = true, className = '' }: RobotProps) {
  const still = useMotionValue(0)
  const distance = travel ?? still
  const wheel = useTransform(distance, (v) => (v / (2 * Math.PI * 10)) * 360)
  const bob = useTransform(distance, (v) => Math.sin(v / 14) * 1.6)

  return (
    <svg viewBox="0 0 100 112" className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
      <motion.g style={{ y: bob }}>
        {/* antenna */}
        <path d="M44 14V4" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="4" r="3.5" fill={color} className={animate ? 'anim-pulse' : undefined} />
        {/* head = screen */}
        <rect x="18" y="14" width="52" height="38" rx="12" fill="var(--bg-elev)" stroke={color} strokeWidth="2.5" />
        <rect x="24" y="20" width="40" height="26" rx="8" fill="var(--bg)" />
        <g className={animate ? 'anim-blink' : undefined}>
          <rect x="32" y="27" width="7" height="11" rx="3.5" fill={color} />
          <rect x="49" y="27" width="7" height="11" rx="3.5" fill={color} />
        </g>
        {/* neck + body */}
        <rect x="40" y="52" width="8" height="5" fill="var(--muted)" />
        <rect x="22" y="57" width="44" height="32" rx="9" fill="var(--bg-elev)" stroke={color} strokeWidth="2.5" />
        <circle cx="34" cy="70" r="3" fill={color} opacity="0.8" />
        <path d="M30 80h16" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
        {/* arm holding the item */}
        <path d="M62 66c8 0 10 4 12 8" stroke="var(--muted)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g transform="translate(66 58)">
          <motion.g
            key={item}
            initial={animate ? { scale: 0.4, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <rect x="-3" y="-3" width="36" height="36" rx="8" fill="var(--bg)" stroke="var(--border)" />
            <ItemIcon item={item} color={color} />
          </motion.g>
        </g>
      </motion.g>
      {/* wheels (no bob: they stay on the road) */}
      {[32, 58].map((cx) => (
        <g key={cx} transform={`translate(${cx} 99)`}>
          <motion.g style={{ rotate: wheel }}>
            <circle r="10" fill="var(--bg-elev)" stroke="var(--muted)" strokeWidth="2.5" />
            <path d="M-6 0h12M0 -6v12" stroke="var(--muted)" strokeWidth="2" />
          </motion.g>
        </g>
      ))}
    </svg>
  )
}

