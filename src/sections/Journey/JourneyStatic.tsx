import { isSoftwareEra, journey } from '../../content/journey'
import { ChapterCard } from './ChapterCard'
import { Robot } from './Robot'

/** Reduced-motion version: a calm list, the robot shown holding each chapter's item. */
export function JourneyStatic() {
  return (
    <ol className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6">
      {journey.map((chapter, i) => (
        <li key={chapter.id} className="grid items-center gap-4 sm:grid-cols-[120px_1fr]">
          <Robot
            item={chapter.item}
            color={isSoftwareEra(i) ? 'var(--cyan)' : 'var(--amber)'}
            animate={false}
            className="mx-auto w-24"
          />
          <ChapterCard chapter={chapter} index={i} active />
        </li>
      ))}
    </ol>
  )
}
