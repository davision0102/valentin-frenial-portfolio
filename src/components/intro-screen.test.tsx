import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { IntroScreen } from './intro-screen'

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({ matches: reduce })
}

describe('IntroScreen', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('se joue à la première arrivée puis disparaît', () => {
    mockReducedMotion(false)
    render(<IntroScreen />)
    expect(screen.getByText('Bonjour')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(3000))
    expect(screen.queryByText('Bonjour')).not.toBeInTheDocument()
    expect(screen.queryByText('¡Hola!')).not.toBeInTheDocument()
  })

  it('ne se rejoue pas pendant la même visite', () => {
    mockReducedMotion(false)
    sessionStorage.setItem('intro-vue', '1')
    render(<IntroScreen />)
    expect(screen.queryByText('Bonjour')).not.toBeInTheDocument()
  })

  it('ne se joue pas si le visiteur préfère moins d’animations', () => {
    mockReducedMotion(true)
    render(<IntroScreen />)
    expect(screen.queryByText('Bonjour')).not.toBeInTheDocument()
  })
})
