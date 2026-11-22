import type { Lang } from './content/types'

/** Public origin, used for canonical and Open Graph URLs. Set VITE_SITE_URL once a custom domain exists. */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL ?? 'https://varun-thaker.vercel.app').replace(/\/$/, '')

export type SeoEntry = { title: string; description: string; ogImage: string; locale: string }

export const seo: Record<Lang, SeoEntry> = {
  en: {
    title: 'Varun Thaker — Full-Stack & AI Engineer',
    description:
      'From industrial engineering to software: I build full-stack products with Python, React and Go, and bring AI agents, RAG and MCP into real applications.',
    ogImage: '/og-en.png',
    locale: 'en_US',
  },
  de: {
    title: 'Varun Thaker — Full-Stack- & AI-Engineer',
    description:
      'Vom Wirtschaftsingenieurwesen zur Software: Ich entwickle Full-Stack-Produkte mit Python, React und Go und bringe AI-Agents, RAG und MCP in echte Anwendungen.',
    ogImage: '/og-de.png',
    locale: 'de_DE',
  },
}
