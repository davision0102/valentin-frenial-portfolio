import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { tones } from '@/lib/tones'
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
    <section className="relative isolate -mt-16 flex min-h-[max(34rem,100svh)] flex-col justify-center overflow-hidden bg-background pt-28 pb-16 text-foreground lg:pt-20 lg:pb-20">
      <h1 className="sr-only">
        {site.name}, {h.role}
      </h1>
      {/* Le bandeau de salutations, puis le texte et la photo, centrés
          l'un par rapport à l'autre. */}
      <GreetingsMarquee words={h.greetings} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pt-10 sm:px-8 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:pt-0">
        {/* Présentation ancrée : métier en petites capitales, phrase d'accroche
            en grand, détail en plus discret, puis les chiffres en pastilles,
            le tout aligné sur le bas de la photo. */}
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
            {h.role.replace(/\.$/, '')}
          </p>
          <p className="mt-4 font-heading text-xl leading-snug font-medium tracking-[-0.01em] text-pretty text-heading sm:text-2xl">
            {h.bio[0]}
          </p>
          <div className="mt-4 space-y-3 leading-relaxed text-pretty text-muted-foreground">
            {h.bio.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {/* Chiffres clés : trois pastilles douces, sur une ligne. */}
          <dl className="mt-6 flex flex-wrap gap-2">
            {h.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline gap-1.5 rounded-full px-4 py-2 ${tones[i % tones.length].bg}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className={`font-heading text-base font-semibold tabular-nums ${tones[i % tones.length].text}`}
                >
                  {stat.value}
                </dd>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo : le fond de la carte reprend celui de la photo ronde, agrandie
            pour que le bord du cercle sorte du cadre. */}
        <div className="relative z-10 aspect-[4/5] w-full max-w-[12rem] self-center overflow-hidden rounded-3xl bg-[#ddeffc] max-lg:order-first sm:max-w-[14rem] lg:w-[min(18vw,16rem)] lg:max-w-none lg:self-center">
          <img
            src={`${import.meta.env.BASE_URL}valentin.png`}
            alt={h.photoAlt}
            className="absolute bottom-[-15%] left-1/2 w-[170%] max-w-none -translate-x-1/2"
          />
        </div>
      </div>

      <ClientLogos />

      {/* Invitation à descendre (grand écran) : un clic fait défiler jusqu'aux
          projets. Sur téléphone, on fait défiler naturellement. */}
      <a
        href="#projets"
        onClick={(event) => {
          event.preventDefault()
          const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches
          document
            .getElementById('projets')
            ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
        }}
        className="group mx-auto mt-10 hidden flex-col items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:flex"
      >
        {h.scrollCue}
        <ArrowDown className="size-4 motion-safe:animate-bounce" />
      </a>
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

/**
 * Les entreprises pour lesquelles Valentin a travaillé, en bas du hero : un
 * intitulé discret et les logos (en couleur en clair, blancs en sombre).
 */
function ClientLogos() {
  const { t } = useI18n()

  return (
    <div className="mx-auto mt-10 flex flex-col items-center gap-3 px-5 text-center">
      <p className="text-sm text-muted-foreground">
        {t.home.about.companiesTitle}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
        {companies.map((company) => {
          const src = `${import.meta.env.BASE_URL}logos/${company.logo}`
          return (
            <span key={company.name} className="contents">
              {/* Clair : le logo dans ses vraies couleurs. */}
              <img
                src={src}
                alt={company.name}
                className="h-8 w-20 object-contain sm:h-10 sm:w-32 dark:hidden"
              />
              {/* Sombre : le même logo, tout en blanc. */}
              <span
                role="img"
                aria-label={company.name}
                className="hidden h-8 w-20 bg-white [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] sm:h-10 sm:w-32 dark:block"
                style={{ maskImage: `url(${src})` }}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Projects() {
  const { t } = useI18n()
  const p = t.home.projects

  return (
    <section
      id="projets"
      className="scroll-mt-20 pt-16 pb-16 sm:pt-24 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Le titre à gauche, le lien vers tous les projets à droite. */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <h2 className={titleClass}>{p.title}</h2>
          <Link to="/projets" className={`${buttonOutline} max-sm:hidden`}>
            {p.seeAll}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <ProjectsMarquee />

      {/* Sur téléphone, le bouton vient après les vignettes. */}
      <div className="mt-8 px-5 sm:hidden">
        <Link to="/projets" className={`${buttonOutline} w-full`}>
          {p.seeAll}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
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
            className="flex shrink-0 gap-8 pr-8"
          >
            {t.projects.map((project) => {
              const cover = getProjectMedia(project.slug)?.images[0]
              return (
                <li
                  key={project.slug}
                  className="w-80 shrink-0 sm:w-[28rem] lg:w-[32rem]"
                >
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
                        eager
                        className="aspect-[4/3] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                    <span className="mt-4 block font-heading text-base font-semibold tracking-tight uppercase">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
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
 * Savoir-faire : quatre cartes blanches côte à côte sur grand écran (deux
 * par ligne sur tablette) : un numéro en couleur, un intitulé et une phrase.
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
            className="rounded-2xl bg-card p-6 shadow-sm shadow-foreground/5 sm:p-8"
          >
            <span
              className={`inline-block rounded-full px-2.5 py-1 font-mono text-xs tracking-[0.18em] tabular-nums ${tones[i % tones.length].bg} ${tones[i % tones.length].text}`}
            >
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
