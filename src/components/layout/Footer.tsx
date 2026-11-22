import { useTranslation } from 'react-i18next'
import { useLang } from '../../hooks/useLang'
import { profile } from '../../content/profile'

export function Footer() {
  const { t } = useTranslation()
  const { lang } = useLang()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t('footer.built')}
        </p>
        <div className="flex items-center gap-5">
          <a href={profile.cv[lang]} download className="hover:text-fg">
            {t('contact.cv')}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
