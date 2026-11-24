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
import { Reel } from '@/components/reel'
import { getProjectMedia } from '@/config/projects'
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
      <Credits />
    </>
  )
}

function Hero() {
  const { t } = useI18n()
  const h = t.home.hero
  const [first, ...rest] = site.name.split(' ')

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pb-24">
      <Reel
        intro={
          <div className="flex flex-col justify-center lg:py-6">
            <p className="text-lg text-muted-foreground">{h.hello}</p>
            <h1 className="mt-1 text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              {first}
              <br />
              {rest.join(' ')}
            </h1>
            <p className="mt-5 text-xl font-medium tracking-[-0.01em] sm:text-2xl">
              {h.role}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-pretty text-muted-foreground">
              {h.pitch}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
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
          </div>
        }
      />
    </section>
  )
}

function Projects() {
  const { t } = useI18n()
  const p = t.home.projects

  return (
    <section
      id="projets"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading title={p.title} text={p.text} />

      <ul className="mt-10 grid gap-4 sm:mt-14">
        {t.projects.map((project) => {
          const cover = getProjectMedia(project.slug)?.images[0]
          const learning = project.category === 'learning'
          const meta = [project.client, project.year]
            .filter(Boolean)
            .join(' · ')
          return (
            <li key={project.slug}>
              <Link
                to="/projets/$slug"
                params={{ slug: project.slug }}
                className="group grid gap-5 rounded-[1.75rem] border border-border bg-card/80 p-3 transition-[transform,box-shadow] duration-300 hover:shadow-xl hover:shadow-foreground/5 active:scale-[0.995] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-8"
              >
                {cover && (
                  <ProjectVisual
                    image={cover}
                    alt={project.gallery[0] ?? project.title}
                    className="aspect-[16/10] rounded-[1.25rem]"
                  />
                )}
                <div className="flex flex-col px-2 pb-3 md:py-4 md:pr-6">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        learning ? 'bg-track-learning' : 'bg-track-design',
                      )}
                    />
                    {learning ? p.learning : p.design}
                    <span aria-hidden="true">·</span>
                    {meta}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-pretty text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">
                    {p.open}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
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

/** Générique de fin : le contact, comme les dernières lignes d'un film. */
function Credits() {
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
