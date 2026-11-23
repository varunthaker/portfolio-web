import { journeyOutro } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { JourneyHeader } from './JourneyHeader'
import { JourneyStatic } from './JourneyStatic'
import { JourneyTrail } from './JourneyTrail'

export function Journey() {
  const { t: tl } = useLang()

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative">
      {/* Both versions are in the prerendered HTML; CSS picks one, so there is no
          layout jump after hydration for reduced-motion visitors. */}
      <div className="motion-reduce:hidden">
        <JourneyTrail />
      </div>
      <div className="hidden pt-24 motion-reduce:block">
        <div className="mx-auto mb-10 max-w-3xl px-4 sm:px-6">
          <JourneyHeader />
        </div>
        <JourneyStatic />
      </div>

      <p className="mx-auto max-w-3xl px-4 py-24 text-center font-display text-2xl font-semibold sm:py-32 sm:text-4xl">
        <span className="text-gradient">{tl(journeyOutro)}</span>
      </p>
    </section>
  )
}
