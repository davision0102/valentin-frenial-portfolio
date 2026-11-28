import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Rythme de l'écran (en ms). */
const APPEAR_MS = 300
const BOUNCE_MS = 460
/** Pause, point posé et dernier mot affiché, avant la sortie. */
const HOLD_MS = 250
const EXIT_MS = 550
const STORAGE_KEY = 'intro-vue'

/** Une couleur par rebond : bleu, violet, turquoise (celles du hero). */
const tones = [
  { dot: 'bg-tone-1', text: 'text-tone-1' },
  { dot: 'bg-tone-2', text: 'text-tone-2' },
  { dot: 'bg-tone-3', text: 'text-tone-3' },
]

/**
 * Écran d'arrivée, sur le fond clair du site : un point apparaît au centre
 * et rebondit trois fois. À chaque rebond il prend une nouvelle couleur et
 * un mot apparaît dessous, dans la même couleur : pédagogie, design,
 * créativité. Puis il se résorbe et l'écran s'efface en fondu.
 * Joué une seule fois par visite, jamais si le visiteur préfère moins
 * d'animations. Un clic ou une touche le passe.
 */
export function IntroScreen() {
  const { t } = useI18n()
  const words = t.home.intro
  const [visible, setVisible] = useState(shouldPlay)
  // -1 : le point vient d'apparaître, avant le premier saut.
  const [step, setStep] = useState(-1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    const root = document.documentElement
    root.style.overflow = 'hidden'

    // Un saut par mot : couleur et mot changent quand le point quitte le sol.
    const timers = tones.map((_, i) =>
      window.setTimeout(() => setStep(i), APPEAR_MS + i * BOUNCE_MS),
    )
    const exitAt = APPEAR_MS + tones.length * BOUNCE_MS + HOLD_MS
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

  const tone = tones[Math.max(step, 0)]
  const bounce = {
    animationDuration: `${BOUNCE_MS}ms`,
    animationDelay: `${APPEAR_MS}ms`,
    animationIterationCount: tones.length,
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
      <div className="relative">
        <div
          className={cn(
            'flex animate-[intro-dot_300ms_cubic-bezier(0.34,1.56,0.64,1)_both] flex-col items-center transition-[scale] duration-300 ease-in',
            leaving && 'scale-0',
          )}
        >
          {/* Le point : il monte, retombe et s'écrase un peu au sol. */}
          <span
            className={cn(
              'block size-4 origin-bottom animate-[intro-bounce_both] rounded-full transition-colors duration-150 sm:size-5',
              tone.dot,
            )}
            style={bounce}
          />
          {/* Son ombre, plus petite et plus pâle quand il est en l'air. */}
          <span
            className="mt-1.5 block h-1 w-5 animate-[intro-shadow_both] rounded-full bg-heading/10 sm:w-6"
            style={bounce}
          />
        </div>

        {/* Le mot du rebond, sous le point ; le point reste bien au centre. */}
        {step >= 0 && (
          <p
            key={step}
            className={cn(
              'absolute top-full left-1/2 mt-6 -translate-x-1/2 animate-[intro-word_400ms_cubic-bezier(0.22,1,0.36,1)_both] pl-[0.25em] font-mono text-xs tracking-[0.25em] whitespace-nowrap uppercase sm:text-sm',
              tone.text,
            )}
          >
            {words[step]}
          </p>
        )}
      </div>
    </div>
  )
}

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem(STORAGE_KEY)) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
