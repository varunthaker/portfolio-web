import { useTranslation } from 'react-i18next'
import { Section } from '../components/ui/Section'
import { dailyTools, skills } from '../content/skills'
import { useLang } from '../hooks/useLang'

export function Skills() {
  const { t } = useTranslation()
  const { t: tl } = useLang()

  return (
    <Section id="skills" kicker={t('skills.kicker')} title={t('skills.heading')}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <article key={g.group.en} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">{tl(g.group)}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.core.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-bg-elev px-3 py-1.5 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-5 text-sm leading-relaxed text-muted">
              <span className="text-fg/70">{t('skills.also')}:</span> {g.more.join(' · ')}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        <span className="font-mono text-xs uppercase tracking-[0.18em]">{t('skills.tools')}</span>
        <span className="mx-2">—</span>
        {dailyTools.join(' · ')}
      </p>
    </Section>
  )
}
