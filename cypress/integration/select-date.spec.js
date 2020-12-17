/// <reference types="Cypress" />

describe('select date - range', () => {
    beforeEach(() => {
        cy.changeProps()
        cy.changeSlots()
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').click()
        cy.contains('15').click()
        cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/15')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
            .type('{downarrow}{rightarrow}{rightarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/15')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('1399/06/10{enter}')
            .type('1399/06/15{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/15')
    })
})

describe('select date - single', () => {

    beforeEach(() => {
        cy.changeProps('mode', 'single')
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').click()
        cy.get('.pdp-input').should('have.value', '1399/06/10')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/10')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('1399/06/10{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/10')
    })
})

describe('select date in en locale - single', () => {
    beforeEach(() => {
        cy.changeProps('locale', 'en')
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').click()
        cy.get('.pdp-input').should('have.value', '2020-09-10')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{downarrow}{downarrow}{rightarrow}{rightarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '2020-09-10')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('2020-09-10{enter}')
        cy.get('.pdp-input').should('have.value', '2020-09-10')
    })
})

describe('select date in en locale - range', () => {
    beforeEach(() => {
        cy.changeProps('locale', 'en')
        cy.changeProps('mode', 'range')
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').click()
        cy.contains('15').click()
        cy.get('.pdp-input').should('have.value', '2020-09-10 - 2020-09-15')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
            .type('{downarrow}{rightarrow}{rightarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '2020-09-06 - 2020-09-15')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('2020-09-10{enter}')
            .type('2020-09-15{enter}')
        cy.get('.pdp-input').should('have.value', '2020-09-10 - 2020-09-15')
    })
})