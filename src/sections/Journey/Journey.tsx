import { useRef } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { journey, journeyOutro } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { ChapterCard } from './ChapterCard'
import { FactoryScene } from './FactoryScene'
import { JourneyStatic } from './JourneyStatic'

function JourneyScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const { progress, active } = useChapterProgress(ref, journey.length)

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6 md:grid md:grid-cols-2 md:gap-12">
      {/* `contents` on mobile lets the sticky scene stick within the whole tall container */}
      <div className="contents md:block">
        <div className="sticky top-14 z-10 -mx-4 flex h-[42svh] items-center justify-center bg-gradient-to-b from-bg from-80% to-transparent px-4 md:top-0 md:mx-0 md:h-screen md:bg-none md:px-0">
          <FactoryScene progress={progress} className="h-full max-h-[560px] w-auto max-w-full" />
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
        <ol>
          {journey.map((chapter, i) => (
            <li key={chapter.id} className="flex min-h-[80svh] items-center py-8 md:min-h-screen">
              <ChapterCard chapter={chapter} index={i} active={active === i} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Journey() {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const reduced = useReducedMotionSafe()

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative pt-24 sm:pt-32">
      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">{t('journey.kicker')}</p>
        <h2 id="journey-heading" className="max-w-3xl text-3xl font-semibold sm:text-5xl">
          {t('journey.heading')}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t('journey.intro')}</p>
      </header>

      <div className="mt-12">{reduced ? <JourneyStatic /> : <JourneyScroll />}</div>

      <p className="mx-auto max-w-3xl px-4 py-24 text-center font-display text-2xl font-semibold sm:py-32 sm:text-4xl">
        <span className="text-gradient">{tl(journeyOutro)}</span>
      </p>
    </section>
  )
}
