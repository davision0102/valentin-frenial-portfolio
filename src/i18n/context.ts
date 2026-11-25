import { createContext, useContext } from 'react'
import { fr, type Dictionary } from './fr'

/** Le site est en français uniquement. */
export type Lang = 'fr'

type I18n = {
  lang: Lang
  /** Les textes du site : `t.home.hero.bio`, `t.nav.projects`… */
  t: Dictionary
}

export const I18nContext = createContext<I18n>({ lang: 'fr', t: fr })

/** Donne les textes du site. */
export function useI18n() {
  return useContext(I18nContext)
}
