import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { ContactComposer } from '@/components/contact-composer'
import { LanguageSwitch } from '@/components/language-switch'
import { LogoMark } from '@/components/logo'
import { NotFound } from '@/components/not-found'
import { ThemeToggle } from '@/components/theme-toggle'
import { openEmail, site } from '@/config/site'
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

      <Footer />
    </div>
  )
}

/**
 * Pied de page, sur un bleu nuit profond : un grand « Un projet ? », puis
 * l'e-mail prêt à envoyer (le seul point de contact du site), et une ligne
 * finale avec les liens, le thème, la langue et le copyright.
 * L'adresse e-mail n'est jamais écrite en clair dans la page.
 */
function Footer() {
  const { t } = useI18n()
  const f = t.footer
  const w = t.write
  const link =
    'inline-flex items-center gap-1 font-medium tracking-wide uppercase transition-colors hover:text-foreground'

  return (
    <footer
      id={contactId}
      className="dark scroll-mt-4 border-t border-border bg-ink text-foreground"
    >
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
        <h2 className="pt-16 font-heading text-[15vw] leading-[0.85] font-semibold tracking-[-0.05em] text-balance uppercase sm:pt-24 sm:text-[clamp(3rem,10.5vw,10rem)]">
          {w.title}
        </h2>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <p className="max-w-md text-lg leading-relaxed text-pretty text-muted-foreground">
            {w.intro}
          </p>
          <ContactComposer />
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-border py-6 text-xs text-muted-foreground sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={() => openEmail()} className={link}>
              {f.emailShort}
            </button>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              LinkedIn
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              title={f.cv}
              className={link}
            >
              {f.cvShort}
              <ArrowDown className="size-3.5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
            <p className="ml-2 tracking-wide uppercase">
              © {new Date().getFullYear()} {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
