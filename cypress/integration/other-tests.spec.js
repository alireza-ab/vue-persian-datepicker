/// <reference types="Cypress" />

describe('select date range', () => {
    beforeEach(() => {
        cy.changeProps('from', undefined)
        cy.changeProps('to', undefined)
        cy.changeSlots()
    })

    it('today button', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-today').click()
        cy.get('.pdp-day.today').should('have.class', 'tada')
    })

    it('show top of input', () => {
        cy.visit('/')
        cy.get('.pdp').invoke('attr', 'style', 'margin-top:50rem;')
        cy.get('.pdp-input').focus()
        cy.wait(1000).then(() => {
            let pickerTop = cy.$$('.pdp-picker').offset().top;
            let inputTop = cy.$$('.pdp-input').offset().top;
            expect(pickerTop).lt(inputTop)
        })
    })

    it('scroll in year-select section', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-year').first().click()
        cy.wait(1000).then(() => {
            expect(cy.$$('.pdp-select-year').offset().top).not.equal(0)
        })
    })


})
