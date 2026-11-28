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
