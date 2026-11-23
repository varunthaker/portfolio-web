import { useRef } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { journey } from '../../content/journey'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { ChapterCard } from './ChapterCard'
import { ProcessScene } from './ProcessScene'
import { JourneyStatic } from './JourneyStatic'

function JourneyHeader({ id }: { id?: string }) {
  const { t } = useTranslation()
  return (
    <header>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">{t('journey.kicker')}</p>
      <h2 id={id} className="text-3xl font-semibold sm:text-5xl">
        {t('journey.heading')}
      </h2>
      <p className="mt-4 text-lg text-muted">{t('journey.intro')}</p>
    </header>
  )
}

/** Visible height below the fixed 3.5rem header. */
const SCREEN = 'md:min-h-[calc(100svh-3.5rem)]'

function JourneyScroll() {
  const ref = useRef<HTMLDivElement>(null)
  // One intro screen (the heading) + one screen per chapter.
  const { progress, active } = useChapterProgress(ref, journey.length + 1)

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6 md:grid md:grid-cols-2 md:gap-12">
      {/* phones: heading above the scene, so there is no big gap after the hero */}
      <div className="pt-24 pb-6 md:hidden">
        <JourneyHeader id="journey-heading" />
      </div>
      {/* `contents` on mobile lets the sticky scene stick within the whole tall container */}
      <div className="contents md:block">
        <div className="sticky top-14 z-10 -mx-4 flex h-[42svh] items-center justify-center bg-bg px-4 md:mx-0 md:h-[calc(100svh-3.5rem)] md:bg-transparent md:px-0">
          {/* mobile: solid behind the scene, soft fade just below it */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-10 bg-gradient-to-b from-bg to-transparent md:hidden" />
          <ProcessScene progress={progress} className="h-full max-h-[560px] w-auto max-w-full" />
        </div>
      </div>

      <div className="relative">
        {/* progress rail (desktop) */}
        <div aria-hidden="true" className="absolute top-0 bottom-0 -left-6 hidden w-px bg-border md:block">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-amber to-cyan"
            style={{ scaleY: progress }}
          />
        </div>
        {/* desktop: heading next to the scene (on phones this is just a short lead-in) */}
        <div className="flex min-h-[12svh] items-start md:min-h-[45svh] md:pt-10">
          <div className="hidden md:block">
            <JourneyHeader />
          </div>
        </div>
        <ol>
          {journey.map((chapter, i) => (
            <li
              key={chapter.id}
              // the last chapter only needs half a screen, so no empty gap before the next section
              className={
                i === journey.length - 1
                  ? 'flex min-h-[40svh] items-start py-8 md:min-h-[42svh] md:pt-[8svh]'
                  : `flex min-h-[80svh] items-center py-8 ${SCREEN}`
              }
            >
              {/* active 0 is the intro screen, so chapter i is active at i + 1 */}
              <ChapterCard chapter={chapter} index={i} active={active === i + 1} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative">
      {/* Both versions are in the prerendered HTML; CSS picks one, so there is no
          layout jump after hydration for reduced-motion visitors. */}
      <div className="motion-reduce:hidden">
        <JourneyScroll />
      </div>
      <div className="hidden pt-24 motion-reduce:block">
        <div className="mx-auto mb-12 max-w-4xl px-4 sm:px-6">
          <JourneyHeader />
        </div>
        <JourneyStatic />
      </div>
    </section>
  )
}
