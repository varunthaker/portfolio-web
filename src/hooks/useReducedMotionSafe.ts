import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Like Motion's useReducedMotion, but always `false` on the server and on the
 * first client render, so prerendered HTML hydrates without a mismatch.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated && Boolean(reduced)
}
