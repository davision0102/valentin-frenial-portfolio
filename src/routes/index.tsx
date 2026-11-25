import { useEffect } from 'react'
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
import { ContactComposer } from '@/components/contact-composer'
import { Greeting } from '@/components/greeting'
import { Portrait } from '@/components/portrait'
import { ProjectCard } from '@/components/project-card'
import { Carousel } from '@/components/carousel'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const serviceIcons = [GraduationCap, Palette, Clapperboard, ClipboardList]

/** Entreprises (noms propres : identiques dans toutes les langues). */
const companies = [
  { name: 'Nexans', logo: 'nexans.svg' },
  { name: 'Chanel', logo: 'chanel.svg' },
  { name: 'Rémy Cointreau', logo: 'remy-cointreau.svg' },
]

function HomePage() {
  const { t } = useI18n()
  // Sur l'accueil, le métier suit le nom : « Valentin Frenial · Chef de projet… ».
  useEffect(() => {
    document.title = `${site.name} · ${t.home.hero.role.replace(/\.$/, '')}`
  }, [t])

  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <About />
      <ContactComposer />
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
          <h1 className="text-[clamp(2.5rem,5.2vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            <span className="sr-only">
              {h.greetings[0]}, {h.intro} {site.name.split(' ')[0]}.
            </span>
            <span aria-hidden="true">
              <span className="block">
                <Greeting words={h.greetings} className="text-brand" />,
              </span>
              {h.intro} {site.name.split(' ')[0]}.
            </span>
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
            <Link
              to="/"
              hash="ecrire"
              className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium glass transition-transform active:scale-[0.97]"
            >
              <Mail className="size-4" />
              {h.contactMe}
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm sm:flex-nowrap">
            {h.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'flex items-baseline gap-1.5 whitespace-nowrap',
                  i > 0 && 'sm:border-l sm:border-border sm:pl-6',
                )}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-lg font-semibold tabular-nums">
                  {stat.value}
                </dd>
                <dd className="text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Portrait className="mx-auto max-w-[9rem] max-lg:order-first sm:max-w-[12rem] lg:max-w-[18rem]" />
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
              key={company.name}
              className="grid h-24 place-items-center rounded-3xl border border-border bg-card px-6"
            >
              {/* Logo d'une seule couleur (celle du texte) : il suit le mode clair / sombre. */}
              <span
                role="img"
                aria-label={company.name}
                className="block h-10 w-full max-w-[8.5rem] bg-foreground/85 [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]"
                style={{
                  maskImage: `url(${import.meta.env.BASE_URL}logos/${company.logo})`,
                }}
              />
            </li>
          ))}
        </ul>
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
