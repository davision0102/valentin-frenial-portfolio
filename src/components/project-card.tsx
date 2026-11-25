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

  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative border-b border-border">
        {cover && (
          <ProjectVisual
            image={{ ...cover, fit: 'contain' }}
            alt={project.gallery[0]}
            className="aspect-[16/9]"
          />
        )}
        <CategoryBadge
          category={project.category}
          label={
            project.category === 'learning'
              ? t.projectsPage.learning
              : t.projectsPage.design
          }
          className="absolute top-3 left-3"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium text-muted-foreground">{meta}</p>
        <h3 className="mt-2 flex items-start justify-between gap-4 font-heading text-xl font-semibold tracking-tight">
          {project.title}
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
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
