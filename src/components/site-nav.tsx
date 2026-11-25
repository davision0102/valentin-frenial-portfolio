import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

/** Liens du menu : pas de fond au survol, seul le texte bouge et s'éclaire. */
const itemClass =
  'inline-block px-3 py-2 text-lg font-medium text-foreground/60 transition-[color,translate] duration-300 ease-out hover:translate-x-1.5 hover:text-foreground focus-visible:translate-x-1.5 focus-visible:text-foreground [&.active]:text-foreground'

/**
 * Barre de navigation : un rectangle de verre centré en haut de la page,
 * avec le nom à gauche, la pastille « Disponible » et le bouton menu à
 * droite. Le menu se déplie dès que la souris passe sur la barre (ou au clic
 * sur le bouton, au doigt ou au clavier) et se replie quand elle la quitte,
 * avec la croix, la touche Échap, un clic ailleurs ou le choix d'un lien.
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
    <header className="sticky top-5 z-40 mt-5 flex h-11 justify-center px-3">
      <div
        ref={boxRef}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setOpen(true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') close()
        }}
        className="absolute top-0 w-[min(calc(100%-1.5rem),27rem)] overflow-hidden rounded-lg glass"
      >
        <div className="flex h-11 items-center gap-3 pr-1.5 pl-4">
          <Link
            to="/"
            onClick={close}
            aria-label={`${site.name}, ${t.nav.homeLabel}`}
            className="text-sm font-semibold tracking-tight"
          >
            {site.name}
          </Link>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
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
            className="grid size-9 place-items-center"
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
            <ul className="px-2 pt-1 pb-3">
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
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
