import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import { LANGS } from '../../content/types'

export function LangToggle() {
  const { lang, switchTo } = useLang()
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className="flex rounded-lg border border-border bg-card p-0.5 font-mono text-xs"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => lang !== l && switchTo(l)}
          className={`rounded-md px-2.5 py-1 uppercase transition-colors ${
            lang === l ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
