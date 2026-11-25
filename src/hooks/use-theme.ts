import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const EVENT = 'themechange'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Thème clair / sombre. La classe `dark` est posée sur <html> avant le rendu
 * par le petit script de index.html, ce hook ne fait que la lire et la changer.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    // Prévient les autres interrupteurs de la page (pied de page, menu mobile).
    window.dispatchEvent(new CustomEvent<Theme>(EVENT, { detail: theme }))
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // stockage indisponible (navigation privée) : le thème reste valable pour la session
    }
  }, [theme])

  useEffect(() => {
    const sync = (event: Event) =>
      setTheme((event as CustomEvent<Theme>).detail)
    window.addEventListener(EVENT, sync)
    return () => window.removeEventListener(EVENT, sync)
  }, [])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, setTheme, toggleTheme }
}
