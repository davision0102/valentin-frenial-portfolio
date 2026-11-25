import { createFileRoute } from '@tanstack/react-router'
import { imageUrl } from '@/config/projects'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

/**
 * Photos de l'éventail, de gauche à droite. Provisoire : des images de
 * projets, en attendant de vraies photos de Valentin.
 */
const photos = [
  'minute-metier-2.jpg',
  'climate-training-5.jpg',
  'nymphe-essentials-2.jpg',
  'onboarding-artisans-1.jpg',
  'kit-chanel-25-1.jpg',
]

/** Inclinaison et décalage vertical de chaque photo de l'éventail. */
const fan = [
  { rotate: '-rotate-6', shift: 'translate-y-6' },
  { rotate: '-rotate-3', shift: 'translate-y-2' },
  { rotate: 'rotate-0', shift: 'translate-y-0' },
  { rotate: 'rotate-3', shift: 'translate-y-2' },
  { rotate: 'rotate-6', shift: 'translate-y-6' },
]

/**
 * Page À propos : une petite photo ronde, un titre, un court texte, puis un
 * éventail de photos qui se chevauchent. Le pied de page suit directement.
 */
function AboutPage() {
  const { t } = useI18n()
  const a = t.aboutPage
  useDocumentTitle(t.nav.about)

  return (
    <article className="mx-auto max-w-[96rem] overflow-hidden px-4 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">
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
      </header>

      {/* Grand écran : éventail de photos qui se chevauchent, celle survolée
          passe devant. */}
      <ul
        aria-label={a.photosAlt}
        className="mt-24 hidden justify-center pb-8 sm:flex"
      >
        {photos.map((file, i) => (
          <li
            key={file}
            style={{ zIndex: i === 2 ? 5 : 4 - Math.abs(i - 2) }}
            className={cn(
              'relative -ml-28 shrink-0 transition-transform duration-500 ease-out first:ml-0 hover:z-10! hover:-translate-y-4 hover:rotate-0 lg:-ml-8',
              fan[i].rotate,
              fan[i].shift,
            )}
          >
            <img
              src={imageUrl(file)}
              alt=""
              loading="lazy"
              className="aspect-[3/4] w-52 rounded-2xl object-cover shadow-2xl ring-1 shadow-foreground/20 ring-black/5 lg:w-64"
            />
          </li>
        ))}
      </ul>

      {/* Téléphone : les photos défilent en boucle, d'un bord à l'autre. */}
      <div
        role="img"
        aria-label={a.photosAlt}
        className="-mx-4 mt-16 overflow-hidden py-6 sm:hidden"
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-6 pr-6">
              {photos.map((file, i) => (
                <img
                  key={file}
                  src={imageUrl(file)}
                  alt=""
                  loading="lazy"
                  className={cn(
                    'aspect-[3/4] w-40 shrink-0 rounded-2xl object-cover shadow-xl ring-1 shadow-foreground/15 ring-black/5',
                    i % 2 === 0 ? '-rotate-2' : 'rotate-2',
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
