# Portfolio Website — Design

Date: 2026-11-22
Owner: Varun Thaker
Location: `Desktop/Projects/portfolio`

## Intent

A personal portfolio site, linked from Varun's LinkedIn profile, that shows **what he can do** as a full-stack / product engineer. Its centrepiece is his career told as a scroll-driven story: from Mechanical and Industrial Engineering into software and AI. It is bilingual (German and English).

**Why:** to have a polished, memorable place that people who come from LinkedIn (recruiters, engineers, possible collaborators or clients) can visit to understand his range. He is **not** actively job hunting and is quietly exploring project work and business ideas. The site must never signal either.

## Goals

- People understand in under 10 seconds: full-stack engineer (Go, Python, React/TypeScript) who builds AI features into products and who comes from an industrial-engineering background.
- A creative, original, scroll-driven "Factory → Code" story that people remember.
- Projects presented as real things built for real users, which implicitly shows he can deliver.
- Full German and English versions with a language toggle.
- Fast and smooth on mobile, since most LinkedIn traffic is mobile.

## Non-goals (for v1)

- 3D (React Three Fiber). It may come later; the architecture should let a 3D hero/scene be swapped in without a rewrite.
- Blog, CMS, backend or database. Content lives in typed files in the repo.
- Contact form with a server. Contact is via links (see below).

## Anti-goals: these make it a failure even if it works

- Any "open to work", "hire me", "available for freelance", pricing, services list or "business inquiry" wording. His current employer (aiio GmbH) must see nothing more than an engineer's portfolio.
- Disparaging or confidential detail about aiio. Describe work at the level of the CV and do not mention internal names, metrics or customers. Do not describe the Customer Dashboard as having been "vibe coded" on the public site; call it a "rebuild into a maintainable production codebase".
- Publishing the phone number.
- Heavy, janky animation: scroll jank, layout shift, or anything that ignores `prefers-reduced-motion`.
- Generic template look (the usual hero + skills bars + card grid).

## Audience & tone

Polished, confident, slightly playful in the visuals; the copy stays understated and factual. Lead with ability ("I build…"), never availability.

## Approaches considered (story animation)

| | Approach | Trade-off |
|---|---|---|
| **A (chosen)** | **Factory → Code**: a scroll-driven scene where a production line morphs into a software pipeline | Original and tied to his own story; light enough for mobile; moderate build effort |
| B | Career as a git history (branches merging into `main`) | Clever for developers, but less visual and less personal |
| C | 3D world (React Three Fiber) | Impressive, but heavy on mobile and much more effort. Deferred as a possible later upgrade |

Varun picked **A**, with 3D possibly later.

## Tech stack (Claude's call, not objected to)

- Vite + React + TypeScript (strict)
- Tailwind CSS
- Motion (`motion/react`, formerly Framer Motion) for scroll-linked and enter animations (`useScroll`, `useTransform`, `whileInView`)
- Animated scenes as **inline SVG React components** whose parts are driven by scroll progress (no Lottie, no canvas in v1)
- `react-i18next` for DE/EN
- Hosting on Vercel (he already uses it)
- No tests (his preference for his sites). Verify through `tsc`, ESLint, `vite build`, and screenshots at mobile and desktop widths.

React practices: small function components, content separated from presentation (`src/content/*`), typed content models, custom hooks for scroll logic, lazy-loading of heavy sections, semantic HTML, accessible focus states.

## Site structure (single page, anchor nav)

1. **Hero.** Name, the title "Product Engineer / Full-Stack Engineer", and a one-line pitch: *"I turn business processes into software — from Go backends to AI agents."* (DE: *"Ich übersetze Geschäftsprozesse in Software — vom Go-Backend bis zum AI-Agent."*). A subtle animated background hint of gears turning into nodes. A scroll cue. Language toggle and nav sit top right.
2. **The Journey: Factory → Code** (the centrepiece, see below).
3. **What I build.** Three or four capability blocks, each with a small looping micro-animation:
   - Full-stack web apps (Go, Python, React/TS, PostgreSQL)
   - AI agents & tool calling. Animation: an agent node calling tools in sequence
   - **MCP servers.** Animation: a central MCP hub with client nodes (Claude, IDE, app) and tool/data nodes, with pulses travelling along the connections
   - RAG & voice. Animation: a waveform turning into text, then documents, then an answer
4. **Projects.** A card grid that opens into a detail view (modal or expandable): problem → what I built → stack.
5. **Skills / toolbox.** Grouped badges as in the CV (Languages & Frameworks, Databases, AI & LLM, Deployment, …). No percentage bars.
6. **Contact.** "Let's talk" with email (obfuscated mailto), LinkedIn (`https://www.linkedin.com/in/varun-thaker-0369/`) and GitHub (`https://github.com/varunthaker`). Neutral wording only.
7. Footer: © year, language toggle, and a short line saying it was built with React.

## The Journey: chapter script

A sticky scene on the left (desktop) or top (mobile) morphs as the user scrolls; the chapter text scrolls past alongside it. Each chapter maps to a stretch of scroll progress.

| # | Period | Chapter | Scene state |
|---|---|---|---|
| 1 | 2012–2016 | B.Tech Mechanical Engineering, Mumbai | Gears, a lathe/machine silhouette, a blueprint grid |
| 2 | 2019–2022 | Industrial Engineering, TU Berlin: supply chain, lean, quality, project management | A conveyor belt carrying boxes; a KPI gauge appears |
| 3 | 2021 | Working student, Supply Chain (Deutsche Energie System): Excel tool for demand-driven material management | Boxes on the belt turn into spreadsheet cells |
| 4 | 2022–2023 | Working student, Project Reporting (STRABAG PFS): reporting automated with VBA | Cells start "executing": first code glyphs `{ }` appear. **The turning point** |
| 5 | 2022–2023 | Self-taught JS/React, then Spiced Academy Berlin (Fullstack) | Factory outline dissolves; gears become circular API nodes; the belt becomes a data-pipeline line |
| 6 | 2024–now | Fullstack Engineer, aiio GmbH: Go + DDD, Django→Go/PostgreSQL migration | Pipeline of services (Go gopher-neutral service boxes, DB cylinder) with requests flowing |
| 7 | 2024–now | AI at aiio: Agno agents, MCP servers, PDF-to-process extraction, multi-provider models, LLM evaluation | Nodes light up as AI agents; an MCP hub connects them; tokens flow. End state: a glowing connected system |

**2016–2019 (Claude's call, open for Varun to change):** the story goes straight from chapter 1 to chapter 2. Chapter labels show their periods but there's no continuous year axis, so the gap doesn't stand out. A chapter can be added later without restructuring, because chapters are data in `src/content/journey.ts`.

The final scene holds briefly, then the text "Same mindset: processes → systems. New tools." leads into "What I build".

Use the timeline dates from the CV. **Source of truth:** `Desktop/Application/Lebenslauf_Varun_Thaker.pdf` (the file Varun provided). Photo: for now, extract it from that PDF. Varun will supply a better one later, so keep it as a single file (`src/assets/profile.*`) that's easy to swap. **CV download (Varun's decision):** a "Download CV" / "Lebenslauf herunterladen" button that downloads the CV in the language currently selected: `/de/` serves the German CV and `/en/` the English one. Place it quietly in the contact section and footer, not in the hero (Claude's call). Varun will supply both CV files. Until then, use `Lebenslauf_Varun_Thaker.pdf` for DE and leave EN pointing at a placeholder path (`public/cv/Varun_Thaker_CV_EN.pdf`) to be filled in. Visuals are original line-art SVG in the site's palette, with no third-party logos inside the scene.

## Projects (content)

Order: lead with the most impressive and most general, and keep aiio to one item.

1. **Voice Agent with RAG.** Answers spoken customer questions in German using only a business's uploaded documents. Browser mic → Deepgram STT → document search → LLM → ElevenLabs TTS. Python. (Source: `Desktop/Projects/voice-agent`)
2. **AI Warehouse Inventory Assistant.** FastAPI + LangChain agent combining MCP tools (stock, suppliers, purchase orders in Supabase) with RAG over procurement PDFs (pgvector, page-level citations). The tools are exposed as an MCP server usable by any MCP client.
3. **Event Registration Platform.** Led a small team; attendees browse events and register online, with Stripe and PayPal payments. React, Python backend, Supabase (data + auth), Vercel + Render, custom domain.
4. **Rechnung: invoicing app** (built for a friend's small business). Customers, services, invoices with PDF export, Storno, gap-free per-company numbering, locked finalised invoices, archived PDFs. React, MUI, Supabase (Auth, Postgres RLS, Storage), Vercel.
5. **Customer Dashboard Rebuild (aiio).** Took ownership of an internal dashboard and rebuilt it as a maintainable production codebase: new DB schema, a proper auth flow, scoping with leadership.

**Links (from Varun):**
- AI Warehouse Assistant (AI Agent with RAG): a **demo video** on Loom, `https://www.loom.com/share/f21d63f48e354b8381520db4b74bc8c7`. Show a "Watch demo" button that opens it in a new tab (no embedded iframe, so the page stays fast).
- Voice Agent: runs locally only, so **no link**. Use an animated waveform visual instead.
- Rechnung and Event Platform: no links in v1. Describe Rechnung as "an invoicing app for a small business" and don't name the business (Claude's call; easy to change).
- Customer Dashboard (aiio): no link, ever.

Each project gets: title, one-line summary, 2–4 bullets, a stack tag list, and an optional link (demo/live/GitHub) shown only when present.

## MCP block diagram

Varun builds MCP integrations with companies, so the MCP block is a **generic architecture diagram** with no client names. It is animated SVG, shown in "What I build":

```
 MCP Client (Claude / IDE / App)
        │  1. connect
        ▼
 ┌──────────────┐   2. OAuth 2.1 / token   ┌──────────────────┐
 │  MCP Server  │ ◄──────────────────────► │ Auth (IdP/OAuth) │
 │ tools/resour.│                          └──────────────────┘
 └──────┬───────┘
        │ 3. scoped tool calls
        ▼
 Business systems: APIs · Database · Documents
```

The animation plays in order: the client connects, an auth handshake pulse runs to the auth server and back (a lock icon turns green), and then tool-call pulses flow to the business systems and results flow back. Captions are in both languages. The message to get across: *secure, permission-scoped access for AI agents to company data.* Screenshots are optional; use a stylised placeholder visual when there's none.

## Bilingual handling

- Translations in `src/locales/{de,en}.json`, plus content files typed so that both languages are required (a missing translation is a type error).
- **Per-language URLs (Claude's call):** `/en/` and `/de/`, each **prerendered to static HTML at build time** with its own `<title>`, meta description, Open Graph tags and `<html lang>`, plus `hreflang` alternates. LinkedIn's crawler doesn't run JS, so this is what makes previews work per language. `/` sends visitors to `/de/` or `/en/` based on the browser language (or a saved choice in `localStorage`). The language toggle switches route. The LinkedIn profile links to `/en/`.
- Site origin comes from one config value (`SITE_URL`), used for canonical and OG URLs. It defaults to the Vercel URL until a custom domain exists.
- German copy is written properly, not machine-literal. Technical terms (MCP, RAG, Agents) stay in English as in the CV.

## Visual direction

- Dark-first theme with a light mode toggle. Base: a near-black blue-grey. Accent 1: a warm "industrial" amber/orange (factory chapters). Accent 2: an electric cyan/violet (software/AI chapters). The story's colour shifts from amber to cyan as it progresses.
- Typography: a geometric sans for headings (e.g. Space Grotesk) and Inter for body text, with a mono font for code accents (e.g. JetBrains Mono).
- A subtle blueprint grid texture in the background ties back to engineering.
- Profile photo: taken from the CV image (purple background), shown in the hero or contact section.

## Performance & accessibility

- Lighthouse ≥ 90 for performance on mobile; animate only transforms and opacity; keep the SVGs lightweight.
- `prefers-reduced-motion`: the story becomes a static, stepped timeline (each chapter shows its final scene state) with no scroll-scrubbing.
- Keyboard navigable, visible focus, colour contrast at AA, meaningful alt text and `aria-hidden` on decorative SVGs.
- SEO / social: title, meta description, Open Graph image and tags per language so the LinkedIn link preview looks good.

## Left to the builder

- Exact component breakdown, file layout and animation timing curves
- The exact SVG artwork for each scene state, following the chapter table and palette
- The final English and German copy beyond what is given here, matching the tone rules above
- Modal vs. expandable project details
