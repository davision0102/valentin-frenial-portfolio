import { createFileRoute } from '@tanstack/react-router'
import { imageUrl } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

/**
 * Les 4 photos, de gauche à droite. Provisoire : des images de projets, en
 * attendant de vraies photos de Valentin.
 */
const photos = [
  'minute-metier-2.jpg',
  'nymphe-essentials-2.jpg',
  'climate-training-5.jpg',
  'kit-chanel-25-1.jpg',
]

/** Au repos : inclinaison de chaque carte (elles se chevauchent en éventail). */
const tilts = ['-8deg', '-3deg', '3deg', '8deg']

/**
 * Page À propos : une petite photo ronde, un titre, un court texte, puis 4
 * photos perso qui s'alignent au survol avec une petite légende. Le pied de page suit directement.
 */
function AboutPage() {
  const { t } = useI18n()
  const a = t.aboutPage
  useDocumentTitle(t.nav.about)

  return (
    <article className="mx-auto max-w-7xl overflow-hidden px-5 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-32 lg:px-16">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img
          src={`${import.meta.env.BASE_URL}valentin.png`}
          alt={t.home.hero.photoAlt}
          className="size-28 rounded-full sm:size-36"
        />
        <h1 className="mt-10 font-heading text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
          {a.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
          {a.text}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          {a.vision}
        </p>
      </header>

      {/* Grand écran : 4 cartes qui se chevauchent, inclinées ; au survol
          (ou au clavier), elles s'alignent et une légende apparaît sous
          chacune. */}
      <ul
        aria-label={a.photosAlt}
        className="group/cartes mt-24 hidden justify-center gap-6 pb-4 sm:flex"
      >
        {photos.map((file, i) => (
          <li
            key={file}
            tabIndex={0}
            style={
              {
                '--decalage': `${(1.5 - i) * 55}%`,
                '--angle': tilts[i],
                zIndex: i,
              } as React.CSSProperties
            }
            className="w-36 shrink-0 [transform:translateX(var(--decalage))_rotate(var(--angle))] transition-transform duration-500 ease-out group-focus-within/cartes:[transform:none] group-hover/cartes:[transform:none] focus-visible:outline-none motion-reduce:transition-none md:w-44 lg:w-60"
          >
            <img
              src={imageUrl(file)}
              alt=""
              className="aspect-square w-full rounded-3xl object-cover shadow-xl shadow-foreground/15"
            />
            <p className="mt-4 translate-y-1 text-sm opacity-0 transition-[opacity,translate] duration-300 group-focus-within/cartes:translate-y-0 group-focus-within/cartes:opacity-100 group-hover/cartes:translate-y-0 group-hover/cartes:opacity-100 group-hover/cartes:delay-200">
              <span className="font-semibold">{a.facts[i].label}</span>{' '}
              <span className="text-muted-foreground">{a.facts[i].value}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* Téléphone : les 4 photos en carrousel qu'on fait glisser au doigt,
          d'un bord à l'autre de l'écran, légendes visibles. */}
      <ul
        aria-label={a.photosAlt}
        className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2 sm:hidden [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((file, i) => (
          <li key={file} className="w-[72%] shrink-0 snap-start">
            <img
              src={imageUrl(file)}
              alt=""
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <p className="mt-3 text-sm">
              <span className="font-semibold">{a.facts[i].label}</span>{' '}
              <span className="text-muted-foreground">{a.facts[i].value}</span>
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}
