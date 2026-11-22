# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A bilingual (DE/EN) single-page portfolio for Varun Thaker, with a scroll-driven "Factory → Code" career story, animated capability blocks (including an MCP + Auth diagram), projects, skills, and contact with a language-aware CV download.

**Architecture:** Vite + React + TS SPA with two routes (`/en/`, `/de/`), each prerendered at build time to static HTML with its own meta/OG tags. Content lives in typed bilingual files under `src/content/`. Animations are inline SVG components driven by Motion's `useScroll`/`useTransform`.

**Tech Stack:** Vite 6, React 19, TypeScript (strict), Tailwind CSS v4, `motion` (motion/react), `react-i18next` + `i18next`, `react-router-dom` v7, Vercel.

**Spec:** `docs/superpowers/specs/2026-11-22-portfolio-design.md`

## Global Constraints

- **No tests and no test dependencies.** Verify each task with `npm run typecheck`, `npm run lint`, `npm run build`, and Playwright screenshots (run via `npx playwright` from the scratchpad, not installed in the project) at 390×844 and 1440×900.
- Copy must never say "open to work", "hire me", "freelance", "available", pricing, or "services". Run the copy guard (Task 9) before finishing.
- Never publish the phone number. Never name aiio customers or internal metrics, and never use "vibe coding" publicly.
- Animate only `transform` and `opacity`. Every animated component honours `useReducedMotion()`.
- Both languages are required for every content string: type `Localized = { en: string; de: string }`.
- Colours are tokens in `src/styles/index.css` (`--bg`, `--fg`, `--muted`, `--amber`, `--cyan`, `--violet`, `--card`, `--border`). Dark is the default; light is set via `[data-theme="light"]`.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code), loaded from Google Fonts.
- Links: LinkedIn `https://www.linkedin.com/in/varun-thaker-0369/`, GitHub `https://github.com/varunthaker`, Loom demo `https://www.loom.com/share/f21d63f48e354b8381520db4b74bc8c7`.
- `SITE_URL` comes from `import.meta.env.VITE_SITE_URL`, falling back to `https://varun-thaker.vercel.app`.

## Review Focus

1. **Deep link to `/de/` on Vercel and LinkedIn previews.** The prerendered `dist/de/index.html` must contain the German `<title>`, `og:*` and `lang="de"` with no JS. Owned by Task 8: check by grepping the built HTML.
2. **Reduced motion.** With `prefers-reduced-motion: reduce`, the Journey shows all chapters as a stepped static list and nothing is scroll-scrubbed. Owned by Task 4: take a screenshot with an emulated reduced-motion setting.
3. **Narrow phones (360px).** No horizontal scroll, and the sticky scene doesn't cover the chapter text. Owned by Tasks 4 and 9: check `document.documentElement.scrollWidth <= innerWidth` in Playwright.
4. **The language toggle keeps scroll position and section.** Switching DE↔EN navigates to the matching route and keeps the hash and scroll position. Owned by Task 2.
5. **The EN CV file is still missing.** The button links to `/cv/Varun_Thaker_CV_EN.pdf`. Until the real file exists, the build copies the DE CV as a placeholder so the link isn't a 404. Owned by Task 7.

---

### Task 1: Scaffold, theme tokens, fonts, layout shell

**Files:**
- Create: the project via `npm create vite@latest . -- --template react-ts` in `Desktop/Projects/portfolio`, plus `git init`
- Create: `src/styles/index.css`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/ThemeToggle.tsx`, `src/hooks/useTheme.ts`, `src/components/ui/Section.tsx`, `src/components/ui/BlueprintGrid.tsx`
- Modify: `package.json` scripts: `"typecheck": "tsc -b --noEmit"`, `"lint": "eslint ."`

**Interfaces:**
- Produces: `useTheme(): { theme: 'dark' | 'light'; toggle(): void }` (persists to `localStorage` key `theme`, wrapped in try/catch). `<Section id: string; title?: string; children>` renders `<section id>` with consistent padding and `max-w-6xl` and a 16px mobile gutter. `<BlueprintGrid />` is a fixed, decorative, `aria-hidden` background.

- [ ] Step 1: Scaffold, then install `tailwindcss @tailwindcss/vite motion react-router-dom i18next react-i18next`.
- [ ] Step 2: Define the tokens and the dark/light themes in `index.css`, and add the Google Fonts links in `index.html`.
- [ ] Step 3: Build the Header (name, anchor nav: Journey · Build · Projects · Skills · Contact, a language toggle slot, ThemeToggle) and the Footer.
- [ ] Step 4: Run `npm run typecheck && npm run lint && npm run build`. All three should pass.
- [ ] Step 5: Commit: `feat: scaffold portfolio shell with theme tokens`.

### Task 2: i18n and per-language routing

**Files:**
- Create: `src/i18n/index.ts`, `src/locales/en.json`, `src/locales/de.json`, `src/hooks/useLang.ts`, `src/components/layout/LangToggle.tsx`, `src/routes.tsx`, `src/content/types.ts`
- Modify: `src/main.tsx`, `src/App.tsx`

**Interfaces:**
- Produces: `type Lang = 'en' | 'de'`, `type Localized = Record<Lang, string>`, and `useLang(): { lang: Lang; t: (l: Localized) => string; switchTo(l: Lang): void }`. Routes: `/en/*` and `/de/*` render `<HomePage />`. `/` resolves from the saved `localStorage.lang`, else `navigator.language.startsWith('de') ? 'de' : 'en'`, then redirects. Unknown paths go to `/en/`.
- `switchTo` navigates to `/${l}/` + the current hash, keeps `scrollY`, and saves the choice. A `useEffect` keeps `document.documentElement.lang` in sync.
- UI chrome strings (nav, buttons) go in the JSON files. Long content uses `Localized` in `src/content/*`.

- [ ] Step 1: Implement the above.
- [ ] Step 2: Run typecheck, lint and build. In `npm run dev`, visit `/`, `/de/` and `/en/#projects`, toggle the language, and confirm the hash and scroll position are kept (Review Focus 4).
- [ ] Step 3: Commit: `feat: add DE/EN routing and i18n`.

### Task 3: Content files (single source of truth)

**Files:**
- Create: `src/content/profile.ts`, `src/content/journey.ts`, `src/content/projects.ts`, `src/content/capabilities.ts`, `src/content/skills.ts`
- Create: `src/assets/profile.png`, extracted from `Desktop/Application/Lebenslauf_Varun_Thaker.pdf` (use `pdfimages -png` from the scratchpad, or crop a `pdftoppm` render to a 512px square)

**Interfaces:**
- Produces:
  - `profile: { name: string; title: Localized; pitch: Localized; email: string; linkedin: string; github: string; cv: Record<Lang, string> }` where `cv = { de: '/cv/Lebenslauf_Varun_Thaker.pdf', en: '/cv/Varun_Thaker_CV_EN.pdf' }`
  - `type Chapter = { id: string; period: string; title: Localized; place: Localized; body: Localized; scene: SceneState }` and `type SceneState = 'gears' | 'conveyor' | 'cells' | 'vba' | 'dissolve' | 'services' | 'agents'`, with `journey: Chapter[]` (7 chapters, in the order of the spec's table)
  - `type Project = { id: string; title: Localized; summary: Localized; bullets: Localized[]; stack: string[]; link?: { kind: 'demo' | 'live' | 'code'; href: string }; visual: 'waveform' | 'agent' | 'payments' | 'invoice' | 'dashboard' }`, with `projects: Project[]` in the order Voice Agent, Warehouse Assistant (Loom demo link), Event Platform, Rechnung, Customer Dashboard
  - `capabilities: { id: 'fullstack' | 'agents' | 'mcp' | 'rag-voice'; title: Localized; body: Localized }[]`
  - `skills: { group: Localized; items: string[] }[]`, copied from the CV groups
- Hero pitch, EN: "I turn business processes into software — from Go backends to AI agents." DE: "Ich übersetze Geschäftsprozesse in Software — vom Go-Backend bis zum AI-Agent."
- Journey outro, EN: "Same mindset: processes → systems. New tools." DE: "Gleiche Denkweise: Prozesse → Systeme. Neue Werkzeuge."
- Copy is factual and based on the CV and the project READMEs (`Desktop/Projects/voice-agent`, `ai-asist-warehouse`, `Rechnung`). Store the email as `['vthakar3', 'gmail.com']` and join it at click time, so it's obfuscated.

- [ ] Step 1: Write the files.
- [ ] Step 2: Run `npm run typecheck`. It should pass, which proves every string has both `en` and `de`.
- [ ] Step 3: Commit: `feat: add bilingual content`.

### Task 4: Journey: Factory → Code scroll story (centrepiece)

**Files:**
- Create: `src/sections/Journey/Journey.tsx`, `src/sections/Journey/FactoryScene.tsx`, `src/sections/Journey/ChapterCard.tsx`, `src/sections/Journey/JourneyStatic.tsx`, `src/hooks/useChapterProgress.ts`

**Interfaces:**
- Consumes: `journey`, `Chapter` and `SceneState` (Task 3), and `useLang` (Task 2).
- Produces: `<Journey />`. `useChapterProgress(ref, count): { progress: MotionValue<number>; active: number }`, which wraps `useScroll({ target: ref, offset: ['start start', 'end end'] })` and gives each chapter an equal share of progress.
- `<FactoryScene progress={MotionValue<number>} />` is one `viewBox="0 0 600 600"` SVG with layered groups: gears, machine, conveyor + boxes, spreadsheet cells, `{ }` glyphs, service nodes + DB cylinder + connecting lines, agent nodes + MCP hub. Each group's opacity, scale and position comes from `useTransform(progress, [chapterStart, chapterEnd], …)`. Gears keep rotating and transform into circular nodes. The scene's accent colour interpolates from `--amber` to `--cyan` across the scroll.
- Layout: the section is `count × 100vh` tall. On desktop the scene is `sticky top-0 h-screen` on the left with cards on the right. On mobile the scene is sticky at the top at 45vh, and the cards scroll beneath with a background behind them so they stay readable.
- If `useReducedMotion()` is true, render `<JourneyStatic />`: a vertical stepped list where each chapter shows a small static scene thumbnail in its final state.
- The outro line comes after the last chapter.

- [ ] Step 1: Implement it.
- [ ] Step 2: Run typecheck, lint and build.
- [ ] Step 3: Use Playwright to take screenshots at 390 and 1440px wide, at scroll positions for chapters 1, 4 and 7, and once with `reducedMotion: 'reduce'`. Check `scrollWidth <= innerWidth` at 360px. Review the images: the scene should visibly progress from factory to network, with no overlapping text (Review Focus 2 and 3).
- [ ] Step 4: Commit: `feat: add Factory to Code journey`.

### Task 5: Hero and "What I build" with micro-animations (including MCP + Auth)

**Files:**
- Create: `src/sections/Hero.tsx`, `src/sections/Capabilities/Capabilities.tsx`, `src/sections/Capabilities/anim/StackAnim.tsx`, `src/sections/Capabilities/anim/AgentAnim.tsx`, `src/sections/Capabilities/anim/McpAuthDiagram.tsx`, `src/sections/Capabilities/anim/VoiceRagAnim.tsx`

**Interfaces:**
- Consumes: `profile`, `capabilities`, `useLang`.
- The Hero contains the name, title and pitch, the photo (`src/assets/profile.png`, round with a gradient ring), a subtle gears-to-nodes background SVG, and a scroll cue.
- `<McpAuthDiagram />` has these nodes: MCP Client ("Claude / IDE / App"), MCP Server ("tools · resources"), Auth ("OAuth 2.1 / IdP"), Business systems ("APIs · Database · Documents"). It loops in sequence while in view (`useInView`): a connect pulse from client to server, a handshake pulse from server to auth and back, the lock icon turning green, three tool-call pulses from server to systems, then results back to the client. Step captions are translated through i18n keys (`mcp.step1`–`mcp.step4`). Under reduced motion it shows the diagram fully lit with numbered steps.
- `AgentAnim` shows an agent node calling three tools one after another. `VoiceRagAnim` shows a waveform, then a text line, then a document stack, then an answer bubble. `StackAnim` shows the React → Go → PostgreSQL layers with a request flowing through.

- [ ] Step 1: Implement it.
- [ ] Step 2: Run typecheck, lint, build, and take screenshots at both widths.
- [ ] Step 3: Commit: `feat: add hero and capability animations`.

### Task 6: Projects and Skills

**Files:**
- Create: `src/sections/Projects/Projects.tsx`, `src/sections/Projects/ProjectCard.tsx`, `src/sections/Projects/ProjectDialog.tsx`, `src/sections/Projects/ProjectVisual.tsx`, `src/sections/Skills.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `skills`, `useLang`.
- Cards show a visual, title, summary and stack tags. Clicking opens `ProjectDialog`, a native `<dialog>` with a focus trap, closed by Esc or a backdrop click. It shows the bullets, the stack, and the link button only when `link` exists (label from i18n: `project.demo` = "Watch demo" / "Demo ansehen"; opens with `target="_blank" rel="noopener noreferrer"`).
- `ProjectVisual` renders a stylised SVG for each `visual` value.
- Skills are grouped badges with no bars.

- [ ] Step 1: Implement it.
- [ ] Step 2: Run typecheck, lint, build, and screenshots. In Playwright, confirm the Warehouse dialog shows the Loom link and the Rechnung dialog shows no link.
- [ ] Step 3: Commit: `feat: add projects and skills`.

### Task 7: Contact and language-aware CV download

**Files:**
- Create: `src/sections/Contact.tsx`, `public/cv/Lebenslauf_Varun_Thaker.pdf` (copied from `Desktop/Application/`), `public/cv/Varun_Thaker_CV_EN.pdf` (a temporary copy of the DE CV; Varun will replace it)
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `profile.cv[lang]` and `useLang`.
- Contact shows the heading "Let's talk" / "Lass uns sprechen", a neutral line, an email button (builds the mailto on click), LinkedIn, GitHub, and the button `cv.download` = "Download CV" / "Lebenslauf herunterladen" with `href={profile.cv[lang]}` and the `download` attribute. The Footer repeats the CV link in smaller form.

- [ ] Step 1: Implement it.
- [ ] Step 2: Build, then in Playwright check that the CV href is `/cv/Lebenslauf_Varun_Thaker.pdf` on `/de/` and `/cv/Varun_Thaker_CV_EN.pdf` on `/en/`, and that both return 200 from `vite preview` (Review Focus 5).
- [ ] Step 3: Commit: `feat: add contact with language-aware CV download`.

### Task 8: Per-language prerender, SEO/OG, and Vercel config

**Files:**
- Create: `scripts/prerender.mjs`, `src/entry-server.tsx`, `src/seo.ts`, `public/og-en.png`, `public/og-de.png` (1200×630, rendered from a simple HTML card via Playwright), `vercel.json`
- Modify: `package.json` (`"build": "tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs"`), `src/main.tsx` (use `hydrateRoot` when `#root` has children)

**Interfaces:**
- `src/seo.ts` exports `seo: Record<Lang, { title: string; description: string; ogImage: string }>`.
- `entry-server.tsx` exports `render(url: string): string`, which uses `renderToString` with a `StaticRouter`.
- `prerender.mjs` takes `dist/index.html` and, for each `lang`, fills `<html lang>`, `<title>`, the meta description, `og:title`/`og:description`/`og:image`/`og:url` (absolute, using `SITE_URL`), `twitter:card`, the canonical link, and both `hreflang` alternates. It injects the rendered app HTML into `#root` and writes `dist/{lang}/index.html`. The root `dist/index.html` becomes a tiny language-redirect page (an inline script, plus a `<noscript>` link to `/en/`) that carries the EN meta tags.
- `vercel.json`: `{ "cleanUrls": true, "trailingSlash": true }`. Don't add an SPA catch-all rewrite that would override the static `/de/` and `/en/` files.
- Code that touches `window`/`localStorage` must be guarded so SSR works. Motion components render their initial state on the server.

- [ ] Step 1: Implement it.
- [ ] Step 2: Run `npm run build`, then `grep -c 'lang="de"' dist/de/index.html` (should be ≥ 1) and `grep 'og:title' dist/de/index.html` (should show the German title). Run the same checks for `en`. Serve with `npx serve dist` and confirm there are no hydration warnings in the console (Review Focus 1).
- [ ] Step 3: Commit: `feat: prerender per-language pages with OG tags`.

### Task 9: Polish pass, copy guard, and final verification

**Files:**
- Create: `scripts/copy-guard.mjs`. It greps `src/content`, `src/locales` and `src/seo.ts` case-insensitively for `open to work|hire me|freelanc|available for|pricing|my services|meine Leistungen|vibe|01768|Jobsuche|offen für neue|für Projekte verfügbar` and exits 1 on any match.
- Modify: `package.json` (`"guard": "node scripts/copy-guard.mjs"`, which runs before `build`)

- [ ] Step 1: Run `npm run guard`. It should exit 0.
- [ ] Step 2: Run a Lighthouse mobile check (`npx lighthouse http://localhost:4173/en/ --preset=perf --form-factor=mobile` from the scratchpad). Performance should be ≥ 90. If it's lower, fix it (lazy-load the Projects and Capabilities sections, trim the SVGs).
- [ ] Step 3: Take full-page screenshots of `/en/` and `/de/` at 360, 390 and 1440px in dark and light. Check there's no horizontal scroll, contrast looks right, and focus rings are visible when tabbing.
- [ ] Step 4: Write a `README.md` covering how to run it, where content lives, how to swap the photo and the CVs, `VITE_SITE_URL`, and deploying to Vercel.
- [ ] Step 5: Commit: `chore: polish, copy guard, README`.
