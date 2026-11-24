import { useState } from 'react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/**
 * Portrait de Valentin : sa photo ronde posée sur une carte bleu nuit, avec
 * des cercles concentriques et une pastille en verre. La photo est dans
 * public/valentin.png ; si elle manque, ses initiales s'affichent.
 */
export function Portrait({
  caption,
  className,
}: {
  caption: string
  className?: string
}) {
  const { t } = useI18n()
  const [missing, setMissing] = useState(false)

  return (
    <figure className={cn('relative w-full', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-linear-to-br from-spotlight via-spotlight to-brand shadow-2xl ring-1 shadow-brand/20 ring-border">
        {/* Cercles concentriques autour de la photo */}
        <div aria-hidden="true" className="absolute inset-0">
          {[96, 124, 152].map((size) => (
            <span
              key={size}
              className="absolute top-[44%] left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12"
              style={{ width: `${size}%` }}
            />
          ))}
        </div>
        {missing ? (
          <span
            role="img"
            aria-label={t.home.hero.photoAlt}
            className="absolute top-[44%] left-1/2 grid aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 font-heading text-7xl font-semibold tracking-[-0.04em] text-white"
          >
            {site.initials}
          </span>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}valentin.png`}
            alt={t.home.hero.photoAlt}
            onError={() => setMissing(true)}
            className="absolute top-[44%] left-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl ring-4 ring-white/15"
          />
        )}
      </div>
      <figcaption className="flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium glass max-sm:mx-auto max-sm:mt-3 sm:absolute sm:bottom-4 sm:left-4">
        <span className="size-2 rounded-full bg-track-skill" />
        {caption}
      </figcaption>
    </figure>
  )
}
