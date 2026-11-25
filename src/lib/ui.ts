/**
 * Les deux boutons du site, identiques partout : rectangles nets, texte en
 * petites capitales espacées. « Plein » pour l'action principale, « bordé »
 * pour le reste.
 */
export const buttonSolid =
  'group inline-flex h-10 items-center justify-center gap-2 bg-foreground px-5 font-mono text-[0.6875rem] tracking-[0.18em] text-background uppercase transition-transform active:scale-[0.97]'

export const buttonOutline =
  'group inline-flex h-10 items-center justify-center gap-2 border border-border px-5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-[border-color,transform] hover:border-foreground active:scale-[0.97]'
