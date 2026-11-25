import { cn } from '@/lib/utils'
import { site } from '@/config/site'

/** Marque : les initiales dans une pastille, avec un petit point « en ligne ». */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-9 shrink-0 place-items-center rounded-full bg-foreground font-heading text-[11px] font-semibold text-background',
        className,
      )}
    >
      {site.initials}
      <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background bg-brand" />
    </span>
  )
}
