/// <reference types="Cypress" />

describe('from and to props', () => {
    beforeEach(() => {
        cy.changeProps()
        cy.changeSlots()
    })

    it('click on dates', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        for (let i = 1; i <= 30; i++) {
            cy.get(`.pdp-days [value="${i}"]`).last().click()
        }
        cy.get('.pdp-input').should('have.value', '')
    })

    it('click on arrows', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-arrow').last().click()
        cy.contains('شهریور')

        cy.visit('/')
        cy.get('.pdp-input').focus()
        for (let i = 0; i < 6; i++) {
            cy.get('.pdp-arrow').first().click()
        }
        cy.get('.pdp-month').should('not.have.text', 'اسفند')
    })

    it('with arrow keys', () => {
        cy.visit('/')
        cy.get('.pdp-input')
            .type('{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}')
            .type('{leftarrow}{leftarrow}{leftarrow}')
        cy.get('.hover').should('contain.text', '31')

        cy.get('.pdp-month').first().click()
        cy.contains('فروردین').click()
        cy.get('.pdp-input').focus().type('{downarrow}{rightarrow}')
        cy.get('.hover').should('contain.text', '1')
    })

    it('with type the date', () => {
        cy.visit('/')
        cy.get('.pdp-input')
            .type('1398/12/29{enter}')
            .should('have.value', '1398/12/29')
            .clear()
            .type('1399/7/1{enter}')
            .should('have.value', '1399/7/1')
    })
})

describe('locale prop', () => {
    it('fa and en', () => {
        cy.changeProps('locale', 'fa,en')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی')
        cy.get('.pdp-header .top button').click()
        cy.get('.pdp-header .top div').should('contain.text', 'Gregorian Calendar')
    })

    it('en and fa', () => {
        cy.changeProps('locale', 'en,fa')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top div').should('contain.text', 'Gregorian Calendar')
        cy.get('.pdp-header .top button').click()
        cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی')
    })

    it('en', () => {
        cy.changeProps('locale', 'en')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('September')

    })

    it('fa', () => {
        cy.changeProps('locale', 'fa,en')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.contains('شهریور')
    })
})

describe('formats', () => {
    it('format prop', () => {
        cy.changeProps('format', 'YYYY-MM-DD')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.show').should('have.text', 'date is: [\n  "2020-08-31",\n  "2020-09-05"\n]')
    })

    it('change format prop', () => {
        cy.changeProps('format', 'YY-M-D')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.show').should('have.text', 'date is: [\n  "20-8-31",\n  "20-9-5"\n]')
    })

    it('inputFormat prop', () => {
        cy.changeProps('input-format', 'jYYYY/jMM/jDD')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/15')
    })

    it('change inputFormat prop', () => {
        cy.changeProps('input-format', 'jYY/jM/jD')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15')
    })

    it('displayFormat prop', () => {
        cy.changeProps('display-format', 'jD jMMMM')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-footer > div').contains('10 شهریور - 15 شهریور')
    })

    it('change displayFormat prop', () => {
        cy.changeProps('display-format', 'jD jMMMM')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-footer > div').contains('10 شهریور - 15 شهریور')
    })
})

describe('show prop', () => {
    it('show prop', () => {
        cy.changeProps('show', false)
        cy.visit('/')
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.show-picker').click()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')
    })
})

describe('label prop', () => {
    it('label not exist', () => {
        cy.visit('/')
        cy.get('.pdp-label').should('not.exist')
    })
    it('label exist', () => {
        cy.changeProps('label', 'select date:')
        cy.visit('/')
        cy.get('.pdp-label').should('exist').should('contain.text', 'select date:')
    })
})

describe('clickOn prop', () => {
    it('with none value', () => {
        cy.changeProps('click-on', 'none')
        cy.visit('/')
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-input').click()
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-icon').click()
        cy.get('.pdp-picker').should('not.exist')
    })

    it('with icon value', () => {
        cy.changeProps('click-on', 'icon')
        cy.visit('/')
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-input').click()
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-icon').click()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')
    })

    it('with input value', () => {
        cy.changeProps('click-on', 'input')
        cy.visit('/')
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-input').click()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-icon').click()
        cy.get('.pdp-picker').should('not.exist')
    })

    it('with all value', () => {
        cy.changeProps('click-on', 'all')
        cy.visit('/')
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-input').click()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')

        cy.get('.pdp-icon').click()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-overlay').click({ force: true })
        cy.get('.pdp-picker').should('not.exist')
    })
})

describe('div class attribute', () => {
    it('remove class', () => {
        cy.changeProps('div-class', '')
        cy.visit('/')
        cy.get('.pdp-group').should('not.exist')
    })

    it('replace class', () => {
        cy.changeProps('div-class', 'replace-class')
        cy.visit('/')
        cy.get('.replace-class').should('exist')
    })

    it('add class', () => {
        cy.changeProps('div-class', 'pdp-group add-class')
        cy.visit('/')
        cy.get('.pdp-group').should('have.class', 'add-class')
    })
})

describe('input class attribute', () => {
    it('remove class', () => {
        cy.changeProps('input-class', '')
        cy.visit('/')
        cy.get('.pdp-input').should('not.exist')
    })

    it('replace class', () => {
        cy.changeProps('input-class', 'replace-class')
        cy.visit('/')
        cy.get('.replace-class').should('exist')
    })

    it('add class', () => {
        cy.changeProps('input-class', 'pdp-input add-class')
        cy.visit('/')
        cy.get('.pdp-input').should('have.class', 'add-class')
    })
})

describe('column prop', () => {
    for (let i = 1; i <= 3; i++) {
        it('number value => ' + i, () => {
            cy.changeProps('column', i)
            cy.visit('/')
            cy.get('.pdp-input').focus()
            cy.get('.pdp-column').should('have.length', i)
        })
    }

    let sizes = ['iphone-4', 'ipad-2', 'macbook-15']
    beforeEach(() => {
        cy.changeProps('column', { '576': 1, '992': 2, '2000': 3 })
    })

    it('object value', () => {
        cy.visit('/')
        sizes.forEach((size, index) => {
            cy.viewport(size)
            cy.get('.pdp-input').focus()
            cy.get('.pdp-column').should('have.length', index + 1)
        })
    })
})

describe('alternative field', () => {
    it('not exist', () => {
        cy.visit('/')
        cy.get('input[type="hidden"]').should('not.exist')
    })

    it('exist - String', () => {
        cy.changeProps('alt-name', 'date')
        cy.visit('/')
        cy.get('input[type="hidden"]').should('exist')
        cy.selectRangeDate()
        cy.get('input[type="hidden"]').should('have.value', '20-8-31,20-9-5')
    })

    it('exist - Array', () => {
        cy.changeProps('alt-name', 'date[]')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('input[type="hidden"]').first().should('have.value', '20-8-31')
        cy.get('input[type="hidden"]').last().should('have.value', '20-9-5')
    })

    it('without alt-format', () => {
        cy.changeProps('format', 'YYYY MM')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('input[type="hidden"]').first().should('have.value', '2020 08')
        cy.get('input[type="hidden"]').last().should('have.value', '2020 09')
    })


    it('with alt-format', () => {
        cy.changeProps('alt-format', 'MM YYYY DD')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('input[type="hidden"]').first().should('have.value', '08 2020 31')
        cy.get('input[type="hidden"]').last().should('have.value', '09 2020 05')
    })
})

describe('disable prop', () => {
    it('String', () => {
        cy.changeProps('disable', '1399/6/15')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day[value="15"]').should('have.attr', 'class', 'pdp-day disabled')
    })

    it('RegExp', () => {
        cy.changeProps('disableR', '1399/5/*/')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-arrow').first().click();
        for (let i = 1; i <= 31; i++) {
            cy.get(`[data-column="0"] .pdp-day[value="${i}"]`).should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('Array', () => {
        cy.changeProps('disable', ['1399/6/10', '1399/6/15', '1399/6/20'])
        cy.changeProps('disableR', undefined)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('[data-column="0"] .pdp-day[value="10"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="15"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="20"]').should('have.attr', 'class').and('match', /disabled/)
    })

    it('Function', () => {
        cy.changeProps('disableF', '(date)=>date.date()==5')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        for (let i = 0; i < 5; i++) {
            cy.get('[data-column="0"] .pdp-day[value="5"]').should('have.attr', 'class').and('match', /disabled/)
            cy.get('.pdp-arrow').first().click();
        }
    })
})

describe('mode prop', () => {
    it('single', () => {
        cy.changeProps('mode', 'single')
        cy.visit('/')
        cy.selectDate()
        cy.get('.pdp-input').should('have.value', '99/6/10')
    })

    it('range', () => {
        cy.changeProps('mode', 'range')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15')
    })
})

describe('clearable prop', () => {
    it('without clearable', () => {
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-clear').should('not.exist')
    })
    it('with clearable', () => {
        cy.changeProps('clearable', true)
        cy.changeProps('mode', 'single')
        cy.visit('/')
        cy.selectDate()
        cy.get('.pdp-input').should('have.value', '99/6/10')
        cy.get('.pdp-clear').click()
        cy.get('.pdp-input').should('not.have.value')
        cy.changeProps('mode', 'range')
        cy.reload()
        cy.get('.pdp-input').focus()
        cy.get('.pdp-clear').should('exist')
        cy.selectRangeDate()
        cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15')
        cy.get('.pdp-clear').click()
        cy.get('.pdp-input').should('not.have.value')
    })
})

describe('autoSubmit prop', () => {
    it('true value', () => {
        cy.changeProps('auto-submit', true)
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-picker').should('not.exist')
    })

    it('false value', () => {
        cy.changeProps('auto-submit', false)
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-submit').click()
        cy.get('.pdp-picker').should('not.exist')
    })
})

describe('modal prop', () => {
    it('modal mode', () => {
        cy.changeProps('modal', true)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-modal').should('be.visible')
    })
})

describe('attributes', () => {
    it('required for input', () => {
        cy.changeProps('required', 'required')
        cy.visit('/')
        cy.get('.pdp-input').should('have.attr', 'required')
    })

    it('placeholder for input', () => {
        cy.changeProps('placeholder', 'تاریخ تولد')
        cy.visit('/')
        cy.get('.pdp-input').should('have.attr', 'placeholder')
    })

    it('readonly for input', () => {
        cy.changeProps('readonly', 'readonly')
        cy.visit('/')
        cy.get('.pdp-input').should('have.attr', 'readonly')
    })

    it('disabled for input', () => {
        cy.changeProps('readonly', undefined)
        cy.changeProps('disabled', 'disabled')
        cy.visit('/')
        cy.get('.pdp-input').should('have.attr', 'disabled')
    })

    it('id for input', () => {
        cy.changeProps('id', 'input')
        cy.visit('/')
        cy.get('.pdp-input').should('have.attr', 'id')
    })

    it('id for label', () => {
        cy.changeProps('label-id', 'label')
        cy.visit('/')
        cy.get('.pdp-label').should('have.attr', 'id')
    })

    it('id for div', () => {
        cy.changeProps('div-id', 'div')
        cy.visit('/')
        cy.get('.pdp-group').should('have.attr', 'id')
    })
})