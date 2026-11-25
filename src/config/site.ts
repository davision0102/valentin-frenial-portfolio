/**
 * Identité du site. C'est le seul endroit à modifier pour changer le nom,
 * l'e-mail ou les liens : ils sont lus d'ici partout dans l'app.
 * Les textes (en français et en anglais) sont dans src/i18n/.
 */
export const site = {
  name: 'Valentin Frenial',
  email: 'valentin.frenial@hotmail.fr',
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
