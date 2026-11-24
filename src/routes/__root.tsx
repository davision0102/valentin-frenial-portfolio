import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { AmbientProvider } from '@/components/ambient'
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
  'rounded-full px-3 py-1.5 text-sm text-foreground/75 transition-colors hover:bg-foreground/5 hover:text-foreground'

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
    <AmbientProvider>
      <div className="flex min-h-svh flex-col">
        {/* Bandeau d'ébauche : à supprimer quand le contenu est définitif. */}
        <p className="bg-foreground px-4 py-2 text-center text-xs font-medium text-background">
          {t.draft.text}
        </p>

        {/* Barre de verre flottante, le contenu défile dessous. */}
        <header className="sticky top-3 z-40 mx-auto mt-3 w-full max-w-7xl px-3 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-3 rounded-full pr-2 pl-2 glass">
            <Link
              to="/"
              aria-label={`${site.name}, ${t.nav.homeLabel}`}
              className="rounded-full pr-2"
            >
              <Logo />
            </Link>

            <nav className="flex items-center gap-0.5">
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
                className="mx-1 inline-flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform active:scale-[0.97] max-sm:hidden"
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
                  'rounded-full sm:hidden',
                )}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </nav>
          </div>

          {menuOpen && (
            <nav
              id="menu-mobile"
              onKeyDown={(event) =>
                event.key === 'Escape' && setMenuOpen(false)
              }
              className="mt-2 origin-top-right animate-in rounded-3xl p-2 glass-thick duration-200 zoom-in-95 fade-in motion-reduce:animate-none sm:hidden"
            >
              <ul className="grid">
                {sections.map((section) => (
                  <li key={section.hash}>
                    <Link
                      to="/"
                      hash={section.hash}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium transition-colors hover:bg-foreground/5"
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

        <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-2 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {site.name} · {t.footer.role}
            </p>
            <div className="flex gap-5">
              <a
                href={`mailto:${site.email}`}
                className="hover:text-foreground"
              >
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
    </AmbientProvider>
  )
}
