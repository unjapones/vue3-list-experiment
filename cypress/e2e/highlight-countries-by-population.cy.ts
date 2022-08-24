import {
  selectorInputPopulation,
  selectorCountry,
  selectorCountryHighlighted
} from './utils'

describe('Highlight countries by population', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  function highLightChecks(count: number) {
    // Just to make sure we still have all countries' cards
    cy.get(selectorCountry).should('have.length', 16)
    cy.get(selectorCountryHighlighted).should('have.length', count)
  }

  it('highlight no card when population input is empty', () => {
    cy.get(selectorInputPopulation).should('have.value', '')
    highLightChecks(0)
  })

  it('highlight cards with population greater than the input value', () => {
    cy.get(selectorInputPopulation).type('0')
    // There are 2 countries with population === 0, but they are not initially
    // visible
    highLightChecks(16)
    cy.get(selectorInputPopulation).clear()

    cy.get(selectorInputPopulation).type('1000000')
    highLightChecks(9)
    // Add a zero to previous value (should be less highlighted countries)
    cy.get(selectorInputPopulation).type('0')
    highLightChecks(6)
    // Back to the initial value
    cy.get(selectorInputPopulation).type('{backspace}')
    highLightChecks(9)
    // Clear
    cy.get(selectorInputPopulation).clear()
    highLightChecks(0)
  })
})
