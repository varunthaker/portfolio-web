import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import './styles/index.css'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages (/en/, /de/) arrive with markup → hydrate; dev server → render.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
