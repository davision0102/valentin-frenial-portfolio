import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CategoryBadge } from '@/components/project-card'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/')({
  component: ProjectsPage,
})

type Filter = 'all' | 'learning' | 'design'

/**
 * Projets : la liste à gauche, un panneau d'aperçu fixe à droite qui montre
 * le projet survolé (ou sélectionné au clavier) : visuel, résumé, mots-clés.
 * Sur téléphone, chaque projet est une carte simple.
 */
function ProjectsPage() {
  const { t } = useI18n()
  const p = t.projectsPage
  useDocumentTitle(p.title)
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<string | null>(null)

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
  // Le panneau montre le projet survolé, ou à défaut le premier de la liste.
  const current = shown.find((project) => project.slug === active) ?? shown[0]
  const currentMedia = current ? getProjectMedia(current.slug) : undefined

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <h1 className="sr-only">{p.title}</h1>

      <div
        role="group"
        aria-label={p.filtersLabel}
        className="flex flex-wrap gap-x-6 gap-y-2"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setFilter(item.id)
              setActive(null)
            }}
            aria-pressed={filter === item.id}
            className={cn(
              'inline-flex items-baseline gap-1.5 py-1 text-sm font-medium transition-colors',
              filter === item.id
                ? 'text-foreground underline decoration-2 underline-offset-8'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
            <sup className="text-xs tabular-nums opacity-60">
              {countOf(item.id)}
            </sup>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Liste */}
        <ul className="border-t border-border">
          {shown.map((project) => {
            const cover = getProjectMedia(project.slug)?.images[0]
            const isActive = current?.slug === project.slug
            const learning = project.category === 'learning'
            return (
              <li key={project.slug} className="border-b border-border">
                <Link
                  to="/projets/$slug"
                  params={{ slug: project.slug }}
                  onPointerEnter={() => setActive(project.slug)}
                  onFocus={() => setActive(project.slug)}
                  className="group flex items-center gap-4 py-4 lg:py-5"
                >
                  {/* Miniature : seulement sans le panneau d'aperçu */}
                  {cover && (
                    <ProjectVisual
                      image={{ ...cover, fit: 'contain' }}
                      alt=""
                      className="aspect-[4/3] w-20 shrink-0 rounded-xl lg:hidden"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'hidden h-8 w-0.5 shrink-0 rounded-full transition-colors lg:block',
                      isActive
                        ? learning
                          ? 'bg-track-learning'
                          : 'bg-track-design'
                        : 'bg-transparent',
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block text-lg leading-snug font-semibold tracking-tight transition-colors sm:text-xl',
                        isActive
                          ? 'lg:text-foreground'
                          : 'lg:text-muted-foreground',
                        'group-hover:text-foreground',
                      )}
                    >
                      {project.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                      <span>{project.client}</span>
                      {project.year && (
                        <span className="tabular-nums">{project.year}</span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            learning ? 'bg-track-learning' : 'bg-track-design',
                          )}
                        />
                        {learning ? p.learning : p.design}
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      'size-5 shrink-0 text-muted-foreground transition-all lg:opacity-0',
                      isActive &&
                        'lg:translate-x-1 lg:text-foreground lg:opacity-100',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Panneau d'aperçu fixe (grand écran) */}
        {current && (
          <aside aria-live="polite" className="hidden lg:block">
            <div className="sticky top-24">
              <Link
                to="/projets/$slug"
                params={{ slug: current.slug }}
                className="group block overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div className="relative">
                  {currentMedia?.images[0] && (
                    <ProjectVisual
                      key={current.slug}
                      image={{ ...currentMedia.images[0], fit: 'contain' }}
                      alt={current.gallery[0] ?? current.title}
                      className="aspect-[4/3] animate-in duration-300 fade-in motion-reduce:animate-none"
                    />
                  )}
                  <CategoryBadge
                    category={current.category}
                    label={
                      current.category === 'learning' ? p.learning : p.design
                    }
                    className="absolute top-4 left-4"
                  />
                </div>
                <div className="p-6">
                  <p className="leading-relaxed text-pretty text-muted-foreground">
                    {current.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-brand">
                    {p.open}
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
