import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
} from 'lucide-react'
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
          <a
            href="#contact"
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

      <Footer />
    </div>
  )
}

/** Pied de page : un seul bloc de contact, chaque moyen une seule fois. */
function Footer() {
  const { t } = useI18n()
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

  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-6"
    >
      <div className="border-t border-border py-16 sm:py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.footer.lead}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{t.footer.text}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5 sm:mt-12">
          <a
            href={`mailto:${site.email}`}
            className="text-[clamp(1.35rem,6vw,4.25rem)] leading-none font-semibold tracking-[-0.04em] underline decoration-border decoration-2 underline-offset-[0.18em] transition-colors hover:text-brand hover:decoration-brand"
          >
            {site.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={t.footer.copyLabel}
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium glass transition-transform active:scale-[0.97]"
          >
            {copied ? (
              <Check className="size-4 text-track-skill" />
            ) : (
              <Copy className="size-4" />
            )}
            <span aria-live="polite">
              {copied ? t.footer.copied : t.footer.copy}
            </span>
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-medium sm:mt-12">
          <li>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              LinkedIn
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
          <li>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              {t.footer.cv}
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
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
  )
}
