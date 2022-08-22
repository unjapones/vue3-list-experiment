import {
  selectorInputPopulation,
  selectorSelectComponent,
  selectorCountry,
  selectorCountryHighlighted,
  countAllCountries
} from './utils'

describe('Highlight countries by population', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  function highLightChecks(count: number) {
    // Just to make sure we still have all countries' cards
    cy.get(selectorCountry).should('have.length', countAllCountries)
    cy.get(selectorCountryHighlighted).should('have.length', count)
  }

  it('highlight no card when population input is empty', () => {
    cy.get(selectorInputPopulation).should('have.value', '')
    highLightChecks(0)
  })

  it('highlight cards with population greater than the input value', () => {
    cy.get(selectorInputPopulation).type('0')
    // There are 2 countries with population === 0
    highLightChecks(248)
    cy.get(selectorInputPopulation).clear()

    cy.get(selectorInputPopulation).type('1000000')
    highLightChecks(160)
    // Add a zero to previous value (should be less highlighted countries)
    cy.get(selectorInputPopulation).type('0')
    highLightChecks(91)
    // Back to the initial value
    cy.get(selectorInputPopulation).type('{backspace}')
    highLightChecks(160)
    // Clear
    cy.get(selectorInputPopulation).clear()
    highLightChecks(0)
  })

  it("changes in list component keep highlight cards' statuses", () => {
    cy.get(selectorInputPopulation).type('1000000')
    highLightChecks(160)
    // Switch back & forth between list components and check count
    cy.get(selectorSelectComponent).select(1)
    highLightChecks(160)
    cy.get(selectorSelectComponent).select(0)
    highLightChecks(160)
    // Similar to previous checks & test
    cy.get(selectorInputPopulation).type('0')
    cy.get(selectorSelectComponent).select(1)
    highLightChecks(91)
    cy.get(selectorSelectComponent).select(0)
    highLightChecks(91)
  })
})
