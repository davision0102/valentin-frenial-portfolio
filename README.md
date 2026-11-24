# Valentin Frenial · Portfolio

Portfolio de Valentin Frenial, chef de projet digital e-learning.

**Voir le site :** https://davision0102.github.io/valentin-frenial-portfolio/

Le site est en français et en anglais, en mode clair et sombre, et s'adapte au téléphone.

## Ce qu'il contient

- **Accueil** : présentation, projets en carrousel (e-learning et design), savoir-faire, entreprises, contact.
- **Une page par projet** : galerie d'images en carrousel, le besoin, ce qui a été fait, les chiffres clés.

Projets : Compliance Week 2024, Climate Training, Onboarding Artisans, Kit Chanel 25, La Minute Métier, Nymphe Essentials.

## Modifier le contenu

| Je veux changer…                    | Fichier                                       |
| ----------------------------------- | --------------------------------------------- |
| Le nom, l'e-mail, le lien LinkedIn  | `src/config/site.ts`                          |
| Les textes (présentation, projets…) | `src/i18n/fr.ts` et `src/i18n/en.ts`          |
| Les images d'un projet              | `public/projets/` et `src/config/projects.ts` |
| Les couleurs, les polices           | `src/index.css`                               |

Le plus simple : ouvrir le dossier avec un assistant IA (Claude Code, Cursor…) et lui demander en français, par exemple « ajoute un projet » ou « change mon e-mail ». Les instructions pour l'assistant sont dans `AGENTS.md`.

## Voir le site sur son ordinateur

Il faut [Node.js](https://nodejs.org) (version 22 ou plus). Dans un terminal, dans ce dossier :

```bash
npm install
```

```bash
npm run dev
```

Puis ouvrir http://localhost:5173.

## Mise en ligne

Chaque modification envoyée sur la branche `main` met le site à jour automatiquement (GitHub Pages), en une à deux minutes.

## À compléter

- L'e-mail et le lien LinkedIn sont provisoires (`src/config/site.ts`).
- Les années des projets, sauf Compliance Week (2024).
- Le bandeau « Ébauche » en haut du site : à supprimer dans `src/routes/__root.tsx` quand tout est prêt.
