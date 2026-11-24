/**
 * Textes du site en français (langue de référence).
 * Toute nouvelle clé ajoutée ici doit aussi être ajoutée dans en.ts :
 * TypeScript signale celles qui manquent.
 */
export const fr = {
  nav: {
    home: 'Accueil',
    homeLabel: 'accueil',
    projects: 'Projets',
    about: 'À propos',
    contact: 'Me contacter',
    language: 'Langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  languages: { fr: 'Français', en: 'English' },
  theme: {
    toDark: 'Passer en thème sombre',
    toLight: 'Passer en thème clair',
  },
  footer: {
    role: 'Chef de projet digital e-learning',
  },
  home: {
    hero: {
      photoAlt: 'Photo de Valentin Frenial',
      hello: 'Bonjour, moi c’est',
      role: 'Chef de projet digital e-learning.',
      pitch:
        'Je conçois des formations digitales qui donnent envie d’apprendre : e-learnings interactifs, vidéos, motion design et direction artistique. De l’idée à la mise en ligne sur la plateforme, pour Nexans et Chanel.',
      seeProjects: 'Voir mes projets',
      contactMe: 'Me contacter',
      stats: [
        {
          value: '12',
          label: 'langues pour un même projet',
          short: '12 langues',
        },
        {
          value: '6',
          label: 'modules livrés en 1 mois',
          short: '6 modules en 1 mois',
        },
        {
          value: '14',
          label: 'vidéos métier tournées et montées',
          short: '14 vidéos',
        },
      ],
    },
    projects: {
      title: 'Mes projets',
      text: 'Des formations pour des milliers d’apprenants, et quelques projets de design en bonus.',
      learning: 'Projets e-learning',
      design: 'Projets design',
      open: 'Voir le projet',
    },
    services: {
      title: 'De l’idée de formation au module en ligne.',
      items: [
        {
          title: 'Conception e-learning',
          text: 'Scénariser des modules interactifs, des quiz et des parcours qui gardent l’attention du début à la fin.',
        },
        {
          title: 'Direction artistique',
          text: 'Donner une identité visuelle à une formation ou à une marque, du thème graphique jusqu’aux écrans.',
        },
        {
          title: 'Vidéo et motion design',
          text: 'Organiser le tournage, monter, animer et habiller les vidéos qui font vivre les modules.',
        },
        {
          title: 'Gestion de projet',
          text: 'Tenir des délais serrés, coordonner les équipes et déployer une formation dans plusieurs langues.',
        },
      ],
    },
    about: {
      title: 'Former, oui. Ennuyer, jamais.',
      paragraphs: [
        'Entre pédagogie et design, j’aime transformer des sujets complexes ou peu familiers (conformité, climat, savoir-faire techniques) en formations claires et engageantes.',
        'Chez Nexans et pendant mon alternance chez Chanel, j’ai touché à tout : direction artistique, scénarisation, interactions, tournage, montage et motion design.',
      ],
      companiesTitle: 'Ils m’ont fait confiance',
    },
    contact: {
      title: 'Un projet de formation en tête ?',
      text: 'Parlons-en, en vrai ou en visio.',
      email: 'Écrire un e-mail',
      linkedin: 'Me suivre sur LinkedIn',
    },
  },
  projects: [
    {
      slug: 'compliance-week',
      category: 'learning',
      title: 'Compliance Week 2024',
      client: 'Nexans',
      year: '2024',
      format: 'Homepage et 6 modules e-learning',
      role: 'Direction artistique et conception',
      tags: ['E-learning', 'Direction artistique', '12 langues'],
      gallery: [
        'L’affiche de la Compliance Week 2024',
        'La page d’accueil de la semaine',
      ],
      summary:
        'Une semaine de formation à la conformité, avec sa direction artistique, sa page d’accueil et 6 modules e-learning, traduits en 12 langues.',
      challenge:
        'Maintenir l’attention des apprenants tout au long de la semaine, sur des sujets qui ne leur sont pas familiers : anticorruption, cybersécurité, droits humains…',
      solution:
        'Une direction artistique claire sur le thème de la navigation, des interactions au cœur de chaque e-learning, une vidéo d’introduction avec un skipper et un quiz intégré à chaque module.',
      note: '',
      results: [
        { value: '6', label: 'modules e-learning' },
        { value: '12', label: 'langues' },
        { value: '1', label: 'semaine de formation' },
      ],
    },
    {
      slug: 'climate-training',
      category: 'learning',
      title: 'Climate Training : Let’s Act',
      client: 'Nexans',
      year: '',
      format: 'E-learning, partie 2',
      role: 'Conception et réalisation',
      tags: ['E-learning', 'Interactions', 'Motion design'],
      gallery: [
        'L’écran d’accueil de la partie 2',
        'L’affiche de lancement',
        'Interaction « cliquer pour découvrir »',
        'Interaction en carrousel',
        'Interaction en glisser-déposer',
        'Une séquence en motion design',
      ],
      summary:
        'La seconde partie d’une formation sur le climat, après une première partie très concluante suivie par plus de 1 700 apprenants.',
      challenge:
        'Synthétiser des sujets complexes : la réduction des émissions de gaz à effet de serre, et les actions possibles à chaque niveau.',
      solution:
        'De nouvelles interactions pour engager l’apprenant : cliquer pour découvrir, carrousel de témoignages de collègues, cartes à glisser-déposer et séquences en motion design pour rendre les chiffres concrets.',
      note: '',
      results: [
        { value: '1 700+', label: 'apprenants sur la première partie' },
        { value: '4', label: 'types d’interactions' },
      ],
    },
    {
      slug: 'onboarding-artisans',
      category: 'learning',
      title: 'Onboarding Artisans',
      client: 'Chanel',
      year: '',
      format: 'Programme d’accueil',
      role: 'Initiative et réalisation en autonomie',
      tags: ['Onboarding', 'Plateforme', 'Badges'],
      gallery: [
        'La vidéo « Collect all the badges »',
        'L’accueil de la plateforme',
        'Un tutoriel des premiers pas',
      ],
      summary:
        'Un programme d’accueil pour les nouveaux artisans, que j’ai proposé puis réalisé en autonomie.',
      challenge:
        'En arrivant chez Chanel, je me suis rendu compte qu’il n’y avait pas de programme d’accueil pour les nouveaux artisans.',
      solution:
        'Après avoir suggéré l’idée à mon manager, j’ai conçu ce programme qui présente l’écosystème de formation et sa plateforme dédiée, avec des tutoriels pour faire ses premiers pas. À la fin, chaque apprenant obtient un badge d’accueil : son tout premier badge.',
      note: '',
      results: [],
    },
    {
      slug: 'kit-chanel-25',
      category: 'learning',
      title: 'Kit Chanel 25',
      client: 'Chanel',
      year: '',
      format: '6 modules e-learning',
      role: 'Conception, tournage et montage',
      tags: ['E-learning', 'Vidéo', 'Délais serrés'],
      gallery: ['La carte des 6 modules et de leurs prérequis'],
      summary:
        '6 modules e-learning pour les artisans, réalisés en un mois pour accompagner la sortie d’un nouveau sac.',
      challenge:
        'L’un des projets les plus compliqués de mes années d’alternance : produire 6 modules en seulement un mois, pour coller à la sortie du nouveau sac.',
      solution:
        'Chaque module contient une vidéo de démonstration : il a fallu organiser le tournage, réaliser le montage puis mettre le tout en forme dans le module sur la plateforme, en variant les interactions pour éviter les répétitions.',
      note: 'Par souci de confidentialité, les extraits des modules ne peuvent pas être partagés.',
      results: [
        { value: '6', label: 'modules e-learning' },
        { value: '1 mois', label: 'pour tout produire' },
        { value: '6', label: 'vidéos de démonstration' },
      ],
    },
    {
      slug: 'minute-metier',
      category: 'design',
      title: 'La Minute Métier',
      client: 'Nexans',
      year: '',
      format: 'Série vidéo',
      role: 'Tournage, montage et identité graphique',
      tags: ['Vidéo', 'Motion design', 'Marque employeur'],
      gallery: [
        'Un épisode : Responsable Supply Chain',
        'L’affiche de la série',
      ],
      summary:
        'Une série de 14 vidéos qui présente les métiers de Nexans, pour attirer de nouveaux talents.',
      challenge:
        'Faire découvrir à l’extérieur la diversité des métiers de Nexans, pour donner envie à de nouveaux talents de rejoindre le groupe.',
      solution:
        'J’ai réalisé le tournage et tout le montage, en créant un motion design et une identité graphique propres à la série.',
      note: '',
      results: [{ value: '14', label: 'vidéos métier' }],
    },
    {
      slug: 'nymphe-essentials',
      category: 'design',
      title: 'Nymphe Essentials',
      client: 'Projet de fin d’études',
      year: '',
      format: 'Identité de marque',
      role: 'Direction artistique',
      tags: ['Branding', 'Packaging', 'Direction artistique'],
      gallery: [
        'Le sérum hydratant',
        'Le logo Nymphe Essentials',
        'Le pot de crème',
        'L’enseigne',
        'Les flacons',
        'Les trois gammes',
      ],
      summary:
        'La création d’une marque de cosmétiques fictive : toute sa direction artistique et son identité.',
      challenge:
        'Pour mon projet de fin d’études, imaginer une marque de cosmétiques de A à Z.',
      solution:
        'Logo, palette, déclinaison en trois gammes, packagings et mises en situation : toute l’identité de la marque Nymphe.',
      note: '',
      results: [],
    },
  ],
  carousel: {
    previous: 'Précédent',
    next: 'Suivant',
    goTo: (n: number) => `Aller à l’élément ${n}`,
    slide: (n: number, total: number) => `${n} sur ${total}`,
  },
  project: {
    gallery: 'Galerie du projet',
    back: 'Tous les projets',
    client: 'Client',
    year: 'Année',
    format: 'Format',
    role: 'Mon rôle',
    challenge: 'Le besoin',
    solution: 'Ce que j’ai fait',
    results: 'En chiffres',
    link: 'Voir le trailer sur LinkedIn',
    next: 'Projet suivant',
  },
  notFound: {
    title: 'Cette page n’existe pas.',
    text: 'L’adresse est peut-être mal écrite, ou la page a été déplacée.',
    back: 'Retour à l’accueil',
  },
}

export type Dictionary = typeof fr
