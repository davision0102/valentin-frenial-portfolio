import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { useAmbient } from '@/hooks/use-ambient'
import { Carousel } from '@/components/carousel'
import { NotFound } from '@/components/not-found'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projets/$slug')({
  component: ProjectPage,
})

/** Page détaillée d'un projet : /projets/<slug>. Contenu dans src/i18n. */
function ProjectPage() {
  const { slug } = Route.useParams()
  const { t } = useI18n()
  const p = t.project

  const index = t.projects.findIndex((project) => project.slug === slug)
  const media = getProjectMedia(slug)
  // Le fond ambiant prend la couleur du projet.
  useAmbient(media?.images[0]?.file)

  if (index === -1) return <NotFound />

  const project = t.projects[index]
  const next = t.projects[(index + 1) % t.projects.length]
  const nextCover = getProjectMedia(next.slug)?.images[0]
  const learning = project.category === 'learning'

  const facts = [
    { label: p.client, value: project.client },
    { label: p.year, value: project.year },
    { label: p.format, value: project.format },
    { label: p.role, value: project.role },
  ].filter((fact) => fact.value) // une info vide n'est pas affichée

  // Les étapes du projet, dans l'ordre où elles se sont déroulées.
  const steps = [
    { title: p.challenge, text: project.challenge },
    { title: p.solution, text: project.solution },
  ]

  return (
    <article className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24">
      <Link
        to="/"
        hash="projets"
        className="inline-flex h-10 items-center gap-1.5 rounded-full pr-4 pl-3 text-sm font-medium glass transition-transform active:scale-[0.97]"
      >
        <ArrowLeft className="size-4" />
        {p.back}
      </Link>

      <header className="mt-10 max-w-4xl">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span
            className={cn(
              'size-2 rounded-full',
              learning ? 'bg-track-learning' : 'bg-track-design',
            )}
          />
          {project.tags.join(' · ')}
        </p>
        <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-muted-foreground">
          {project.summary}
        </p>
      </header>

      {/* Galerie : un écran de verre où défilent les visuels du projet. */}
      <div className="mt-10 rounded-[2rem] p-2 glass-thick sm:p-3">
        <Carousel label={p.gallery} itemClassName="basis-full">
          {(media?.images ?? []).map((image, i) => (
            <figure key={image.file}>
              <ProjectVisual
                image={image}
                alt={project.gallery[i] ?? project.title}
                eager={i === 0}
                className="aspect-[16/9] rounded-[1.5rem]"
              />
              <figcaption className="mt-3 px-2 text-sm text-muted-foreground">
                {project.gallery[i]}
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>

      {(project.note || media?.link) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.note && (
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0" />
              {project.note}
            </p>
          )}
          {media?.link && (
            <a
              href={media.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform active:scale-[0.97]"
            >
              {p.link}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-20">
        {/* Fiche du projet. */}
        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 lg:sticky lg:top-28 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-14">
          {steps.map((step, i) => (
            <section
              key={step.title}
              className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h2>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-pretty text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </section>
          ))}

          {project.results.length > 0 && (
            <section className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[3rem_minmax(0,1fr)]">
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {String(steps.length + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  {p.results}
                </h2>
                <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <dt className="sr-only">{result.label}</dt>
                      <dd className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                        {result.value}
                      </dd>
                      <dd className="mt-2 text-muted-foreground">
                        {result.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Projet suivant */}
      <nav className="mt-24">
        <Link
          to="/projets/$slug"
          params={{ slug: next.slug }}
          className="group grid items-center gap-5 rounded-[1.75rem] p-3 glass transition-transform active:scale-[0.995] sm:grid-cols-[14rem_minmax(0,1fr)_auto] sm:pr-8"
        >
          {nextCover && (
            <ProjectVisual
              image={nextCover}
              alt={next.gallery[0] ?? next.title}
              className="aspect-[16/10] rounded-[1.25rem]"
            />
          )}
          <div className="px-2 sm:px-0">
            <p className="text-sm text-muted-foreground">{p.next}</p>
            <p className="mt-1 font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {next.title}
            </p>
          </div>
          <ArrowRight className="mx-2 mb-2 size-6 transition-transform group-hover:translate-x-1 sm:m-0" />
        </Link>
      </nav>
    </article>
  )
}
