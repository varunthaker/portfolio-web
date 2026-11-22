import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Pauses looping animations inside the referenced element while it is
 * off-screen: CSS loops via a class, SVG SMIL loops via pauseAnimations().
 */
export function useLoopInView<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: '100px' })

  useEffect(() => {
    ref.current?.querySelectorAll('svg').forEach((svg) => {
      if (inView) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
  }, [inView])

  return { ref, loopClass: inView ? '' : 'anim-paused' }
}
