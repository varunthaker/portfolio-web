import type { CapabilityId } from './capabilities'
import type { Localized } from './types'

export type ProjectVisualKind = 'waveform' | 'agent' | 'payments' | 'invoice' | 'dashboard'

export type Project = {
  id: string
  title: Localized
  tagline: Localized
  summary: Localized
  bullets: Localized[]
  stack: string[]
  link?: { kind: 'demo' | 'live' | 'code'; href: string }
  visual: ProjectVisualKind
  /** Which "What I build" capabilities this project demonstrates (used as filters). */
  capabilities: CapabilityId[]
}

export const projects: Project[] = [
  {
    id: 'voice-agent',
    visual: 'waveform',
    capabilities: ['rag-voice', 'agents'],
    title: { en: 'Voice Agent with RAG', de: 'Voice Agent mit RAG' },
    tagline: { en: 'Side project', de: 'Eigenes Projekt' },
    summary: {
      en: 'A voice agent that answers customers’ spoken questions in German — using only the documents a business uploads.',
      de: 'Ein Voice Agent, der gesprochene Kundenfragen auf Deutsch beantwortet — ausschließlich auf Basis der Dokumente, die ein Unternehmen hochlädt.',
    },
    bullets: [
      {
        en: 'Real-time pipeline: browser microphone → speech-to-text → document search → LLM → text-to-speech.',
        de: 'Echtzeit-Pipeline: Browser-Mikrofon → Speech-to-Text → Dokumentensuche → LLM → Text-to-Speech.',
      },
      {
        en: 'Answers grounded in uploaded documents (e.g. property exposés), so it doesn’t invent facts.',
        de: 'Antworten basieren auf hochgeladenen Dokumenten (z. B. Immobilien-Exposés) — keine erfundenen Fakten.',
      },
      {
        en: 'Built for German from end to end: German speech recognition, retrieval and voice.',
        de: 'Durchgängig für Deutsch gebaut: deutsche Spracherkennung, Suche und Stimme.',
      },
    ],
    stack: ['Python', 'Deepgram', 'OpenAI', 'ElevenLabs', 'RAG'],
  },
  {
    id: 'warehouse-assistant',
    visual: 'agent',
    capabilities: ['agents', 'mcp', 'rag-voice', 'fullstack'],
    title: { en: 'AI Warehouse Inventory Assistant', de: 'AI Warehouse Inventory Assistant' },
    tagline: { en: 'AI agent with RAG & MCP', de: 'AI-Agent mit RAG & MCP' },
    summary: {
      en: 'An agent that answers warehouse questions by combining live inventory data with procurement policies from PDFs.',
      de: 'Ein Agent, der Lagerfragen beantwortet, indem er Live-Bestandsdaten mit Einkaufsrichtlinien aus PDFs kombiniert.',
    },
    bullets: [
      {
        en: 'RAG pipeline for procurement PDFs: page-based chunking, OpenAI embeddings, pgvector similarity search — answers cite the page.',
        de: 'RAG-Pipeline für Einkaufsrichtlinien: seitenbasiertes Chunking, OpenAI-Embeddings, pgvector-Suche — Antworten mit Seitenangabe.',
      },
      {
        en: 'LangChain agent in FastAPI that combines documents with live stock, supplier and purchase-order data.',
        de: 'LangChain-Agent in FastAPI, der Dokumente mit Live-Daten zu Bestand, Lieferanten und Bestellungen kombiniert.',
      },
      {
        en: 'Tools exposed as an MCP server, so any MCP client can use them.',
        de: 'Tools als MCP-Server bereitgestellt — nutzbar von jedem MCP-Client.',
      },
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'MCP', 'Supabase', 'pgvector'],
    link: { kind: 'demo', href: 'https://www.loom.com/share/f21d63f48e354b8381520db4b74bc8c7' },
  },
  {
    id: 'event-registration',
    visual: 'payments',
    capabilities: ['fullstack'],
    title: { en: 'Event Registration Platform', de: 'Event-Registrierungsplattform' },
    tagline: { en: 'Team lead · side project', de: 'Teamleitung · eigenes Projekt' },
    summary: {
      en: 'A platform where attendees browse event details and register online — with Stripe and PayPal payments.',
      de: 'Eine Plattform, auf der Teilnehmer Event-Details ansehen und sich online registrieren — mit Zahlung über Stripe und PayPal.',
    },
    bullets: [
      {
        en: 'Led a small team from idea to launch.',
        de: 'Leitung eines kleinen Teams von der Idee bis zum Launch.',
      },
      {
        en: 'Stripe and PayPal checkout integrated into the registration flow.',
        de: 'Stripe- und PayPal-Checkout in den Registrierungsprozess integriert.',
      },
      {
        en: 'React frontend, Python backend, Supabase for data and auth; deployed on Vercel and Render with a custom domain.',
        de: 'React-Frontend, Python-Backend, Supabase für Daten und Auth; Deployment auf Vercel und Render mit eigener Domain.',
      },
    ],
    stack: ['React', 'Python', 'Supabase', 'Stripe', 'PayPal', 'Vercel'],
  },
  {
    id: 'rechnung',
    visual: 'invoice',
    capabilities: ['fullstack'],
    title: { en: 'Rechnung — Invoicing App', de: 'Rechnung — Rechnungs-App' },
    tagline: { en: 'Built for a small business', de: 'Für ein kleines Unternehmen gebaut' },
    summary: {
      en: 'A German invoicing web app for a small business: customers, services and invoices with PDF export.',
      de: 'Eine Web-App für Rechnungen für ein kleines Unternehmen: Kunden, Leistungen und Rechnungen mit PDF-Export.',
    },
    bullets: [
      {
        en: 'Draft → finalise workflow: finalised invoices are locked and corrected via Storno, never deleted.',
        de: 'Workflow Entwurf → Finalisieren: finalisierte Rechnungen sind gesperrt und werden per Storno korrigiert, nie gelöscht.',
      },
      {
        en: 'Gap-free invoice numbering per company, finalised PDFs archived automatically.',
        de: 'Lückenlose Rechnungsnummern pro Firma, finalisierte PDFs werden automatisch archiviert.',
      },
      {
        en: 'Multi-tenant security with Postgres row-level security and approval-based access.',
        de: 'Mandantenfähige Sicherheit mit Postgres Row-Level-Security und freigabebasiertem Zugang.',
      },
    ],
    stack: ['React', 'TypeScript', 'MUI', 'Supabase', 'PostgreSQL RLS', 'Vercel'],
  },
  {
    id: 'dashboard-rebuild',
    visual: 'dashboard',
    capabilities: ['fullstack'],
    title: { en: 'Customer Dashboard Rebuild', de: 'Customer-Dashboard-Neuaufbau' },
    tagline: { en: 'Professional work', de: 'Beruflich' },
    summary: {
      en: 'Took ownership of an internal customer dashboard and rebuilt it as a maintainable production codebase.',
      de: 'Verantwortung für ein internes Customer-Dashboard übernommen und es als wartbare Production-Codebase neu aufgebaut.',
    },
    bullets: [
      {
        en: 'Redesigned the database schema and restructured junction tables.',
        de: 'Datenbankschema neu gestaltet und Junction-Tabellen restrukturiert.',
      },
      {
        en: 'Replaced ad-hoc authentication with a clean auth flow.',
        de: 'Ad-hoc-Authentifizierung durch einen sauberen Auth-Flow ersetzt.',
      },
      {
        en: 'Scoped and prioritised the rebuild directly with leadership, alongside ongoing feature work.',
        de: 'Scoping und Priorisierung direkt mit der Geschäftsführung — parallel zur laufenden Feature-Entwicklung.',
      },
    ],
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Auth'],
  },
]
