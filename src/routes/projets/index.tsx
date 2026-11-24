import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ProjectCard } from '@/components/project-card'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/')({
  component: ProjectsPage,
})

type Filter = 'all' | 'learning' | 'design'

/** Tous les projets, avec un filtre E-learning / Design. */
function ProjectsPage() {
  const { t } = useI18n()
  const p = t.projectsPage
  const [filter, setFilter] = useState<Filter>('all')

  const filters: { id: Filter; label: string; dot?: string }[] = [
    { id: 'all', label: p.all },
    {
      id: 'learning',
      label: p.learning,
      dot: 'bg-track-learning',
    },
    { id: 'design', label: p.design, dot: 'bg-track-design' },
  ]
  const shown = t.projects.filter(
    (project) => filter === 'all' || project.category === filter,
  )

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
        {p.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
        {p.intro}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label={p.filtersLabel}
          className="flex flex-wrap gap-2"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
                filter === item.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card hover:border-foreground/40',
              )}
            >
              {item.dot && (
                <span className={cn('size-2 rounded-full', item.dot)} />
              )}
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {p.count(shown.length)}
        </p>
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {shown.map((project) => (
          <li
            key={project.slug}
            className="animate-in duration-300 fade-in motion-reduce:animate-none"
          >
            <ProjectCard project={project} heading="h2" />
          </li>
        ))}
      </ul>
    </section>
  )
}
