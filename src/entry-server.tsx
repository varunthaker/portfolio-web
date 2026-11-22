import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

export { seo, SITE_URL } from './seo'
export { LANGS } from './content/types'

/** Render the app for a URL to static HTML (used by scripts/prerender.mjs at build time). */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
