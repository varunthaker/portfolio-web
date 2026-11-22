import { useTranslation } from 'react-i18next'
import { Section } from '../components/ui/Section'
import { profile } from '../content/profile'
import { useLang } from '../hooks/useLang'

const linkClass =
  'inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-cyan'

export function Contact() {
  const { t } = useTranslation()
  const { lang } = useLang()

  const openMail = () => {
    const [user, domain] = profile.emailParts
    window.location.href = `mailto:${user}@${domain}`
  }

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl"
        />
        <p className="relative mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan">{t('contact.kicker')}</p>
        <h2 className="relative text-4xl font-semibold sm:text-6xl">
          <span className="text-gradient">{t('contact.heading')}</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted">{t('contact.body')}</p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={openMail} className={`${linkClass} border-transparent bg-fg text-bg hover:border-transparent`}>
            {t('contact.email')}
          </button>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub ↗
          </a>
          <a href={profile.cv[lang]} download className={linkClass}>
            {t('contact.cv')} ↓
          </a>
        </div>
      </div>
    </Section>
  )
}
