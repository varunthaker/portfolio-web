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
    en: 'I turn business problems into working products, powered by AI.',
    de: 'Ich verwandle Geschäftsprobleme in funktionierende, KI-gestützte Produkte.',
  },
  summary: {
    en: '3+ years with Python and React/TypeScript, plus Go. With a background in industrial engineering, I understand the process first — then ship production apps end to end, adding AI where it actually helps: agents, MCP servers, RAG.',
    de: 'Über drei Jahre Erfahrung mit Python und React/TypeScript, dazu Go. Mit meinem Hintergrund im Wirtschaftsingenieurwesen verstehe ich zuerst den Prozess — und entwickle dann produktive Anwendungen von Ende zu Ende, mit KI dort, wo sie wirklich hilft: Agents, MCP-Server, RAG.',
  },
  stackLine: 'Python · React/TypeScript · Go · PostgreSQL · AI Agents · MCP · RAG',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  location: { en: 'Germany', de: 'Deutschland' },
}
