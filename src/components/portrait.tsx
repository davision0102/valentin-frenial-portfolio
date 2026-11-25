import { useState } from 'react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/**
 * Portrait de Valentin : sa photo ronde, entourée de deux cercles fins.
 * La photo est dans public/valentin.png ; si elle manque, ses initiales
 * s'affichent.
 */
export function Portrait({ className }: { className?: string }) {
  const { t } = useI18n()
  const [missing, setMissing] = useState(false)

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      {/* Cercles décoratifs autour de la photo */}
      <span
        aria-hidden="true"
        className="absolute -inset-[8%] rounded-full border border-brand/20"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-[18%] rounded-full border border-brand/10"
      />
      {missing ? (
        <span
          role="img"
          aria-label={t.home.hero.photoAlt}
          className="absolute inset-0 grid place-items-center rounded-full bg-spotlight font-heading text-6xl font-semibold tracking-[-0.04em] text-white"
        >
          {site.initials}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}valentin.png`}
          alt={t.home.hero.photoAlt}
          onError={() => setMissing(true)}
          className="absolute inset-0 size-full rounded-full shadow-2xl ring-4 shadow-brand/20 ring-background"
        />
      )}
    </div>
  )
}
