import { selectorDarkModeToggler, classNameDarkMode } from './utils'

describe('Dark model toggler', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  function checkIsLight(isLight: boolean) {
    cy.get('html').should(
      isLight ? 'have.not.class' : 'have.class',
      classNameDarkMode
    )
  }

  it('Be in light mode initially and show 🌛 to switch to dark', () => {
    checkIsLight(true)
    cy.get(selectorDarkModeToggler).should('have.text', '🌛')
  })

  it('Set site in dark mode and show 🌞 to switch to light', () => {
    cy.get(selectorDarkModeToggler).click()
    checkIsLight(false)
    cy.get(selectorDarkModeToggler).should('have.text', '🌞')
    // Verify that it's possible to go back to light mode
    cy.get(selectorDarkModeToggler).click()
    checkIsLight(true)
    cy.get(selectorDarkModeToggler).should('have.text', '🌛')
  })
})
