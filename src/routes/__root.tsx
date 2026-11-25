import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowUpRight, Check, Copy, Download, Mail, Send } from 'lucide-react'
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

/**
 * Pied de page : un brouillon d'e-mail prêt à envoyer. On choisit l'objet,
 * on retouche le message, « Envoyer » ouvre la messagerie du visiteur avec
 * tout pré-rempli. LinkedIn, le CV, le thème et la langue tiennent dans la
 * même carte.
 */
function Footer() {
  const { t, lang } = useI18n()
  const f = t.footer
  const [copied, setCopied] = useState(false)
  const [subject, setSubject] = useState(0)
  // Le message reste celui de la langue choisie tant qu'il n'a pas été modifié.
  const [edited, setEdited] = useState<{ lang: string; text: string } | null>(
    null,
  )
  const body = edited && edited.lang === lang ? edited.text : f.bodyDefault

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `${f.subjectPrefix} · ${f.subjects[subject]}`,
  )}&body=${encodeURIComponent(body)}`

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papiers indisponible : le lien e-mail reste utilisable.
    }
  }

  const row =
    'flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-5 py-3.5'
  const label = 'w-14 shrink-0 text-sm text-muted-foreground'

  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      {/* La classe « dark » applique la palette sombre dans la carte, quel
          que soit le thème choisi. */}
      <div className="dark relative isolate overflow-hidden rounded-[2rem] bg-spotlight px-4 pt-10 pb-5 text-foreground sm:px-10 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[26rem] rounded-full bg-brand/30 blur-[110px]"
        />

        <h2 className="px-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {f.lead}
        </h2>

        {/* Le brouillon d'e-mail */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-background/55 ring-1 ring-border sm:mt-10">
          <div className={row}>
            <span className={label}>{f.to}</span>
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={f.copyLabel}
              className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground/10 px-3 text-xs font-medium transition-colors hover:bg-foreground/15"
            >
              {copied ? (
                <Check className="size-3.5 text-track-skill" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span aria-live="polite">{copied ? f.copied : f.copy}</span>
            </button>
          </div>

          <div className={row}>
            <span className={label} id="footer-subject">
              {f.subject}
            </span>
            <div
              role="group"
              aria-labelledby="footer-subject"
              className="flex flex-wrap gap-2"
            >
              {f.subjects.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSubject(i)}
                  aria-pressed={subject === i}
                  className={cn(
                    'h-8 rounded-full px-3.5 text-sm font-medium transition-colors',
                    subject === i
                      ? 'bg-foreground text-background'
                      : 'bg-foreground/10 hover:bg-foreground/15',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label className="sr-only" htmlFor="footer-message">
            {f.message}
          </label>
          <textarea
            id="footer-message"
            value={body}
            onChange={(event) => setEdited({ lang, text: event.target.value })}
            rows={4}
            className="block w-full resize-none bg-transparent px-5 py-4 leading-relaxed placeholder:text-muted-foreground focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2 border-t border-border px-3 py-3">
            <a
              href={mailto}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform active:scale-[0.97]"
            >
              <Send className="size-4" />
              {f.send}
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-foreground/10"
            >
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-foreground/10"
            >
              {f.cv}
              <Download className="size-4" />
            </a>
          </div>
        </div>

        {/* Bas de la carte : même bloc */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-1">
            <ThemeToggle showLabel />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
