import { createInstance, type i18n as I18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import de from '../locales/de.json'
import type { Lang } from '../content/types'

// Compile-time check: the German file must have exactly the English keys.
type DeepKeys<T> = { [K in keyof T]: T[K] extends object ? DeepKeys<T[K]> : string }
const _deMatchesEn: DeepKeys<typeof en> = de
void _deMatchesEn

const instances = new Map<Lang, I18n>()

/** One synchronous, pre-initialised i18next instance per language (SSR-safe). */
export function getI18n(lang: Lang): I18n {
  const existing = instances.get(lang)
  if (existing) return existing
  const instance = createInstance()
  instance.use(initReactI18next).init({
    lng: lang,
    fallbackLng: 'en',
    resources: { en: { translation: en }, de: { translation: de } },
    interpolation: { escapeValue: false },
    initAsync: false,
  })
  instances.set(lang, instance)
  return instance
}
