import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  Dumbbell,
  GraduationCap,
  Languages,
  Mail,
  Plane,
} from 'lucide-react'
import { Portrait } from '@/components/portrait'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

const offIcons = [Languages, Plane, Dumbbell]

/** Couleur du point de chaque expérience sur la frise, par entreprise. */
const companyDot: Record<string, string> = {
  'Valenteint Studio': 'bg-track-design',
  Chanel: 'bg-foreground',
  Nexans: 'bg-track-learning',
}

function AboutPage() {
  return (
    <>
      <Intro />
      <Facts />
      <Journey />
      <Toolbox />
      <OffWork />
      <CallToAction />
    </>
  )
}

/** « Bonjour », « Hello », « Hola » : les trois langues qu'il parle. */
function Greeting({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2200,
    )
    return () => window.clearInterval(timer)
  }, [words.length])

  return (
    <span
      key={words[index]}
      className="inline-block animate-in text-brand duration-500 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
    >
      {words[index % words.length]}
    </span>
  )
}

function Intro() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand/25 blur-[110px]" />
        <div className="absolute top-20 -left-24 size-[26rem] rounded-full bg-track-design/15 blur-[110px]" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Portrait
          caption={a.role}
          className="mx-auto max-w-[13rem] sm:max-w-xs lg:max-w-none"
        />
        <div className="min-w-0">
          <h1
            aria-label={`${a.greetings[0]}, ${a.intro}`}
            className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
          >
            <span aria-hidden="true">
              <Greeting words={a.greetings} />,
              <span className="block">{a.intro}</span>
            </span>
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {a.profile.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform active:scale-[0.97]"
            >
              <Mail className="size-4" />
              {a.contact}
            </a>
            <Link
              to="/"
              hash="projets"
              className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium glass transition-transform active:scale-[0.97]"
            >
              {a.projects}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Facts() {
  const { t } = useI18n()

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
        {t.aboutPage.facts.map((fact) => (
          <div key={fact.label} className="bg-card p-6 sm:p-8">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-heading text-4xl font-semibold tracking-[-0.04em] text-brand tabular-nums sm:text-5xl">
              {fact.value}
            </dd>
            <dd className="mt-2 text-sm text-muted-foreground sm:text-base">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Journey() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {a.journeyTitle}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{a.journeyText}</p>
      </div>

      <ol className="relative mt-12 space-y-6 border-l border-border pl-6 sm:ml-2 sm:pl-10">
        {a.jobs.map((job) => (
          <li key={job.period} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-7 -left-[1.95rem] size-3 rounded-full ring-4 ring-background sm:-left-[2.95rem]',
                companyDot[job.company] ?? 'bg-brand',
              )}
            />
            <article className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-xs text-muted-foreground uppercase">
                {job.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {job.role}
              </h3>
              <p className="mt-1 font-medium text-brand">{job.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
                {job.summary}
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {job.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-track-skill" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <h3 className="mt-16 text-2xl font-semibold tracking-tight">
        {a.educationTitle}
      </h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {a.education.map((degree) => (
          <li
            key={degree.title}
            className="flex gap-4 rounded-3xl border border-border bg-card p-6"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <p className="font-mono text-xs text-muted-foreground">
                {degree.period}
              </p>
              <p className="mt-1 font-semibold">{degree.title}</p>
              <p className="text-sm text-muted-foreground">{degree.school}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Toolbox() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {a.skillsTitle}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {a.skills.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OffWork() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {a.offTitle}
      </h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {a.off.map((item, i) => {
          const Icon = offIcons[i]
          return (
            <li
              key={item.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/12 text-brand transition-transform duration-300 group-hover:-rotate-6">
                <Icon className="size-6" />
              </span>
              <p className="mt-5 text-lg font-semibold">{item.title}</p>
              <p className="mt-1 text-muted-foreground">{item.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function CallToAction() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-spotlight px-6 py-12 text-center text-white sm:px-16 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl"
        />
        <h2 className="relative text-3xl font-semibold tracking-tight sm:text-5xl">
          {a.ctaTitle}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-white/70">
          {a.ctaText}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="relative mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-spotlight transition-transform active:scale-[0.97]"
        >
          <Mail className="size-4" />
          {a.contact}
        </a>
      </div>
    </section>
  )
}
