// Fails the build if public copy contains job-hunting / sales wording or private data.
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const FORBIDDEN = /open to work|hire me|freelanc|available for|pricing|my services|meine Leistungen|vibe|01768|Jobsuche|offen für neue|für Projekte verfügbar/i
const targets = ['src/content', 'src/locales', 'src/seo.ts']

async function files(p) {
  if (p.endsWith('.ts') || p.endsWith('.json')) return [p]
  const entries = await readdir(p, { withFileTypes: true })
  return (await Promise.all(entries.map((e) => files(path.join(p, e.name))))).flat()
}

let failed = false
for (const file of (await Promise.all(targets.map(files))).flat()) {
  const lines = (await readFile(file, 'utf8')).split('\n')
  lines.forEach((line, i) => {
    const m = line.match(FORBIDDEN)
    if (m) {
      failed = true
      console.error(`${file}:${i + 1}: forbidden phrase "${m[0]}"`)
    }
  })
}
if (failed) process.exit(1)
console.log('copy guard: ok')
