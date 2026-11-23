import { useMotionValue } from 'motion/react'
import { journey } from '../../content/journey'
import { ChapterCard } from './ChapterCard'
import { ProcessScene } from './ProcessScene'
import { at } from './sceneTimeline'

function StaticScene({ chapter }: { chapter: number }) {
  const progress = useMotionValue(at(chapter))
  return <ProcessScene progress={progress} animate={false} className="size-full" />
}

/** Reduced-motion version: a calm, stepped timeline with one still scene per chapter. */
export function JourneyStatic() {
  return (
    <ol className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6">
      {journey.map((chapter, i) => (
        <li key={chapter.id} className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
          <div className="mx-auto aspect-square w-40 rounded-2xl border border-border bg-card sm:w-full">
            <StaticScene chapter={i} />
          </div>
          <ChapterCard chapter={chapter} index={i} active />
        </li>
      ))}
    </ol>
  )
}
