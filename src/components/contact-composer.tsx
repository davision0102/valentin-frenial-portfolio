import { useState } from 'react'
import { Send } from 'lucide-react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/**
 * Le moment de contact de l'accueil : un e-mail prêt à envoyer.
 * Chaque objet (un poste, une mission, un échange) propose son propre
 * message, modifiable ; « Envoyer » ouvre la messagerie du visiteur avec
 * l'objet et le message pré-remplis.
 */
export function ContactComposer() {
  const { t, lang } = useI18n()
  const w = t.write
  const [subject, setSubject] = useState(0)
  // Le texte modifié est gardé pour l'objet et la langue où il a été écrit.
  const [edited, setEdited] = useState<Record<string, string>>({})
  const key = `${lang}-${subject}`
  const body = edited[key] ?? w.subjects[subject].body

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `${w.subjectPrefix} · ${w.subjects[subject].label}`,
  )}&body=${encodeURIComponent(body)}`

  return (
    <section
      id="ecrire"
      className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {w.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{w.intro}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span id="ecrire-objet" className="text-sm text-muted-foreground">
            {w.subjectLabel}
          </span>
          <div
            role="group"
            aria-labelledby="ecrire-objet"
            className="flex flex-wrap gap-2"
          >
            {w.subjects.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSubject(i)}
                aria-pressed={subject === i}
                className={cn(
                  'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
                  subject === i
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground/40',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="sr-only" htmlFor="ecrire-message">
          {w.message}
        </label>
        <textarea
          id="ecrire-message"
          value={body}
          onChange={(event) =>
            setEdited((all) => ({ ...all, [key]: event.target.value }))
          }
          rows={6}
          className="mt-5 block w-full resize-none rounded-2xl border border-border bg-card/60 px-5 py-4 leading-relaxed transition-colors focus:border-foreground/40 focus:outline-none"
        />

        <div className="mt-4">
          <a
            href={mailto}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform active:scale-[0.97]"
          >
            <Send className="size-4" />
            {w.send}
          </a>
        </div>
      </div>
    </section>
  )
}
