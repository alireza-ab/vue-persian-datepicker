describe('time type', () => {
  before(() => {
    cy.changeProps({ type: 'time', 'dual-input': true }, null, true)
    cy.changeSlots()
  })

  it('select second input', () => {
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').last().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.selectTime(20, 48, 'last')
    cy.selectTime(15, 52)
    cy.get('.pdp-input').last().should('have.value', '20:48')
    cy.get('.pdp-input').first().should('have.value', '15:52')
  })
})

describe('datetime type', () => {
  before(() => {
    cy.changeProps({ type: 'datetime', from: '1399', to: '1399/06/31' })
  })

  it('select second input', () => {
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').last().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('20').click()
    cy.selectTime(20, 48, 'last')
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-input').first().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.selectTime(15, 52)
    cy.get('.pdp-input').last().should('have.value', '1399/06/20 20:48')
    cy.get('.pdp-input').first().should('have.value', '1399/06/10 15:52')
  })

  it('"en" locale', () => {
    cy.changeProps({ locale: 'en' })
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').first().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('10').click()
    cy.selectTime(15, 52)
    cy.get('.pdp-input').last()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('20').click()
    cy.get('.pdp-input').last().focus()
    cy.selectTime(20, 48, 'last')
    cy.get('.pdp-input').first().should('have.value', '2020-09-10 15:52')
    cy.get('.pdp-input').last().should('have.value', '2020-09-20 20:48')
  })
})

describe('date type', () => {
  before(() => {
    cy.changeProps({ type: 'date', clearable: true })
  })

  it('"en" locale', () => {
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').first().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-input').last()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('20').click()
    cy.get('.pdp-input').first().should('have.value', '2020-09-10')
    cy.get('.pdp-input').last().should('have.value', '2020-09-20')
  })

  it('select second input', () => {
    cy.changeProps('locale', 'fa')
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').last().focus()
      .should('have.attr', 'class').and('match', /pdp-focus/)
    cy.get('.pdp-day').contains('20').click()
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-input').last().should('have.value', '1399/06/20')
    cy.get('.pdp-input').first().should('have.value', '1399/06/10')
  })

  it('clearable', () => {
    cy.visit('/')
    cy.get('.pdp-input').first().focus()
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-day').contains('20').click()
    cy.get('.pdp-input').first().should('have.value', '1399/06/10')
    cy.get('.pdp-input').last().should('have.value', '1399/06/20')
    cy.get('.pdp-clear').first().click()
    cy.get('.pdp-input').first().should('have.value', '')
    cy.get('.pdp-input').last().should('have.value', '1399/06/20')
    cy.get('.pdp-clear').last().click()
    cy.get('.pdp-input').last().should('have.value', '')
    cy.get('.pdp-input').first().focus()
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-day').contains('20').click()
    cy.get('.pdp-input').first().should('have.value', '1399/06/10')
    cy.get('.pdp-input').last().should('have.value', '1399/06/20')
    cy.get('.pdp-clear').last().click()
    cy.get('.pdp-input').first().should('have.value', '1399/06/10')
    cy.get('.pdp-input').last().should('have.value', '')
  })
})

describe('attributes', () => {
  before(() => {
    cy.changeProps({ 'placeholder': 'first', 'second-placeholder': 'second', 'mode': 'single' })
  })

  it('select second input', () => {
    cy.visit('/')
    cy.get('.pdp').should('have.attr', 'class').and('match', /pdp-dual/)
    cy.get('.pdp-input').first()
      .should('have.attr', 'placeholder', 'first')
    cy.get('.pdp-input').last()
      .should('have.attr', 'placeholder', 'second')
      .should('have.attr', 'disabled')
  })
})