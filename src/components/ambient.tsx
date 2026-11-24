import { useCallback, useState } from 'react'
import { imageUrl } from '@/config/projects'
import { AmbientContext } from '@/hooks/use-ambient'

/**
 * Fond ambiant : l'image du projet en cours, très floutée, derrière tout le
 * site. La page prend ainsi la couleur du projet affiché (comme Apple Music).
 * Une page choisit son image avec `useAmbient(fichier)` (src/hooks).
 */

export function AmbientProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<string | null>(null)
  // On garde les images déjà vues pour faire un fondu enchaîné de l'une à l'autre.
  const [seen, setSeen] = useState<string[]>([])

  const show = useCallback((next: string | null) => {
    setFile(next)
    if (next) setSeen((list) => (list.includes(next) ? list : [...list, next]))
  }, [])

  return (
    <AmbientContext.Provider value={show}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {seen.map((name) => (
          <img
            key={name}
            src={imageUrl(name)}
            alt=""
            className="absolute inset-0 size-full scale-125 object-cover blur-[90px] saturate-[1.7] transition-opacity duration-1000 ease-out motion-reduce:transition-none"
            style={{ opacity: name === file ? 'var(--ambient-opacity)' : 0 }}
          />
        ))}
        {/* Voile qui ramène le bas de page vers le fond, pour la lisibilité. */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background" />
      </div>
      {children}
    </AmbientContext.Provider>
  )
}
