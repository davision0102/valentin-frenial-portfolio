import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { contactId, goToContact } from '@/lib/contact'
import { cn } from '@/lib/utils'

const itemClass =
  'block w-full px-3 py-2.5 text-left text-lg font-medium text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground [&.active]:text-foreground'

/**
 * Barre de navigation : un rectangle de verre centré en haut de la page,
 * avec le nom, la pastille « Disponible » et un bouton menu. Le menu se
 * déplie sous la barre ; il se referme avec la croix, la touche Échap, un
 * clic ailleurs, le choix d'un lien, ou quand la souris quitte la barre.
 */
export function SiteNav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    // Hauteur fixe : le menu déplié passe par-dessus la page sans la pousser.
    <header className="sticky top-3 z-40 mt-3 flex h-12 justify-center px-3">
      <div
        ref={boxRef}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') close()
        }}
        className="absolute top-0 w-[min(calc(100%-1.5rem),24rem)] overflow-hidden rounded-lg glass"
      >
        <div className="flex h-12 items-center gap-3 pr-1.5 pl-4">
          <Link
            to="/"
            onClick={close}
            aria-label={`${site.name}, ${t.nav.homeLabel}`}
            className="text-sm font-semibold tracking-tight"
          >
            {site.name}
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-available opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-available" />
            </span>
            {t.nav.available}
          </span>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="ml-auto grid size-9 place-items-center transition-colors hover:bg-foreground/8"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Menu déplié : la hauteur passe de 0 à son contenu. */}
        <div
          id="menu-principal"
          inert={!open}
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <nav aria-label="Menu" className="overflow-hidden">
            <ul className="border-t border-border p-1.5">
              <li>
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  onClick={close}
                  className={itemClass}
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/projets" onClick={close} className={itemClass}>
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link to="/a-propos" onClick={close} className={itemClass}>
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <a
                  href={`#${contactId}`}
                  onClick={(event) => {
                    event.preventDefault()
                    close()
                    goToContact()
                  }}
                  className={itemClass}
                >
                  {t.nav.contactShort}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
