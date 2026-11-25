import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Greeting } from '@/components/greeting'
import { Portrait } from '@/components/portrait'
import { ProjectCard } from '@/components/project-card'
import { Carousel } from '@/components/carousel'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'

export const Route = createFileRoute('/')({
  component: HomePage,
})

/** Entreprises (noms propres : identiques dans toutes les langues). */
const companies = [
  { name: 'Nexans', logo: 'nexans.svg' },
  { name: 'Chanel', logo: 'chanel.svg' },
  { name: 'Rémy Cointreau', logo: 'remy-cointreau.svg' },
]

/** Titre de section : grandes capitales serrées. */
const titleClass =
  'font-heading text-4xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance uppercase sm:text-6xl'

/** Bouton discret, bordé, en capitales. */
const outlineButton =
  'group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-xs font-semibold tracking-wide uppercase transition-colors hover:border-foreground/40'

function HomePage() {
  const { t } = useI18n()
  // Sur l'accueil, le métier suit le nom : « Valentin Frenial · Chef de projet… ».
  useEffect(() => {
    document.title = `${site.name} · ${t.home.hero.role.replace(/\.$/, '')}`
  }, [t])

  return (
    <>
      <Hero />
      <Intro />
      <Projects />
      <Services />
    </>
  )
}

/**
 * Hero : une grande carte bleu nuit sous la barre de navigation, la photo au
 * centre, le métier en petites capitales et le nom en très grand en bas.
 */
function Hero() {
  const { t } = useI18n()
  const h = t.home.hero
  const [first, ...rest] = site.name.split(' ')

  return (
    <section className="-mt-12 px-3">
      <div className="dark relative isolate mx-auto flex min-h-[max(36rem,calc(100svh-1.5rem))] max-w-[96rem] flex-col overflow-hidden rounded-[1.75rem] bg-ink text-foreground sm:rounded-[2.5rem]">
        {/* Halo bleu derrière la photo */}
        <div
          aria-hidden="true"
          className="absolute top-[12%] left-1/2 -z-10 size-[min(40rem,120vw)] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]"
        />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-10 text-center">
          <Portrait className="w-40 sm:w-56 lg:w-72" />
          <p className="mt-14 text-sm font-semibold tracking-[0.12em] text-brand uppercase sm:text-base">
            <Greeting words={h.greetings} />
          </p>
          <p className="mt-2 text-sm font-medium tracking-[0.08em] uppercase sm:text-base">
            {h.role.replace(/\.$/, '')}
          </p>
          <p className="mt-1 text-sm tracking-[0.08em] text-muted-foreground uppercase sm:text-base">
            {h.skills}
          </p>
        </div>

        <h1 className="px-3 pb-[0.12em] text-center font-heading text-[20vw] leading-[0.82] font-semibold tracking-[-0.06em] text-foreground/85 uppercase sm:text-[11.4vw] min-[96rem]:text-[11.25rem]">
          <span className="sr-only">
            {site.name}, {h.role}
          </span>
          <span aria-hidden="true">
            <span className="block sm:inline">{first}</span>{' '}
            <span className="block sm:inline">{rest.join(' ')}</span>
          </span>
        </h1>
      </div>
    </section>
  )
}

/**
 * Présentation : la phrase d'accroche, le lien vers la page À propos et les
 * entreprises ; les chiffres clés à droite.
 */
function Intro() {
  const { t } = useI18n()
  const h = t.home.hero
  const a = t.home.about

  return (
    <section
      id="a-propos"
      className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16"
    >
      <div>
        <h2 className={titleClass}>{a.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {h.pitch}
        </p>
        <Link to="/a-propos" className={`${outlineButton} mt-8`}>
          {a.moreAbout}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-6 sm:gap-x-10">
          <h3 className="w-full text-sm text-muted-foreground">
            {a.companiesTitle}
          </h3>
          {companies.map((company) => (
            // Logo d'une seule couleur (celle du texte) : il suit le mode clair / sombre.
            <span
              key={company.name}
              role="img"
              aria-label={company.name}
              className="block h-8 w-24 bg-foreground/80 [mask-size:contain] [mask-position:left_center] [mask-repeat:no-repeat]"
              style={{
                maskImage: `url(${import.meta.env.BASE_URL}logos/${company.logo})`,
              }}
            />
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-4 sm:gap-8 lg:grid-cols-1 lg:content-start lg:gap-6">
        {h.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse border-t border-border pt-4"
          >
            <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-4xl font-semibold tracking-[-0.04em] tabular-nums sm:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
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
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <h2 className={titleClass}>{p.title}</h2>
        <Link to="/projets" className={outlineButton}>
          {p.seeAll}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Tous les projets dans un seul carrousel ; la ligne sous chaque titre
          indique s'il s'agit d'e-learning ou de design. */}
      <Carousel
        label={p.title}
        className="mt-10 sm:mt-12"
        itemClassName="basis-[85%] sm:basis-[60%] md:basis-[46%]"
      >
        {t.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Carousel>
    </section>
  )
}

/** Savoir-faire : quatre colonnes numérotées, sans cartes. */
function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="border-t border-border pt-16 sm:pt-24">
        <h2 className={`${titleClass} max-w-4xl`}>{s.title}</h2>

        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map(({ title, text }, i) => (
            <li key={title}>
              <span className="text-sm font-semibold text-brand tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
