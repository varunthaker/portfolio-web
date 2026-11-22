import { useEffect, useMemo, type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { getI18n } from './index'
import { LangContext } from './LangContext'
import type { Lang } from '../content/types'

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const i18n = useMemo(() => getI18n(lang), [lang])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={lang}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LangContext.Provider>
  )
}
