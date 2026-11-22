import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Tag } from '../../components/ui/Tag'
import { useLang } from '../../hooks/useLang'
import type { Project } from '../../content/projects'
import { ProjectVisual } from './ProjectVisual'

type Props = {
  project: Project | null
  onClose: () => void
}

/** Native <dialog>: focus trap, Esc and inert background come for free. */
export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const { t } = useTranslation()
  const { t: tl } = useLang()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[min(640px,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card p-0 text-fg backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div>
          <div className="aspect-[2/1] border-b border-border bg-bg/60 p-4">
            <ProjectVisual kind={project.visual} />
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">{tl(project.tagline)}</p>
            <h3 id="project-dialog-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
              {tl(project.title)}
            </h3>
            <p className="mt-3 text-muted">{tl(project.summary)}</p>
            <ul className="mt-5 grid gap-2.5">
              {project.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                  {tl(b)}
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">{t('projects.stack')}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-fg px-5 py-2.5 text-sm font-semibold text-bg"
                >
                  {t(`projects.${project.link.kind}`)} ↗
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:border-cyan"
              >
                {t('projects.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
