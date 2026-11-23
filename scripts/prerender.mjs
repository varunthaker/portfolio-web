// Build step: writes dist/en/index.html and dist/de/index.html with full markup
// and per-language meta/Open Graph tags (LinkedIn's crawler does not run JS),
// and turns dist/index.html into a tiny language-redirect page.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const ssrEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
const { render, seo, SITE_URL, LANGS } = await import(ssrEntry)

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function headFor(lang) {
  const s = seo[lang]
  const url = `${SITE_URL}/${lang}/`
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/" />`).join('\n    ')
  return `<title>${esc(s.title)}</title>
    <meta name="description" content="${esc(s.description)}" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Varun Thaker" />
    <meta property="og:title" content="${esc(s.title)}" />
    <meta property="og:description" content="${esc(s.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE_URL}${s.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${s.locale}" />
    <meta name="twitter:card" content="summary_large_image" />`
}

const withHead = (html, lang) =>
  html
    .replace('<html lang="en"', `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', headFor(lang))

for (const lang of LANGS) {
  const appHtml = render(`/${lang}/`)
  if (!appHtml.includes('id="journey"')) throw new Error(`prerender for ${lang} looks empty`)
  const html = withHead(template, lang).replace('<!--app-html-->', appHtml)
  await mkdir(path.join(dist, lang), { recursive: true })
  await writeFile(path.join(dist, lang, 'index.html'), html)
  console.log(`prerendered /${lang}/ (${(html.length / 1024).toFixed(1)} kB)`)
}

// Root: redirect to the visitor's language before anything loads.
const redirect = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    ${headFor('en')}
    <script>
      (function () {
        var lang = 'en'
        try {
          var saved = localStorage.getItem('lang')
          if (saved === 'en' || saved === 'de') lang = saved
          else if ((navigator.language || '').toLowerCase().indexOf('de') === 0) lang = 'de'
        } catch (e) {}
        location.replace('/' + lang + '/' + location.hash)
      })()
    </script>
    <style>body{background:#0b0f17;color:#e7ecf3;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#22d3ee}</style>
  </head>
  <body>
    <noscript><p><a href="/en/">English</a> · <a href="/de/">Deutsch</a></p></noscript>
  </body>
</html>
`
await writeFile(path.join(dist, 'index.html'), redirect)
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('wrote root redirect page')
