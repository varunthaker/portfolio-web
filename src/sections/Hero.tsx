import { useTranslation } from 'react-i18next'
import { useLang } from '../hooks/useLang'
import { profile } from '../content/profile'
import photo from '../assets/avatar.webp'

/** Decorative orbit: a process diagram on one side turning into connected nodes on the other. */
function HeroOrbit() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
      <circle cx="200" cy="200" r="182" fill="none" stroke="var(--border)" strokeDasharray="2 8" />
      <g className="anim-spin" style={{ animationDuration: '60s' }}>
        {/* mini process diagram (amber) */}
        <g transform="translate(14 104)" fill="none" stroke="var(--amber)" strokeWidth="2">
          <rect x="0" y="8" width="22" height="16" rx="4" />
          <path d="M22 16h10" />
          <path d="M44 4L56 16L44 28L32 16Z" />
        </g>
        {/* nodes (cyan) */}
        <g stroke="var(--cyan)" fill="var(--bg)">
          <line x1="364" y1="270" x2="320" y2="345" strokeOpacity="0.5" />
          <line x1="320" y1="345" x2="250" y2="378" strokeOpacity="0.5" />
          <circle cx="364" cy="270" r="9" strokeWidth="2" />
          <circle cx="320" cy="345" r="7" strokeWidth="2" />
          <circle cx="250" cy="378" r="6" strokeWidth="2" />
        </g>
        <text x="300" y="44" fill="var(--violet)" fontFamily="var(--font-mono)" fontSize="16">
          {'{ }'}
        </text>
      </g>
    </svg>
  )
}

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

        <div className="anim-rise order-1 mx-auto w-56 sm:w-72 md:order-2 md:w-full md:max-w-sm" style={{ animationDelay: '120ms' }}>
          <div className="relative aspect-square">
            <HeroOrbit />
            <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-amber to-cyan p-[3px] shadow-[0_0_80px_-20px_var(--cyan)]">
              <div className="size-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#9b85ec,#6a4fcf_70%)]">
                <img
                  src={photo}
                  alt={t('hero.photoAlt')}
                  width={640}
                  height={640}
                  fetchPriority="high"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>
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
