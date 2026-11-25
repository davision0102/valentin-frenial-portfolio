/**
 * Images et liens des projets (ce qui ne dépend pas de la langue).
 * Les textes (titre, description, légendes) sont dans src/i18n/, sous
 * `projects`, avec le même `slug` et dans le même ordre.
 *
 * Les images sont dans public/images/. Pour en ajouter une : déposer le
 * fichier, l'ajouter ici, puis ajouter sa légende dans `gallery` (fr et en).
 * `fit: 'contain'` affiche l'image entière (affiches, visuels en hauteur),
 * `fit: 'cover'` la fait remplir le cadre (captures d'écran en 16/9).
 */
export type ProjectImage = { file: string; fit: 'cover' | 'contain' }

export type ProjectMedia = {
  slug: string
  /** La première image sert de couverture sur la page d'accueil. */
  images: ProjectImage[]
  /** Lien externe facultatif (vidéo, trailer…). */
  link?: string
}

export const projectMedia: ProjectMedia[] = [
  {
    slug: 'compliance-week',
    images: [
      { file: 'compliance-week-1.jpg', fit: 'contain' },
      { file: 'compliance-week-2.jpg', fit: 'contain' },
    ],
  },
  {
    slug: 'climate-training',
    images: [
      { file: 'climate-training-1.jpg', fit: 'cover' },
      { file: 'climate-training-2.jpg', fit: 'contain' },
      { file: 'climate-training-3.jpg', fit: 'cover' },
      { file: 'climate-training-4.jpg', fit: 'cover' },
      { file: 'climate-training-5.jpg', fit: 'cover' },
      { file: 'climate-training-6.jpg', fit: 'cover' },
    ],
  },
  {
    slug: 'onboarding-artisans',
    images: [
      { file: 'onboarding-artisans-2.jpg', fit: 'cover' },
      { file: 'onboarding-artisans-1.jpg', fit: 'contain' },
      { file: 'onboarding-artisans-3.jpg', fit: 'contain' },
      { file: 'onboarding-artisans-4.jpg', fit: 'contain' },
    ],
  },
  {
    slug: 'kit-chanel-25',
    images: [{ file: 'kit-chanel-25-1.jpg', fit: 'contain' }],
  },
  {
    slug: 'campagne-municipale',
    images: [
      { file: 'campagne-municipale-1.jpg', fit: 'contain' },
      { file: 'campagne-municipale-2.jpg', fit: 'contain' },
      { file: 'campagne-municipale-3.jpg', fit: 'contain' },
      { file: 'campagne-municipale-4.jpg', fit: 'contain' },
      { file: 'campagne-municipale-5.jpg', fit: 'contain' },
    ],
  },
  {
    slug: 'ico',
    images: [
      { file: 'ico-1.jpg', fit: 'contain' },
      { file: 'ico-2.jpg', fit: 'contain' },
      { file: 'ico-3.jpg', fit: 'contain' },
      { file: 'ico-4.jpg', fit: 'contain' },
      { file: 'ico-5.jpg', fit: 'contain' },
      { file: 'ico-6.jpg', fit: 'contain' },
      { file: 'ico-7.jpg', fit: 'contain' },
    ],
  },
  {
    slug: 'minute-metier',
    images: [
      { file: 'minute-metier-2.jpg', fit: 'cover' },
      { file: 'minute-metier-1.jpg', fit: 'contain' },
    ],
    link: 'https://www.linkedin.com/posts/nexans_la-minute-m%C3%A9tier-by-nexans-activity-7028297822806401024-kRv1',
  },
  {
    slug: 'nymphe-essentials',
    images: [
      { file: 'nymphe-essentials-2.jpg', fit: 'contain' },
      { file: 'nymphe-essentials-1.jpg', fit: 'contain' },
      { file: 'nymphe-essentials-3.jpg', fit: 'contain' },
      { file: 'nymphe-essentials-4.jpg', fit: 'contain' },
      { file: 'nymphe-essentials-5.jpg', fit: 'contain' },
      { file: 'nymphe-essentials-6.jpg', fit: 'contain' },
    ],
  },
]

/** Adresse publique d'une image (tient compte du sous-dossier GitHub Pages). */
export function imageUrl(file: string) {
  return `${import.meta.env.BASE_URL}images/${file}`
}

export function getProjectMedia(slug: string) {
  return projectMedia.find((project) => project.slug === slug)
}
