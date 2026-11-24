import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { LanguageSwitch } from '@/components/language-switch'
import { Logo } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

const navLinkClass =
  'rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'

function RootLayout() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-svh flex-col">
      {/* Bandeau d'ébauche : à supprimer quand le contenu est définitif. */}
      <p className="bg-brand px-4 py-2 text-center text-xs font-medium text-brand-foreground">
        {t.draft.text}
      </p>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" aria-label={`${site.name}, ${t.nav.homeLabel}`}>
            <Logo />
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              hash="projets"
              className={cn(navLinkClass, 'max-sm:hidden')}
            >
              {t.nav.projects}
            </Link>
            <Link
              to="/"
              hash="a-propos"
              className={cn(navLinkClass, 'max-md:hidden')}
            >
              {t.nav.about}
            </Link>
            <Link
              to="/"
              hash="contact"
              className={cn(
                buttonVariants({ size: 'sm' }),
                'mx-1 rounded-full px-3.5 max-sm:hidden',
              )}
            >
              {t.nav.contact}
            </Link>
            <ThemeToggle />
            <LanguageSwitch />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name} · {t.footer.role}
          </p>
          <div className="flex gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
