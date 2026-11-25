import type { Dictionary } from './fr'

/** Textes du site en anglais. Mêmes clés que fr.ts. */
export const en: Dictionary = {
  nav: {
    home: 'Home',
    homeLabel: 'home',
    projects: 'Projects',
    about: 'About',
    language: 'Language',
    available: 'Available',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languages: { fr: 'Français', en: 'English' },
  theme: {
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
  },
  footer: {
    title: 'Let’s make training that sticks.',
    contact: 'Contact',
    project: 'Project in mind?',
    name: 'Your name',
    email: 'Email address',
    need: 'What do you need?',
    send: 'Send',
    subject: 'Portfolio',
    from: 'From',
    now: (date: string, time: string) =>
      `It’s ${date}, ${time} here in France.`,
    reply: 'I’ll get back to you shortly.',
    explore: 'Explore',
    follow: 'Follow',
    linkedin: 'LinkedIn',
    cv: 'Download my CV',
    basedIn: 'Based in',
    based: 'France',
    availability: 'Availability',
    available: 'Open to a chat',
  },
  home: {
    hero: {
      photoAlt: 'Photo of Valentin Frenial',
      greetings: ['Hello', 'Bonjour', 'Hola'],
      role: 'Digital learning project manager.',
      bio: 'I’m Valentin, a digital learning project manager. I love turning complex topics into clear training that makes people want to learn.',
      seeProjects: 'See my projects',
      stats: [
        {
          value: '12',
          label: 'languages',
        },
        {
          value: '6',
          label: 'modules in 1 month',
        },
        {
          value: '14',
          label: 'job videos',
        },
      ],
    },
    projects: {
      title: 'My projects',
      seeAll: 'All projects',
    },
    services: {
      title: 'From a training idea to a live online module.',
      items: [
        {
          title: 'E-learning design',
          text: 'Scripting interactive modules, quizzes and learning paths that hold attention from start to finish.',
        },
        {
          title: 'Art direction',
          text: 'Giving a course or a brand its visual identity, from the graphic theme to every screen.',
        },
        {
          title: 'Video and motion design',
          text: 'Organising shoots, editing, animating and dressing the videos that bring modules to life.',
        },
        {
          title: 'Project management',
          text: 'Meeting tight deadlines, coordinating teams and rolling out training in several languages.',
        },
      ],
    },
    about: {
      companiesTitle: 'They trusted me',
    },
  },
  projects: [
    {
      slug: 'compliance-week',
      category: 'learning',
      title: 'Compliance Week 2024',
      client: 'Nexans',
      year: '2024',
      format: 'Homepage and 6 e-learning modules',
      role: 'Art direction and design',
      tags: ['E-learning', 'Art direction', '12 languages'],
      gallery: ['The Compliance Week 2024 poster', 'The week’s homepage'],
      summary:
        'A week of compliance training, with its art direction, homepage and 6 e-learning modules, translated into 12 languages.',
      challenge:
        'Keeping learners engaged all week long on topics they are not familiar with: anti-corruption, cybersecurity, human rights…',
      solution:
        'A clear art direction built around a sailing theme, interactions at the heart of every module, an intro video with a skipper and a quiz in each module.',
      note: '',
      results: [
        { value: '6', label: 'e-learning modules' },
        { value: '12', label: 'languages' },
        { value: '1', label: 'week of training' },
      ],
    },
    {
      slug: 'climate-training',
      category: 'learning',
      title: 'Climate Training: Let’s Act',
      client: 'Nexans',
      year: '',
      format: 'E-learning, part 2',
      role: 'Design and production',
      tags: ['E-learning', 'Interactions', 'Motion design'],
      gallery: [
        'The part 2 home screen',
        'The launch poster',
        '“Click to discover” interaction',
        'Carousel interaction',
        'Drag-and-drop interaction',
        'A motion design sequence',
      ],
      summary:
        'The second part of a climate course, following a very successful first part completed by more than 1,700 learners.',
      challenge:
        'Summing up complex topics: reducing greenhouse gas emissions, and what can be done at every level.',
      solution:
        'New interactions to engage learners: click to discover, a carousel of colleague stories, drag-and-drop cards and motion design sequences that make the figures concrete.',
      note: '',
      results: [
        { value: '1,700+', label: 'learners on part one' },
        { value: '4', label: 'types of interactions' },
      ],
    },
    {
      slug: 'onboarding-artisans',
      category: 'learning',
      title: 'Artisans Onboarding',
      client: 'Chanel',
      year: '',
      format: 'Onboarding programme',
      role: 'Own initiative, built independently',
      tags: ['Onboarding', 'Platform', 'Badges'],
      gallery: [
        'The “Collect all the badges” video',
        'The platform homepage',
        'A first-steps tutorial',
        'First steps on the platform and the video module',
      ],
      summary:
        'An onboarding programme for new artisans, which I suggested and then built on my own.',
      challenge:
        'When I joined Chanel, I noticed there was no onboarding programme for new artisans.',
      solution:
        'After pitching the idea to my manager, I designed a programme that introduces the training ecosystem and its dedicated platform, with tutorials for the first steps. At the end, each learner earns a welcome badge: their very first one.',
      note: '',
      results: [],
    },
    {
      slug: 'kit-chanel-25',
      category: 'learning',
      title: 'Kit Chanel 25',
      client: 'Chanel',
      year: '',
      format: '6 e-learning modules',
      role: 'Design, filming and editing',
      tags: ['E-learning', 'Video', 'Tight deadline'],
      gallery: ['The map of the 6 modules and their prerequisites'],
      summary:
        '6 e-learning modules for artisans, produced in one month for the launch of a new bag.',
      challenge:
        'One of the toughest projects of my work-study years: producing 6 modules in just one month, in time for the new bag’s release.',
      solution:
        'Each module includes a demo video: I organised the shoot, edited the footage and built it all into the module on the platform, varying the interactions to avoid repetition.',
      note: 'For confidentiality reasons, excerpts from these modules cannot be shared.',
      results: [
        { value: '6', label: 'e-learning modules' },
        { value: '1 month', label: 'to produce everything' },
        { value: '6', label: 'demo videos' },
      ],
    },
    {
      slug: 'campagne-municipale',
      category: 'design',
      title: '2026 municipal campaign',
      client: 'Ensemble pour Thorigny list',
      year: '2026',
      format: 'Print materials',
      role: 'Freelance designer',
      tags: ['Print', 'Communication', 'Freelance'],
      gallery: [
        'The campaign poster',
        'The 35-actions leaflet, with the town map',
        'The first-round circular',
        'The second-round circular',
        'The ballot paper',
      ],
      summary:
        'Print materials for a list running in the March 2026 municipal and community elections: poster, leaflets, circulars and ballot paper.',
      challenge:
        'A two-round campaign, with materials to produce fast, readable at a glance and consistent from the first document to the last.',
      solution:
        'As a freelancer, I designed the communication visuals and produced the campaign’s print materials in one shared identity: poster, leaflets, circulars for both rounds and the ballot paper.',
      note: '',
      results: [
        { value: '5', label: 'print materials' },
        { value: '2', label: 'campaign rounds' },
      ],
    },
    {
      slug: 'ico',
      category: 'design',
      title: 'ICO!: a pirate card game',
      client: 'Workshop',
      year: '',
      format: 'Brand guidelines and packaging',
      role: '',
      tags: ['Branding', 'Illustration', 'Packaging'],
      gallery: [
        'The brand guidelines cover',
        'The game cards',
        'The cards in context',
        'The game boxes',
        'The Pirate card',
        'The captain pawn, shaped like a ship’s wheel',
        'A social media post',
      ],
      summary:
        'The complete identity of a hidden-role card game set in a pirate world: logo, colours, typefaces, cards, box and social media.',
      challenge:
        'Lost in the Caribbean, sailors must unmask the pirates hiding in their crew. Up against Werewolves of Millers Hollow, the game had to stand out with a friendlier world.',
      solution:
        'Complete brand guidelines: a ship’s-wheel logo, a bright palette, typefaces, illustrations for every card, the box, a captain pawn and Instagram posts, plus a benchmark of competing games.',
      note: '',
      results: [],
    },
    {
      slug: 'minute-metier',
      category: 'design',
      title: 'La Minute Métier',
      client: 'Nexans',
      year: '',
      format: 'Video series',
      role: 'Filming, editing and visual identity',
      tags: ['Video', 'Motion design', 'Employer brand'],
      gallery: ['An episode: Supply Chain Manager', 'The series poster'],
      summary:
        'A series of 14 videos showcasing jobs at Nexans, to attract new talent.',
      challenge:
        'Showing the outside world the variety of jobs at Nexans, so new talent wants to join the group.',
      solution:
        'I handled the filming and all the editing, creating a motion design and a visual identity specific to the series.',
      note: '',
      results: [{ value: '14', label: 'job videos' }],
    },
    {
      slug: 'nymphe-essentials',
      category: 'design',
      title: 'Nymphe Essentials',
      client: 'Final-year project',
      year: '',
      format: 'Brand identity',
      role: 'Art direction',
      tags: ['Branding', 'Packaging', 'Art direction'],
      gallery: [
        'The hydrating serum',
        'The Nymphe Essentials logo',
        'The cream jar',
        'The shop sign',
        'The bottles',
        'The three product lines',
      ],
      summary:
        'Creating a fictional cosmetics brand: its whole art direction and identity.',
      challenge:
        'For my final-year project, imagining a cosmetics brand from A to Z.',
      solution:
        'Logo, colour palette, three product lines, packaging and mock-ups: the complete identity of the Nymphe brand.',
      note: '',
      results: [],
    },
  ],
  projectsPage: {
    open: 'View project',
    title: 'My projects',
    intro:
      'Digital training for Nexans and Chanel, plus design projects, from video to print.',
    filtersLabel: 'Filter projects',
    all: 'All',
    learning: 'E-learning',
    design: 'Design',
  },
  aboutPage: {
    title: 'I’m Valentin.',
    text: 'I design digital training that is intuitive and engaging, built around the people who take it. Trained at EEMI in digital project management and art direction, I learned the ropes at Nexans, then at Chanel. Independent and meticulous, I love taking a complex topic and turning it into a clear experience people want to finish.',
    photosAlt: 'A few images from my projects',
  },
  carousel: {
    previous: 'Previous',
    next: 'Next',
    goTo: (n: number) => `Go to item ${n}`,
    slide: (n: number, total: number) => `${n} of ${total}`,
  },
  project: {
    gallery: 'Project gallery',
    back: 'All projects',
    client: 'Client',
    year: 'Year',
    format: 'Format',
    role: 'My role',
    challenge: 'The need',
    solution: 'What I did',
    results: 'Key figures',
    link: 'Watch the trailer on LinkedIn',
    next: 'Next project',
  },
  notFound: {
    pageTitle: 'Page not found',
    title: 'This page doesn’t exist.',
    text: 'The address may be misspelled, or the page has moved.',
    back: 'Back to home',
  },
}
