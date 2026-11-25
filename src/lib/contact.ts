/** Identifiant du bloc de contact, dans le pied de page de chaque page. */
export const contactId = 'ecrire'

/** Fait défiler la page jusqu'au bloc de contact du pied de page. */
export function goToContact() {
  const target = document.getElementById(contactId)
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
