/// <reference types="Cypress" />

describe('others', () => {
    before(() => {
        cy.changeProps(null, null, true);
        cy.changeSlots()
    })

    it('show top of input', () => {
        cy.visit('/')
        cy.get('.pdp').invoke('attr', 'style', 'margin-top:50rem;')
        cy.get('.pdp-input').focus()
        cy.wait(1000).then(() => {
            const pickerTop = cy.$$('.pdp-picker').offset().top;
            const inputTop = cy.$$('.pdp-input').offset().top;
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
        cy.changeProps({ from: '1399', to: '1399/6/31', locale: 'fa,en' });
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
        cy.changeProps({ locale: 'en,fa', mode: 'single' });
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('10').first().click()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top button').click()
        cy.get('.pdp-month').should('contain.text', 'شهریور')
        cy.get('.start-range').should('contain.text', '20')
    })

    it('disable dates and change locale', () => {
        cy.changeProps({ locale: 'fa,en', disable: ['1399/10/5', '1399/9/20', '1399/7/1'] }, null, true);
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('button.pdp-year').first().click()
        cy.get('li').contains('1399').click()
        cy.get('button.pdp-month').first().click()
        cy.get('.pdp-select-month > :nth-child(10)').click()
        cy.get('[data-column="0"] .pdp-day[value="5"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').first().click()
        cy.get('[data-column="0"] .pdp-day[value="20"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').first().click().click()
        cy.get('[data-column="0"] .pdp-day[value="1"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-header .top button').click()
        cy.get('button.pdp-year').first().click()
        cy.get('li').contains('2020').click()
        cy.get('button.pdp-month').first().click()
        cy.get('li').contains('September').click()
        cy.get('[data-column="0"] .pdp-day[value="22"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-arrow').last().click().click().click()
        cy.get('[data-column="0"] .pdp-day[value="10"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="25"]').should('have.attr', 'class').and('match', /disabled/)
    })

    it('disable datetimes and change locale', () => {
        cy.changeProps({ type: 'datetime', disable: ['1399/10/5 10:10', '1399/10/5 10:11', '1399/10/5 10:12'] });
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('button.pdp-year').first().click()
        cy.get('li').contains('1399').click()
        cy.get('button.pdp-month').first().click()
        cy.get('.pdp-select-month > :nth-child(10)').click()
        cy.get('[data-column="0"] .pdp-day[value="5"]').click()
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-header .top button').click()
        cy.get('button.pdp-year').first().click()
        cy.get('li').contains('2020').click()
        cy.get('button.pdp-month').first().click()
        cy.get('li').contains('September').click()
        cy.get('.pdp-arrow').last().click().click().click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(3).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(3).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
    })

    it('select single datetime and change locale', () => {
        cy.changeProps({ from: '1399', to: '1399/6/31', locale: 'en,fa' });
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day').contains('10').first().click()
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.pdp-header .top button').click()
        cy.get('.pdp-month').should('contain.text', 'شهریور')
        cy.get('.start-range').should('contain.text', '20')
        cy.get('.pdp-time .pdp-moment > div .hour').first().should('contain.text', '10')
        cy.get('.pdp-time .pdp-moment > div .minute').first().should('contain.text', '10')
    })

    it('select range datetime and change locale', () => {
        cy.changeProps({ locale: 'fa,en', mode: 'range', type: 'datetime' }, null, true);
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day').contains('15').first().click()
        cy.get('.pdp-day').contains('20').first().click()
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.selectTime(20, 20, 'last')
        cy.get('.pdp-header .top button').click()
        cy.contains('September')
        cy.get('.start-range').should('contain.text', '5')
        cy.get('.end-range').should('contain.text', '10')
        cy.get('.pdp-time .pdp-moment > div .hour').first().should('contain.text', '10')
        cy.get('.pdp-time .pdp-moment > div .minute').first().should('contain.text', '10')
        cy.get('.pdp-time .pdp-moment > div .hour').last().should('contain.text', '20')
        cy.get('.pdp-time .pdp-moment > div .minute').last().should('contain.text', '20')
    })

    it('today button', () => {
        cy.visit('/')
        cy.selectDate()
        const date = new Date()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-moment button:first-child').click({ multiple: true })
        cy.get('.hour').last().should('contain.text', date.getHours())
        cy.get('.minute').last().should('contain.text', date.getMinutes())
        cy.get('.pdp-today').click()
        cy.get('.pdp-day.today').should('have.class', 'tada')
        cy.get('.hour').should('contain.text', date.getHours())
        cy.get('.minute').should('contain.text', date.getMinutes())
    })
})

describe('model with value', () => {
    it('range mode - datetime type', () => {
        cy.changeProps({ model: ['2020-8-31 20:18', '2020-9-10 10:20'] })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '1399/06/10 20:18 - 1399/06/20 10:20').focus()
        cy.get('.start-range').should('contain.text', '10')
        cy.get('.end-range').should('contain.text', '20')
        cy.get('.pdp-moment div:first-child .hour').should('contain.text', '20')
        cy.get('.pdp-moment div:first-child .minute').should('contain.text', '18')
        cy.get('.pdp-moment div:last-child .hour').should('contain.text', '10')
        cy.get('.pdp-moment div:last-child .minute').should('contain.text', '20')
    })

    it('range mode - date type', () => {
        cy.changeProps({ type: 'date', model: ['2020-8-31', '2020-9-10'] })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/20').focus()
        cy.get('.start-range').should('contain.text', '10')
        cy.get('.end-range').should('contain.text', '20')
    })

    it('range mode - time type', () => {
        cy.changeProps({ type: 'time', model: ['10:20', '20:18'] })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '10:20 - 20:18').focus()
        cy.get('.pdp-moment div:first-child .hour').should('contain.text', '10')
        cy.get('.pdp-moment div:first-child .minute').should('contain.text', '20')
        cy.get('.pdp-moment div:last-child .hour').should('contain.text', '20')
        cy.get('.pdp-moment div:last-child .minute').should('contain.text', '18')
    })

    it('single mode - time type', () => {
        cy.changeProps({ mode: 'single', model: '10:20' })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '10:20').focus()
        cy.get('.pdp-moment div .hour').should('contain.text', '10')
        cy.get('.pdp-moment div .minute').should('contain.text', '20')
    })

    it('single mode - date type', () => {
        cy.changeProps({ type: 'date', model: '2020-8-31' })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '1399/06/10').focus()
        cy.get('.start-range').should('contain.text', '10')
    })

    it('single mode - datetime type', () => {
        cy.changeProps({ type: 'datetime', model: '2020-8-31 20:18' })
        cy.visit('/')
        cy.get('.pdp-input').should('have.value', '1399/06/10 20:18').focus()
        cy.get('.start-range').should('contain.text', '10')
        cy.get('.pdp-moment div .hour').should('contain.text', '20')
        cy.get('.pdp-moment div .minute').should('contain.text', '18')
    })
})