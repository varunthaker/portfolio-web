import { useTranslation } from 'react-i18next'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'

const NAV = ['journey', 'build', 'skills', 'contact'] as const

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        {t('skip')}
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="Varun Thaker" className="flex items-center gap-2 font-display font-semibold">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-border bg-card font-mono text-xs"
          >
            <span className="text-gradient">VT</span>
          </span>
          <span className="hidden sm:inline">Varun Thaker</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-fg">
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
