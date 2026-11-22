export const LANGS = ['en', 'de'] as const
export type Lang = (typeof LANGS)[number]

/** Every user-facing content string must exist in both languages. */
export type Localized = Record<Lang, string>

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value)
