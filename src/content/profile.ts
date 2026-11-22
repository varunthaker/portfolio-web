import type { Lang, Localized } from './types'

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
  cv: Record<Lang, string>
}

export const profile: Profile = {
  name: 'Varun Thaker',
  title: {
    en: 'Product Engineer · Full-Stack & AI',
    de: 'Product Engineer · Full-Stack & AI',
  },
  pitch: {
    en: 'I turn business processes into software — from Go backends to AI agents.',
    de: 'Ich übersetze Geschäftsprozesse in Software — vom Go-Backend bis zum AI-Agent.',
  },
  summary: {
    en: 'Full-stack engineer with 3+ years in Go, Python and React/TypeScript. I build production web apps end to end and integrate AI directly into the product — with an industrial engineer’s eye for the process behind it.',
    de: 'Full-Stack-Engineer mit über drei Jahren Erfahrung in Go, Python und React/TypeScript. Ich entwickle produktive Webanwendungen von Ende zu Ende und integriere KI direkt ins Produkt — mit dem Blick eines Wirtschaftsingenieurs für den Prozess dahinter.',
  },
  stackLine: 'Go · Python · React/TypeScript · PostgreSQL · AI Agents · MCP',
  emailParts: ['vthakar3', 'gmail.com'],
  linkedin: 'https://www.linkedin.com/in/varun-thaker-0369/',
  github: 'https://github.com/varunthaker',
  location: { en: 'Magdeburg, Germany', de: 'Magdeburg, Deutschland' },
  cv: {
    de: '/cv/Lebenslauf_Varun_Thaker.pdf',
    en: '/cv/Varun_Thaker_CV_EN.pdf',
  },
}
