import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { imageUrl } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { displayTitle } from '@/lib/ui'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

/**
 * Les 6 photos, de gauche à droite, chacune avec sa légende (`facts` dans
 * fr.ts, dans le même ordre). Provisoire : des images de projets, en
 * attendant de vraies photos de Valentin.
 */
const photos = [
  'minute-metier-2.jpg',
  'nymphe-essentials-2.jpg',
  'climate-training-5.jpg',
  'kit-chanel-25-1.jpg',
  'ico-3.jpg',
  'campagne-municipale-1.jpg',
]

/** Au repos : inclinaison de chaque carte (elles se chevauchent en éventail). */
const tilts = ['-8deg', '-5deg', '-2deg', '2deg', '5deg', '8deg']

/**
 * Page À propos : une petite photo ronde, le titre, puis 6 photos perso.
 * Sur ordinateur, elles sont en éventail ; au premier passage de la souris
 * elles s'alignent et restent alignées, et la légende d'une photo apparaît
 * quand on la survole. Sur téléphone, un carrousel avec les légendes.
 */
function AboutPage() {
  const { t } = useI18n()
  const a = t.aboutPage
  useDocumentTitle(t.nav.about)
  // Une fois alignées, les photos ne reviennent plus en éventail.
  const [aligned, setAligned] = useState(false)
  const align = () => setAligned(true)

  return (
    <article className="mx-auto max-w-7xl overflow-hidden px-5 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-32 lg:px-16">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img
          src={`${import.meta.env.BASE_URL}valentin.png`}
          alt={t.home.hero.photoAlt}
          className="size-28 rounded-full sm:size-36"
        />
        <h1 className={`${displayTitle} mt-10`}>{a.title}</h1>
      </header>

      {/* Grand écran : 6 cartes inclinées qui se chevauchent. */}
      <ul
        aria-label={a.photosAlt}
        onPointerEnter={align}
        onFocus={align}
        className="mt-24 hidden justify-center gap-4 pb-4 lg:flex"
      >
        {photos.map((file, i) => (
          <li
            key={file}
            tabIndex={0}
            style={
              {
                // Au repos, chaque carte glisse vers le centre et s'incline.
                '--decalage': `calc(${2.5 - i} * 0.6 * (100% + 1rem))`,
                '--angle': tilts[i],
                zIndex: i,
              } as React.CSSProperties
            }
            className={cn(
              'group/carte w-[min(15rem,calc((100%-5rem)/6))] shrink-0 transition-transform duration-500 ease-out focus-visible:outline-none motion-reduce:transition-none',
              !aligned &&
                '[transform:translateX(var(--decalage))_rotate(var(--angle))]',
            )}
          >
            <img
              src={imageUrl(file)}
              alt=""
              className="aspect-square w-full rounded-3xl object-cover shadow-xl shadow-foreground/15 transition-[translate] duration-300 ease-out group-hover/carte:-translate-y-1.5 group-focus-visible/carte:-translate-y-1.5"
            />
            {/* La légende n'apparaît que sur la photo survolée. */}
            <p className="mt-4 translate-y-1 text-sm opacity-0 transition-[opacity,translate] duration-300 group-hover/carte:translate-y-0 group-hover/carte:opacity-100 group-focus-visible/carte:translate-y-0 group-focus-visible/carte:opacity-100">
              <span className="font-semibold">{a.facts[i].label}</span>{' '}
              <span className="text-muted-foreground">{a.facts[i].value}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* Téléphone et tablette : les photos en carrousel qu'on fait glisser
          au doigt, d'un bord à l'autre de l'écran, légendes visibles. */}
      <ul
        aria-label={a.photosAlt}
        className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((file, i) => (
          <li key={file} className="w-[72%] shrink-0 snap-start sm:w-[40%]">
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
