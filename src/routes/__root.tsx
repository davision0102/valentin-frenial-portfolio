import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { FileDown, Mail } from 'lucide-react'
import { LanguageSwitch } from '@/components/language-switch'
import { LogoMark } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { ThemeToggle } from '@/components/theme-toggle'
import { openEmail, site } from '@/config/site'
import { useI18n } from '@/i18n/context'

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
            hash="ecrire"
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

      <Footer />
    </div>
  )
}

/**
 * Pied de page : une seule ligne. À gauche le copyright, à droite de petits
 * boutons ronds (e-mail, LinkedIn, CV), puis le thème et la langue.
 * L'adresse e-mail n'est jamais écrite en clair dans la page.
 */
function Footer() {
  const { t } = useI18n()
  const f = t.footer
  const icon =
    'grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground'

  return (
    <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col-reverse items-start gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openEmail()}
            aria-label={f.email}
            title={f.email}
            className={icon}
          >
            <Mail className="size-4" />
          </button>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={icon}
          >
            <LinkedinGlyph />
          </a>
          <a
            href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
            download
            aria-label={f.cv}
            title={f.cv}
            className={icon}
          >
            <FileDown className="size-4" />
          </a>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  )
}

/** Logo LinkedIn simplifié (« in »), dessiné à la taille des autres icônes. */
function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.65v5.15h-4v-11Z" />
    </svg>
  )
}
