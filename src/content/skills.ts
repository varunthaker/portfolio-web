import type { Localized } from './types'

export type SkillGroup = {
  group: Localized
  /** Shown prominently as chips. Keep to 3–4. */
  core: string[]
  /** Shown as one quiet line. */
  more: string[]
}

// AI first, matching the rest of the site.
export const skills: SkillGroup[] = [
  {
    group: { en: 'AI & LLM', de: 'AI & LLM' },
    core: ['MCP', 'AI agents', 'RAG', 'LLM evaluation'],
    more: ['Tool calling', 'LangChain', 'Agno', 'Langfuse', 'OpenAI / Gemini / Anthropic APIs', 'pgvector'],
  },
  {
    group: { en: 'Backend & Data', de: 'Backend & Daten' },
    core: ['Go', 'Python', 'FastAPI', 'PostgreSQL'],
    more: ['Gin', 'Django', 'Node.js', 'MySQL', 'MongoDB', 'Supabase', 'Domain-Driven Design', 'REST APIs'],
  },
  {
    group: { en: 'Frontend', de: 'Frontend' },
    core: ['React', 'TypeScript', 'Tailwind CSS'],
    more: ['JavaScript', 'Redux', 'Zustand', 'Material UI', 'Fluent UI'],
  },
  {
    group: { en: 'Cloud, DevOps & Auth', de: 'Cloud, DevOps & Auth' },
    core: ['Docker', 'Kubernetes', 'GCP', 'GitHub Actions'],
    more: ['Helm', 'Nginx', 'Vercel', 'Render', 'OAuth', 'JWT', 'Clerk', 'Supabase Auth'],
  },
]

export const dailyTools = ['Claude Code', 'Cursor', 'GitHub Copilot', 'Git', 'GitHub']
