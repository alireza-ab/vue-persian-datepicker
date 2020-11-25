/// <reference types="Cypress" />

describe('slots', () => {
    beforeEach(() => {
        cy.changeProps()
        cy.changeSlots()
    })

    it('before', () => {
        cy.changeSlots('before', '<label>select date:</label>')
        cy.visit('/')
        cy.get('label').should('contain.text', 'select date:')
    })

    it('after', () => {
        cy.changeSlots('after', '<small>Please select date.</small>')
        cy.visit('/')
        cy.get('small').should('contain.text', 'Please select date.')
    })

    it('icon', () => {
        cy.changeSlots('icon', 'Date')
        cy.visit('/')
        cy.get('.pdp-icon').should('contain.text', 'Date')
    })

    it('right arrow', () => {
        cy.changeSlots('right-arrow', 'ماه قبل')
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-arrow').first().should('contain.text', 'ماه قبل')
    })

    it('left arrow', () => {
        cy.changeSlots('left-arrow', 'ماه بعد')
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-arrow').last().should('contain.text', 'ماه بعد')
    })

    it('footer', () => {
        cy.changeSlots('footer', 'تاریخ انتخابی:')
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-footer').should('contain.text', 'تاریخ انتخابی:')
    })
})
