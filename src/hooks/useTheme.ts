import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const readTheme = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light'
    ? 'light'
    : 'dark'

export function useTheme() {
  // Server and first client render agree on 'dark'; the real value syncs after mount.
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => setTheme(readTheme()), [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next === 'dark' ? '#0b0f17' : '#f7f8fb')
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
