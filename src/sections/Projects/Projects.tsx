import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Carousel } from '../../components/ui/Carousel'
import { capabilities, type CapabilityId } from '../../content/capabilities'
import type { Project } from '../../content/projects'
import { useLang } from '../../hooks/useLang'
import { useLoopInView } from '../../hooks/useLoopInView'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

type Props = {
  projects: Project[]
  filter: CapabilityId | null
  onClearFilter: () => void
}

/** Project grid, optionally filtered by the capability selected above it. */
export function Projects({ projects, filter, onClearFilter }: Props) {
  const { t } = useTranslation()
  const { t: tl } = useLang()
  const [open, setOpen] = useState<Project | null>(null)
  const { ref, loopClass } = useLoopInView<HTMLDivElement>()
  const active = capabilities.find((c) => c.id === filter)

  return (
    <div id="projects" className="mt-16 scroll-mt-20">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-2xl font-semibold" aria-live="polite">
          {active ? t('projects.headingFor', { name: tl(active.title) }) : t('projects.headingAll')}
        </h3>
        {active && (
          <button type="button" onClick={onClearFilter} className="text-sm font-medium text-cyan hover:underline">
            {t('projects.showAll')}
          </button>
        )}
      </div>
      <div ref={ref} className={loopClass}>
        <Carousel label={active ? t('projects.headingFor', { name: tl(active.title) }) : t('projects.headingAll')} resetKey={filter ?? 'all'}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpen} />
          ))}
        </Carousel>
      </div>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </div>
  )
}
