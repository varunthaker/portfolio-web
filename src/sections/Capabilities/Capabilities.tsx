import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { Carousel } from '../../components/ui/Carousel'
import { Tag } from '../../components/ui/Tag'
import { capabilities, type Capability, type CapabilityId } from '../../content/capabilities'
import { useLang } from '../../hooks/useLang'
import { useLoopInView } from '../../hooks/useLoopInView'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { AgentAnim } from './anim/AgentAnim'
import { McpAuthDiagram } from './anim/McpAuthDiagram'
import { StackAnim } from './anim/StackAnim'
import { VoiceRagAnim } from './anim/VoiceRagAnim'

function McpCompact({ animate }: { animate: boolean }) {
  return <McpAuthDiagram animate={animate} compact />
}

const ANIMS: Record<CapabilityId, ComponentType<{ animate: boolean }>> = {
  mcp: McpCompact,
  fullstack: StackAnim,
  agents: AgentAnim,
  'rag-voice': VoiceRagAnim,
}

type CardProps = {
  cap: Capability
  animate: boolean
  count: number
  selected: boolean
  onToggle: (id: CapabilityId) => void
}

function CapabilityCard({ cap, animate, count, selected, onToggle }: CardProps) {
  const { t } = useLang()
  const { t: tr } = useTranslation()
  const { ref, loopClass } = useLoopInView<HTMLElement>()
  const Anim = ANIMS[cap.id]

  // The whole card is a filter toggle via the stretched button in the heading.
  const title = (
    <button
      type="button"
      aria-pressed={selected}
      aria-controls="projects"
      onClick={() => onToggle(cap.id)}
      className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
    >
      {t(cap.title)}
    </button>
  )

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col rounded-2xl border bg-card p-6 transition-colors sm:p-8 ${
        selected ? 'border-cyan shadow-[0_0_0_1px_var(--cyan)]' : 'border-border hover:border-cyan/50'
      } w-[80vw] max-w-[360px] ${loopClass}`}
    >
      <div className="mb-6 aspect-[16/9] rounded-xl border border-border bg-bg/60 p-3">
        <Anim animate={animate} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t(cap.body)}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {cap.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <span className={`ml-auto text-sm font-medium ${selected ? 'text-cyan' : 'text-fg/80'}`}>
          {tr('projects.count', { count })} ↓
        </span>
      </div>
      {/* focus ring for the stretched button */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-cyan group-has-[:focus-visible]:ring-2" />
    </article>
  )
}

type Props = {
  selected: CapabilityId | null
  counts: Record<CapabilityId, number>
  onToggle: (id: CapabilityId) => void
}

/** Capability cards that double as filters for the project grid below. */
export function Capabilities({ selected, counts, onToggle }: Props) {
  const animate = !useReducedMotionSafe()
  const { t } = useTranslation()
  // AI-first: MCP leads, full-stack closes.
  const ORDER: CapabilityId[] = ['mcp', 'agents', 'rag-voice', 'fullstack']
  const ordered = ORDER.map((id) => capabilities.find((c) => c.id === id)!)

  return (
    <Carousel label={t('build.heading')}>
      {ordered.map((cap) => (
        <CapabilityCard
          key={cap.id}
          cap={cap}
          animate={animate}
          count={counts[cap.id]}
          selected={selected === cap.id}
          onToggle={onToggle}
        />
      ))}
    </Carousel>
  )
}
