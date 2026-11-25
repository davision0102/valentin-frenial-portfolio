import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react'
import { LanguageSwitch } from '@/components/language-switch'
import { LogoMark } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { ThemeToggle } from '@/components/theme-toggle'
import { site } from '@/config/site'
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
 * Pied de page fin, identique sur toutes les pages : e-mail (à copier),
 * LinkedIn, CV, puis copyright, thème et langue. Le vrai moment de contact
 * est sur l'accueil (le brouillon d'e-mail).
 */
function Footer() {
  const { t } = useI18n()
  const f = t.footer
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papiers indisponible : le lien e-mail reste utilisable.
    }
  }

  const link =
    'inline-flex items-center gap-1.5 transition-colors hover:text-foreground'

  return (
    <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li className="flex items-center gap-1">
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={f.copyLabel}
              title={f.copyLabel}
              className="grid size-8 place-items-center rounded-full transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {copied ? (
                <Check className="size-3.5 text-track-skill" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? f.copied : ''}
            </span>
          </li>
          <li>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              LinkedIn
              <ArrowUpRight className="size-3.5" />
            </a>
          </li>
          <li>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              className={link}
            >
              {f.cv}
              <Download className="size-3.5" />
            </a>
          </li>
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div className="flex items-center gap-1">
            <ThemeToggle showLabel />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
