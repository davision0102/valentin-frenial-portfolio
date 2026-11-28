import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { IntroScreen } from './intro-screen'

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({ matches: reduce })
}

const intro = () => document.querySelector('[data-intro]')

describe('IntroScreen', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('se joue à la première arrivée puis disparaît', () => {
    mockReducedMotion(false)
    render(<IntroScreen />)
    expect(intro()).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(2000))
    act(() => vi.advanceTimersByTime(1000))
    expect(intro()).not.toBeInTheDocument()
  })

  it('ne se rejoue pas pendant la même visite', () => {
    mockReducedMotion(false)
    sessionStorage.setItem('intro-vue', '1')
    render(<IntroScreen />)
    expect(intro()).not.toBeInTheDocument()
  })

  it('ne se joue pas si le visiteur préfère moins d’animations', () => {
    mockReducedMotion(true)
    render(<IntroScreen />)
    expect(intro()).not.toBeInTheDocument()
  })
})
