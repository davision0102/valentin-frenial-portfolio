/**
 * Identité du site. C'est le seul endroit à modifier pour changer le nom,
 * l'e-mail ou les liens : ils sont lus d'ici partout dans l'app.
 * Les textes (en français et en anglais) sont dans src/i18n/.
 *
 * ⚠️ Ébauche : l'e-mail et le lien LinkedIn sont provisoires, à remplacer.
 */
export const site = {
  name: 'Valentin Frenial',
  email: 'valentin@example.com',
  linkedinUrl: 'https://www.linkedin.com/',
  /** Initiales affichées dans le logo. */
  get initials() {
    return this.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  },
  /** Dépôt GitHub et adresse du site en ligne. */
  repo: 'davision0102/valentin-frenial-portfolio',
  url: 'https://davision0102.github.io/valentin-frenial-portfolio/',
} as const
