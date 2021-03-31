/// <reference types="Cypress" />

beforeEach(() => {
    cy.clock(new Date(2021, 2, 30, 12))
})

describe('slots', () => {
    before(() => {
        cy.changeProps('clearable', true, true)
        cy.changeSlots({
            'before': '<label>select date:</label>',
            'after': '<small>Please select date.</small>',
            'icon': 'Date',
            'right-arrow': 'ماه قبل',
            'left-arrow': 'ماه بعد',
            'footer': 'تاریخ انتخابی:',
            'clear': 'بستن',
            'up-arrow': 'افزایش',
            'down-arrow': 'کاهش',
        }, null, true)
    })

    it('before', () => {
        cy.visit('/')
        cy.get('label').should('contain.text', 'select date:')
    })

    it('after', () => {
        cy.visit('/')
        cy.get('small').should('contain.text', 'Please select date.')
    })

    it('icon', () => {
        cy.visit('/')
        cy.get('.pdp-icon').should('contain.text', 'Date')
    })

    it('right arrow', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-arrow').first().should('contain.text', 'ماه قبل')
    })

    it('left arrow', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-arrow').last().should('contain.text', 'ماه بعد')
    })

    it('footer', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.pdp-footer').should('contain.text', 'تاریخ انتخابی:')
    })

    it('clear', () => {
        cy.visit('/')
        cy.get('.pdp-clear').should('contain.text', 'بستن')
    })

    it('up arrow', () => {
        cy.changeProps('type', 'time')
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.hour button:first-child,.minute button:first-child')
            .should('contain.text', 'افزایش')
    })

    it('down arrow', () => {
        cy.changeProps('type', 'datetime')
        cy.visit('/')
        cy.get('.pdp-input').focus().get('.hour button:last-child,.minute button:last-child')
            .should('contain.text', 'کاهش')
    })
})
