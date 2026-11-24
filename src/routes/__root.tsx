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
  'rounded-full px-3 py-1.5 text-sm text-foreground/75 transition-colors hover:bg-foreground/5 hover:text-foreground'

/** Liens du menu mobile : sections de l'accueil et page À propos. */
const sections = [
  { to: '/', hash: 'projets', key: 'projects' },
  { to: '/a-propos', hash: undefined, key: 'about' },
  { to: '/', hash: 'contact', key: 'contact' },
] as const

function RootLayout() {
  const { t } = useI18n()
  // Menu du téléphone (sur grand écran, les liens sont toujours visibles).
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative isolate flex min-h-svh flex-col">
      {/* Halos de couleur derrière le haut de chaque page, barre comprise,
          avec un fondu vers le bas : pas de coupure sous l'en-tête. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
      >
        <div className="absolute -top-48 -left-32 size-[38rem] rounded-full bg-brand/22 blur-[120px]" />
        <div className="absolute -top-24 -right-32 size-[32rem] rounded-full bg-track-design/18 blur-[120px]" />
      </div>
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
            <Link to="/a-propos" className={cn(navLinkClass, 'max-sm:hidden')}>
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
            onKeyDown={(event) => event.key === 'Escape' && setMenuOpen(false)}
            className="mt-2 origin-top-right animate-in rounded-3xl p-2 glass-thick duration-200 zoom-in-95 fade-in motion-reduce:animate-none sm:hidden"
          >
            <ul className="grid">
              {sections.map((section) => (
                <li key={section.key}>
                  <Link
                    to={section.to}
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
