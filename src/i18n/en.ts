import type { Dictionary } from './fr'

/** Textes du site en anglais. Mêmes clés que fr.ts. */
export const en: Dictionary = {
  nav: {
    home: 'Home',
    homeLabel: 'home',
    projects: 'Projects',
    about: 'About',
    contact: 'Get in touch',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languages: { fr: 'Français', en: 'English' },
  theme: {
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
  },
  footer: {
    role: 'Digital learning project manager',
  },
  draft: {
    text: 'Draft: some details (contact, bio) are still placeholders.',
  },
  home: {
    hero: {
      hello: 'Hi, I’m',
      role: 'Digital learning project manager.',
      pitch:
        'I design digital training that makes people want to learn: interactive e-learning, video, motion design and art direction. From the first idea to launch on the platform, for Nexans and Chanel.',
      seeProjects: 'See my projects',
      contactMe: 'Get in touch',
      stats: [
        {
          value: '12',
          label: 'languages for one project',
          short: '12 languages',
        },
        {
          value: '6',
          label: 'modules shipped in 1 month',
          short: '6 modules in 1 month',
        },
        {
          value: '14',
          label: 'job videos shot and edited',
          short: '14 videos',
        },
      ],
    },
    projects: {
      title: 'My projects',
      text: 'Training for thousands of learners, plus a few design projects on the side.',
      learning: 'E-learning projects',
      design: 'Design projects',
      open: 'View project',
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
      title: 'Teach, yes. Bore, never.',
      paragraphs: [
        'Between learning design and graphic design, I love turning complex or unfamiliar topics (compliance, climate, technical craftsmanship) into clear, engaging training.',
        'At Nexans and during my work-study years at Chanel, I did it all: art direction, scripting, interactions, filming, editing and motion design.',
      ],
      companiesTitle: 'They trusted me',
    },
    contact: {
      title: 'Got a training project in mind?',
      text: 'Let’s talk, in person or on a call.',
      email: 'Send an email',
      linkedin: 'Follow me on LinkedIn',
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
  ui: {
    eyebrow: 'Components',
    title: 'The toolbox',
    intro:
      'Every available component, in light and dark mode. To add one, just ask your AI assistant (“add a Tabs component”) or run',
    command: 'npx shadcn@latest add <name>',
    buttons: {
      default: 'Default',
      secondary: 'Secondary',
      outline: 'Outline',
      ghost: 'Ghost',
      destructive: 'Delete',
      link: 'Link',
    },
    badges: { new: 'New', draft: 'Draft', error: 'Error' },
    fields: { email: 'you@email.com', idea: 'Describe your idea…' },
    dialog: {
      open: 'Open the dialog',
      title: 'New project',
      description: 'Give your project a name to get started.',
      placeholder: 'my-great-project',
      cancel: 'Cancel',
      create: 'Create',
    },
    cards: {
      plans: ['Starter', 'Pro', 'Team'],
      description: 'Example content card.',
      price: (amount: number) => `€${amount}`,
      perMonth: '/month',
      choose: 'Choose',
    },
  },
  notFound: {
    title: 'This page hasn’t been built yet.',
    text: 'The address may be misspelled, or the page has moved.',
    back: 'Back to home',
  },
}
