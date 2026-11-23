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
    en: 'I build full-stack web apps — and the AI agents inside them.',
    de: 'Ich baue Full-Stack-Webanwendungen — und die AI-Agents darin.',
  },
  summary: {
    en: '3+ years with Python and React/TypeScript, Go for the past year. I ship production apps end to end — database, API, interface — and add AI where it actually helps: agents, MCP servers, RAG. Trained as an industrial engineer, I understand the process first, then write the code.',
    de: 'Über drei Jahre Erfahrung mit Python und React/TypeScript, seit einem Jahr auch Go. Ich entwickle produktive Anwendungen von Ende zu Ende — Datenbank, API, Oberfläche — und setze KI dort ein, wo sie wirklich hilft: Agents, MCP-Server, RAG. Als Wirtschaftsingenieur verstehe ich zuerst den Prozess, dann schreibe ich den Code.',
  },
  stackLine: 'Python · React/TypeScript · Go · PostgreSQL · AI Agents · MCP · RAG',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  location: { en: 'Germany', de: 'Deutschland' },
}
