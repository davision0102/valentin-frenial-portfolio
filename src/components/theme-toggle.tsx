import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { useI18n } from '@/i18n/context'

/**
 * Bascule clair / sombre : une icône, sans fond. Masquée sur téléphone, où
 * le thème suit celui de l'appareil.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const label = theme === 'dark' ? t.theme.toLight : t.theme.toDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center text-muted-foreground transition-colors hover:text-foreground max-sm:hidden"
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}
