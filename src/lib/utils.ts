import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Numéro sur deux chiffres : 1 → « 01 ». */
export const pad = (n: number) => String(n).padStart(2, '0')

/** Assemble des infos en une ligne, sans les vides : « Nexans · 2024 ». */
export const joinMeta = (parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(' · ')
