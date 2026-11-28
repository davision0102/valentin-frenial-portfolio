import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { Carousel } from '@/components/carousel'
import { NotFound } from '@/components/not-found'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import {
  buttonOutline,
  card,
  cardTitle,
  chip,
  displayTitle,
  sectionTitle,
} from '@/lib/ui'

export const Route = createFileRoute('/projets/$slug')({
  component: ProjectPage,
})

/** Page détaillée d'un projet : /projets/<slug>. Contenu dans src/i18n. */
function ProjectPage() {
  const { slug } = Route.useParams()
  const { t } = useI18n()
  const p = t.project

  const index = t.projects.findIndex((project) => project.slug === slug)
  useDocumentTitle(index === -1 ? undefined : t.projects[index].title)
  if (index === -1) return <NotFound />

  const project = t.projects[index]
  const media = getProjectMedia(slug)
  const next = t.projects[(index + 1) % t.projects.length]

  const facts = [
    { label: p.client, value: project.client },
    { label: p.year, value: project.year },
    { label: p.format, value: project.format },
    { label: p.role, value: project.role },
  ].filter((fact) => fact.value) // une info vide n'est pas affichée

  return (
    <article className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">
      <Link
        to="/projets"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {p.back}
      </Link>

      <header className="mt-8 max-w-4xl animate-in duration-500 fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className={chip}>
              {tag}
            </li>
          ))}
        </ul>
        <h1 className={`${displayTitle} mt-4`}>{project.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          {project.summary}
        </p>
      </header>

      <Carousel
        label={p.gallery}
        className="mt-10 sm:mt-12"
        itemClassName="basis-[90%] md:basis-[75%]"
      >
        {(media?.images ?? []).map((image, i) => (
          <figure key={image.file}>
            <ProjectVisual
              image={image}
              alt={project.gallery[i] ?? project.title}
              eager={i === 0}
              className="aspect-[16/9] rounded-2xl"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {project.gallery[i]}
            </figcaption>
          </figure>
        ))}
      </Carousel>

      {(project.note || media?.link) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
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
              className={buttonOutline}
            >
              {p.link}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      )}

      {/* Fiche à gauche (collante sur grand écran), récit à droite. */}
      <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 lg:sticky lg:top-24 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-12 sm:gap-16">
          <Block title={p.challenge} text={project.challenge} />
          <Block title={p.solution} text={project.solution} />

          {project.results.length > 0 && (
            <section className="border-t border-border pt-6">
              <h2 className={sectionTitle}>{p.results}</h2>
              <dl className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
                {project.results.map((result) => (
                  <div key={result.label} className={`${card} p-6`}>
                    <dt className="sr-only">{result.label}</dt>
                    <dd className="text-4xl font-semibold tracking-tight text-brand">
                      {result.value}
                    </dd>
                    <dd className="mt-2 text-sm text-muted-foreground">
                      {result.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>

      <nav className="mt-16 border-t border-border pt-8 sm:mt-24">
        <p className="text-sm text-muted-foreground">{p.next}</p>
        <Link
          to="/projets/$slug"
          params={{ slug: next.slug }}
          className={`${cardTitle} group mt-2 inline-flex items-center gap-2 transition-colors hover:text-brand`}
        >
          {next.title}
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  )
}

/**
 * Un texte de projet : chaque chaîne est un paragraphe, chaque tableau une
 * liste à puces. « Intitulé : texte » met l'intitulé en gras.
 */
function Block({
  title,
  text,
}: {
  title: string
  text: readonly (string | readonly string[])[]
}) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className={sectionTitle}>{title}</h2>
      <div className="mt-4 grid max-w-3xl gap-4 text-lg leading-relaxed text-pretty text-muted-foreground">
        {text.map((part, i) =>
          typeof part === 'string' ? (
            <p key={i}>{part}</p>
          ) : (
            <ul key={i} className="grid list-disc gap-2 pl-5 marker:text-brand">
              {part.map((item) => {
                const match = /^([^:]{1,60}) : (.+)$/.exec(item)
                return (
                  <li key={item}>
                    {match ? (
                      <>
                        <strong className="font-medium text-foreground">
                          {match[1]}
                        </strong>{' '}
                        : {match[2]}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                )
              })}
            </ul>
          ),
        )}
      </div>
    </section>
  )
}
