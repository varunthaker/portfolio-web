import { useState, type RefObject } from 'react'
import { useMotionValueEvent, useScroll, type MotionValue } from 'motion/react'

/**
 * Scroll progress (0..1) through a tall container, plus the index of the
 * chapter closest to the viewport centre.
 */
export function useChapterProgress(
  ref: RefObject<HTMLElement | null>,
  count: number,
): { progress: MotionValue<number>; active: number } {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))))
    setActive((prev) => (prev === next ? prev : next))
  })

  return { progress: scrollYProgress, active }
}
