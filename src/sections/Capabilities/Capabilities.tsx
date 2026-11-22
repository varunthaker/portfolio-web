import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/ui/Section'
import { Tag } from '../../components/ui/Tag'
import { capabilities, type Capability, type CapabilityId } from '../../content/capabilities'
import { useLang } from '../../hooks/useLang'
import { useLoopInView } from '../../hooks/useLoopInView'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { AgentAnim } from './anim/AgentAnim'
import { McpAuthDiagram } from './anim/McpAuthDiagram'
import { StackAnim } from './anim/StackAnim'
import { VoiceRagAnim } from './anim/VoiceRagAnim'

const ANIMS: Record<Exclude<CapabilityId, 'mcp'>, ComponentType<{ animate: boolean }>> = {
  fullstack: StackAnim,
  agents: AgentAnim,
  'rag-voice': VoiceRagAnim,
}

function CapabilityCard({ cap, animate }: { cap: Capability; animate: boolean }) {
  const { t } = useLang()
  const { ref, loopClass } = useLoopInView<HTMLElement>()
  const isMcp = cap.id === 'mcp'
  const Anim = isMcp ? null : ANIMS[cap.id as Exclude<CapabilityId, 'mcp'>]

  return (
    <article
      ref={ref}
      className={`group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan/50 sm:p-8 ${
        isMcp ? 'md:col-span-3' : ''
      } ${loopClass}`}
    >
      {isMcp ? (
        <>
          <div className="mb-6 max-w-2xl">
            <h3 className="text-2xl font-semibold">{t(cap.title)}</h3>
            <p className="mt-2 text-muted">{t(cap.body)}</p>
          </div>
          <McpAuthDiagram animate={animate} />
        </>
      ) : (
        <>
          <div className="mb-6 aspect-[16/9] rounded-xl border border-border bg-bg/60 p-3">
            {Anim && <Anim animate={animate} />}
          </div>
          <h3 className="text-xl font-semibold">{t(cap.title)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t(cap.body)}</p>
        </>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {cap.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  )
}

export function Capabilities() {
  const { t } = useTranslation()
  const animate = !useReducedMotionSafe()
  // MCP gets the wide slot after the three regular cards.
  const ordered = [...capabilities.filter((c) => c.id !== 'mcp'), ...capabilities.filter((c) => c.id === 'mcp')]

  return (
    <Section id="build" kicker={t('build.kicker')} title={t('build.heading')} intro={t('build.intro')}>
      <div className="grid gap-5 md:grid-cols-3">
        {ordered.map((cap) => (
          <CapabilityCard key={cap.id} cap={cap} animate={animate} />
        ))}
      </div>
    </Section>
  )
}
