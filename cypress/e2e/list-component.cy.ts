import {
  selectorSelectComponent,
  selectorOnlyOneComponentList,
  selectorWithChildrenComponentList
} from './utils'

describe('Change country list component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Initially shows OnlyOneComponentList and select renders accordingly', () => {
    // @TODO: this text comparison is very fragile
    cy.get(selectorSelectComponent).should('have.value', 'OnlyOneComponentList')
    cy.get(selectorOnlyOneComponentList).should('have.length', 1)
  })

  it('Render WithChildrenComponentsList on select value change', () => {
    // @TODO: this text constant is fragile (is a value)
    cy.get(selectorSelectComponent).select('WithChildrenComponentsList')
    cy.get(selectorWithChildrenComponentList).should('have.length', 1)
  })
})
