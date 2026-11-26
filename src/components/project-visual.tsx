import { imageUrl, type ProjectImage } from '@/config/projects'
import { cn } from '@/lib/utils'

/**
 * Visuel d'un projet dans un cadre aux proportions fixes.
 * Les images « contain » sont posées sur un fond doux avec une marge,
 * les images « cover » remplissent tout le cadre.
 */
export function ProjectVisual({
  image,
  alt,
  className,
  eager,
}: {
  image: ProjectImage
  /** Description de l'image pour les lecteurs d'écran. */
  alt: string
  className?: string
  /** Charger tout de suite (image visible dès l'arrivée sur la page). */
  eager?: boolean
}) {
  const contain = image.fit === 'contain'

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-card',
        contain && 'p-4 sm:p-6',
        className,
      )}
    >
      <img
        src={imageUrl(image.file)}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'size-full transition-transform duration-500',
          contain
            ? 'rounded-lg object-contain'
            : 'object-cover group-hover:scale-[1.03] motion-reduce:group-hover:scale-100',
        )}
      />
    </div>
  )
}
