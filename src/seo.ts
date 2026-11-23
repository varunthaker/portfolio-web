import type { Lang } from './content/types'

/** Public origin, used for canonical and Open Graph URLs. Set VITE_SITE_URL once a custom domain exists. */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL ?? 'https://varun-thaker.vercel.app').replace(/\/$/, '')

export type SeoEntry = { title: string; description: string; ogImage: string; locale: string }

export const seo: Record<Lang, SeoEntry> = {
  en: {
    title: 'Varun Thaker — Full-Stack & AI Engineer',
    description:
      'Full-stack engineer (Python, React/TypeScript, Go) building production web apps and the AI agents inside them — MCP servers, RAG and LLM evaluation.',
    ogImage: '/og-en.png',
    locale: 'en_US',
  },
  de: {
    title: 'Varun Thaker — Full-Stack- & AI-Engineer',
    description:
      'Full-Stack-Engineer (Python, React/TypeScript, Go): produktive Webanwendungen und die AI-Agents darin — MCP-Server, RAG und LLM-Evaluation.',
    ogImage: '/og-de.png',
    locale: 'de_DE',
  },
}
