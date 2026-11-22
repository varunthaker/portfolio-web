import { useTranslation } from 'react-i18next'
import { Tag } from '../../components/ui/Tag'
import { useLang } from '../../hooks/useLang'
import type { Project } from '../../content/projects'
import { ProjectVisual } from './ProjectVisual'

type Props = {
  project: Project
  featured?: boolean
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, featured = false, onOpen }: Props) {
  const { t } = useTranslation()
  const { t: tl } = useLang()

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-cyan/50 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="h-44 border-b border-border bg-bg/60 p-4">
        <ProjectVisual kind={project.visual} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{tl(project.tagline)}</p>
        <h3 className="mt-2 text-xl font-semibold">
          {/* Whole card is clickable via this button's ::after */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {tl(project.title)}
          </button>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tl(project.summary)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          <span className="ml-auto text-sm font-medium text-fg/80 transition-transform group-hover:translate-x-1">
            {t('projects.details')} →
          </span>
        </div>
      </div>
      {/* focus ring for the stretched button */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-cyan group-has-[:focus-visible]:ring-2" />
    </article>
  )
}
