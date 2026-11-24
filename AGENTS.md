# AGENTS.md

Instructions pour les assistants IA (Claude Code, Codex, Cursor, Copilot…) qui travaillent dans ce projet.
Format ouvert : https://agents.md

## Le projet

Le public visé comprend des designers et des personnes qui ne codent pas : explique simplement ce que tu fais, sans jargon, et propose de vérifier le rendu dans le navigateur.

Ce site est un portfolio personnel : une page d'accueil (présentation, projets en carrousel, savoir-faire, contact) et une page par projet (`/projets/<slug>`).
Confidentialité : ne rien ajouter au README, ne pas versionner les notes de travail (PRODUCT.md, DESIGN.md, `.impeccable/`).
Les textes des projets sont dans `src/i18n/`, leurs images dans `public/projets/` et la liste des images dans `src/config/projects.ts`.
Le nom et les liens du projet sont centralisés dans `src/config/site.ts`. Le site est bilingue (français et anglais, sélecteur FR / EN dans l'en-tête) : tous les textes visibles sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Tailwind CSS 4 (configuration dans `src/index.css`, pas de `tailwind.config`)
- shadcn/ui sur Base UI (`@base-ui/react`), icônes `lucide-react`
- TanStack Router, routes générées depuis les fichiers
- Vitest + Testing Library

## Commandes

| Commande         | Rôle                                       |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | serveur de développement (localhost:5173)  |
| `npm run build`  | vérification TypeScript + build production |
| `npm run lint`   | ESLint                                     |
| `npm run format` | Prettier (trie aussi les classes Tailwind) |
| `npm test`       | tests Vitest                               |

Avant de dire qu'une tâche est finie : `npm run lint`, `npm test` et `npm run build` doivent passer.

## Structure

```
src/
  config/site.ts      identité (nom, e-mail, LinkedIn)
  config/projects.ts  images et liens de chaque projet
  i18n/               textes du site : fr.ts (référence), en.ts, sélecteur de langue
  routes/             une page = un fichier (TanStack Router)
  components/         composants de l'app
  components/ui/      composants shadcn — générés, modifiables
  components/not-found.tsx  page 404
  hooks/              hooks React réutilisables
  lib/utils.ts        cn() pour fusionner les classes
  index.css           thème : couleurs, polices, rayons
.agents/skills/       skills (recettes pas à pas) — .claude/skills pointe ici
```

## Conventions

- **Imports** : toujours via l'alias `@/` (`@/components/ui/button`).
- **Pages** : un fichier dans `src/routes/` ; ne jamais modifier `src/routeTree.gen.ts`, il est régénéré automatiquement.
- **Couleurs** : uniquement les tokens du thème (`bg-background`, `text-muted-foreground`, `text-brand`…), jamais de couleurs Tailwind brutes (`bg-blue-500`) ni d'hexadécimal. Le mode sombre en dépend.
- **Composants UI** : ajouter avec `npx shadcn@latest add <nom>`, puis l'exposer sur la page `/ui`.
- **Liens** : `<Link>` de TanStack Router pour la navigation interne, `<a>` pour l'externe.
- **Textes** : jamais écrits en dur dans les composants. Ajoute chaque texte dans `src/i18n/fr.ts` **et** `src/i18n/en.ts` (TypeScript signale une traduction manquante), puis lis-le avec `const { t } = useI18n()`. Le nom du projet vient de `site.name`.
- **Simplicité** : pas de nouvelle dépendance sans raison claire, pas de fichiers inutiles.

## Skills disponibles

Recettes dans `.agents/skills/` — lis la bonne avant de commencer :

- `add-page` — créer une nouvelle page et l'ajouter à la navigation
- `add-component` — installer un composant shadcn/ui
- `design-system` — couleurs, polices et règles visuelles du thème
- `add-test` — écrire un test Vitest + Testing Library
- `add-form` — formulaire avec validation (react-hook-form + zod)
- `fetch-data` — charger des données d'une API
- `deploy` — mettre le site en ligne (GitHub Pages déjà configuré)
- `from-figma` — intégrer une maquette (lien Figma, capture) fidèlement
- `polish-ui` — passe de finition : états, responsive, mode sombre, accessibilité
- `add-motion` — animations utiles, bonnes durées, respect de reduced-motion

## Outils MCP

`.mcp.json` déclare le serveur MCP shadcn : il permet de chercher et d'installer des composants depuis le registre shadcn.
