import { useEffect } from 'react'
import { site } from '@/config/site'

/**
 * Titre de l'onglet du navigateur pour la page affichée :
 * « Projets · Valentin Frenial ». Sans titre, seul le nom s'affiche.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : site.name
  }, [title])
}
