import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** Rythme de l'écran (en ms). */
const APPEAR_MS = 300
const BOUNCE_MS = 460
const EXIT_MS = 550
const STORAGE_KEY = 'intro-vue'

/** Une couleur par rebond : bleu, violet, turquoise (celles du hero). */
const colors = ['bg-tone-1', 'bg-tone-2', 'bg-tone-3']

/**
 * Écran d'arrivée, sur le fond clair du site : un point apparaît au centre
 * et rebondit trois fois, en changeant de couleur à chaque atterrissage,
 * puis il se résorbe et l'écran s'efface en fondu.
 * Joué une seule fois par visite, jamais si le visiteur préfère moins
 * d'animations. Un clic ou une touche le passe.
 */
export function IntroScreen() {
  const [visible, setVisible] = useState(shouldPlay)
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    const root = document.documentElement
    root.style.overflow = 'hidden'

    // Le point change de couleur à chaque fois qu'il touche le sol.
    const timers = colors
      .slice(1)
      .map((_, i) =>
        window.setTimeout(
          () => setStep(i + 1),
          APPEAR_MS + (i + 1) * BOUNCE_MS,
        ),
      )
    const exitAt = APPEAR_MS + colors.length * BOUNCE_MS
    timers.push(window.setTimeout(() => setLeaving(true), exitAt))

    const skip = () => setLeaving(true)
    window.addEventListener('keydown', skip, { once: true })

    return () => {
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', skip)
      root.style.overflow = ''
    }
  }, [visible])

  // Une fois le fondu terminé, l'écran est retiré.
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setVisible(false), EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [leaving])

  if (!visible) return null

  const bounce = {
    animationDuration: `${BOUNCE_MS}ms`,
    animationDelay: `${APPEAR_MS}ms`,
    animationIterationCount: colors.length,
  }

  return (
    <div
      aria-hidden="true"
      data-intro
      onClick={() => setLeaving(true)}
      className={cn(
        'fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-[550ms] ease-out',
        leaving && 'opacity-0',
      )}
    >
      <div
        className={cn(
          'relative flex animate-[intro-dot_300ms_cubic-bezier(0.34,1.56,0.64,1)_both] flex-col items-center transition-[scale] duration-300 ease-in',
          leaving && 'scale-0',
        )}
      >
        {/* Le point : il monte, retombe et s'écrase un peu au sol. */}
        <span
          className={cn(
            'block size-4 origin-bottom animate-[intro-bounce_both] rounded-full transition-colors duration-150 sm:size-5',
            colors[step],
          )}
          style={bounce}
        />
        {/* Son ombre, plus petite et plus pâle quand il est en l'air. */}
        <span
          className="mt-1.5 block h-1 w-5 animate-[intro-shadow_both] rounded-full bg-heading/10 sm:w-6"
          style={bounce}
        />
      </div>
    </div>
  )
}

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem(STORAGE_KEY)) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
