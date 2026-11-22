import { useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LANG_STORAGE_KEY, LangContext } from '../i18n/LangContext'
import type { Lang, Localized } from '../content/types'

export function useLang() {
  const lang = useContext(LangContext)
  const navigate = useNavigate()
  const { hash } = useLocation()

  const t = useCallback((value: Localized) => value[lang], [lang])

  const switchTo = useCallback(
    (next: Lang) => {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next)
      } catch {
        /* storage unavailable — choice just isn't remembered */
      }
      // Same route element stays mounted, so scroll position is preserved.
      navigate(`/${next}/${hash}`, { preventScrollReset: true })
    },
    [navigate, hash],
  )

  return { lang, t, switchTo }
}
