import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { CursorDot } from '@/components/cursor-dot'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { contactId, goToContact } from '@/lib/contact'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

const navLinkClass =
  'rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground [&.active]:bg-foreground/8 [&.active]:text-foreground'

function RootLayout() {
  const { t } = useI18n()

  return (
    <div className="relative isolate flex min-h-svh flex-col">
      {/* Pilule de verre centrée, juste la largeur de son contenu. */}
      <header className="sticky top-3 z-40 mt-3 flex justify-center px-3">
        <nav className="flex items-center gap-0.5 rounded-full p-1.5 glass">
          <Link
            to="/"
            aria-label={`${site.name}, ${t.nav.homeLabel}`}
            className="mr-1 rounded-full transition-transform active:scale-95"
          >
            <LogoMark />
          </Link>
          <Link to="/projets" className={navLinkClass}>
            {t.nav.projects}
          </Link>
          <Link to="/a-propos" className={navLinkClass}>
            {t.nav.about}
          </Link>
          <a
            href={`#${contactId}`}
            onClick={(event) => {
              event.preventDefault()
              goToContact()
            }}
            aria-label={t.nav.contact}
            className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3 text-sm font-medium text-background transition-transform active:scale-[0.97] sm:px-4"
          >
            <Mail className="size-4 sm:hidden" />
            <span className="max-sm:sr-only">{t.nav.contact}</span>
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
      <CursorDot />
    </div>
  )
}
