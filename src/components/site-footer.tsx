import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeToggle } from '@/components/theme-toggle'
import { openEmail, site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { contactId } from '@/lib/contact'
import { buttonOutline, buttonSolid } from '@/lib/ui'

/**
 * Pied de page : un bloc doux avec la grande phrase, la date et l'heure en
 * France, une invitation à écrire et trois liens (e-mail, LinkedIn, CV).
 * Dessous, une ligne avec le copyright, le thème et la langue.
 * L'adresse e-mail n'est jamais écrite en entier dans le code.
 */
export function SiteFooter() {
  const { t } = useI18n()
  const f = t.footer

  return (
    <footer id={contactId} className="scroll-mt-4 bg-ink text-foreground">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="grid gap-8 rounded-3xl bg-secondary/70 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 lg:p-12">
          <div>
            <h2 className="max-w-xl font-heading text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              {f.title}
            </h2>
            <LocalTime />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
            <button
              type="button"
              onClick={() => openEmail(f.subject)}
              className={buttonSolid}
            >
              <Mail className="size-4" />
              {f.email}
            </button>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonOutline}
            >
              {f.linkedin}
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              className={buttonOutline}
            >
              {f.cv}
              <ArrowDown className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {site.name}. {f.rights}
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
    <div className="mt-5 text-sm leading-relaxed text-muted-foreground">
      <p>{t.footer.now(date, time)}</p>
      <p>{t.footer.reply}</p>
    </div>
  )
}
