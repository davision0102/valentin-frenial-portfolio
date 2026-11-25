import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { buttonOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/')({
  component: ProjectsPage,
})

type Filter = 'all' | 'learning' | 'design'

/** Numéro sur deux chiffres : 1 → « 01 ». */
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Projets : un titre et des filtres, puis une liste numérotée à gauche et,
 * sur grand écran, un aperçu fixe à droite qui suit le projet survolé (ou
 * sélectionné au clavier). Sur téléphone et tablette, des cartes qui se
 * suivent.
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
  // L'aperçu montre le projet survolé, ou à défaut le premier de la liste.
  const current = shown.find((project) => project.slug === active) ?? shown[0]
  const currentMedia = current ? getProjectMedia(current.slug) : undefined
  const categoryOf = (category: string) =>
    category === 'learning' ? p.learning : p.design

  return (
    <section className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">
      {/* En-tête : le titre à gauche, les filtres à droite. */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <h1 className="font-heading text-3xl leading-[0.95] font-semibold tracking-[-0.03em] uppercase sm:text-4xl">
          {p.title}
        </h1>
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
                'border-b py-1 font-mono text-xs tracking-[0.18em] uppercase transition-colors',
                filter === item.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              <span className="ml-1.5 tabular-nums opacity-60">
                {pad(countOf(item.id))}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-12 sm:mt-12 lg:grid-cols-2 lg:gap-16">
        {/* Téléphone et tablette : des cartes qui se suivent (grande image,
            numéro, titre, infos). */}
        <ol className="grid gap-12 sm:grid-cols-2 sm:gap-8 lg:hidden">
          {shown.map((project, i) => {
            const cover = getProjectMedia(project.slug)?.images[0]
            return (
              <li key={project.slug}>
                <Link
                  to="/projets/$slug"
                  params={{ slug: project.slug }}
                  className="group block"
                >
                  {cover && (
                    <ProjectVisual
                      image={{ ...cover, fit: 'contain' }}
                      alt={project.gallery[0] ?? project.title}
                      className="aspect-[4/3] rounded-2xl"
                    />
                  )}
                  <span className="mt-5 block font-mono text-xs tracking-[0.18em] text-muted-foreground tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span className="mt-2 flex items-start justify-between gap-4 font-heading text-xl leading-snug font-semibold tracking-tight">
                    {project.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {[
                      project.client,
                      project.year,
                      categoryOf(project.category),
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>

        {/* Grand écran : liste numérotée */}
        <ol className="hidden border-t border-border lg:block">
          {shown.map((project, i) => {
            const isActive = current?.slug === project.slug
            return (
              <li key={project.slug} className="border-b border-border">
                <Link
                  to="/projets/$slug"
                  params={{ slug: project.slug }}
                  onPointerEnter={() => setActive(project.slug)}
                  onFocus={() => setActive(project.slug)}
                  className="group flex items-center gap-6 py-5"
                >
                  <span
                    className={cn(
                      'w-8 shrink-0 font-mono text-xs tracking-[0.18em] tabular-nums transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block font-heading text-xl leading-snug font-semibold tracking-tight transition-[color,translate] duration-300 ease-out group-hover:text-foreground',
                        isActive
                          ? 'translate-x-2 text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {project.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {[
                        project.client,
                        project.year,
                        categoryOf(project.category),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      'size-5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300',
                      isActive && 'translate-x-1 text-foreground opacity-100',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ol>

        {/* Aperçu fixe (grand écran) : l'image, puis les infos du projet. */}
        {current && (
          <aside aria-live="polite" className="hidden lg:block">
            <div className="sticky top-28">
              <Link
                to="/projets/$slug"
                params={{ slug: current.slug }}
                className="group block"
              >
                {currentMedia?.images[0] && (
                  <ProjectVisual
                    key={current.slug}
                    image={{ ...currentMedia.images[0], fit: 'contain' }}
                    alt={current.gallery[0] ?? current.title}
                    className="aspect-[4/3] animate-in rounded-2xl duration-300 fade-in motion-reduce:animate-none"
                  />
                )}
              </Link>
              <p className="mt-6 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                {[categoryOf(current.category), current.year]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <p className="mt-3 leading-relaxed text-pretty">
                {current.summary}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {current.tags.join(' · ')}
              </p>
              <Link
                to="/projets/$slug"
                params={{ slug: current.slug }}
                className={`${buttonOutline} mt-6`}
              >
                {p.open}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
