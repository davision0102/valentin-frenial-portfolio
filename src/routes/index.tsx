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
import { useAmbient } from '@/hooks/use-ambient'
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
  // Le fond ambiant prend les couleurs du premier projet.
  useAmbient(getProjectMedia(t.projects[0].slug)?.images[0]?.file)

  return (
    <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-16">
      <h1 className="mx-auto text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
        {h.hello} {site.name.split(' ')[0]}.
        <span className="block text-muted-foreground">{h.role}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
        {h.pitch}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
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
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {h.stats.map((stat) => (
          <li key={stat.label} className="rounded-full px-4 py-2 text-sm glass">
            <span className="font-semibold">{stat.value}</span>{' '}
            <span className="text-muted-foreground">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
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
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16"
    >
      <SectionHeading title={p.title} text={p.text} />
      {groups.map((group) => (
        <div key={group.category} className="mt-12 sm:mt-16">
          <h3 className="flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.02em]">
            <span
              className={cn(
                'size-2.5 rounded-full',
                group.category === 'learning'
                  ? 'bg-track-learning'
                  : 'bg-track-design',
              )}
            />
            {group.title}
          </h3>
          <Carousel
            label={group.title}
            className="mt-6"
            itemClassName="basis-[86%] sm:basis-[60%] lg:basis-[52%]"
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

/** Grande carte de projet, à la manière des carrousels du site d'Apple. */
function ProjectCard({
  project,
}: {
  project: ReturnType<typeof useI18n>['t']['projects'][number]
}) {
  const { t } = useI18n()
  const cover = getProjectMedia(project.slug)?.images[0]
  const meta = [project.client, project.year].filter(Boolean).join(' · ')

  return (
    <Link
      to="/projets/$slug"
      params={{ slug: project.slug }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card/85 transition-[transform,box-shadow] duration-300 hover:shadow-2xl hover:shadow-foreground/10 active:scale-[0.99]"
    >
      <div className="p-6 pb-5 sm:p-8 sm:pb-6">
        <p className="text-sm font-medium text-muted-foreground">{meta}</p>
        <h4 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
          {project.title}
        </h4>
        <p className="mt-3 line-clamp-2 max-w-prose leading-relaxed text-pretty text-muted-foreground">
          {project.summary}
        </p>
      </div>
      {cover && (
        <ProjectVisual
          image={cover}
          alt={project.gallery[0] ?? project.title}
          className="mt-auto aspect-[16/10]"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute right-5 bottom-5 grid size-11 place-items-center rounded-full glass transition-transform group-hover:scale-110"
      >
        <ArrowUpRight className="size-5" />
      </span>
      <span className="sr-only">{t.home.projects.open}</span>
    </Link>
  )
}

function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading title={s.title} />
      <dl className="mt-10 grid gap-x-16 sm:mt-14 sm:grid-cols-2">
        {s.items.map(({ title, text }, i) => {
          const Icon = serviceIcons[i]
          return (
            <div
              key={title}
              className="flex gap-5 border-t border-border py-7 sm:py-8"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-track-skill/15 text-track-skill">
                <Icon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.75}
                />
              </span>
              <div>
                <dt className="text-lg font-semibold tracking-[-0.01em]">
                  {title}
                </dt>
                <dd className="mt-2 max-w-md leading-relaxed text-pretty text-muted-foreground">
                  {text}
                </dd>
              </div>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

function About() {
  const { t } = useI18n()
  const a = t.home.about

  return (
    <section
      id="a-propos"
      className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20"
    >
      <div>
        <h2 className="text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">
          {a.title}
        </h2>
        <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          {a.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="lg:self-end">
        <h3 className="text-sm font-medium text-muted-foreground">
          {a.companiesTitle}
        </h3>
        <ul className="mt-4 flex flex-wrap items-baseline gap-x-10 gap-y-2 border-t border-border pt-6">
          {companies.map((company) => (
            <li
              key={company}
              className="font-heading text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Contact : le dernier bloc de la page. */
function Contact() {
  const { t } = useI18n()
  const c = t.home.contact

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-24"
    >
      <div className="rounded-[2rem] bg-foreground px-6 py-16 text-center text-background sm:px-16 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-background/70">
          {c.text}
        </p>
        <dl className="mx-auto mt-12 grid max-w-md gap-3 text-left">
          <CreditLine label="E-mail">
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </CreditLine>
          <CreditLine label="LinkedIn">
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {site.name}
            </a>
          </CreditLine>
        </dl>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-background px-5 text-sm font-medium text-foreground transition-transform active:scale-[0.97]"
          >
            <Mail className="size-4" />
            {c.email}
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-background ring-1 ring-background/25 transition-[transform,background-color] hover:bg-background/10 active:scale-[0.97]"
          >
            {c.linkedin}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function CreditLine({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-4">
      <dt className="text-right text-sm text-background/60">{label}</dt>
      <span
        aria-hidden="true"
        className="size-1 rounded-full bg-background/40"
      />
      <dd className="truncate font-medium">{children}</dd>
    </div>
  )
}

function SectionHeading({ title, text }: { title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  )
}
