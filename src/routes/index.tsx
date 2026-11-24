import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  ClipboardList,
  GraduationCap,
  Mail,
  Palette,
} from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { Carousel } from '@/components/carousel'
import { getProjectMedia } from '@/config/projects'
import { buttonVariants } from '@/components/ui/button'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const serviceIcons = [GraduationCap, Palette, Clapperboard, ClipboardList]

/** Entreprises (noms propres : identiques dans toutes les langues). */
const companies = ['Nexans', 'Chanel']

function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <About />
      <Contact />
    </>
  )
}

function Hero() {
  const { t } = useI18n()
  const h = t.home.hero

  return (
    <section className="relative isolate overflow-hidden">
      {/* Halos de couleur tirés de la palette, derrière le haut de page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-brand/25 blur-[110px]" />
        <div className="absolute top-10 -right-24 size-[28rem] rounded-full bg-track-design/20 blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            {h.hello} {site.name.split(' ')[0]}.
            <span className="block text-muted-foreground">{h.role}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {h.pitch}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link
              to="/"
              hash="projets"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform active:scale-[0.97]"
            >
              {h.seeProjects}
              <ArrowDown className="size-4" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium glass transition-transform active:scale-[0.97]"
            >
              <Mail className="size-4" />
              {h.contactMe}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {h.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-full px-4 py-2 text-sm glass"
              >
                <span className="font-semibold">{stat.value}</span>{' '}
                <span className="text-muted-foreground">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <HeroPhoto />
      </div>
    </section>
  )
}

/**
 * Photo de Valentin, en portrait. Déposer le fichier dans public/valentin.jpg :
 * il s'affiche tout seul. En attendant, ce sont ses initiales.
 */
function HeroPhoto() {
  const { t } = useI18n()
  const [missing, setMissing] = useState(false)

  return (
    <figure className="relative mx-auto w-full max-w-[12rem] max-lg:order-first sm:max-w-xs lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 shadow-brand/20 ring-border">
        {missing ? (
          <span
            role="img"
            aria-label={t.home.hero.photoAlt}
            className="grid size-full place-items-center bg-linear-to-br from-spotlight to-brand font-heading text-7xl font-semibold tracking-[-0.04em] text-white"
          >
            {site.initials}
          </span>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}valentin.jpg`}
            alt={t.home.hero.photoAlt}
            onError={() => setMissing(true)}
            className="size-full object-cover"
          />
        )}
      </div>
      <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium glass">
        <span className="size-2 rounded-full bg-track-skill" />
        {companies.join(' · ')}
      </figcaption>
    </figure>
  )
}

function Projects() {
  const { t } = useI18n()
  const p = t.home.projects
  const groups = [
    { category: 'learning', title: p.learning },
    { category: 'design', title: p.design },
  ]

  return (
    <section
      id="projets"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading title={p.title} text={p.text} />

      {groups.map((group) => (
        <div key={group.category} className="mt-14">
          <h3 className="text-xl font-semibold tracking-tight">
            {group.title}
          </h3>
          <Carousel
            label={group.title}
            className="mt-6"
            itemClassName="basis-[85%] sm:basis-[60%] md:basis-[45%]"
          >
            {t.projects
              .filter((project) => project.category === group.category)
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </Carousel>
        </div>
      ))}
    </section>
  )
}

function ProjectCard({
  project,
}: {
  project: ReturnType<typeof useI18n>['t']['projects'][number]
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
          image={cover}
          alt={project.gallery[0]}
          className="aspect-[16/9] border-b border-border"
        />
      )}
      <div className="p-6">
        <p className="text-xs font-medium text-muted-foreground">{meta}</p>
        <h4 className="mt-2 flex items-start justify-between gap-4 font-heading text-xl font-semibold tracking-tight">
          {project.title}
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
        </h4>
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

function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading title={s.title} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map(({ title, text }, i) => {
            const Icon = serviceIcons[i]
            return (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t } = useI18n()
  const a = t.home.about

  return (
    <section
      id="a-propos"
      className="mx-auto grid max-w-6xl scroll-mt-20 gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2"
    >
      <div>
        <SectionHeading title={a.title} />
        <div className="mt-6 space-y-4 text-lg text-pretty text-muted-foreground">
          {a.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="lg:pt-10">
        <h3 className="text-sm font-medium text-muted-foreground">
          {a.companiesTitle}
        </h3>
        <ul className="mt-6 grid grid-cols-2 gap-4">
          {companies.map((company) => (
            <li
              key={company}
              className="grid h-28 place-items-center rounded-3xl border border-border bg-card font-heading text-2xl font-semibold tracking-tight"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useI18n()
  const c = t.home.contact

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-spotlight px-6 py-12 text-center text-white sm:px-8 sm:px-16 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl"
        />
        <h2 className="relative text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {c.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-white/70">{c.text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 bg-brand px-5 text-brand-foreground hover:bg-brand/90',
            )}
          >
            <Mail data-icon="inline-start" />
            {c.email}
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'h-11 px-5 text-white hover:bg-white/10 hover:text-white',
            )}
          >
            {c.linkedin}
            <ArrowRight data-icon="inline-end" />
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ title, text }: { title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  )
}
