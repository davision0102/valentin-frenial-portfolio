import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeToggle } from '@/components/theme-toggle'
import { openEmail, site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { contactId } from '@/lib/contact'
import { buttonSolid } from '@/lib/ui'

/** Petit intitulé en capitales espacées, au-dessus de chaque bloc. */
const labelClass =
  'font-mono text-[0.6875rem] tracking-[0.2em] text-muted-foreground uppercase'

/** Champ souligné, sans cadre. */
const fieldClass =
  'block w-full border-b border-border bg-transparent py-3 transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none'

/**
 * Pied de page, sur un bleu nuit profond. À gauche : une grande phrase, un
 * lien pour écrire un e-mail, un petit formulaire (nom, e-mail, besoin) qui
 * ouvre la messagerie avec le message rempli, et l'heure en France. À droite :
 * les liens du site, les réseaux, la ville et la disponibilité.
 * L'adresse e-mail n'est jamais écrite en clair dans la page.
 */
export function SiteFooter() {
  const { t } = useI18n()
  const f = t.footer

  return (
    <footer id={contactId} className="scroll-mt-4 bg-ink text-foreground">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <h2 className="max-w-2xl pt-16 font-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:pt-24 sm:text-6xl">
          {f.title}
        </h2>

        {/* À gauche : contact et formulaire. À droite : les colonnes de liens,
            deux par deux. Les deux côtés ont chacun leur hauteur. */}
        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-lg">
            <p className={labelClass}>{f.contact}</p>
            <button
              type="button"
              onClick={() => openEmail()}
              className="mt-4 border-b border-foreground pb-0.5 text-lg transition-colors hover:border-brand hover:text-brand"
            >
              {site.emailParts.join('@')}
            </button>

            <p className={`${labelClass} mt-8`}>{f.project}</p>
            <ContactForm />
            <LocalTime />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 self-start lg:grid-cols-[14rem_14rem] lg:gap-x-16">
            <FooterColumn title={f.explore}>
              <Link to="/" className="hover:text-brand">
                {t.nav.home}
              </Link>
              <Link to="/projets" className="hover:text-brand">
                {t.nav.projects}
              </Link>
              <Link to="/a-propos" className="hover:text-brand">
                {t.nav.about}
              </Link>
            </FooterColumn>
            <FooterColumn title={f.basedIn}>
              <span>{f.based}</span>
            </FooterColumn>
            <FooterColumn title={f.follow}>
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                {f.linkedin}
              </a>
              <a
                href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
                download
                className="hover:text-brand"
              >
                {f.cv}
              </a>
            </FooterColumn>
            <FooterColumn title={f.availability}>
              <span>{f.available}</span>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:mt-20">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <h3 className={labelClass}>{title}</h3>
      <div className="mt-4 flex flex-col items-start gap-2 transition-colors [&>a]:transition-colors">
        {children}
      </div>
    </div>
  )
}

/**
 * Formulaire de contact : rien n'est envoyé par le site. « Envoyer » ouvre la
 * messagerie du visiteur avec l'objet et le message déjà remplis.
 */
function ContactForm() {
  const { t } = useI18n()
  const f = t.footer
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState('')

  return (
    <form
      className="mt-1"
      onSubmit={(event) => {
        event.preventDefault()
        const signature = [`${f.from} ${name}`, email].filter(Boolean)
        openEmail(
          `${f.subject} · ${name}`,
          `${need}\n\n${signature.join('\n')}`,
        )
      }}
    >
      <label className="sr-only" htmlFor="contact-nom">
        {f.name}
      </label>
      <input
        id="contact-nom"
        required
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={f.name}
        className={fieldClass}
      />
      <label className="sr-only" htmlFor="contact-email">
        {f.email}
      </label>
      <input
        id="contact-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={f.email}
        className={`${fieldClass} mt-2`}
      />
      <label className="sr-only" htmlFor="contact-besoin">
        {f.need}
      </label>
      <input
        id="contact-besoin"
        required
        value={need}
        onChange={(event) => setNeed(event.target.value)}
        placeholder={f.need}
        className={`${fieldClass} mt-2`}
      />
      <button type="submit" className={`${buttonSolid} mt-6`}>
        {f.send}
      </button>
    </form>
  )
}

/** La date et l'heure en France, mises à jour toutes les 30 secondes. */
function LocalTime() {
  const { t, lang } = useI18n()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const zone = { timeZone: 'Europe/Paris' } as const
  const date = now.toLocaleDateString(lang, {
    ...zone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const time = now.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    ...zone,
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="mt-6 text-sm leading-relaxed text-muted-foreground">
      <p>{t.footer.now(date, time)}</p>
      <p>{t.footer.reply}</p>
    </div>
  )
}
