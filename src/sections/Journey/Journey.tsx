import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { isSoftwareEra, journey, journeyOutro } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { Character } from './Character'

/**
 * A simple horizontal journey: one character, a new look per phase.
 * Desktop shows all phases in a row; small screens scroll sideways with snap.
 */
export function Journey() {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const listRef = useRef<HTMLOListElement>(null)
  // Content is visible in the prerendered HTML; the entrance only replays once the row scrolls into view.
  const inView = useInView(listRef, { once: true, margin: '-15% 0px' })

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative -scroll-mt-16 pt-24 sm:-scroll-mt-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">{t('journey.kicker')}</p>
          <h2 id="journey-heading" className="text-3xl font-semibold sm:text-5xl">
            {t('journey.heading')}
          </h2>
          <p className="mt-4 text-lg text-muted">{t('journey.intro')}</p>
        </header>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* soft edges hint that the row scrolls on small screens */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-bg lg:hidden" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg lg:hidden" />

        <ol
          ref={listRef}
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:px-6 lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible lg:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {journey.map((chapter, i) => {
            const software = isSoftwareEra(i)
            const period = chapter.period.replace('{now}', t('journey.now'))
            const last = i === journey.length - 1
            return (
              <li
                key={chapter.id}
                className={`relative w-[44%] shrink-0 snap-center sm:w-[30%] lg:w-auto ${inView ? 'anim-rise' : ''}`}
                style={inView ? { animationDelay: `${i * 90}ms` } : undefined}
              >
                {/* path to the next phase, drawn at the avatar's centre line */}
                {!last && (
                  <div
                    aria-hidden="true"
                    className={`absolute top-16 left-1/2 h-0.5 w-[calc(100%+1rem)] bg-gradient-to-r lg:w-[calc(100%+0.75rem)] ${
                      i === 3 ? 'from-amber to-cyan' : software ? 'from-cyan to-cyan' : 'from-amber to-amber'
                    } opacity-50`}
                  />
                )}

                <div
                  className={`relative mx-auto flex size-32 items-end justify-center overflow-hidden rounded-full border-2 bg-card ${
                    software ? 'border-cyan/60' : 'border-amber/60'
                  } ${last ? 'shadow-[0_0_32px_-6px_var(--violet)]' : ''}`}
                >
                  <Character look={chapter.look} className="h-[92%] w-auto" />
                </div>

                <div className="mt-4 text-center">
                  <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${software ? 'text-cyan' : 'text-amber'}`}>
                    {period}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold leading-snug">{tl(chapter.title)}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted">{tl(chapter.line)}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <p className="mx-auto max-w-3xl px-4 py-20 text-center font-display text-2xl font-semibold sm:py-28 sm:text-4xl">
        <span className="text-gradient">{tl(journeyOutro)}</span>
      </p>
    </section>
  )
}
