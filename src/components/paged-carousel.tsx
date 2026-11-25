import { Children, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/i18n/context'

/** Écart entre deux éléments, en rem (doit suivre la classe gap-6). */
const GAP = 1.5

/**
 * Carrousel « page par page » : un élément visible sur téléphone, deux à
 * partir de la tablette. On avance uniquement avec les flèches (ou les
 * flèches du clavier, ou un glissement du doigt sur écran tactile) : pas de
 * défilement à la souris ni au pavé tactile.
 */
export function PagedCarousel({
  label,
  children,
  className,
}: {
  /** Nom lu par les lecteurs d'écran, par exemple « Projets ». */
  label: string
  children: React.ReactNode
  className?: string
}) {
  const { t } = useI18n()
  const items = Children.toArray(children)
  const [perView, setPerView] = useState(1)
  const [index, setIndex] = useState(0)
  const touchStart = useRef<number | null>(null)

  // Nombre d'éléments visibles : 2 à partir de 768px (comme md: dans Tailwind).
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const sync = () => setPerView(query.matches ? 2 : 1)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const maxIndex = Math.max(0, items.length - perView)
  const current = Math.min(index, maxIndex)
  const go = (next: number) => setIndex(Math.max(0, Math.min(maxIndex, next)))

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(current + 1)
        if (event.key === 'ArrowLeft') go(current - 1)
      }}
    >
      {/* Marges négatives + intérieures : les ombres des cartes ne sont pas
          coupées, sans laisser apparaître la carte suivante. */}
      <div
        className="-mx-3 -my-4 touch-pan-y overflow-hidden px-3 py-4"
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') touchStart.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (touchStart.current === null) return
          const delta = event.clientX - touchStart.current
          touchStart.current = null
          if (Math.abs(delta) > 50) go(current + (delta < 0 ? 1 : -1))
        }}
      >
        <div
          className="flex gap-6 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(calc(${-current} * (100% + ${GAP}rem) / ${perView}))`,
          }}
        >
          {items.map((item, i) => {
            const visible = i >= current && i < current + perView
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={t.carousel.slide(i + 1, items.length)}
                inert={!visible}
                className="shrink-0"
                style={{
                  flexBasis: `calc((100% - ${(perView - 1) * GAP}rem) / ${perView})`,
                }}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground tabular-nums">
            {String(current + 1).padStart(2, '0')}
            {perView > 1 && `–${String(current + perView).padStart(2, '0')}`}
            {' / '}
            {String(items.length).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
              aria-label={t.carousel.previous}
              className="grid size-10 place-items-center border border-border transition-colors hover:border-foreground disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === maxIndex}
              aria-label={t.carousel.next}
              className="grid size-10 place-items-center border border-border transition-colors hover:border-foreground disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
