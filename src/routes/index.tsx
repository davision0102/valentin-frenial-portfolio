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
    <section className="relative isolate -mt-[3.75rem] flex min-h-[max(40rem,100svh)] flex-col overflow-hidden bg-ink pt-28 text-foreground lg:pt-0">
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
          {/* Chiffres clés, sur une ligne sous la présentation. */}
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {h.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                  {stat.value}
                </dd>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
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
                <span className="px-[0.35em] font-heading text-[clamp(3.5rem,9vw,8.5rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-heading">
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
      <h2 className={titleClass}>{p.title}</h2>

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

      {/* Comme partout : le bouton vient après le contenu, aligné à gauche. */}
      <Link to="/projets" className={`${buttonOutline} mt-10 sm:mt-12`}>
        {p.seeAll}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  )
}

/**
 * Savoir-faire : quatre blocs doux en grille (deux par ligne sur grand
 * écran), sans traits : un numéro, un intitulé et une phrase.
 */
function Services() {
  const { t } = useI18n()
  const s = t.home.services

  return (
    <section className="mx-auto max-w-[96rem] px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16">
      <h2 className={`${titleClass} max-w-4xl`}>{s.title}</h2>

      <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
        {s.items.map(({ title, text }, i) => (
          <li
            key={title}
            className="group rounded-2xl bg-secondary/70 p-8 transition-colors duration-300 hover:bg-secondary sm:p-10"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-brand tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:mt-10 sm:text-3xl">
              {title}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-pretty text-muted-foreground">
              {text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
