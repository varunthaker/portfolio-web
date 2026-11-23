# Varun Thaker — Portfolio

Bilingual (DE/EN) portfolio with a scroll-driven "Factory → Code" career story.
Vite + React 19 + TypeScript, Tailwind CSS v4, Motion, react-i18next. Each language is prerendered to static HTML at build time so LinkedIn link previews work.

## Run

```bash
npm install
npm run dev        # http://localhost:5173 → redirects to /en/ or /de/
npm run build      # copy guard → typecheck → client build → SSR build → prerender
npm run preview    # serve dist/
npm run lint
```

## Where things live

| What | File |
|---|---|
| Name, pitch, links | `src/content/profile.ts` |
| Journey chapters (the story) | `src/content/journey.ts` |
| Projects | `src/content/projects.ts` |
| "What I build" cards | `src/content/capabilities.ts` |
| Skills | `src/content/skills.ts` |
| UI labels (buttons, headings) | `src/locales/en.json`, `src/locales/de.json` |
| Page titles / link previews | `src/seo.ts`, `public/og-en.png`, `public/og-de.png` |
| Story animation | `src/sections/Journey/FactoryScene.tsx` |
| MCP + Auth diagram | `src/sections/Capabilities/anim/McpAuthDiagram.tsx` |
| Browser-tab icon | `public/favicon-32.png`, `public/favicon-48.png`, `public/apple-touch-icon.png` (from the avatar) |

Every content string is `{ en, de }`, so a missing translation is a type error. The German locale JSON must have exactly the English keys, which is also checked at compile time.

## Swap the photo

Replace `src/assets/avatar.webp` with a transparent-background bust (about 720px wide) and keep the file name. If you change the format, update the import in `src/sections/Hero.tsx`.

## Copy guard

`npm run guard` (it runs automatically before `build`) fails if the content contains phrases like "open to work", "hire me", "freelance" the phone number, or company names (aiio, STRABAG, Deutsche Energie System, "GmbH"). Edit `scripts/copy-guard.mjs` to change the list.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel. The framework preset is Vite, the build command is `npm run build`, and the output directory is `dist`.
2. Set the `VITE_SITE_URL` environment variable to the final URL, e.g. `https://varun-thaker.vercel.app` or your own domain. Canonical and Open Graph URLs use it.
3. Link `https://<your-domain>/en/` from LinkedIn.

`vercel.json` enables clean URLs with trailing slashes, so `/de` → `/de/`.
