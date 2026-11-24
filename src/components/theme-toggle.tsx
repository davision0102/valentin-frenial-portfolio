import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Bascule clair / sombre. `showLabel` affiche « Mode sombre » à côté de l'icône. */
export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const label = theme === 'dark' ? t.theme.toLight : t.theme.toDark
  const short = theme === 'dark' ? t.theme.light : t.theme.dark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground',
        showLabel ? 'px-3' : 'w-9 justify-center',
      )}
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      {showLabel && <span aria-hidden="true">{short}</span>}
    </button>
  )
}
