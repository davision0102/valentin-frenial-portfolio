/**
 * Les deux boutons du site, identiques partout : rectangles nets, texte en
 * petites capitales espacées. « Plein » pour l'action principale, « bordé »
 * pour le reste.
 */
export const buttonSolid =
  'group inline-flex h-12 items-center justify-center gap-2.5 bg-foreground px-8 font-mono text-xs tracking-[0.2em] text-background uppercase transition-transform active:scale-[0.97]'

export const buttonOutline =
  'group inline-flex h-12 items-center justify-center gap-2.5 border border-border px-8 font-mono text-xs tracking-[0.2em] uppercase transition-[border-color,transform] hover:border-foreground active:scale-[0.97]'
