---
name: design-system
description: Règles visuelles du projet — couleurs, polices, espacements, mode sombre. À lire avant de créer ou modifier une interface, ou pour changer le thème (couleur principale, police, arrondis).
---

# Design system

Tout le thème vit dans `src/index.css` (Tailwind CSS 4, sans fichier de config).

## Couleurs

Toujours utiliser les tokens, jamais de couleurs brutes : c'est ce qui fait marcher le mode sombre.

| Token                       | Usage                                       |
| --------------------------- | ------------------------------------------- |
| `background` / `foreground` | fond de page / texte principal              |
| `card`                      | surfaces surélevées (cartes, panneaux)      |
| `muted-foreground`          | texte secondaire                            |
| `secondary`                 | fonds discrets, survols                     |
| `border`                    | bordures et séparateurs                     |
| `primary`                   | bouton principal (encre)                    |
| `brand`                     | couleur signature : accents, liens, détails |
| `destructive`               | erreurs, suppressions                       |

Utiliser `brand` avec parcimonie : un accent par zone, pas de grands aplats. Les opacités (`bg-brand/10`, `text-brand/50`) servent pour les nuances.

**Changer la couleur signature** : modifier `--brand` dans `:root` et dans `.dark` (format `oklch`). Garder la même teinte (3ᵉ valeur) dans les deux, un peu plus claire en sombre.

### La palette actuelle : vert sauge

- Teinte unique 160–165 : le vert `brand` et, très légèrement, les gris (fonds, bordures, textes). Si tu changes la couleur signature, change aussi la teinte des gris pour garder l'ensemble cohérent.
- Saturation basse (chroma 0,09 pour le vert, 0,003 à 0,012 pour les gris) : la palette doit rester reposante. Éviter les couleurs criardes.
- Clair : `brand` à `oklch(0.52 0.09 165)`, assez foncé pour du texte sur fond blanc. Sombre : `oklch(0.8 0.09 165)`, plus clair et pastel pour rester lisible sans éblouir.
- Éviter l'orange chaud sur fond crème : c'était l'ancienne palette, trop proche de l'identité de Claude. Le pourquoi est détaillé dans `CHANGELOG.md`.
- Les couleurs écrites en dur hors du thème (favicon `public/favicon.svg`, `theme-color` dans `index.html`, image de partage `docs/og-image.html`) doivent suivre à la main.

## Typographie

- Titres (`h1`–`h3`) : Bricolage Grotesque, appliquée automatiquement (`font-heading`).
- Texte : Inter (`font-sans`).
- Code et commandes : `font-mono`.
- Grands titres : `font-semibold tracking-tight`, jamais `font-bold` + `uppercase` ensemble.

Pour changer de police : installer le paquet `@fontsource-variable/<police>`, l'importer en haut de `src/index.css` et modifier `--font-heading` ou `--font-sans`.

## Mise en page

- Conteneur : `mx-auto max-w-6xl px-4 sm:px-6`.
- Sections : `py-16` à `py-24`.
- Arrondis généreux : `rounded-3xl` pour les blocs, `rounded-full` pour boutons et pastilles.
- Toujours vérifier à 375 px de large : aucun défilement horizontal.

## Mode sombre

La classe `dark` est posée sur `<html>` (script dans `index.html` + hook `useTheme`). Si une interface a été construite avec les tokens, elle fonctionne en sombre sans rien ajouter. Éviter `dark:` sauf cas particulier.

## Mouvement

Animations courtes et utiles seulement (`tw-animate-css` : `animate-in fade-in slide-in-from-bottom-3`). Pas d'animation sur ce qui est utilisé en boucle.
