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

describe('select date with disable date - single', () => {
    beforeEach(() => {
        cy.changeProps('disable', '1399/6/5')
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('5').click()
        cy.get('.pdp-input').should('have.value', '')
        cy.contains('6').click()
        cy.get('.pdp-input').should('have.value', '1399/06/06')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-input').type('{leftarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/06')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('1399/06/05{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/05')
        cy.get('.pdp-input').clear().type('1399/06/06{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/06')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day.start-range').should('contain.text', '6')
    })
})

describe('select date with disable date - range', () => {
    beforeEach(() => {
        cy.changeProps('disable', '1399/6/5')
        cy.changeProps('mode', 'range')
    })

    it('with click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('5').click()
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-day[value="3"]').first().click()
        cy.get('.pdp-day.start-range').should('contain.text', '3')
        cy.get('.pdp-day[value="6"]').first().click()
        cy.get('.pdp-day[value="5"]').first().click()
        cy.get('.pdp-day[value="4"]').first().click()
        cy.get('.pdp-input').focus().should('have.value', '1399/06/03 - 1399/06/04')
        cy.get('.pdp-day.end-range').should('contain.text', '4')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.tab()
            .type('{downarrow}{downarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-input').type('{rightarrow}{rightarrow}{enter}')
        cy.get('.pdp-day.start-range').should('contain.text', '3')
        cy.get('.pdp-input').type('{leftarrow}{leftarrow}{leftarrow}{enter}')
        cy.get('.pdp-input').type('{rightarrow}{enter}')
        cy.get('.pdp-input').type('{rightarrow}{enter}')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day.end-range').should('contain.text', '4')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.tab()
            .type('1399/06/05{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/05')
        cy.get('.pdp-input').clear().type('1399/06/03{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-day.start-range').should('contain.text', '3')
        cy.get('.pdp-input').type('1399/06/06{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-input').clear().type('1399/06/05{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/05')
        cy.get('.pdp-input').clear().type('1399/06/04{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/03 - 1399/06/04')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day.end-range').should('contain.text', '4')
    })
})

describe('select date in en locale - range', () => {
    beforeEach(() => {
        cy.changeProps('locale', 'en')
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

describe('select date in en locale - single', () => {
    beforeEach(() => {
        cy.changeProps('mode', 'single')
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