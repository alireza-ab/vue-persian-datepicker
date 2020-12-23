/// <reference types="Cypress" />

describe('others', () => {
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

    it('select range date and change locale', () => {
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
        cy.changeProps('locale', 'fa,en')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('15').first().click()
        cy.contains('20').first().click()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top button').click()
        cy.contains('September')
        cy.get('.start-range').should('contain.text', '5')
        cy.get('.end-range').should('contain.text', '10')
    })

    it('select single date and change locale', () => {
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
        cy.changeProps('locale', 'en,fa')
        cy.changeProps('mode', 'single')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').first().click()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top button').click()
        cy.contains('شهریور')
        cy.get('.start-range').should('contain.text', '20')
    })

    it('disable dates and change locale', () => {
        cy.changeProps('locale', 'fa,en')
        cy.changeProps('disable', ['1399/10/5', '1399/9/20', '1399/7/1'])
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('[data-column="0"] .pdp-day[value="5"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').first().click()
        cy.get('[data-column="0"] .pdp-day[value="20"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').first().click()
        cy.get('.pdp-arrow').first().click()
        cy.get('[data-column="0"] .pdp-day[value="1"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-header .top button').click()
        cy.get('[data-column="0"] .pdp-day[value="22"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').last().click()
        cy.get('.pdp-arrow').last().click()
        cy.get('.pdp-arrow').last().click()
        cy.get('[data-column="0"] .pdp-day[value="10"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="25"]').should('have.attr', 'class').and('match', /disabled/)
    })
})
