import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useI18n } from '@/i18n/context'
import { buttonSolid } from '@/lib/ui'

export function NotFound() {
  const { t } = useI18n()
  useDocumentTitle(t.notFound.pageTitle)

  return (
    <section className="mx-auto flex max-w-[96rem] flex-col items-center px-4 pt-12 pb-16 text-center sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">
      <p className="font-heading text-8xl font-semibold tracking-tight text-brand/30 sm:text-9xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t.notFound.text}</p>
      <Link to="/" className={`${buttonSolid} mt-8`}>
        <ArrowLeft className="size-4" />
        {t.notFound.back}
      </Link>
    </section>
  )
}
