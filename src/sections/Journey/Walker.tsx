import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import type { JourneyItem } from '../../content/journey'
import { ItemIcon } from './ItemIcon'

type Props = {
  item: JourneyItem
  /** amber for the early chapters, cyan for the software ones */
  color: string
  /** Distance walked in px — drives the leg/arm swing and the little bob. */
  travel?: MotionValue<number>
  /** -1 when walking back (scrolling up). */
  facing?: 1 | -1
  className?: string
}

const SKIN = '#d59b72'
const SKIN_SHADE = '#c4865f'
const HAIR = '#1b1a1f'
const SWEATER = '#1f2a44'
const PANTS = '#3a4254'
const SHOES = '#15171d'

/**
 * A small 2D cartoon of Varun — dark hair, rimless glasses, navy sweater —
 * walking along the journey and carrying the item of the current chapter.
 */
export function Walker({ item, color, travel, facing = 1, className = '' }: Props) {
  const still = useMotionValue(0)
  const t = useTransform(travel ?? still, (v) => v / 16)
  const legA = useTransform(t, (v) => Math.sin(v) * 24)
  const legB = useTransform(t, (v) => -Math.sin(v) * 24)
  const arm = useTransform(t, (v) => -Math.sin(v) * 20)
  const bob = useTransform(t, (v) => -Math.abs(Math.sin(v)) * 2.5)

  return (
    <svg viewBox="0 0 90 150" className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
      <g transform={facing === -1 ? 'translate(90 0) scale(-1 1)' : undefined}>
        {/* shadow */}
        <ellipse cx="44" cy="147" rx="20" ry="3" fill="#000" opacity="0.25" />

        {/* legs (pivot at the hip) */}
        {[legB, legA].map((rot, i) => (
          <g key={i} transform="translate(44 96)">
            <motion.g style={{ rotate: rot, originX: 0.5, originY: 0 }}>
              <rect x="-5" y="0" width="10" height="42" rx="5" fill={PANTS} />
              <rect x="-6" y="38" width="16" height="8" rx="4" fill={SHOES} />
            </motion.g>
          </g>
        ))}

        <motion.g style={{ y: bob }}>
          {/* back arm */}
          <g transform="translate(30 62)">
            <motion.g style={{ rotate: arm, originX: 0.5, originY: 0 }}>
              <rect x="-4.5" y="0" width="9" height="30" rx="4.5" fill={SWEATER} />
              <circle cx="0" cy="31" r="4.5" fill={SKIN_SHADE} />
            </motion.g>
          </g>

          {/* body: navy sweater */}
          <rect x="26" y="56" width="36" height="44" rx="13" fill={SWEATER} />
          <path d="M37 57c2 4 12 4 14 0" stroke="#2c3a5c" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* neck + head */}
          <rect x="39.5" y="47" width="9" height="11" rx="3" fill={SKIN_SHADE} />
          <circle cx="30.5" cy="34" r="3.6" fill={SKIN_SHADE} />
          <circle cx="57.5" cy="34" r="3.6" fill={SKIN_SHADE} />
          <ellipse cx="44" cy="32" rx="13.5" ry="16" fill={SKIN} />
          {/* hair */}
          <path
            d="M30.5 30c-2-11 4-19.5 14-19.5 10.5 0 15.5 8 13.5 19-1.4-5-4-8-7.5-9-2.6 1.8-7 2.4-11.5 1.4-4-.8-6.6.8-7.6 3-.4 1.6-.7 3.2-.9 5.1z"
            fill={HAIR}
          />
          <ellipse cx="44.5" cy="14.5" rx="13" ry="5.5" fill={HAIR} />
          {/* eyebrows, rimless glasses, eyes */}
          <path d="M34.5 27.5l5.5-.8M48 26.7l5.5.8" stroke={HAIR} strokeWidth="1.6" strokeLinecap="round" />
          <rect x="33" y="29.5" width="9.5" height="6.5" rx="2.4" fill="#fff" fillOpacity="0.12" stroke="#e6e4f0" strokeWidth="0.8" />
          <rect x="45.5" y="29.5" width="9.5" height="6.5" rx="2.4" fill="#fff" fillOpacity="0.12" stroke="#e6e4f0" strokeWidth="0.8" />
          <path d="M42.5 31.6h3" stroke="#e6e4f0" strokeWidth="0.8" />
          <circle cx="38.6" cy="32.8" r="1.4" fill={HAIR} />
          <circle cx="51" cy="32.8" r="1.4" fill={HAIR} />
          <path d="M39.5 41.3c2.8 2.2 6.4 2.2 9.2 0" stroke="#7a3f2c" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* front arm, bent, holding the chapter item */}
          <path d="M58 64c7 3 9 9 9 15" stroke={SWEATER} strokeWidth="9" fill="none" strokeLinecap="round" />
          <g transform="translate(60 72)">
            <motion.g
              key={item}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            >
              <rect x="-3" y="-3" width="36" height="36" rx="8" fill="var(--bg-elev)" stroke={color} strokeWidth="1.5" />
              <ItemIcon item={item} color={color} />
            </motion.g>
          </g>
          <circle cx="67" cy="80" r="4.5" fill={SKIN} />
        </motion.g>
      </g>
    </svg>
  )
}
