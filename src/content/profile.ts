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
    en: 'Product Engineer · Full-Stack & AI',
    de: 'Product Engineer · Full-Stack & AI',
  },
  pitch: {
    en: 'I turn business processes into software — from first idea to production, with AI built in.',
    de: 'Ich übersetze Geschäftsprozesse in Software — von der ersten Idee bis zur Produktion, mit KI als festem Bestandteil.',
  },
  summary: {
    en: 'Full-stack engineer with 3+ years in React/TypeScript, Python and Go. I build production web apps end to end and integrate AI directly into the product — with an industrial engineer’s eye for the process behind it.',
    de: 'Full-Stack-Engineer mit über drei Jahren Erfahrung in React/TypeScript, Python und Go. Ich entwickle produktive Webanwendungen von Ende zu Ende und integriere KI direkt ins Produkt — mit dem Blick eines Wirtschaftsingenieurs für den Prozess dahinter.',
  },
  stackLine: 'MCP · AI Agents · RAG · React/TypeScript · Python · Go · PostgreSQL',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  location: { en: 'Germany', de: 'Deutschland' },
}
