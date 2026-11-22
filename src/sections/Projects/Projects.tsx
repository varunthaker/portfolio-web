import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/ui/Section'
import { projects, type Project } from '../../content/projects'
import { useLoopInView } from '../../hooks/useLoopInView'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

export function Projects() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<Project | null>(null)
  const { ref, loopClass } = useLoopInView<HTMLDivElement>()

  return (
    <Section id="projects" kicker={t('projects.kicker')} title={t('projects.heading')} intro={t('projects.intro')}>
      <div ref={ref} className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${loopClass}`}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} featured={i === 0} onOpen={setOpen} />
        ))}
      </div>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
