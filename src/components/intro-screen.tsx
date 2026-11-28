import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Rythme de l'écran (en ms). */
const FIRST_WORD_AT = 350
const WORD_MS = 520
const EXIT_MS = 550
const STORAGE_KEY = 'intro-vue'

/** Le point change de couleur à chaque salutation, comme les pastilles du hero. */
const dots = ['bg-tone-1', 'bg-tone-2', 'bg-tone-3', 'bg-tone-4']

/**
 * Écran d'arrivée, sur le fond clair du site : un point apparaît seul au
 * centre, puis « Bonjour », « Hello » et « ¡Hola! » sortent de lui l'un après
 * l'autre pendant qu'il change de couleur. Enfin le point se résorbe et
 * l'écran s'efface en fondu.
 * Joué une seule fois par visite, jamais si le visiteur préfère moins
 * d'animations. Un clic ou une touche le passe.
 */
export function IntroScreen() {
  const { t } = useI18n()
  const words = t.home.hero.greetings
  const [visible, setVisible] = useState(shouldPlay)
  // -1 : le point est seul, avant la première salutation.
  const [step, setStep] = useState(-1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    const root = document.documentElement
    root.style.overflow = 'hidden'

    const timers = words.map((_, i) =>
      window.setTimeout(() => setStep(i), FIRST_WORD_AT + i * WORD_MS),
    )
    const exitAt = FIRST_WORD_AT + words.length * WORD_MS
    timers.push(window.setTimeout(() => setLeaving(true), exitAt))

    const skip = () => setLeaving(true)
    window.addEventListener('keydown', skip, { once: true })

    return () => {
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', skip)
      root.style.overflow = ''
    }
  }, [visible, words])

  // Une fois le fondu terminé, l'écran est retiré.
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setVisible(false), EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [leaving])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      onClick={() => setLeaving(true)}
      className={cn(
        'fixed inset-0 z-[100] bg-background transition-opacity duration-[550ms] ease-out',
        leaving && 'opacity-0',
      )}
    >
      {/* Le point reste au centre ; les salutations s'alignent à sa gauche. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {step >= 0 && (
          <p
            key={step}
            className={cn(
              'absolute right-full bottom-[-0.12em] animate-[intro-word_480ms_cubic-bezier(0.22,1,0.36,1)_both] pr-[0.14em] font-heading text-[clamp(2.75rem,9vw,6.5rem)] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap text-heading transition-opacity duration-300',
              leaving && 'opacity-0',
            )}
          >
            {words[step]}
          </p>
        )}
        <span
          className={cn(
            'block size-3.5 animate-[intro-dot_500ms_cubic-bezier(0.34,1.56,0.64,1)_both] rounded-full transition-[background-color,scale] duration-500 ease-out sm:size-4',
            dots[Math.max(step, 0) % dots.length],
            leaving && 'scale-0',
          )}
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
