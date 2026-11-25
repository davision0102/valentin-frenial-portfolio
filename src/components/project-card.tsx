import { GraduationCap, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Étiquette pleine : E-learning (bleu) ou Design (lilas), posée sur un visuel. */
export function CategoryBadge({
  category,
  label,
  className,
}: {
  category: string
  label: string
  className?: string
}) {
  const learning = category === 'learning'
  const Icon = learning ? GraduationCap : Palette
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-track-foreground shadow-sm',
        learning ? 'bg-track-learning' : 'bg-track-design',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}
