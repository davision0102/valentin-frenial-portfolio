import { cn } from '@/lib/utils'
import { site } from '@/config/site'

/** Marque : les initiales dans une pastille, avec un petit point « en ligne ». */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-10 shrink-0 place-items-center rounded-full bg-foreground font-heading text-xs font-semibold text-background',
        className,
      )}
    >
      {site.initials}
      <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background bg-brand" />
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-heading text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg">
        {site.name}
      </span>
    </span>
  )
}
