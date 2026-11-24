import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useI18n } from '@/i18n/context'
import { I18nProvider } from '@/i18n/provider'
import { LanguageSwitch } from './language-switch'

function HomeLabel() {
  const { t } = useI18n()
  return <p>{t.nav.home}</p>
}

describe('LanguageSwitch', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'fr')
  })

  it('passe le site en anglais puis en français et mémorise le choix', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <LanguageSwitch />
        <HomeLabel />
      </I18nProvider>,
    )

    expect(screen.getByText('Accueil')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')

    await user.click(screen.getByRole('button', { name: 'Français' }))
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('fr')
  })
})
