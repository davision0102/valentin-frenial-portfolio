import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { ProjectCard } from '@/components/project-card'
import { Carousel } from '@/components/carousel'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { buttonOutline } from '@/lib/ui'
import { cn } from '@/lib/utils'

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
  'font-heading text-3xl leading-[0.95] font-semibold tracking-[-0.03em] text-balance uppercase sm:text-4xl'

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
 * Hero : sur un bleu nuit profond, « Bonjour · Hello · Hola » défile en
 * grand et sans fin, derrière la photo. En bas à gauche, une courte
 * présentation et un bouton ; la photo en bas à droite.
 */
function Hero() {
  const { t } = useI18n()
  const h = t.home.hero

  return (
    <section className="dark relative isolate -mt-[3.75rem] flex min-h-[max(40rem,100svh)] flex-col overflow-hidden bg-ink pt-28 text-foreground lg:pt-0">
      <h1 className="sr-only">
        {site.name}, {h.role}
      </h1>
      <GreetingsMarquee
        words={h.greetings}
        className="lg:absolute lg:inset-x-0 lg:top-[42%] lg:-translate-y-1/2"
      />

      <div className="relative mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-10 px-4 pt-10 pb-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pt-0 lg:pb-20">
        <div className="max-w-md lg:mb-6">
          <p className="text-lg leading-relaxed text-pretty">{h.bio}</p>
          <Link to="/" hash="projets" className={`${buttonOutline} mt-8`}>
            {h.seeProjects}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </Link>
        </div>

        {/* Photo : le fond de la carte reprend celui de la photo ronde, agrandie
            pour que le bord du cercle sorte du cadre. */}
        <div className="relative z-10 aspect-[4/5] w-full max-w-[15rem] self-start overflow-hidden rounded-3xl bg-[#ddeffc] max-lg:order-first sm:max-w-[24rem] lg:w-[min(30vw,28rem)] lg:max-w-none lg:self-end">
          <img
            src={`${import.meta.env.BASE_URL}valentin.png`}
            alt={h.photoAlt}
            className="absolute bottom-[-15%] left-1/2 w-[170%] max-w-none -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Bandeau de salutations qui défile en boucle. La liste est doublée : quand
 * la première moitié est sortie, l'animation repart sans saut.
 * Arrêté si le visiteur préfère moins d'animations.
 */
function GreetingsMarquee({
  words,
  className,
}: {
  words: readonly string[]
  className?: string
}) {
  // Assez de mots pour dépasser la largeur des grands écrans.
  const row = [...words, ...words, ...words]
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((word, i) => (
              <span key={i} className="flex items-center">
                <span className="px-[0.35em] font-heading text-[clamp(3.5rem,9vw,8.5rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap">
                  {word}
                </span>
                <span className="size-3 shrink-0 rounded-full bg-brand sm:size-4" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Présentation : la phrase d'accroche et le lien vers la page À propos à
 * gauche, les entreprises à droite, puis les chiffres clés sur une ligne.
 */
function Intro() {
  const { t } = useI18n()
  const h = t.home.hero
  const a = t.home.about

  return (
    <section
      id="a-propos"
      className="mx-auto max-w-[96rem] scroll-mt-20 px-4 py-16 sm:px-8 sm:py-24 lg:px-16"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
        <div>
          <h2 className={titleClass}>{a.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {h.pitch}
          </p>
          <Link to="/a-propos" className={`${buttonOutline} mt-8`}>
            {a.moreAbout}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="lg:pt-2">
          <h3 className="text-sm text-muted-foreground">{a.companiesTitle}</h3>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-6 sm:gap-x-8">
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
      </div>

      {/* Chiffres clés : une ligne, trois colonnes séparées par un trait. */}
      <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border sm:mt-16">
        {h.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 px-3 py-5 first:pl-0 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2.5 sm:px-8 sm:py-6"
          >
            <dd className="order-first font-heading text-2xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl">
              {stat.value}
            </dd>
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
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
      className="mx-auto max-w-[96rem] scroll-mt-20 px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <h2 className={titleClass}>{p.title}</h2>
        <Link to="/projets" className={buttonOutline}>
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
    <section className="mx-auto max-w-[96rem] px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16">
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
