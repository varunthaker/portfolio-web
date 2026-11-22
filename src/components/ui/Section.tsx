import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  kicker?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
}

export function Section({ id, kicker, title, intro, children, className = '' }: SectionProps) {
  const headingId = title ? `${id}-heading` : undefined
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {title && (
          <header className="mb-12 max-w-2xl sm:mb-16">
            {kicker && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan">{kicker}</p>
            )}
            <h2 id={headingId} className="text-3xl font-semibold sm:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
