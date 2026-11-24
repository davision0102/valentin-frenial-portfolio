import { createContext, useContext, useEffect } from 'react'

export const AmbientContext = createContext<(file: string | null) => void>(
  () => {},
)

/** Choisit l'image du fond ambiant tant que le composant est affiché. */
export function useAmbient(file: string | null | undefined) {
  const show = useContext(AmbientContext)
  useEffect(() => {
    show(file ?? null)
  }, [file, show])
}
