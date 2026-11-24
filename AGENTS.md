# AGENTS.md

Instructions pour les assistants IA qui travaillent sur ce projet.

## Le projet

Portfolio personnel : une page d'accueil (présentation, carrousels de projets, savoir-faire, à propos, contact) et une page par projet (`/projets/<slug>`).
Explique simplement ce que tu fais, sans jargon, et vérifie le rendu dans le navigateur.

## Confidentialité

- Ne rien ajouter au README.
- Ne pas versionner les notes de travail (PRODUCT.md, DESIGN.md, `.impeccable/`).
- Toujours travailler sur une branche et ouvrir une pull request : `main` est protégée.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS 4 (thème dans `src/index.css`), TanStack Router (une page = un fichier dans `src/routes/`), Vitest.

## Où sont les choses

| Quoi                         | Où                                            |
| ---------------------------- | --------------------------------------------- |
| Nom, e-mail, LinkedIn        | `src/config/site.ts`                          |
| Textes (français et anglais) | `src/i18n/fr.ts` et `src/i18n/en.ts`          |
| Images et liens des projets  | `public/projets/` et `src/config/projects.ts` |
| Couleurs, polices            | `src/index.css`                               |
| Photo du haut de page        | `public/valentin.png`                         |

## Règles

- Imports via l'alias `@/`.
- Couleurs : uniquement les tokens du thème (`bg-background`, `text-brand`…), jamais de couleur brute ; le mode clair et le mode sombre en dépendent.
- Textes : jamais en dur ; chaque texte dans `fr.ts` **et** `en.ts`, lu avec `useI18n()`.
- Ne pas modifier `src/routeTree.gen.ts` (généré automatiquement).

## Avant de dire qu'une tâche est finie

`npm run lint`, `npm test` et `npm run build` doivent passer.
