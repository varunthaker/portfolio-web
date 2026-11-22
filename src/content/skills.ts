import type { Localized } from './types'

export type SkillGroup = { group: Localized; items: string[] }

export const skills: SkillGroup[] = [
  {
    group: { en: 'Languages & Frameworks', de: 'Sprachen & Frameworks' },
    items: ['Go', 'Gin', 'Python', 'FastAPI', 'Django', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
  },
  {
    group: { en: 'AI & LLM', de: 'AI & LLM' },
    items: ['MCP', 'AI agents & tool calling', 'RAG', 'LangChain', 'Agno', 'LLM evaluation', 'Langfuse', 'OpenAI / Gemini / Anthropic APIs'],
  },
  {
    group: { en: 'Databases', de: 'Datenbanken' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'pgvector'],
  },
  {
    group: { en: 'Architecture', de: 'Architektur' },
    items: ['Domain-Driven Design', 'REST APIs'],
  },
  {
    group: { en: 'Deployment', de: 'Deployment' },
    items: ['Docker', 'Kubernetes', 'Helm', 'GCP', 'GitHub Actions', 'Nginx', 'Vercel', 'Render'],
  },
  {
    group: { en: 'Auth & Security', de: 'Auth & Security' },
    items: ['OAuth', 'JWT', 'Clerk', 'Supabase Auth'],
  },
  {
    group: { en: 'Frontend', de: 'Frontend' },
    items: ['Redux', 'Zustand', 'Material UI', 'Fluent UI', 'Tailwind CSS'],
  },
  {
    group: { en: 'Developer tools', de: 'Developer Tools' },
    items: ['Git', 'GitHub', 'Claude Code', 'Cursor', 'GitHub Copilot'],
  },
]
