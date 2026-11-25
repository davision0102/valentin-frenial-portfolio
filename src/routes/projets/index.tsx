import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { CategoryBadge } from '@/components/project-card'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import type { Dictionary } from '@/i18n/fr'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/')({
  component: ProjectsPage,
})

type Filter = 'all' | 'learning' | 'design'
type Project = Dictionary['projects'][number]

/** Tous les projets en vignettes, avec un filtre E-learning / Design. */
function ProjectsPage() {
  const { t } = useI18n()
  const p = t.projectsPage
  useDocumentTitle(p.title)
  const [filter, setFilter] = useState<Filter>('all')

  const countOf = (id: Filter) =>
    t.projects.filter((project) => id === 'all' || project.category === id)
      .length
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: p.all },
    { id: 'learning', label: p.learning },
    { id: 'design', label: p.design },
  ]
  const shown = t.projects.filter(
    (project) => filter === 'all' || project.category === filter,
  )

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            {p.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
            {p.intro}
          </p>
        </div>

        {/* Sélecteur compact : une option active à la fois. */}
        <div
          role="group"
          aria-label={p.filtersLabel}
          className="inline-flex w-fit shrink-0 rounded-full border border-border bg-card p-1"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                filter === item.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              <span className="text-xs tabular-nums opacity-60">
                {countOf(item.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <li
            key={project.slug}
            className="animate-in duration-300 fade-in motion-reduce:animate-none"
          >
            <ProjectTile project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Vignette : un grand visuel, puis titre, client et année. */
function ProjectTile({ project }: { project: Project }) {
  const { t } = useI18n()
  const cover = getProjectMedia(project.slug)?.images[0]
  const learning = project.category === 'learning'
  const meta = [project.client, project.year].filter(Boolean).join(' · ')

  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group block focus-visible:outline-none"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-foreground/10 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        {cover && (
          <ProjectVisual
            image={{ ...cover, fit: 'contain' }}
            alt={project.gallery[0] ?? project.title}
            className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        )}
        <CategoryBadge
          category={project.category}
          label={learning ? t.projectsPage.learning : t.projectsPage.design}
          className="absolute top-3 left-3"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 grid size-10 translate-y-1 place-items-center rounded-full opacity-0 glass transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <h2 className="mt-4 text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-brand">
        {project.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
    </Link>
  )
}
