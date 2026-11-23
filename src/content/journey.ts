import type { Localized } from './types'

export type SceneState = 'process' | 'kpis' | 'cells' | 'vba' | 'dissolve' | 'services' | 'agents'

export type Chapter = {
  id: string
  /** `{now}` is replaced with the localized word for "today". */
  period: string
  title: Localized
  place: Localized
  body: Localized
  scene: SceneState
}

export const journey: Chapter[] = [
  {
    id: 'mechanical',
    period: '2012 – 2016',
    scene: 'process',
    title: { en: 'Mechanical Engineering', de: 'Maschinenbau' },
    place: { en: 'B.Tech · University of Mumbai, India', de: 'B.Tech · University of Mumbai, Indien' },
    body: {
      en: 'Engineering degree in Mumbai — learning to think in systems.',
      de: 'Ingenieurstudium in Mumbai — Denken in Systemen gelernt.',
    },
  },
  {
    id: 'industrial',
    period: '2019 – 2022',
    scene: 'kpis',
    title: { en: 'Industrial Engineering', de: 'Wirtschaftsingenieurwesen' },
    place: { en: 'Technische Universität Berlin', de: 'Technische Universität Berlin' },
    body: {
      en: 'Supply chain, lean and business processes at TU Berlin.',
      de: 'Supply Chain, Lean und Geschäftsprozesse an der TU Berlin.',
    },
  },
  {
    id: 'supply-chain',
    period: '2021',
    scene: 'cells',
    title: { en: 'Supply Chain, in spreadsheets', de: 'Supply Chain, in Tabellen' },
    place: {
      en: 'Working student · Energy-systems company',
      de: 'Werkstudent · Energietechnik-Unternehmen',
    },
    body: {
      en: 'Built Excel tools for material management and KPI tracking.',
      de: 'Excel-Tools für Materialmanagement und KPI-Tracking gebaut.',
    },
  },
  {
    id: 'switch',
    period: '2022 – 2023',
    scene: 'dissolve',
    title: { en: 'Switching tracks', de: 'Der Quereinstieg' },
    place: {
      en: 'Self-study · Spiced Academy Berlin (Full-Stack Web Development)',
      de: 'Selbststudium · Spiced Academy Berlin (Fullstack Web Development)',
    },
    body: {
      en: 'Self-study and a full-stack bootcamp — from spreadsheets to real apps.',
      de: 'Selbststudium und Fullstack-Bootcamp — von Tabellen zu echten Apps.',
    },
  },
  {
    id: 'platform',
    period: '2024 – {now}',
    scene: 'services',
    title: { en: 'Full-Stack Engineer', de: 'Fullstack Engineer' },
    place: { en: 'B2B SaaS · business-process platform', de: 'B2B-SaaS · Plattform für Geschäftsprozesse' },
    body: {
      en: 'Python, React and Go on a B2B business-process platform.',
      de: 'Python, React und Go auf einer B2B-Plattform für Geschäftsprozesse.',
    },
  },
  {
    id: 'ai',
    period: '2024 – {now}',
    scene: 'agents',
    title: { en: 'AI agents & MCP', de: 'AI-Agents & MCP' },
    place: { en: 'B2B SaaS · business-process platform', de: 'B2B-SaaS · Plattform für Geschäftsprozesse' },
    body: {
      en: 'AI agents, MCP servers and LLM evaluation in production.',
      de: 'AI-Agents, MCP-Server und LLM-Evaluation im produktiven Einsatz.',
    },
  },
]

/** Chapters 1–3 are the "process" era (amber), 4–6 the "software" era (cyan). */
export const isSoftwareEra = (index: number) => index >= 3
