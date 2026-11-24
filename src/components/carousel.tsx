import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/i18n/context'
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
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft)
      const best = Math.abs(slides[closest].offsetLeft - track.scrollLeft)
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
    return Array.from(track.children, (slide) =>
      Math.min((slide as HTMLElement).offsetLeft, max),
    )
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
      className={className}
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
        <div className="mt-5 flex items-center gap-4">
          {/* Barre segmentée : un segment par visuel, comme une mini timeline. */}
          <div className="flex flex-1 items-center gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t.carousel.goTo(i + 1)}
                aria-current={i === active}
                className="group flex h-6 flex-1 items-center"
              >
                <span
                  className={cn(
                    'h-1.5 w-full rounded-full transition-colors duration-300',
                    i === active
                      ? 'bg-foreground'
                      : 'bg-foreground/15 group-hover:bg-foreground/30',
                  )}
                />
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {active + 1} / {items.length}
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label={t.carousel.previous}
              className="grid size-10 place-items-center rounded-full glass transition-[transform,opacity] active:scale-[0.92] disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label={t.carousel.next}
              className="grid size-10 place-items-center rounded-full glass transition-[transform,opacity] active:scale-[0.92] disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
