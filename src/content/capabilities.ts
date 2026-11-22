import type { Localized } from './types'

export type CapabilityId = 'fullstack' | 'agents' | 'mcp' | 'rag-voice'

export type Capability = {
  id: CapabilityId
  title: Localized
  body: Localized
  tags: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'fullstack',
    title: { en: 'Full-stack web apps', de: 'Full-Stack-Webanwendungen' },
    body: {
      en: 'Production apps from schema to screen: Python and Go APIs, PostgreSQL, React/TypeScript frontends, auth and payments, deployed with Docker and Kubernetes.',
      de: 'Produktive Apps vom Schema bis zum Screen: Python- und Go-APIs, PostgreSQL, React/TypeScript-Frontends, Auth und Payments, deployt mit Docker und Kubernetes.',
    },
    tags: ['Python', 'React', 'Go', 'PostgreSQL'],
  },
  {
    id: 'agents',
    title: { en: 'AI agents & tool calling', de: 'AI-Agents & Tool Calling' },
    body: {
      en: 'Agents that understand business context and act through tools — with multi-provider model selection and evaluation to pick the right model per agent.',
      de: 'Agents, die Geschäftskontext verstehen und über Tools handeln — mit Multi-Provider-Model-Selection und Evaluation, um pro Agent das passende Modell zu wählen.',
    },
    tags: ['Agno', 'LangChain', 'OpenAI', 'Anthropic', 'Gemini', 'Langfuse'],
  },
  {
    id: 'mcp',
    title: { en: 'MCP servers with secure auth', de: 'MCP-Server mit sicherer Auth' },
    body: {
      en: 'Model Context Protocol servers that give AI agents structured, permission-scoped access to company data and actions — authenticated via OAuth.',
      de: 'Model-Context-Protocol-Server, die AI-Agents strukturierten Zugriff mit klaren Berechtigungen auf Unternehmensdaten und -aktionen geben — authentifiziert per OAuth.',
    },
    tags: ['MCP', 'OAuth 2.1', 'Tool calling'],
  },
  {
    id: 'rag-voice',
    title: { en: 'RAG & voice', de: 'RAG & Voice' },
    body: {
      en: 'Answers grounded in your documents: chunking, embeddings, vector search with citations — and voice interfaces on top.',
      de: 'Antworten auf Basis eigener Dokumente: Chunking, Embeddings, Vektorsuche mit Quellenangaben — und Sprachschnittstellen darüber.',
    },
    tags: ['pgvector', 'Embeddings', 'Speech-to-Text', 'TTS'],
  },
]
