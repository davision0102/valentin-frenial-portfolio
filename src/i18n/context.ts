import { createContext, useContext } from 'react'
import { fr, type Dictionary } from './fr'

export type Lang = 'fr' | 'en'

export const LANGS: Lang[] = ['fr', 'en']

type I18n = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Les textes de la langue active : `t.home.hero.pitch`, `t.nav.home`… */
  t: Dictionary
}

export const I18nContext = createContext<I18n>({
  lang: 'fr',
  setLang: () => {},
  t: fr,
})

/** Donne la langue active et ses textes. */
export function useI18n() {
  return useContext(I18nContext)
}
