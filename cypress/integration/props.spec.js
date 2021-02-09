/// <reference types="Cypress" />

describe('from and to props', () => {
    beforeEach(() => {
        cy.changeProps()
        cy.changeSlots()
    })

    it('time - with click', () => {
        cy.changeProps('type', 'time')
        cy.changeProps('from', '10:10')
        cy.changeProps('to', '20:20')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        for (let i = 1; i <= 24; i++) {
            cy.get('.pdp-moment button').eq(1).click()
            cy.get('.pdp-moment button').eq(3).click()
            cy.get('.pdp-moment button').eq(4).click()
            cy.get('.pdp-moment button').eq(6).click()
        }
        cy.get('.pdp-input').should('have.value', '10:10 - 20:20')
    })

    it('time - with type', () => {
        cy.changeProps('type', 'time')
        cy.visit('/')
        cy.get('.pdp-input').type('8:10{enter}')
        cy.get('.pdp-input').should('have.value', '8:10')
        cy.get('.pdp-input').clear().type('10:10{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-input').type('21:20{enter}')
        cy.get('.pdp-input').should('have.value', '21:20')
        cy.get('.pdp-input').clear().type('20:20{enter}')
        cy.get('.pdp-input').should('have.value', '10:10 - 20:20')
    })

    it('datetime - with click', () => {
        cy.changeProps('type', 'datetime')
        cy.changeProps('from', '1399/6/1 10:10')
        cy.changeProps('to', '1399/6/31 20:20')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day[value="1"]').first().click()
        cy.get('.pdp-day[value="31"]').first().click()
        cy.get('.pdp-input').focus()
        for (let i = 1; i <= 24; i++) {
            cy.get('.pdp-moment button').eq(1).click()
            cy.get('.pdp-moment button').eq(3).click()
            cy.get('.pdp-moment button').eq(4).click()
            cy.get('.pdp-moment button').eq(6).click()
        }
        cy.get('.pdp-input').should('have.value', '1399/06/01 10:10 - 1399/06/31 20:20')
    })

    it('datetime - with type', () => {
        cy.visit('/')
        cy.get('.pdp-input').type('1399/6/1 8:10{enter}')
        cy.get('.pdp-input').should('have.value', '1399/6/1 8:10')
        cy.get('.pdp-input').clear().type('1399/6/1 10:10{enter}')
        cy.get('.pdp-input').should('have.value', '')
        cy.get('.pdp-input').type('1399/6/31 21:20{enter}')
        cy.get('.pdp-input').should('have.value', '1399/6/31 21:20')
        cy.get('.pdp-input').clear().type('1399/6/31 20:20{enter}')
        cy.get('.pdp-input').should('have.value', '1399/06/01 10:10 - 1399/06/31 20:20')
    })

    it('click on dates', () => {
        cy.changeProps('type', 'date')
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
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

describe('localeConfig prop', () => {
    it('change default properties', () => {
        cy.changeProps('locale-config', {
            fa: {
                inputFormat: 'jMM/jDD',
                translations: {
                    label: "فارسی",
                },
            },
            en: {
                inputFormat: 'YYYY',
                translations: {
                    label: "انگلیسی",
                },
            },
        })
        cy.changeProps('locale', 'fa,en')
        cy.visit('/')
        cy.selectRangeDate();
        cy.get('.pdp-input').should('have.value', '06/10 - 06/15')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی')
        cy.get('.pdp-header .top button').should('contain.text', 'انگلیسی').click()
        cy.get('.pdp-input').should('have.value', '2020 - 2020')
        cy.get('.pdp-header .top div').should('contain.text', 'Gregorian Calendar')
        cy.get('.pdp-header .top button').should('contain.text', 'فارسی')
    })

    it('add arabic language', () => {
        cy.changeProps('locale-config', {
            ar: {
                calendar: "gregorian",
                weekdays: ["ح ", "ن ", "ث ", "ر ", "خ ", "ج ", "س"],
                months: [
                    "الفروردین",
                    "الاردیبهشت",
                    "الخرداد",
                    "التیر",
                    "المرداد",
                    "الشهریور",
                    "المهر",
                    "الآبان",
                    "الآذر",
                    "الدی",
                    "البهمن",
                    "الاسفند",
                ],
                dir: {
                    input: "rtl",
                    picker: "ltr",
                },
                translations: {
                    label: "قمری",
                    text: "التقویم القمری",
                    prevMonth: "الماه قبل",
                    nextMonth: "الماه بعد",
                    today: "یوم",
                    submit: "التایید",
                },
                inputFormat: {
                    date: "date",
                    datetime: "datetime",
                    time: "time",
                },
                displayFormat: {
                    date: "?D ?MMMM",
                    datetime: "?D ?MMMM HH:mm",
                    time: "HH:mm",
                },
            },
        })
        cy.changeProps('locale', 'fa,ar')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-header .top button').should('contain.text', 'قمری').click()
        cy.get('.pdp-header .top div').should('contain.text', 'التقویم القمری')
        cy.get('.pdp-weekday').each(el => {
            ["ح ", "ن ", "ث ", "ر ", "خ ", "ج ", "س"].includes(el.text())
        })
        cy.get('.pdp-month').first().should('contain.text', 'الآذر')
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

describe("type prop", () => {
    it('datetime', () => {
        cy.changeProps('type', 'datetime')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-date').should('exist')
        cy.get('.pdp-time').should('exist')
    })

    it('time', () => {
        cy.changeProps('from', undefined)
        cy.changeProps('to', undefined)
        cy.changeProps('type', 'time')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-date').should('not.exist')
        cy.get('.pdp-time').should('exist')
    })

    it('date', () => {
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
        cy.changeProps('type', 'date')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-date').should('exist')
        cy.get('.pdp-time').should('not.exist')
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
    let type = 'date'
    for (let i = 0; i < 2; i++) {
        for (let j = 1; j <= 3; j++) {
            it('number value in ' + type + ' type => ' + j, () => {
                cy.changeProps('column', j)
                cy.visit('/')
                cy.get('.pdp-input').focus()
                cy.get('.pdp-column').should('have.length', j)
            })
        }
        if (i == 1)
            break
        beforeEach(() => {
            cy.changeProps('type', 'time')
        })
        type = 'time'
    }

    let sizes = ['iphone-4', 'ipad-2', 'macbook-15']
    beforeEach(() => {
        cy.changeProps('column', { '576': 1, '992': 2, '2000': 3 })
    })

    for (let i = 0; i < 2; i++) {
        it('object value in ' + type + ' type', () => {
            cy.visit('/')
            sizes.forEach((size, index) => {
                cy.viewport(size)
                cy.get('.pdp-input').focus()
                cy.get('.pdp-column').should('have.length', index + 1)
            })
        })
        if (i == 1)
            break
        beforeEach(() => {
            cy.changeProps('type', 'date')
        })
        type = 'date'
    }
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
    it('String in time type', () => {
        cy.changeProps('type', 'time')
        cy.changeProps('from', undefined)
        cy.changeProps('to', undefined)
        cy.changeProps('disable', '10:10')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
    })

    it('RegExp in time type', () => {
        cy.changeProps('disableR', '10:*')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 0)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        for (let i = 1; i <= 59; i++) {
            cy.get('.pdp-time .pdp-moment button').eq(3).click()
            cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('Array in time type', () => {
        cy.changeProps('disable', ['10:10', '10:11', '10:12'])
        cy.changeProps('disableR', undefined)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
    })

    it('Function in time type', () => {
        cy.changeProps('disableF', '(date)=>date.hour()==10')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 0)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        for (let i = 1; i <= 59; i++) {
            cy.get('.pdp-time .pdp-moment button').eq(3).click()
            cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('String in datetime type', () => {
        cy.changeProps('type', 'datetime')
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
        cy.changeProps('disableF', undefined)
        cy.changeProps('disable', '1399/6/15 10:10')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day[value="15"]').first().click()
        cy.selectTime(10, 10)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
    })

    it('RegExp in datetime type', () => {
        cy.changeProps('disableR', '1399/5/2 10:*')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-arrow').first().click();
        cy.get('.pdp-day[value="2"]').first().click()
        cy.selectTime(10, 0)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        for (let i = 1; i <= 59; i++) {
            cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('Array in datetime type', () => {
        cy.changeProps('disable', ['1399/6/10 10:10', '1399/6/10 10:11', '1399/6/10 10:12', '1399/6/11'])
        cy.changeProps('disableR', undefined)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('[data-column="0"] .pdp-day[value="11"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="10"]').click()
        cy.selectTime(10, 10)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        cy.get('.pdp-time .pdp-moment button').eq(2).click()
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
    })

    it('Function in datetime type', () => {
        cy.changeProps('disableF', '(date)=>date.hour()==10')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('[data-column="0"] .pdp-day[value="10"]').click()
        cy.selectTime(10, 0)
        cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        for (let i = 1; i <= 59; i++) {
            cy.get('.pdp-time .pdp-moment button').eq(3).click()
            cy.get('.pdp-time .pdp-moment > div').first().should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('String in date type', () => {
        cy.changeProps('type', 'date')
        cy.changeProps('disableF', undefined)
        cy.changeProps('disable', '1399/6/15')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-day[value="15"]').should('have.attr', 'class', 'pdp-day disabled')
    })

    it('RegExp in date type', () => {
        cy.changeProps('disableR', '1399/5/*/')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-arrow').first().click();
        for (let i = 1; i <= 31; i++) {
            cy.get(`[data-column="0"] .pdp-day[value="${i}"]`).should('have.attr', 'class').and('match', /disabled/)
        }
    })

    it('Array in date type', () => {
        cy.changeProps('disable', ['1399/6/10', '1399/6/15', '1399/6/20'])
        cy.changeProps('disableR', undefined)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('[data-column="0"] .pdp-day[value="10"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="15"]').should('have.attr', 'class').and('match', /disabled/)
        cy.get('[data-column="0"] .pdp-day[value="20"]').should('have.attr', 'class').and('match', /disabled/)
    })

    it('Function in date type', () => {
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
    it('single in date type', () => {
        cy.changeProps('mode', 'single')
        cy.visit('/')
        cy.selectDate()
        cy.get('.pdp-input').should('have.value', '99/6/10')
    })

    it('single in time type', () => {
        cy.changeProps('from', undefined)
        cy.changeProps('to', undefined)
        cy.changeProps('input-format', undefined)
        cy.changeProps('type', 'time')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.pdp-input').should('have.value', '10:10')
    })

    it('range in time type', () => {
        cy.changeProps('mode', 'range')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.selectTime(20, 20, 'last')
        cy.get('.pdp-input').should('have.value', '10:10 - 20:20')
    })

    it('range in date type', () => {
        cy.changeProps('from', '1399')
        cy.changeProps('to', '1399/6/31')
        cy.changeProps('type', 'date')
        cy.changeProps('input-format', 'jYY/jM/jD')
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
    it('true value in date type', () => {
        cy.changeProps('auto-submit', true)
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-picker').should('not.exist')
    })

    it('true value in time type', () => {
        cy.changeProps('type', 'time')
        cy.changeProps('format', undefined)
        cy.changeProps('from', undefined)
        cy.changeProps('to', undefined)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.get('.status').should('contain.text', '10:10')
    })

    it('false value in time type', () => {
        cy.changeProps('auto-submit', false)
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.selectTime(10, 10)
        cy.selectTime(20, 20, 'last')
        cy.get('.pdp-submit').click()
        cy.get('.pdp-picker').should('not.exist')
        cy.get('.status').should('contain.text', '10:10,20:20')
    })

    it('false value in date type', () => {
        cy.changeProps('format', 'YY-M-D')
        cy.changeProps('type', 'date')
        cy.visit('/')
        cy.selectRangeDate()
        cy.get('.pdp-picker').should('exist')
        cy.get('.pdp-submit').click()
        cy.get('.pdp-picker').should('not.exist')
    })
})

describe('change styles', () => {
    it('with styles prop', () => {
        cy.changeProps('styles', { 'primary-color': 'red', 'secondary-color': 'blue' })
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-submit').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })

    it('with style attribute', () => {
        cy.changeProps('styles', undefined)
        cy.changeProps('style', '--primary-color:red; --secondary-color: blue;')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-submit').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })

    it('with color prop', () => {
        cy.changeProps('style', undefined)
        cy.changeProps('color', 'red')
        cy.visit('/')
        cy.get('.pdp-input').focus()
        cy.get('.pdp-submit').should('have.css', 'background-color', 'rgb(199, 0, 76)')
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

    it('id for picker', () => {
        cy.changeProps('picker-id', 'picker')
        cy.visit('/')
        cy.get('.pdp-icon').click()
        cy.get('.pdp-picker').should('have.attr', 'id')
    })
})