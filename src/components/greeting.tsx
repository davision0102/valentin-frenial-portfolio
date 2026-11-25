import { useEffect, useState } from 'react'

/**
 * Salut qui change de langue (« Bonjour », « Hello », « Hola » : les trois
 * langues que parle Valentin). Fixe si la personne préfère moins d'animations.
 */
export function Greeting({
  words,
  className,
}: {
  words: string[]
  className?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      1500,
    )
    return () => window.clearInterval(timer)
  }, [words.length])

  const word = words[index % words.length]
  return (
    <span
      key={word}
      className={`inline-block animate-in duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none ${className ?? ''}`}
    >
      {word}
    </span>
  )
}
