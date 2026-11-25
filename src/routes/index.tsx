import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
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
      <Clients />
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
    <section className="relative isolate -mt-16 flex min-h-[max(34rem,100svh)] flex-col justify-center overflow-hidden bg-ink pt-28 pb-16 text-foreground lg:pb-20">
      <h1 className="sr-only">
        {site.name}, {h.role}
      </h1>
      {/* Le bandeau est dans le flux ; sur grand écran, la ligne du dessous
          remonte un peu pour que la photo passe devant lui. */}
      <GreetingsMarquee words={h.greetings} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pt-10 sm:px-8 lg:-mt-12 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pt-0">
        {/* Présentation ancrée : métier en petites capitales, phrase d'accroche
            en grand, détail en plus discret, puis les chiffres en pastilles,
            le tout aligné sur le bas de la photo. */}
        <div className="max-w-xl lg:mt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
            {h.role.replace(/\.$/, '')}
          </p>
          <p className="mt-4 font-heading text-xl leading-snug font-medium tracking-[-0.01em] text-pretty text-heading sm:text-2xl">
            {h.bio[0]}
          </p>
          <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
            {h.bio[1]}
          </p>
          {/* Chiffres clés : trois pastilles douces, sur une ligne. */}
          <dl className="mt-6 flex flex-wrap gap-2">
            {h.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-1.5 rounded-full bg-secondary px-4 py-2"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-base font-semibold text-heading tabular-nums">
                  {stat.value}
                </dd>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo : le fond de la carte reprend celui de la photo ronde, agrandie
            pour que le bord du cercle sorte du cadre. */}
        <div className="relative z-10 aspect-[4/5] w-full max-w-[12rem] self-start overflow-hidden rounded-3xl bg-[#ddeffc] max-lg:order-first sm:max-w-[24rem] lg:w-[min(24vw,22rem)] lg:max-w-none lg:self-end">
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
                <span className="px-[0.35em] font-heading text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-heading/15">
                  {word}
                </span>
                <span className="size-2.5 shrink-0 rounded-full bg-brand/35 sm:size-3" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Les entreprises pour lesquelles Valentin a travaillé : un intitulé et les logos, centrés. */
function Clients() {
  const { t } = useI18n()

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-16">
      <h2 className="text-sm font-normal text-muted-foreground">
        {t.home.about.companiesTitle}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
        {companies.map((company) => (
          // Logo d'une seule couleur (celle du texte) : il suit le thème.
          <span
            key={company.name}
            role="img"
            aria-label={company.name}
            className="block h-9 w-28 bg-foreground/80 [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] sm:h-10 sm:w-32"
            style={{
              maskImage: `url(${import.meta.env.BASE_URL}logos/${company.logo})`,
            }}
          />
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const { t } = useI18n()
  const p = t.home.projects

  return (
    <section id="projets" className="scroll-mt-20 pt-6 pb-16 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Le titre à gauche, le lien vers tous les projets à droite. */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <h2 className={titleClass}>{p.title}</h2>
          <Link to="/projets" className={buttonOutline}>
            {p.seeAll}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <ProjectsMarquee />
    </section>
  )
}

/**
 * Projets de l'accueil : toutes les vignettes défilent en boucle d'un bord
 * à l'autre de l'écran, en pause au survol ; chaque vignette ouvre son
 * projet. La page Projets sert à les parcourir en détail.
 */
function ProjectsMarquee() {
  const { t } = useI18n()

  return (
    <div className="group/defile mt-10 overflow-hidden sm:mt-12">
      <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover/defile:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-6 pr-6"
          >
            {t.projects.map((project) => {
              const cover = getProjectMedia(project.slug)?.images[0]
              return (
                <li key={project.slug} className="w-64 shrink-0 sm:w-72">
                  <Link
                    to="/projets/$slug"
                    params={{ slug: project.slug }}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group block"
                  >
                    {cover && (
                      <ProjectVisual
                        image={{ ...cover, fit: 'contain' }}
                        alt=""
                        className="aspect-[4/3] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                    <span className="mt-4 block font-heading text-sm font-semibold tracking-tight uppercase">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {[project.client, project.year]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}

/**
 * Savoir-faire : quatre blocs doux côte à côte sur grand écran (deux par
 * ligne sur tablette), sans traits : un numéro, un intitulé et une phrase.
 */
function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-16">
      <h2 className={`${titleClass} max-w-4xl`}>{s.title}</h2>

      <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {s.items.map(({ title, text }, i) => (
          <li
            key={title}
            className="group rounded-2xl bg-secondary/70 p-6 transition-colors duration-300 hover:bg-secondary sm:p-8"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-brand tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight sm:mt-8">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
              {text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
