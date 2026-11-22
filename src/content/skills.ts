import type { Localized } from './types'

export type SkillGroup = {
  group: Localized
  /** Shown prominently as chips. Keep to 3–4. */
  core: string[]
  /** Shown as one quiet line. */
  more: string[]
}

// Full-stack first (Python and React are the strongest, Go since ~1 year), then AI.
export const skills: SkillGroup[] = [
  {
    group: { en: 'Backend & Data', de: 'Backend & Daten' },
    core: ['Python', 'FastAPI', 'Go', 'PostgreSQL'],
    more: ['Gin', 'Django', 'Node.js', 'MySQL', 'MongoDB', 'Supabase', 'Domain-Driven Design', 'REST APIs'],
  },
  {
    group: { en: 'Frontend', de: 'Frontend' },
    core: ['React', 'TypeScript', 'Tailwind CSS'],
    more: ['JavaScript', 'Redux', 'Zustand', 'Material UI', 'Fluent UI'],
  },
  {
    group: { en: 'AI & LLM', de: 'AI & LLM' },
    core: ['MCP', 'AI agents', 'RAG', 'LLM evaluation'],
    more: ['Tool calling', 'LangChain', 'Agno', 'Langfuse', 'OpenAI / Gemini / Anthropic APIs', 'pgvector'],
  },
  {
    group: { en: 'Cloud, DevOps & Auth', de: 'Cloud, DevOps & Auth' },
    core: ['Docker', 'Kubernetes', 'GCP', 'GitHub Actions'],
    more: ['Helm', 'Nginx', 'Vercel', 'Render', 'OAuth', 'JWT', 'Clerk', 'Supabase Auth'],
  },
]

export const dailyTools = ['Claude Code', 'Cursor', 'GitHub Copilot', 'Git', 'GitHub']
