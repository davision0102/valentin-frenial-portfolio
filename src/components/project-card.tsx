import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import type { Dictionary } from '@/i18n/fr'

type Project = Dictionary['projects'][number]

/** Carte d'un projet : visuel, client, titre, résumé et mots-clés. */
export function ProjectCard({
  project,
  heading: Heading = 'h4',
}: {
  project: Project
  /** Niveau du titre : h4 dans les carrousels de l'accueil, h2 sur /projets. */
  heading?: 'h2' | 'h3' | 'h4'
}) {
  const cover = getProjectMedia(project.slug)?.images[0]
  const meta = [project.client, project.year].filter(Boolean).join(' · ')

  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0"
    >
      {cover && (
        <ProjectVisual
          image={{ ...cover, fit: 'contain' }}
          alt={project.gallery[0]}
          className="aspect-[16/9] border-b border-border"
        />
      )}
      <div className="p-6">
        <p className="text-xs font-medium text-muted-foreground">{meta}</p>
        <Heading className="mt-2 flex items-start justify-between gap-4 font-heading text-xl font-semibold tracking-tight">
          {project.title}
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
        </Heading>
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
