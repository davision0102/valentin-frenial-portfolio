import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowUp, ArrowUpRight, Download, Mail } from 'lucide-react'
import { LanguageSwitch } from '@/components/language-switch'
import { LogoMark } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { ThemeToggle } from '@/components/theme-toggle'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

const navLinkClass =
  'rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground [&.active]:bg-foreground/8 [&.active]:text-foreground'

/** Bouton coloré du pied de page (LinkedIn, e-mail, CV). */
const footerButton =
  'inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:hover:translate-y-0'

function RootLayout() {
  const { t } = useI18n()

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
          <Link
            to="/"
            hash="contact"
            aria-label={t.nav.contact}
            className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3 text-sm font-medium text-background transition-transform active:scale-[0.97] sm:px-4"
          >
            <Mail className="size-4 sm:hidden" />
            <span className="max-sm:sr-only">{t.nav.contact}</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Les trois façons de le retrouver, en boutons de couleur. */}
        <div className="border-t border-border py-16 text-center sm:py-20">
          <p className="text-sm text-muted-foreground">{t.footer.lead}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            <li>
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  footerButton,
                  'bg-brand/15 text-brand hover:bg-brand/25',
                )}
              >
                LinkedIn
                <ArrowUpRight className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className={cn(
                  footerButton,
                  'bg-track-design/15 text-track-design hover:bg-track-design/25',
                )}
              >
                {t.footer.email}
                <Mail className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
                download
                className={cn(
                  footerButton,
                  'bg-track-skill/15 text-track-skill hover:bg-track-skill/25',
                )}
              >
                {t.footer.cv}
                <Download className="size-4" />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-1">
            <ThemeToggle showLabel />
            <LanguageSwitch />
          </div>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'auto'
                  : 'smooth',
              })
            }
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:text-foreground"
          >
            {t.footer.backToTop}
            <ArrowUp className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  )
}
