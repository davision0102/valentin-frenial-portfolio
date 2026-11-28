# AGENTS.md

Instructions pour les assistants IA qui travaillent sur ce projet.

## Le projet

Portfolio personnel : une page d'accueil (hero avec salutations qui défilent, logos des entreprises en bas du hero, vignettes de projets qui défilent, savoir-faire), une page Projets (liste numérotée et aperçu sur ordinateur, cartes sur téléphone), une page À propos (photo, texte, 4 photos perso qui s'alignent au survol avec une légende) et une page par projet (`/projets/<slug>`). Un écran d'arrivée (un point coloré d'où sortent les salutations) s'affiche une fois par visite. Le contact (bande bleu nuit avec boutons e-mail, LinkedIn et CV) est dans le pied de page de chaque page (`#ecrire`).
Explique simplement ce que tu fais, sans jargon, et vérifie le rendu dans le navigateur.

## Confidentialité

- Ne rien ajouter au README.
- Ne pas versionner les notes de travail (PRODUCT.md, DESIGN.md, `.impeccable/`).
- Toujours travailler sur une branche et ouvrir une pull request : `main` est protégée.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 4 (thème dans `src/index.css`), TanStack Router (une page = un fichier dans `src/routes/`), Vitest.

## Où sont les choses

| Quoi                                | Où                                                 |
| ----------------------------------- | -------------------------------------------------- |
| Nom, e-mail, LinkedIn               | `src/config/site.ts`                               |
| Textes (français uniquement)        | `src/i18n/fr.ts`                                   |
| Images et liens des projets         | `public/images/` et `src/config/projects.ts`       |
| Couleurs, polices                   | `src/index.css`                                    |
| Logos des entreprises (une couleur) | `public/logos/` (SVG, Wikimedia Commons)           |
| Boutons (identiques partout)        | `src/lib/ui.ts`                                    |
| Photos de Valentin (hero, À propos) | `public/valentin-hero.webp`, `public/valentin.png` |

## Règles

- Imports via l'alias `@/`.
- Couleurs : uniquement les tokens du thème (`bg-background`, `text-brand`…), jamais de couleur brute ; le site est uniquement en clair (fond #F4F7FD, bleu nuit), sans bouton de thème. Le pied de page porte la classe `dark` pour prendre la palette bleu nuit.
- Textes : jamais en dur ; chaque texte dans `fr.ts`, lu avec `useI18n()`. Le site est en français uniquement.
- Ne pas modifier `src/routeTree.gen.ts` (généré automatiquement).

## Espacements (identiques sur toutes les pages)

| Élément                         | Classes                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| Conteneur (pages, pied de page) | `mx-auto max-w-7xl px-5 sm:px-8 lg:px-16`                   |
| Haut de page (1er bloc)         | `pt-12 sm:pt-20`                                            |
| Bas de page (dernier bloc)      | `pb-16 sm:pb-24`                                            |
| Section                         | `py-16 sm:py-24` (pas de double espace entre deux sections) |
| Titre de section → contenu      | `mt-10 sm:mt-12`                                            |
| Sous-parties dans une section   | `gap-12 sm:gap-16`                                          |
| Bloc lié au précédent           | `mt-6` (mention, lien, sous-titre)                          |
| Titre de page (h1)              | `text-3xl sm:text-4xl uppercase tracking-[-0.03em]`         |
| Titre de section (h2)           | `text-3xl sm:text-4xl uppercase tracking-[-0.03em]`         |

## Avant de dire qu'une tâche est finie

`npm run lint`, `npm test` et `npm run build` doivent passer.
