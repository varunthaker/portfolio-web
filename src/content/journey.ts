import type { Localized } from './types'

/** Which outfit the journey character wears in this phase. */
export type Look = 'engineer' | 'student' | 'planner' | 'automator' | 'learner' | 'developer' | 'ai'

export type Chapter = {
  id: string
  /** `{now}` is replaced with the localized word for "today". */
  period: string
  look: Look
  title: Localized
  /** One short line — keep it under ~60 characters. */
  line: Localized
}

export const journey: Chapter[] = [
  {
    id: 'mechanical',
    period: '2012 – 2016',
    look: 'engineer',
    title: { en: 'Mechanical Engineer', de: 'Maschinenbauer' },
    line: { en: 'How systems fit together', de: 'Wie Systeme zusammenspielen' },
  },
  {
    id: 'industrial',
    period: '2019 – 2022',
    look: 'student',
    title: { en: 'Industrial Engineering', de: 'Wirtschaftsingenieurwesen' },
    line: { en: 'TU Berlin · from steps to whole processes', de: 'TU Berlin · vom Schritt zum ganzen Prozess' },
  },
  {
    id: 'supply-chain',
    period: '2021',
    look: 'planner',
    title: { en: 'Supply Chain', de: 'Supply Chain' },
    line: { en: 'Processes in spreadsheets & KPIs', de: 'Prozesse in Tabellen & KPIs' },
  },
  {
    id: 'reporting',
    period: '2022 – 2023',
    look: 'automator',
    title: { en: 'First lines of code', de: 'Erste Zeilen Code' },
    line: { en: 'VBA macros that ran by themselves', de: 'VBA-Makros, die von selbst liefen' },
  },
  {
    id: 'switch',
    period: '2022 – 2023',
    look: 'learner',
    title: { en: 'Switching tracks', de: 'Der Quereinstieg' },
    line: { en: 'Self-study + full-stack bootcamp', de: 'Selbststudium + Fullstack-Bootcamp' },
  },
  {
    id: 'platform',
    period: '2024 – {now}',
    look: 'developer',
    title: { en: 'Full-Stack Engineer', de: 'Fullstack Engineer' },
    line: { en: 'Go, React & PostgreSQL on a B2B platform', de: 'Go, React & PostgreSQL auf einer B2B-Plattform' },
  },
  {
    id: 'ai',
    period: '2024 – {now}',
    look: 'ai',
    title: { en: 'AI agents & MCP', de: 'AI-Agents & MCP' },
    line: { en: 'Agents that improve business processes', de: 'Agents, die Geschäftsprozesse verbessern' },
  },
]

export const journeyOutro: Localized = {
  en: 'Same mindset: processes → systems. New tools.',
  de: 'Gleiche Denkweise: Prozesse → Systeme. Neue Werkzeuge.',
}

/** Phases 1–4 are the "process" era (amber), 5–7 the "software" era (cyan). */
export const isSoftwareEra = (index: number) => index >= 4
