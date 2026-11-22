import { useTranslation } from 'react-i18next'
import { Section } from '../components/ui/Section'
import { skills } from '../content/skills'
import { useLang } from '../hooks/useLang'

export function Skills() {
  const { t } = useTranslation()
  const { t: tl } = useLang()

  return (
    <Section id="skills" kicker={t('skills.kicker')} title={t('skills.heading')}>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group.en} className="border-t border-border pt-5">
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{tl(g.group)}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
