import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useI18n } from '@/i18n/context'

export const Route = createFileRoute('/ui')({
  component: UiPage,
})

/**
 * Vitrine des composants installés. Sert d'aide-mémoire visuel :
 * ajoute ici chaque nouveau composant shadcn pour le voir en clair et en sombre.
 */
function UiPage() {
  const { t } = useI18n()
  const u = t.ui

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-brand">{u.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {u.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {u.intro} <code className="font-mono text-foreground">{u.command}</code>
        .
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Showcase title="Button">
          <div className="flex flex-wrap gap-3">
            <Button>{u.buttons.default}</Button>
            <Button variant="secondary">{u.buttons.secondary}</Button>
            <Button variant="outline">{u.buttons.outline}</Button>
            <Button variant="ghost">{u.buttons.ghost}</Button>
            <Button variant="destructive">{u.buttons.destructive}</Button>
            <Button variant="link">{u.buttons.link}</Button>
          </div>
        </Showcase>

        <Showcase title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>{u.badges.new}</Badge>
            <Badge variant="secondary">{u.badges.draft}</Badge>
            <Badge variant="outline">v1.0</Badge>
            <Badge variant="destructive">{u.badges.error}</Badge>
          </div>
        </Showcase>

        <Showcase title="Input & Textarea">
          <div className="grid gap-3">
            <Input placeholder={u.fields.email} type="email" />
            <Textarea placeholder={u.fields.idea} />
          </div>
        </Showcase>

        <Showcase title="Dialog">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              {u.dialog.open}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{u.dialog.title}</DialogTitle>
                <DialogDescription>{u.dialog.description}</DialogDescription>
              </DialogHeader>
              <Input placeholder={u.dialog.placeholder} />
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>
                  {u.dialog.cancel}
                </DialogClose>
                <DialogClose render={<Button />}>{u.dialog.create}</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Showcase>

        <Showcase title="Card" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            {u.cards.plans.map((plan, i) => (
              <Card key={plan} size="sm">
                <CardHeader>
                  <CardTitle>{plan}</CardTitle>
                  <CardDescription>{u.cards.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-heading text-3xl font-semibold">
                    {u.cards.price(i * 9)}
                    <span className="text-sm text-muted-foreground">
                      {u.cards.perMonth}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant={i === 1 ? 'default' : 'outline'}>
                    {u.cards.choose}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Showcase>
      </div>
    </section>
  )
}

function Showcase({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-3xl border border-border bg-card p-6 ${className ?? ''}`}
    >
      <h2 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}
