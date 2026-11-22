import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  children: ReactNode
  /** Change this value to scroll back to the first card (e.g. when a filter changes). */
  resetKey?: string
}

/**
 * Horizontal, swipeable card row using native scroll-snap (touch, trackpad and
 * keyboard work for free), with prev/next buttons and position dots.
 */
export function Carousel({ label, children, resetKey }: Props) {
  const { t } = useTranslation()
  const track = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const [index, setIndex] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const left = el.scrollLeft
    let nearest = 0
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - el.offsetLeft - left) < Math.abs(cards[nearest].offsetLeft - el.offsetLeft - left)) nearest = i
    })
    // the trailing padding counts as "end", so → never just nudges the row a few px
    const pad = parseFloat(getComputedStyle(el).paddingRight) || 0
    const atEnd = left + el.clientWidth >= el.scrollWidth - pad - 4
    setIndex(atEnd ? cards.length - 1 : nearest)
    setEdges({ start: left <= 4, end: atEnd })
  }, [])

  useEffect(() => {
    update()
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update, items.length])

  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
  }, [resetKey])

  /**
   * Scroll to the previous/next card relative to the *current scroll position*.
   * (Index-based jumps break at the end of the row, where several cards are
   * visible at once and the "previous" card's offset is already in view.)
   */
  const step = (dir: -1 | 1) => {
    const el = track.current
    if (!el) return
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const offsets = (Array.from(el.children) as HTMLElement[]).map((c) => c.offsetLeft - el.offsetLeft - pad)
    const left = el.scrollLeft
    const target =
      dir === 1
        ? offsets.find((o) => o > left + 4)
        : [...offsets].reverse().find((o) => o < left - 4)
    el.scrollTo({ left: Math.max(0, target ?? (dir === 1 ? el.scrollWidth : 0)), behavior: 'smooth' })
  }

  const btn =
    'grid size-10 place-items-center rounded-full border border-border bg-card text-fg transition-colors hover:border-cyan disabled:cursor-default disabled:opacity-35 disabled:hover:border-border'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        onScroll={update}
        className={`-mx-4 flex items-start snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pt-2 pb-4 [scrollbar-width:none] sm:-mx-6 sm:items-stretch sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden ${
          edges.end ? '' : '[mask-image:linear-gradient(to_right,black_85%,transparent)]'
        }`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length}`}
            className="flex shrink-0 snap-start"
          >
            {child}
          </div>
        ))}
      </div>

      {/* controls only when there is something to scroll to */}
      {!(edges.start && edges.end) && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-cyan' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={() => step(-1)} disabled={edges.start} aria-label={t('carousel.prev')}>
              ←
            </button>
            <button type="button" className={btn} onClick={() => step(1)} disabled={edges.end} aria-label={t('carousel.next')}>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
