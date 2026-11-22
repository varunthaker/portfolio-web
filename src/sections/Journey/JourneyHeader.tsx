import { useTranslation } from 'react-i18next'

export function JourneyHeader({ id }: { id?: string }) {
  const { t } = useTranslation()
  return (
    <header className="max-w-2xl">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-amber">{t('journey.kicker')}</p>
      <h2 id={id} className="text-3xl font-semibold sm:text-5xl">
        {t('journey.heading')}
      </h2>
      <p className="mt-3 hidden text-lg text-muted sm:block">{t('journey.intro')}</p>
    </header>
  )
}
