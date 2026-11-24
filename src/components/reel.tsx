import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { useAmbient } from '@/hooks/use-ambient'
import { ProjectVisual } from '@/components/project-visual'
import { getProjectMedia } from '@/config/projects'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Secondes de « film » par unité de clip, et temps réel d'une unité en lecture. */
const SECONDS_PER_UNIT = 5
const PLAY_MS_PER_UNIT = 650

/** Repères posés sur la règle : un chiffre clé du hero, rattaché à son projet. */
const markers = [
  { slug: 'compliance-week', stat: 0 },
  { slug: 'kit-chanel-25', stat: 1 },
  { slug: 'minute-metier', stat: 2 },
]

function timecode(seconds: number) {
  const s = Math.floor(seconds)
  const frames = Math.floor((seconds - s) * 25)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(frames)}`
}

/**
 * La bobine : un écran de lecture et une timeline. Chaque projet est un clip
 * posé sur sa piste (e-learning ou design), la tête de lecture avance toute
 * seule et l'écran montre le clip qu'elle traverse. Un clic sur un clip le
 * prévisualise, les flèches du clavier passent d'un clip à l'autre.
 */
export function Reel({ intro }: { intro?: React.ReactNode }) {
  const { t } = useI18n()
  const r = t.reel

  // Un clip par projet, dans l'ordre : sa durée dépend du nombre de visuels.
  const clips = useMemo(() => {
    const units = t.projects.map(
      (project) => 2 + (getProjectMedia(project.slug)?.images.length ?? 1),
    )
    return t.projects.map((project, i) => ({
      project,
      media: getProjectMedia(project.slug),
      units: units[i],
      start: units.slice(0, i).reduce((sum, n) => sum + n, 0),
    }))
  }, [t.projects])
  const totalUnits = clips.reduce((sum, clip) => sum + clip.units, 0)

  const [index, setIndex] = useState(0)
  // Lecture automatique, sauf si la personne préfère moins d'animations.
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const timeRef = useRef(0) // position de la tête, en unités
  const playheadRef = useRef<HTMLDivElement>(null)
  const timecodeRef = useRef<HTMLSpanElement>(null)
  const regionRef = useRef<HTMLElement>(null)
  const laneScrollRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(true)

  const current = clips[index]
  useAmbient(current.media?.images[0]?.file)

  /** Place la tête de lecture (sans repasser par React à chaque image). */
  const paint = useCallback(
    (units: number) => {
      const percent = (units / totalUnits) * 100
      if (playheadRef.current) playheadRef.current.style.left = `${percent}%`
      if (timecodeRef.current)
        timecodeRef.current.textContent = timecode(units * SECONDS_PER_UNIT)
    },
    [totalUnits],
  )

  const indexAt = useCallback(
    (units: number) => {
      const found = clips.findIndex(
        (clip) => units >= clip.start && units < clip.start + clip.units,
      )
      return found === -1 ? 0 : found
    },
    [clips],
  )

  // Pause quand la bobine sort de l'écran ou que l'onglet est caché.
  useEffect(() => {
    const region = regionRef.current
    if (!region) return
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
    })
    observer.observe(region)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const delta = now - last
      last = now
      if (visibleRef.current && !document.hidden) {
        timeRef.current =
          (timeRef.current + delta / PLAY_MS_PER_UNIT) % totalUnits
        paint(timeRef.current)
        const next = indexAt(timeRef.current)
        setIndex((prev) => (prev === next ? prev : next))
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, paint, indexAt, totalUnits])

  // Sur téléphone, la timeline défile pour garder le clip en cours visible.
  useEffect(() => {
    const scroller = laneScrollRef.current
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return
    const target =
      (clips[index].start / totalUnits) * scroller.scrollWidth -
      scroller.clientWidth / 3
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [index, clips, totalUnits])

  /** Prend la main : va au début d'un clip et met la lecture en pause. */
  function select(next: number) {
    const wrapped = (next + clips.length) % clips.length
    setPlaying(false)
    timeRef.current = clips[wrapped].start
    paint(timeRef.current)
    setIndex(wrapped)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      select(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      select(index - 1)
    }
  }

  const pct = (units: number) => `${(units / totalUnits) * 100}%`
  const meta = (p: (typeof clips)[number]['project']) =>
    [p.client, p.format, p.year].filter(Boolean).join(' · ')

  return (
    <section
      ref={regionRef}
      aria-label={r.label}
      onKeyDown={onKeyDown}
      className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-10 lg:gap-y-5"
    >
      {intro}
      {/* Écran de lecture */}
      <div className="overflow-hidden rounded-[1.75rem] p-2 glass-thick">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-secondary">
          {clips.map((clip, i) => {
            const image = clip.media?.images[0]
            if (!image) return null
            return (
              <ProjectVisual
                key={clip.project.slug}
                image={image}
                alt={clip.project.gallery[0] ?? clip.project.title}
                eager={i === 0}
                className={cn(
                  'absolute inset-0 transition-[opacity,scale] duration-700 ease-out motion-reduce:transition-none',
                  i === index
                    ? 'scale-100 opacity-100'
                    : 'scale-[1.02] opacity-0',
                )}
              />
            )
          })}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-3 pt-4 pb-2 sm:px-4">
          <div className="min-w-0" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              {meta(current.project)}
            </p>
            <h2 className="mt-1 truncate text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {current.project.title}
            </h2>
          </div>
          <Link
            to="/projets/$slug"
            params={{ slug: current.project.slug }}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform active:scale-[0.97]"
          >
            {r.open}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <div className="overflow-hidden rounded-[1.75rem] glass max-lg:mt-4 lg:col-span-2">
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-1">
            <TransportButton
              label={r.previous}
              onClick={() => select(index - 1)}
            >
              <SkipBack className="size-4 fill-current" />
            </TransportButton>
            <TransportButton
              label={playing ? r.pause : r.play}
              onClick={() => setPlaying((p) => !p)}
              primary
            >
              {playing ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 translate-x-px fill-current" />
              )}
            </TransportButton>
            <TransportButton label={r.next} onClick={() => select(index + 1)}>
              <SkipForward className="size-4 fill-current" />
            </TransportButton>
          </div>
          <p className="font-mono text-xs text-muted-foreground tabular-nums sm:text-sm">
            <span ref={timecodeRef} className="text-foreground">
              {timecode(0)}
            </span>
            <span className="max-sm:hidden">
              {' / '}
              {timecode(totalUnits * SECONDS_PER_UNIT)}
            </span>
          </p>
        </div>

        <div className="flex">
          {/* Noms des pistes */}
          <div className="w-24 shrink-0 border-r border-border pt-7 text-xs font-medium text-muted-foreground sm:w-32">
            <TrackName
              code="V1"
              name={r.tracks.learning}
              color="bg-track-learning"
            />
            <TrackName
              code="V2"
              name={r.tracks.design}
              color="bg-track-design"
            />
            <TrackName
              code="A1"
              name={r.tracks.skills}
              color="bg-track-skill"
            />
          </div>

          {/* Pistes (défilent sur téléphone : c'est le carrousel des projets) */}
          <div
            ref={laneScrollRef}
            className="min-w-0 flex-1 [scrollbar-width:none] overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden"
          >
            <div className="min-w-[44rem] px-2 pb-3">
              <div className="relative">
                {/* Règle et repères */}
                <div className="relative h-7 border-b border-border [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:calc(100%/32)_6px] bg-bottom bg-repeat-x">
                  {markers.map((marker) => {
                    const clip = clips.find(
                      (c) => c.project.slug === marker.slug,
                    )
                    if (!clip) return null
                    return (
                      <span
                        key={marker.slug}
                        aria-hidden="true"
                        className="absolute top-2.5 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-playhead"
                        style={{ left: pct(clip.start + clip.units / 2) }}
                      />
                    )
                  })}
                </div>

                {/* V1 et V2 : les projets */}
                {(['learning', 'design'] as const).map((category) => (
                  <div
                    key={category}
                    className="relative h-14 border-b border-border"
                  >
                    {clips.map((clip, i) =>
                      clip.project.category !== category ? null : (
                        <ClipButton
                          key={clip.project.slug}
                          title={clip.project.title}
                          note={
                            t.home.hero.stats[
                              markers.find((m) => m.slug === clip.project.slug)
                                ?.stat ?? -1
                            ]?.short
                          }
                          file={clip.media?.images[0]?.file}
                          active={i === index}
                          color={
                            category === 'learning'
                              ? 'bg-track-learning'
                              : 'bg-track-design'
                          }
                          style={{
                            left: pct(clip.start),
                            width: pct(clip.units),
                          }}
                          onClick={() => select(i)}
                        />
                      ),
                    )}
                  </div>
                ))}

                {/* A1 : les savoir-faire, en continu sous toute la bobine */}
                <div className="relative flex h-10 gap-1 py-1.5">
                  {t.home.services.items.map((item) => (
                    <span
                      key={item.title}
                      className="flex min-w-0 flex-1 items-center rounded-md bg-track-skill/85 [background-image:repeating-linear-gradient(to_right,oklch(1_0_0/35%)_0_2px,transparent_2px_5px)] [background-size:100%_40%] bg-center bg-no-repeat px-2 text-[11px] font-medium text-white"
                    >
                      <span className="truncate rounded bg-track-skill px-1">
                        {item.title}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Tête de lecture */}
                <div
                  ref={playheadRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-playhead"
                  style={{ left: 0 }}
                >
                  <span className="absolute -top-0.5 -left-[5px] size-3 rounded-[3px] bg-playhead" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="px-2 text-xs text-muted-foreground max-sm:hidden lg:col-span-2">
        {r.hint}
      </p>
    </section>
  )
}

function TransportButton({
  label,
  onClick,
  primary,
  children,
}: {
  label: string
  onClick: () => void
  primary?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'grid size-9 place-items-center rounded-full transition-[transform,background-color] duration-100 active:scale-[0.92]',
        primary
          ? 'bg-foreground text-background'
          : 'text-foreground hover:bg-foreground/8',
      )}
    >
      {children}
    </button>
  )
}

function TrackName({
  code,
  name,
  color,
}: {
  code: string
  name: string
  color: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b border-border px-3',
        code === 'A1' ? 'h-10 border-b-0' : 'h-14',
      )}
    >
      <span className={cn('size-2 shrink-0 rounded-full', color)} />
      <span className="font-mono text-foreground">{code}</span>
      <span className="truncate max-sm:hidden">{name}</span>
    </div>
  )
}

function ClipButton({
  title,
  note,
  file,
  active,
  color,
  style,
  onClick,
}: {
  title: string
  note?: string
  file?: string
  active: boolean
  color: string
  style: React.CSSProperties
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={style}
      className={cn(
        'absolute top-1.5 bottom-1.5 flex items-center gap-2 overflow-hidden rounded-lg px-1 text-left text-xs font-medium text-white transition-[transform,box-shadow,filter] duration-200 active:scale-[0.98]',
        color,
        active
          ? 'z-10 shadow-lg ring-2 ring-white ring-offset-1 ring-offset-transparent'
          : 'brightness-95 hover:brightness-105',
      )}
    >
      {file && (
        <span
          aria-hidden="true"
          className="h-full w-12 shrink-0 rounded-md bg-cover bg-center"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}projets/${file})`,
          }}
        />
      )}
      <span className="flex min-w-0 flex-col pr-1 leading-tight">
        <span className="truncate">{title}</span>
        {note && (
          <span className="truncate text-[10px] font-normal opacity-85">
            {note}
          </span>
        )}
      </span>
    </button>
  )
}
