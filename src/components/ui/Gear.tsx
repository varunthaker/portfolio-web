/** Simple SVG gear centred at (0,0). Spins via CSS unless `still`. */
export function Gear({
  r,
  teeth,
  stroke,
  still = false,
}: {
  r: number
  teeth: number
  stroke: string
  still?: boolean
}) {
  const outer = r
  const inner = r * 0.78
  const pts: string[] = []
  const step = (Math.PI * 2) / (teeth * 2)
  for (let i = 0; i < teeth * 2; i++) {
    const rad = i % 2 === 0 ? outer : inner
    const a1 = i * step - step / 2
    const a2 = i * step + step / 2
    pts.push(`${(Math.cos(a1) * rad).toFixed(2)},${(Math.sin(a1) * rad).toFixed(2)}`)
    pts.push(`${(Math.cos(a2) * rad).toFixed(2)},${(Math.sin(a2) * rad).toFixed(2)}`)
  }
  return (
    <g className={still ? undefined : 'anim-spin'} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round">
      <polygon points={pts.join(' ')} />
      <circle r={r * 0.32} />
    </g>
  )
}
