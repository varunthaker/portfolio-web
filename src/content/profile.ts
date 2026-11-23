import type { Localized } from './types'

export type Profile = {
  name: string
  title: Localized
  pitch: Localized
  summary: Localized
  stackLine: string
  /** Split so the address is not in the HTML as plain text; joined on click. */
  emailParts: readonly [user: string, domain: string]
  linkedin: string
  github: string
  xing: string
  location: Localized
}

export const profile: Profile = {
  name: 'Varun Thaker',
  title: {
    en: 'Full-Stack & AI Engineer',
    de: 'Full-Stack- & AI-Engineer',
  },
  pitch: {
    en: 'I turn business problems into working products, powered by AI.',
    de: 'Ich verwandle Geschäftsprobleme in funktionierende, KI-gestützte Produkte.',
  },
  summary: {
    en: '3+ years with Python, React/TypeScript and Go. Industrial engineer by background — I start with the problem, understand the process behind it, then build the product.',
    de: 'Über drei Jahre mit Python, React/TypeScript und Go. Wirtschaftsingenieur von Hause aus — ich starte beim Problem, verstehe den Prozess dahinter und baue dann das Produkt.',
  },
  stackLine: 'Python · React/TypeScript · Go · PostgreSQL · AI Agents · MCP · RAG',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  xing: 'https://www.xing.com/profile/Varun_Thaker',
  location: { en: 'Germany', de: 'Deutschland' },
}
