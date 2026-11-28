import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Durée d'affichage de chaque salutation, puis de la sortie (en ms). */
const WORD_MS = 340
const EXIT_MS = 750
const STORAGE_KEY = 'intro-vue'

/** Couleur du point après chaque salutation, comme les pastilles du hero. */
const dots = ['bg-tone-1', 'bg-tone-2', 'bg-tone-3', 'bg-tone-4']

/**
 * Écran d'arrivée : sur le bleu nuit du site, « Bonjour · Hello · ¡Hola! »
 * s'enchaînent en grand pendant qu'une fine barre aux quatre couleurs se
 * remplit, puis le panneau remonte et découvre la page.
 * Joué une seule fois par visite, jamais si le visiteur préfère moins
 * d'animations. Un clic ou une touche le passe.
 */
export function IntroScreen() {
  const { t } = useI18n()
  const words = t.home.hero.greetings
  const [visible, setVisible] = useState(shouldPlay)
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    const root = document.documentElement
    root.style.overflow = 'hidden'

    const timers = words.map((_, i) =>
      window.setTimeout(() => setStep(i), i * WORD_MS),
    )
    const exitAt = words.length * WORD_MS + 120
    timers.push(window.setTimeout(() => setLeaving(true), exitAt))
    timers.push(window.setTimeout(() => setVisible(false), exitAt + EXIT_MS))

    const skip = () => setLeaving(true)
    window.addEventListener('keydown', skip, { once: true })

    return () => {
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', skip)
      root.style.overflow = ''
    }
  }, [visible, words])

  // Passé au clic ou au clavier : on retire l'écran une fois remonté.
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
      // « dark » : l'écran garde le bleu nuit et les couleurs vives, quel que
      // soit le thème choisi.
      className={cn(
        'dark fixed inset-0 z-[100] flex flex-col bg-background text-foreground transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)]',
        leaving && '-translate-y-full',
      )}
    >
      <div
        className={cn(
          'flex flex-1 items-center justify-center transition-[opacity,translate] duration-300 ease-out',
          leaving && '-translate-y-8 opacity-0',
        )}
      >
        <p
          key={step}
          className="flex animate-[intro-word_420ms_cubic-bezier(0.22,1,0.36,1)_both] items-center font-heading text-[clamp(3.5rem,13vw,10rem)] leading-none font-semibold tracking-[-0.045em]"
        >
          {words[step]}
          <span
            className={cn(
              'ml-[0.12em] size-[0.14em] rounded-full',
              dots[step % dots.length],
            )}
          />
        </p>
      </div>

      <div
        className={cn(
          'mx-auto w-full max-w-7xl px-5 pb-8 transition-opacity duration-300 sm:px-8 sm:pb-10 lg:px-16',
          leaving && 'opacity-0',
        )}
      >
        <div className="flex items-end justify-between gap-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span>{site.name}</span>
          <span className="text-right max-sm:hidden">
            {t.home.hero.role.replace(/\.$/, '')}
          </span>
        </div>
        {/* Barre de chargement : quatre segments aux couleurs du site. */}
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {dots.map((color, i) => (
            <span key={color} className="h-0.5 overflow-hidden bg-border">
              <span
                className={cn(
                  'block h-full origin-left animate-[intro-bar_300ms_ease-out_both]',
                  color,
                )}
                style={{ animationDelay: `${i * 240}ms` }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem(STORAGE_KEY)) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
