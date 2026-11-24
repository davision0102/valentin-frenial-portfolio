import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  BarChart3,
  Download,
  Dumbbell,
  Languages,
  Mail,
  Plane,
  Sparkles,
  Users,
} from 'lucide-react'
import { Portrait } from '@/components/portrait'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'

export const Route = createFileRoute('/a-propos')({
  component: AboutPage,
})

const valueIcons = [Users, Sparkles, BarChart3]
const offIcons = [Languages, Plane, Dumbbell]

/** Le CV en PDF, dans public/. */
const cvUrl = `${import.meta.env.BASE_URL}cv-valentin-frenial.pdf`

function AboutPage() {
  return (
    <>
      <Intro />
      <Values />
      <Story />
      <OffWork />
      <CvBlock />
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

  const word = words[index % words.length]
  return (
    <span
      key={word}
      className="inline-block animate-in text-brand duration-500 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
    >
      {word}
    </span>
  )
}

function CvButton({ className }: { className: string }) {
  const { t } = useI18n()
  return (
    <a
      href={cvUrl}
      download
      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-transform active:scale-[0.97] ${className}`}
    >
      <Download className="size-4" />
      {t.aboutPage.downloadCv}
    </a>
  )
}

function Intro() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
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
        <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          {a.profile.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <CvButton className="bg-foreground text-background" />
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium glass transition-transform active:scale-[0.97]"
          >
            <Mail className="size-4" />
            {a.contact}
          </a>
        </div>
      </div>
    </section>
  )
}

function Values() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {a.valuesTitle}
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {a.values.map((value, i) => {
            const Icon = valueIcons[i]
            return (
              <li
                key={value.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/12 text-brand">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                  {value.text}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Story() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {a.storyTitle}
      </h2>
      <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-pretty sm:text-2xl">
        {a.story}
      </p>
    </section>
  )
}

function OffWork() {
  const { t } = useI18n()
  const a = t.aboutPage

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
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
              <span className="grid size-12 place-items-center rounded-2xl bg-track-design/15 text-track-design transition-transform duration-300 group-hover:-rotate-6">
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

function CvBlock() {
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
        <div className="relative mt-8 flex flex-wrap justify-center gap-2.5">
          <CvButton className="bg-white text-spotlight" />
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-white ring-1 ring-white/30 transition-[transform,background-color] hover:bg-white/10 active:scale-[0.97]"
          >
            <Mail className="size-4" />
            {a.contact}
          </a>
        </div>
      </div>
    </section>
  )
}
