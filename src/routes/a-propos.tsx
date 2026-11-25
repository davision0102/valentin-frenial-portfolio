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

      {/* Éventail de photos : elles se chevauchent, celle survolée passe devant. */}
      <ul
        aria-label={a.photosAlt}
        className="mt-16 flex justify-center pb-8 sm:mt-24"
      >
        {photos.map((file, i) => (
          <li
            key={file}
            style={{ zIndex: i === 2 ? 5 : 4 - Math.abs(i - 2) }}
            className={cn(
              'relative -ml-14 shrink-0 transition-transform duration-500 ease-out first:ml-0 hover:z-10! hover:-translate-y-4 hover:rotate-0 sm:-ml-24 lg:-ml-28',
              fan[i].rotate,
              fan[i].shift,
            )}
          >
            <img
              src={imageUrl(file)}
              alt=""
              loading="lazy"
              className="aspect-[3/4] w-28 rounded-2xl object-cover shadow-2xl ring-1 shadow-foreground/20 ring-black/5 sm:w-52 lg:w-64"
            />
          </li>
        ))}
      </ul>
    </article>
  )
}
