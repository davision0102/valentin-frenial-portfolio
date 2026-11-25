import { I18nContext } from './context'
import { fr } from './fr'

const value = { lang: 'fr' as const, t: fr }

/** Fournit les textes du site (en français uniquement). */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nContext value={value}>{children}</I18nContext>
}
