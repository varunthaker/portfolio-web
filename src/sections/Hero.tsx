import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import { profile } from '../content/profile'
import photo from '../assets/photo.webp'

/** Soft fade on all edges, slightly stronger at the bottom. */
const FADE = 'radial-gradient(closest-side at 50% 44%, #000 58%, transparent 100%)'

export function Hero() {
  const { t } = useTranslation()
  const { t: tl } = useLang()

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center pt-20 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.25fr_1fr]">
        <div className="order-2 md:order-1">
          <p className="anim-rise mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
            {t('hero.eyebrow')} · {tl(profile.location)}
          </p>
          <h1
            className="anim-rise text-5xl font-bold leading-[1.02] sm:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {profile.name}
          </h1>
          <p
            className="anim-rise mt-6 max-w-xl text-xl text-fg/90 sm:text-2xl"
            style={{ animationDelay: '160ms' }}
          >
            <span className="text-gradient font-medium">{tl(profile.pitch)}</span>
          </p>
          <p className="anim-rise mt-4 max-w-xl text-muted" style={{ animationDelay: '240ms' }}>
            {tl(profile.summary)}
          </p>
          <p
            className="anim-rise mt-6 font-mono text-xs text-muted sm:text-sm"
            style={{ animationDelay: '300ms' }}
          >
            {profile.stackLine}
          </p>
          <div className="anim-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
            <a
              href="#journey"
              className="rounded-xl bg-fg px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t('hero.ctaStory')}
            </a>
            <a
              href="#projects"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-cyan"
            >
              {t('hero.ctaProjects')}
            </a>
          </div>
        </div>

        <div className="anim-rise order-1 mx-auto w-52 sm:w-64 md:order-2 md:w-full md:max-w-[340px]" style={{ animationDelay: '120ms' }}>
          {/* No frame: the photo fades softly into the page */}
          <img
            src={photo}
            alt={t('hero.photoAlt')}
            width={640}
            height={640}
            fetchPriority="high"
            className="aspect-square w-full object-cover"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          />
        </div>
      </div>

      <a
        href="#journey"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:flex"
      >
        {t('hero.scroll')}
        <span className="block h-8 w-px bg-gradient-to-b from-muted to-transparent" />
      </a>
    </section>
  )
}
