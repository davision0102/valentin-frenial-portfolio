import { useState } from 'react'
import { Send } from 'lucide-react'
import { openEmail } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/**
 * Un e-mail prêt à envoyer. Chaque objet (un poste, une mission, un échange)
 * propose son propre message, modifiable ; « Envoyer » ouvre la messagerie du
 * visiteur avec l'objet et le message pré-remplis.
 */
export function ContactComposer() {
  const { t, lang } = useI18n()
  const w = t.write
  const [subject, setSubject] = useState(0)
  // Le texte modifié est gardé pour l'objet et la langue où il a été écrit.
  const [edited, setEdited] = useState<Record<string, string>>({})
  const key = `${lang}-${subject}`
  const body = edited[key] ?? w.subjects[subject].body

  return (
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
        rows={5}
        className="mt-5 block w-full resize-none rounded-2xl border border-border bg-card/60 px-5 py-4 leading-relaxed transition-colors focus:border-foreground/40 focus:outline-none"
      />

      <button
        type="button"
        onClick={() =>
          openEmail(`${w.subjectPrefix} · ${w.subjects[subject].label}`, body)
        }
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform active:scale-[0.97]"
      >
        <Send className="size-4" />
        {w.send}
      </button>
    </div>
  )
}
