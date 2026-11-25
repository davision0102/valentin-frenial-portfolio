import { createFileRoute } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { buttonSolid } from '@/lib/ui'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

/** Le CV en PDF, dans public/. */
const cvUrl = `${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`

/**
 * Page À propos, façon éditoriale : une intro en paragraphe, la façon de
 * travailler, le parcours en liste compacte, les outils. Pas de photo (elle
 * est déjà sur l'accueil), une typographie posée.
 */
function AboutPage() {
  const { t } = useI18n()
  const a = t.aboutPage
  useDocumentTitle(t.nav.about)

  return (
    <article className="mx-auto max-w-[96rem] px-4 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">
      <header className="max-w-3xl">
        <h1 className="text-sm font-medium text-muted-foreground">
          {t.nav.about}
        </h1>
        <p className="mt-6 text-2xl leading-snug font-medium tracking-[-0.02em] text-balance sm:text-[2rem]">
          {a.lede}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
          {a.ledeMore}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={cvUrl} download className={buttonSolid}>
            <Download className="size-4" />
            {a.downloadCv}
          </a>
        </div>
      </header>

      <Section title={a.valuesTitle}>
        {/* Un parcours en 3 étapes reliées, comme un module qui avance. */}
        <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {a.values.map((value, i) => (
            <li key={value.title} className="relative pl-14 sm:pt-14 sm:pl-0">
              {/* Trait vers l'étape suivante */}
              {i < a.values.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-10 bottom-[-2rem] left-5 w-px bg-border sm:top-5 sm:right-[-1.5rem] sm:bottom-auto sm:left-10 sm:h-px sm:w-auto"
                />
              )}
              <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-brand/40 bg-background text-sm font-semibold text-brand tabular-nums">
                {i + 1}
              </span>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                {value.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={a.storyTitle}>
        <p className="max-w-3xl text-xl leading-relaxed text-pretty">
          {a.story}
        </p>
      </Section>

      <Section title={a.toolsTitle}>
        <ul className="flex flex-wrap gap-2">
          {a.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-border px-3.5 py-1.5 text-sm"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={a.languagesTitle}>
        <p className="text-xl font-medium tracking-tight">
          {a.languages.join(' · ')}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{a.languagesText}</p>
      </Section>
    </article>
  )
}

/**
 * Section de la page : titre discret à gauche, contenu à droite sur grand
 * écran ; l'un sous l'autre sur téléphone.
 */
function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-16 grid gap-6 border-t border-border pt-8 sm:mt-24 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div>{children}</div>
    </section>
  )
}
