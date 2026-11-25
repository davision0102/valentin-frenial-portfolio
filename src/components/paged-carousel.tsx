import { Children, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/i18n/context'

/** Écart entre deux éléments, en rem (doit suivre la classe gap-12). */
const GAP = 3

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
      <div
        className="touch-pan-y overflow-hidden"
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
          className="flex gap-12 transition-transform duration-500 ease-out motion-reduce:transition-none"
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
        <div className="mt-8 flex items-center justify-between gap-4">
          {/* Un point par position ; celui de la position actuelle s'allonge. */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={t.carousel.goTo(i + 1)}
                aria-current={i === current}
                className={
                  i === current
                    ? 'h-2 w-6 rounded-full bg-brand transition-all duration-300'
                    : 'h-2 w-2 rounded-full bg-border transition-all duration-300 hover:bg-muted-foreground/50'
                }
              />
            ))}
          </div>
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
