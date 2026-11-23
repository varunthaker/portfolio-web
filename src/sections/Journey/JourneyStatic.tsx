import { useTranslation } from 'react-i18next'
import { isSoftwareEra, journey } from '../../content/journey'
import { useLang } from '../../hooks/useLang'
import { ItemIcon } from './ItemIcon'

/** Reduced-motion version: a compact list — time, title, one line. */
export function JourneyStatic() {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  return (
    <ol className="mx-auto grid max-w-3xl gap-3 px-4 sm:px-6">
      {journey.map((chapter, i) => {
        const accent = isSoftwareEra(i) ? 'var(--cyan)' : 'var(--amber)'
        return (
          <li key={chapter.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
            <svg viewBox="-3 -3 36 36" className="size-9 shrink-0" aria-hidden="true">
              <ItemIcon item={chapter.item} color={accent} />
            </svg>
            <div>
              <p className="font-mono text-[11px] tracking-[0.15em]" style={{ color: accent }}>
                {chapter.period.replace('{now}', t('journey.now'))}
              </p>
              <h3 className="font-semibold">{tl(chapter.title)}</h3>
              <p className="text-sm text-muted">{tl(chapter.short)}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
