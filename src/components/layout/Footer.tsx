import { profile } from '../../content/profile'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-5 px-4 py-8 text-sm text-muted sm:justify-end sm:px-6">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
          GitHub
        </a>
        <a href={profile.xing} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
          XING
        </a>
      </div>
    </footer>
  )
}
