import { useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
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
 * Index des projets : une liste épurée (titre, client, année, catégorie).
 * Au survol, l'image du projet apparaît et suit la souris ; sur téléphone,
 * chaque ligne affiche sa miniature.
 */
function ProjectsPage() {
  const { t } = useI18n()
  const p = t.projectsPage
  useDocumentTitle(p.title)
  const [filter, setFilter] = useState<Filter>('all')
  const [hovered, setHovered] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

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

  /** Place l'aperçu à côté du pointeur (sans repasser par React). */
  function movePreview(event: React.PointerEvent) {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    const box = list.getBoundingClientRect()
    const x = event.clientX - box.left + 24
    const y = event.clientY - box.top - preview.offsetHeight / 2
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

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
            onClick={() => setFilter(item.id)}
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

      <div
        ref={listRef}
        onPointerMove={movePreview}
        onPointerLeave={() => setHovered(null)}
        className="relative mt-8 sm:mt-10"
      >
        <ul className="border-t border-border">
          {shown.map((project) => {
            const cover = getProjectMedia(project.slug)?.images[0]
            const learning = project.category === 'learning'
            return (
              <li
                key={project.slug}
                className="animate-in border-b border-border duration-300 fade-in motion-reduce:animate-none"
              >
                <Link
                  to="/projets/$slug"
                  params={{ slug: project.slug }}
                  onPointerEnter={() => setHovered(project.slug)}
                  onFocus={() => setHovered(null)}
                  className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 py-5 md:grid-cols-[minmax(0,1fr)_14rem_3.5rem_7.5rem_1.25rem] md:gap-x-6 md:py-6"
                >
                  {/* Miniature : seulement sur téléphone et tablette */}
                  {cover && (
                    <ProjectVisual
                      image={{ ...cover, fit: 'contain' }}
                      alt=""
                      className="row-span-2 aspect-[4/3] rounded-xl md:hidden"
                    />
                  )}
                  <h2 className="text-lg leading-snug font-semibold tracking-tight transition-[color,translate] duration-300 group-hover:text-brand sm:text-2xl md:group-hover:translate-x-2">
                    {project.title}
                  </h2>
                  <p className="col-start-2 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground md:col-start-auto md:contents">
                    <span className="truncate">{project.client}</span>
                    <span className="tabular-nums">{project.year}</span>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cn(
                          'size-2 rounded-full',
                          learning ? 'bg-track-learning' : 'bg-track-design',
                        )}
                      />
                      {learning ? p.learning : p.design}
                    </span>
                  </p>
                  <ArrowUpRight className="hidden size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand md:block" />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Aperçu qui suit la souris (écrans avec souris uniquement) */}
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 hidden w-72 [@media(hover:hover)_and_(pointer:fine)]:md:block"
        >
          {t.projects.map((project) => {
            const cover = getProjectMedia(project.slug)?.images[0]
            if (!cover) return null
            return (
              <ProjectVisual
                key={project.slug}
                image={{ ...cover, fit: 'contain' }}
                alt=""
                className={cn(
                  'absolute inset-x-0 top-0 aspect-[4/3] rounded-2xl border border-border shadow-2xl shadow-foreground/15 transition-[opacity,scale] duration-200 motion-reduce:transition-none',
                  hovered === project.slug
                    ? 'scale-100 opacity-100'
                    : 'scale-95 opacity-0',
                )}
              />
            )
          })}
          {/* Réserve la hauteur de l'aperçu pour le centrer sur le pointeur */}
          <div className="invisible aspect-[4/3]" />
        </div>
      </div>
    </section>
  )
}
