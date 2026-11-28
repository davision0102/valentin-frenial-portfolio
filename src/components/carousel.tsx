import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/i18n/context'
import { iconButton } from '@/lib/ui'
import { cn } from '@/lib/utils'

/**
 * Carrousel léger, sans bibliothèque : défilement horizontal « aimanté »
 * (scroll-snap). On glisse au doigt sur mobile, on utilise les flèches,
 * les points ou le clavier sur ordinateur.
 *
 * `itemClassName` règle la largeur de chaque élément, par exemple
 * `basis-[85%] md:basis-[48%]` pour laisser deviner l'élément suivant.
 */
export function Carousel({
  label,
  children,
  itemClassName,
  className,
}: {
  /** Nom lu par les lecteurs d'écran, par exemple « Projets ». */
  label: string
  children: React.ReactNode
  itemClassName?: string
  className?: string
}) {
  const { t } = useI18n()
  const trackRef = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  // Faux quand tous les éléments tiennent à l'écran : pas de flèches ni de points.
  const [scrollable, setScrollable] = useState(false)
  /** Position visée pendant une animation, pour enchaîner les clics. */
  const targetRef = useRef<number | null>(null)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const slides = Array.from(track.children) as HTMLElement[]
    // Décalage du premier élément (marge intérieure éventuelle de la piste).
    const base = slides[0]?.offsetLeft ?? 0
    if (
      targetRef.current !== null &&
      Math.abs(track.scrollLeft - targetRef.current) < 2
    ) {
      targetRef.current = null
    }
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    setScrollable(track.scrollWidth > track.clientWidth + 2)
    setAtStart(track.scrollLeft <= 2)
    setAtEnd(end)
    // Élément le plus proche du bord gauche ; le dernier quand on est au bout.
    let closest = 0
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - base - track.scrollLeft)
      const best = Math.abs(
        slides[closest].offsetLeft - base - track.scrollLeft,
      )
      if (distance < best) closest = i
    })
    setActive(end ? slides.length - 1 : closest)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  function scrollToLeft(left: number) {
    const track = trackRef.current
    if (!track) return
    targetRef.current = left
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }

  /** Positions où chaque élément s'aligne (limitées à la fin du défilement). */
  function stops() {
    const track = trackRef.current
    if (!track) return []
    const max = track.scrollWidth - track.clientWidth
    const slides = Array.from(track.children) as HTMLElement[]
    const base = slides[0]?.offsetLeft ?? 0
    return slides.map((slide) => Math.min(slide.offsetLeft - base, max))
  }

  function goTo(index: number) {
    const left = stops()[index]
    if (left !== undefined) scrollToLeft(left)
  }

  function step(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const from = targetRef.current ?? track.scrollLeft
    const positions = stops()
    const left =
      direction === 1
        ? positions.find((p) => p > from + 2)
        : positions.findLast((p) => p < from - 2)
    if (left !== undefined) scrollToLeft(left)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      // flow-root : la marge négative de la piste (qui laisse de la place aux
      // ombres) ne doit pas « manger » l'espace au-dessus et au-dessous.
      className={cn('flow-root', className)}
    >
      <div
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        className="relative -my-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto py-4 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={t.carousel.slide(i + 1, items.length)}
            className={cn('shrink-0 snap-start', itemClassName)}
          >
            {item}
          </div>
        ))}
      </div>

      {scrollable && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t.carousel.goTo(i + 1)}
                aria-current={i === active}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === active
                    ? 'w-6 bg-brand'
                    : 'w-2 bg-border hover:bg-muted-foreground/50',
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={iconButton()}
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label={t.carousel.previous}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className={iconButton()}
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label={t.carousel.next}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
