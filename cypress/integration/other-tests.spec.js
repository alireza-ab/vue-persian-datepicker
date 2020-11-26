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

    it('show top of input', async () => {
        await cy.visit('/')
        await cy.get('.pdp').invoke('attr', 'style', 'margin-top:50rem;')
        await cy.get('.pdp-input').focus()
        await cy.wait(1000)
        let pickerTop = await cy.$$('.pdp-picker').offset().top;
        let inputTop = await cy.$$('.pdp-input').offset().top;
        expect(pickerTop).lt(inputTop)
    })

    it('scroll in year-select section', async () => {
        await cy.visit('/')
        await cy.get('.pdp-input').focus()
        await cy.get('.pdp-year').first().click()
        await cy.wait(1000)
        await expect(cy.$$('.pdp-select-year').offset().top).not.equal(0)
    })


})
