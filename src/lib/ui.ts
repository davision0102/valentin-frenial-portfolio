import { cn } from '@/lib/utils'

/**
 * Les boutons du site, identiques partout : une pilule arrondie (la forme
 * des étiquettes et des chiffres), en texte normal.
 * - « solid » (plein) pour l'action principale d'un bloc, une seule à la fois ;
 * - « outline » (bordé) pour tout le reste.
 * Taille « md » par défaut (44 px, confortable au doigt), « sm » pour les
 * petits choix comme les filtres. Les couleurs viennent du thème : dans le
 * pied de page bleu nuit, les mêmes boutons s'inversent tout seuls.
 */
type ButtonVariant = 'solid' | 'outline'
type ButtonSize = 'md' | 'sm'

const base =
  'group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,scale] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-35'

const variants: Record<ButtonVariant, string> = {
  solid: 'bg-foreground text-background hover:bg-foreground/85',
  outline:
    'border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-4 text-sm',
}

export function button(
  variant: ButtonVariant = 'outline',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className)
}

/** Bouton rond avec une seule icône (flèches du carrousel). */
export function iconButton(className?: string) {
  return cn(base, variants.outline, 'size-11 [&_svg]:size-4', className)
}

export const buttonSolid = button('solid')
export const buttonOutline = button('outline')

/**
 * Les trois niveaux de texte du site, identiques partout (police Geist).
 * - `sectionTitle` : titres de page et de section, en capitales
 *   (« Mes projets », « Le besoin »…) ;
 * - `displayTitle` : grandes phrases d'accroche en casse normale
 *   (« Moi, c'est Valentin. », titre d'un projet, pied de page) ;
 * - `label` : petits intitulés en capitales espacées, en Geist Mono
 *   (métier, numéros, catégories).
 * Le reste est du texte courant, sans réglage particulier.
 */
export const sectionTitle =
  'text-3xl leading-[0.95] font-semibold tracking-[-0.03em] text-balance uppercase sm:text-4xl'

export const displayTitle =
  'text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-5xl'

export const label = 'font-mono text-xs tracking-[0.18em] uppercase'

/** Titre d'une carte ou d'un élément de liste (projet, savoir-faire). */
export const cardTitle = 'text-xl leading-snug font-semibold tracking-tight'

/**
 * Surfaces. Arrondis du site : `rounded-2xl` pour les cartes et les images,
 * `rounded-full` pour les boutons et les étiquettes, `rounded-lg` pour la
 * barre de navigation, `rounded-t-3xl` pour la bande du pied de page.
 */
export const card = 'rounded-2xl bg-card shadow-sm shadow-foreground/5'

/** Petite étiquette arrondie (mots-clés d'un projet). */
export const chip =
  'inline-flex items-center rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand'
