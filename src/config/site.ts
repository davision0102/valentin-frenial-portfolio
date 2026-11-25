/**
 * Identité du site. C'est le seul endroit à modifier pour changer le nom,
 * l'e-mail ou les liens : ils sont lus d'ici partout dans l'app.
 * Les textes (en français et en anglais) sont dans src/i18n/.
 */
export const site = {
  name: 'Valentin Frenial',
  /**
   * E-mail en deux morceaux, assemblés seulement au clic (openEmail) : il
   * n'apparaît pas en clair dans la page, ce qui gêne les robots qui
   * collectent les adresses pour le spam.
   */
  emailParts: ['valentin.frenial', 'hotmail.fr'] as const,
  linkedinUrl: 'https://www.linkedin.com/in/valentinfrenial/',
  /** Initiales affichées dans le logo. */
  get initials() {
    return this.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  },
} as const

/** Ouvre la messagerie du visiteur vers Valentin, avec un objet et un message. */
export function openEmail(subject?: string, body?: string) {
  const [user, domain] = site.emailParts
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replace(/\+/g, '%20')
  window.location.href = `mailto:${user}@${domain}${query ? `?${query}` : ''}`
}
