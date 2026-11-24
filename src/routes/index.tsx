import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  ClipboardList,
  GraduationCap,
  Mail,
  Palette,
  Play,
} from 'lucide-react'
import { Carousel } from '@/components/carousel'
import { ProjectVisual } from '@/components/project-visual'
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
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0 animate-in duration-700 fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand" />
            {h.intro}
          </span>

          <h1 className="mt-6 text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl">
            {h.hello} {site.name.split(' ')[0]}
            <span className="text-brand">.</span>
            <span className="mt-2 block text-muted-foreground">{h.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            {h.pitch}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="projets"
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5')}
            >
              {h.seeProjects}
              <ArrowDown data-icon="inline-end" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-11 px-5',
              )}
            >
              <Mail data-icon="inline-start" />
              {h.contactMe}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {h.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <CourseCard />
      </div>
    </section>
  )
}

/** Clin d'œil au métier : le hero montre une « carte de module » e-learning. */
function CourseCard() {
  const { t } = useI18n()
  const c = t.home.hero.card
  const doneCount = 2
  const progress = Math.round(((doneCount + 0.5) / c.lessons.length) * 100)

  return (
    <div className="min-w-0 animate-in delay-150 duration-700 fill-mode-both fade-in slide-in-from-bottom-6 motion-reduce:animate-none">
      <div className="relative mx-auto max-w-md rotate-1 rounded-3xl border border-border bg-card p-6 shadow-2xl ring-1 shadow-foreground/10 ring-foreground/5 transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
            {c.label}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {progress}%
          </span>
        </div>

        <h2 className="mt-4 text-xl font-semibold tracking-tight">{c.title}</h2>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-label={c.progress}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="mt-6 space-y-2">
          {c.lessons.map((lesson, i) => {
            const done = i < doneCount
            const current = i === doneCount
            return (
              <li
                key={lesson}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm',
                  current && 'bg-secondary',
                )}
              >
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full border text-xs font-medium',
                    done && 'border-brand bg-brand text-brand-foreground',
                    current && 'border-brand text-brand',
                    !done && !current && 'border-border text-muted-foreground',
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" />
                  ) : current ? (
                    <Play className="size-3 fill-current" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    'flex-1',
                    !done && !current && 'text-muted-foreground',
                  )}
                >
                  {lesson}
                </span>
                {done && (
                  <span className="text-xs text-muted-foreground">
                    {c.done}
                  </span>
                )}
                {current && (
                  <span className="text-xs font-medium text-brand">
                    {c.current}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
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
      <SectionHeading eyebrow={p.eyebrow} title={p.title} text={p.text} />

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
        <SectionHeading eyebrow={s.eyebrow} title={s.title} />

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
        <SectionHeading eyebrow={a.eyebrow} title={a.title} />
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
      <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-12 text-center text-background sm:px-8 sm:px-16 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl"
        />
        <h2 className="relative text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {c.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-background/70">
          {c.text}
        </p>
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
              'h-11 px-5 text-background hover:bg-background/10 hover:text-background',
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

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  )
}
