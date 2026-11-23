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
  location: Localized
}

export const profile: Profile = {
  name: 'Varun Thaker',
  title: {
    en: 'Full-Stack & AI Engineer',
    de: 'Full-Stack- & AI-Engineer',
  },
  pitch: {
    en: 'I turn business problems into software that works — with AI where it makes the difference.',
    de: 'Ich mache aus Geschäftsproblemen Software, die funktioniert — mit KI dort, wo sie den Unterschied macht.',
  },
  summary: {
    en: 'Full-stack engineer with 3+ years in Python and React/TypeScript, plus Go — and a background in industrial engineering.',
    de: 'Full-Stack-Engineer mit über drei Jahren Erfahrung in Python und React/TypeScript, dazu Go — mit Hintergrund im Wirtschaftsingenieurwesen.',
  },
  stackLine: 'Python · React/TypeScript · Go · PostgreSQL · AI Agents · MCP · RAG',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  location: { en: 'Germany', de: 'Deutschland' },
}
