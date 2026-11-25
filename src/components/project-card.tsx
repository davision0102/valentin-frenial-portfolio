import { Link } from '@tanstack/react-router'
import { ArrowUpRight, GraduationCap, Palette } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useI18n } from '@/i18n/context'
import type { Dictionary } from '@/i18n/fr'
import { cn } from '@/lib/utils'

type Project = Dictionary['projects'][number]

/** Carte d'un projet : visuel, client, titre, résumé et mots-clés. */
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n()
  const cover = getProjectMedia(project.slug)?.images[0]
  const meta = [project.client, project.year].filter(Boolean).join(' · ')

  // « Image d'abord » : titre en haut à gauche, catégorie en haut à droite,
  // puis un grand visuel ; le résumé est sur la page du projet.
  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-2 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between gap-4 px-4 pt-4 pb-5">
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
        </div>
        <CategoryBadge
          category={project.category}
          label={
            project.category === 'learning'
              ? t.projectsPage.learning
              : t.projectsPage.design
          }
          className="shrink-0"
        />
      </div>
      {cover && (
        <div className="relative mt-auto overflow-hidden rounded-2xl">
          <ProjectVisual
            image={{ ...cover, fit: 'contain' }}
            alt={project.gallery[0]}
            className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full glass transition-transform group-hover:scale-110"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      )}
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
