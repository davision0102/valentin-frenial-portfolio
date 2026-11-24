import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowRight,
  Clapperboard,
  ClipboardList,
  GraduationCap,
  Mail,
  Palette,
} from 'lucide-react'
import { Portrait } from '@/components/portrait'
import { ProjectCard } from '@/components/project-card'
import { Carousel } from '@/components/carousel'
import { buttonVariants } from '@/components/ui/button'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const serviceIcons = [GraduationCap, Palette, Clapperboard, ClipboardList]

/** Entreprises (noms propres : identiques dans toutes les langues). */
const companies = ['Nexans', 'Chanel', 'Rémy Cointreau']

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
    <section>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
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

        <Portrait
          caption={companies.slice(0, 2).join(' · ')}
          className="mx-auto max-w-[13rem] max-lg:order-first sm:max-w-xs lg:max-w-none"
        />
      </div>
    </section>
  )
}

function Projects() {
  const { t } = useI18n()
  const p = t.home.projects

  return (
    <section
      id="projets"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24"
    >
      <SectionHeading title={p.title} text={p.text} />

      {/* Tous les projets dans un seul carrousel ; l'étiquette de chaque carte
          indique s'il s'agit d'e-learning ou de design. */}
      <Carousel
        label={p.title}
        className="mt-10 sm:mt-12"
        itemClassName="basis-[85%] sm:basis-[60%] md:basis-[45%]"
      >
        {t.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>

      <Link
        to="/projets"
        className="group mt-10 inline-flex items-center gap-2 font-medium text-brand sm:mt-12"
      >
        {p.seeAll}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  )
}

function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading title={s.title} />

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
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
      className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <SectionHeading title={a.title} />
        <div className="mt-6 space-y-4 text-lg text-pretty text-muted-foreground">
          {a.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          to="/a-propos"
          className="group mt-8 inline-flex items-center gap-2 font-medium text-brand"
        >
          {a.moreAbout}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="lg:pt-10">
        <h3 className="text-sm font-medium text-muted-foreground">
          {a.companiesTitle}
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {companies.map((company) => (
            <li
              key={company}
              className="grid h-24 place-items-center rounded-3xl border border-border bg-card px-4 text-center font-heading text-xl font-semibold tracking-tight"
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
      <div className="relative overflow-hidden rounded-[2rem] bg-spotlight px-6 py-12 text-center text-white sm:px-16 sm:py-16">
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
