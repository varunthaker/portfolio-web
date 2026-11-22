import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LangProvider } from './i18n/LangProvider'
import { LANG_STORAGE_KEY } from './i18n/LangContext'
import { isLang, type Lang } from './content/types'

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* ignore */
  }
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

/** `/` → `/de/` or `/en/` (client-only; the static root page does the same before JS loads). */
function RootRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/${detectLang()}/${window.location.hash}`, { replace: true })
  }, [navigate])
  return null
}

function LangRoute() {
  const { lang } = useParams()
  if (!isLang(lang)) return <Navigate to="/en/" replace />
  return (
    <LangProvider lang={lang}>
      <HomePage />
    </LangProvider>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang/*" element={<LangRoute />} />
    </Routes>
  )
}
