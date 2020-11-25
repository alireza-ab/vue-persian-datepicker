/// <reference types="Cypress" />

describe('events', () => {
    beforeEach(() => {
        cy.changeProps()
        cy.changeSlots()
    })

    it('focus', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.status').should('contain.text', 'focus')
    })

    it('open', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.status').should('contain.text', 'open')
    })

    it('blur', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.status').should('contain.text', 'blur')
    })

    it('close', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.status').should('contain.text', 'close')
    })

    it('input', () => {
        cy.visit('/')
        cy.get('.pdp-input').type('1')
        cy.get('.status').should('contain.text', 'input')
    })

    it('select & change', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day').contains('1').click()
        cy.get('.status').should('contain.text', 'select:1399/06/01')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day').contains('10').click()
        cy.get('.status').should('contain.text', 'select:1399/06/10')
        cy.get('.status').should('contain.text', 'change:1399/06/01,1399/06/10')
    })
})
