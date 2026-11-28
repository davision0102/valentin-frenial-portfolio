import { useEffect, useRef } from 'react'

/**
 * Petit point qui suit la souris avec un léger retard, et grossit
 * au-dessus d’un lien ou d’un bouton, ou quand la souris va vite. Il passe
 * lentement par les trois couleurs du point de l'écran d'arrivée (bleu,
 * violet, turquoise).
 * Seulement avec une souris (pas sur écran tactile) et jamais si le
 * visiteur préfère moins d'animations.
 */
export function CursorDot() {
  const outerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const outer = outerRef.current
    const dot = dotRef.current
    if (!outer || !dot || !fine.matches || reduce.matches) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let scale = 1
    let started = false
    let frame = 0

    const render = () => {
      x += (targetX - x) * 0.2
      y += (targetY - y) * 0.2
      // Plus la souris va vite, plus le point est en retard sur elle : ce
      // retard le fait grossir (jusqu'à ×2,2), puis il revient en douceur.
      const lag = Math.hypot(targetX - x, targetY - y)
      scale += (1 + Math.min(lag / 50, 1.2) - scale) * 0.2
      outer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      const moving = lag > 0.1 || Math.abs(scale - 1) > 0.01
      frame = moving ? requestAnimationFrame(render) : 0
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      if (!started) {
        // Premier mouvement : le point apparaît sous la souris, sans voyager.
        x = targetX
        y = targetY
        started = true
      }
      outer.style.opacity = '1'
      const target = event.target
      dot.dataset.hover = String(
        target instanceof Element &&
          Boolean(target.closest('a, button, input, textarea, label, select')),
      )
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onLeave = () => {
      outer.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] origin-top-left opacity-0 transition-opacity duration-300"
    >
      <div
        ref={dotRef}
        className="size-3 -translate-x-1/2 -translate-y-1/2 animate-[cursor-tones_6s_linear_infinite] rounded-full bg-tone-1 transition-[scale,opacity] duration-300 ease-out data-[hover=true]:scale-[2.5] data-[hover=true]:opacity-50"
      />
    </div>
  )
}
