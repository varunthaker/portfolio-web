import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../components/ui/Section'
import { capabilities, type CapabilityId } from '../content/capabilities'
import { projects } from '../content/projects'
import { Capabilities } from './Capabilities/Capabilities'
import { Projects } from './Projects/Projects'

/** "What I build": capability cards that filter the projects proving them. */
export function Work() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<CapabilityId | null>(null)

  const counts = useMemo(
    () =>
      Object.fromEntries(
        capabilities.map((c) => [c.id, projects.filter((p) => p.capabilities.includes(c.id)).length]),
      ) as Record<CapabilityId, number>,
    [],
  )
  const visible = filter ? projects.filter((p) => p.capabilities.includes(filter)) : projects

  return (
    <Section id="build" kicker={t('build.kicker')} title={t('build.heading')} intro={t('build.intro')}>
      <Capabilities selected={filter} counts={counts} onToggle={(id) => setFilter((f) => (f === id ? null : id))} />
      <Projects projects={visible} filter={filter} onClearFilter={() => setFilter(null)} />
    </Section>
  )
}
