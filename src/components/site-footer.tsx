import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { openEmail, site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { contactId } from '@/lib/contact'
import { button } from '@/lib/ui'

/**
 * Pied de page : une bande bleu nuit avec la grande phrase, la date et
 * l'heure en France, une invitation à écrire et trois boutons (e-mail,
 * LinkedIn, CV), les mêmes que partout. Dessous, le copyright.
 * L'adresse e-mail n'est jamais écrite en entier dans le code.
 */
export function SiteFooter() {
  const { t } = useI18n()
  const f = t.footer

  return (
    // Bande bleu nuit pleine largeur, aux coins supérieurs arrondis : la
    // classe `dark` lui donne les couleurs du thème sombre, quel que soit le
    // thème de la page (en sombre, un trait fin la sépare du contenu).
    <footer
      id={contactId}
      className="dark scroll-mt-4 rounded-t-[2rem] border-t border-border bg-background text-foreground sm:rounded-t-[2.5rem]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-xl font-heading text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
              {f.title}
            </h2>
            <LocalTime />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => openEmail(f.subject)}
              className={button('solid')}
            >
              <Mail className="size-4" />
              {f.email}
            </button>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={button('outline')}
            >
              {f.linkedin}
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`}
              download
              className={button('outline')}
            >
              {f.cv}
              <ArrowDown className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:mt-20">
          <p>
            © {new Date().getFullYear()} {site.name}. {f.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

/** La date et l'heure en France, mises à jour toutes les 30 secondes. */
function LocalTime() {
  const { t } = useI18n()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const zone = { timeZone: 'Europe/Paris' } as const
  const date = now.toLocaleDateString('fr-FR', {
    ...zone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const time = now.toLocaleTimeString('fr-FR', {
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
