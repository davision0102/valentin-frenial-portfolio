import { Link } from '@tanstack/react-router'
import { ArrowUpRight, GraduationCap, Palette } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useI18n } from '@/i18n/context'
import type { Dictionary } from '@/i18n/fr'
import { cn } from '@/lib/utils'

type Project = Dictionary['projects'][number]

/**
 * Carte d'un projet : un grand visuel, puis le titre en capitales et une
 * ligne discrète (type de projet, client, année). Pas de cadre autour.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n()
  const cover = getProjectMedia(project.slug)?.images[0]
  const learning = project.category === 'learning'
  const meta = [
    learning ? t.projectsPage.learning : t.projectsPage.design,
    project.client,
    project.year,
  ].filter(Boolean)

  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {cover && (
          <ProjectVisual
            image={{ ...cover, fit: 'contain' }}
            alt={project.gallery[0]}
            className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
          />
        )}
        <span className="absolute right-4 bottom-4 grid size-10 place-items-center bg-foreground text-background opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <h3 className="mt-6 font-heading text-lg font-semibold tracking-tight uppercase sm:text-xl">
        {project.title}
      </h3>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 rounded-full',
            learning ? 'bg-track-learning' : 'bg-track-design',
          )}
        />
        {meta.join(' · ')}
      </p>
    </Link>
  )
}

/** Étiquette pleine : E-learning (bleu) ou Design (lilas), posée sur un visuel. */
export function CategoryBadge({
  category,
  label,
  className,
}: {
  category: string
  label: string
  className?: string
}) {
  const learning = category === 'learning'
  const Icon = learning ? GraduationCap : Palette
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-track-foreground shadow-sm',
        learning ? 'bg-track-learning' : 'bg-track-design',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}
