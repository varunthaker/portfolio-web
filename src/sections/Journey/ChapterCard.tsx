import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import { isSoftwareEra, type Chapter } from '../../content/journey'

type Props = {
  chapter: Chapter
  index: number
  active: boolean
}

export function ChapterCard({ chapter, index, active }: Props) {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const accent = isSoftwareEra(index) ? 'text-cyan' : 'text-amber'
  const ring = isSoftwareEra(index) ? 'border-cyan/40' : 'border-amber/40'
  const period = chapter.period.replace('{now}', t('journey.now'))

  return (
    <article
      aria-current={active ? 'step' : undefined}
      className={`w-full min-w-0 rounded-2xl border bg-card/85 p-6 backdrop-blur-sm transition-all duration-500 sm:p-8 ${
        active ? `${ring} opacity-100 shadow-xl shadow-black/10` : 'border-border opacity-45'
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span className={accent}>
          {t('journey.chapter')} {String(index + 1).padStart(2, '0')}
        </span>{' '}
        · {period}
      </p>
      <h3 className="mt-3 text-2xl font-semibold break-words hyphens-auto sm:text-3xl">{tl(chapter.title)}</h3>
      <p className="mt-1 text-sm text-muted">{tl(chapter.place)}</p>
      <p className="mt-4 leading-relaxed text-fg/90">{tl(chapter.body)}</p>
    </article>
  )
}
