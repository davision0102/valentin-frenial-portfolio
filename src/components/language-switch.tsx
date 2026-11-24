import { LANGS, useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Sélecteur FR / EN affiché dans l'en-tête. */
export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex items-center rounded-full border border-border p-0.5"
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={t.languages[code]}
          title={t.languages[code]}
          className={cn(
            'rounded-full px-2 py-1 text-xs font-semibold uppercase transition-colors',
            lang === code
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
