import { useEffect, useMemo, useState } from 'react'
import { I18nContext, type Lang } from './context'
import { en } from './en'
import { fr } from './fr'

const dictionaries = { fr, en }
const STORAGE_KEY = 'lang'

/** Langue choisie par le visiteur, sinon celle de son navigateur. */
function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    // stockage indisponible : on se rabat sur le navigateur
  }
  if (typeof navigator === 'undefined') return 'fr'
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // stockage indisponible : le choix reste valable pour la session
    }
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  )

  return <I18nContext value={value}>{children}</I18nContext>
}
