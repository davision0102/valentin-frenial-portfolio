import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
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

/** Liens du menu : les sections de la page d'accueil. */
const sections = [
  { hash: 'projets', key: 'projects' },
  { hash: 'a-propos', key: 'about' },
  { hash: 'contact', key: 'contact' },
] as const

function RootLayout() {
  const { t } = useI18n()
  // Menu du téléphone (sur grand écran, les liens sont toujours visibles).
  const [menuOpen, setMenuOpen] = useState(false)

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
              className={cn(navLinkClass, 'max-sm:hidden')}
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
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'ml-1 sm:hidden',
              )}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>

        {menuOpen && (
          <nav
            id="menu-mobile"
            onKeyDown={(event) => event.key === 'Escape' && setMenuOpen(false)}
            className="animate-in border-t border-border/60 px-4 pt-2 pb-4 duration-200 fade-in slide-in-from-top-1 motion-reduce:animate-none sm:hidden"
          >
            <ul className="grid gap-1">
              {sections.map((section) => (
                <li key={section.hash}>
                  <Link
                    to="/"
                    hash={section.hash}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-3 py-3 text-lg font-medium transition-colors hover:bg-secondary"
                  >
                    {t.nav[section.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
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
