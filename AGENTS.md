# AGENTS.md

Instructions pour les assistants IA qui travaillent sur ce projet.

## Le projet

Portfolio personnel : une page d'accueil (hero, présentation, carrousel de projets, savoir-faire), une page Projets, une page À propos (photo, texte, éventail de photos) et une page par projet (`/projets/<slug>`). Le contact (bande bleu nuit avec boutons e-mail, LinkedIn et CV) est dans le pied de page de chaque page (`#ecrire`).
Explique simplement ce que tu fais, sans jargon, et vérifie le rendu dans le navigateur.

## Confidentialité

- Ne rien ajouter au README.
- Ne pas versionner les notes de travail (PRODUCT.md, DESIGN.md, `.impeccable/`).
- Toujours travailler sur une branche et ouvrir une pull request : `main` est protégée.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 4 (thème dans `src/index.css`), TanStack Router (une page = un fichier dans `src/routes/`), Vitest.

## Où sont les choses

| Quoi                                | Où                                           |
| ----------------------------------- | -------------------------------------------- |
| Nom, e-mail, LinkedIn               | `src/config/site.ts`                         |
| Textes (français et anglais)        | `src/i18n/fr.ts` et `src/i18n/en.ts`         |
| Images et liens des projets         | `public/images/` et `src/config/projects.ts` |
| Couleurs, polices                   | `src/index.css`                              |
| Logos des entreprises (une couleur) | `public/logos/` (SVG, Wikimedia Commons)     |
| Photo du haut de page               | `public/valentin.png`                        |

## Règles

- Imports via l'alias `@/`.
- Couleurs : uniquement les tokens du thème (`bg-background`, `text-brand`…), jamais de couleur brute ; le sombre (bleu nuit) est le thème par défaut, le clair est un blanc simple avec des titres bleu nuit (`--heading`).
- Textes : jamais en dur ; chaque texte dans `fr.ts` **et** `en.ts`, lu avec `useI18n()`.
- Ne pas modifier `src/routeTree.gen.ts` (généré automatiquement).

## Espacements (identiques sur toutes les pages)

| Élément                         | Classes                                                             |
| ------------------------------- | ------------------------------------------------------------------- |
| Conteneur (pages, pied de page) | `mx-auto max-w-7xl px-5 sm:px-8 lg:px-16`                           |
| Haut de page (1er bloc)         | `pt-12 sm:pt-20`                                                    |
| Bas de page (dernier bloc)      | `pb-16 sm:pb-24`                                                    |
| Section                         | `py-16 sm:py-24` (pas de double espace entre deux sections)         |
| Titre de section → contenu      | `mt-10 sm:mt-12`                                                    |
| Sous-parties dans une section   | `gap-12 sm:gap-16`                                                  |
| Bloc lié au précédent           | `mt-6` (mention, lien, sous-titre → carrousel)                      |
| Titre de page (h1)              | `text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.045em]` |
| Titre de section (h2)           | `text-3xl sm:text-4xl tracking-tight`                               |

## Avant de dire qu'une tâche est finie

`npm run lint`, `npm test` et `npm run build` doivent passer.
