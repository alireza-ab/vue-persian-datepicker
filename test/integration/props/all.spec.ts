/// <reference types="Cypress" />

describe('from and to props', () => {
  context('time', () => {
    before(() => {
      cy.changeProps({ from: '10:10', to: '20:20', type: 'time' }, null, true);
      cy.changeSlots();
    });

    it('with click', () => {
      cy.get('.pdp-input')
        .focus()
        .selectTime(20, 20, 'last')
        .selectTime(14, 10);
      cy.get('.pdp-input').should('have.value', '14:10 - 20:20');
    });

    it('with type', () => {
      cy.get('.pdp-input')
        .type('8:10{enter}')
        .should('have.value', '8:10')
        .clear()
        .type('10:10{enter}')
        .should('have.value', '')
        .type('21:20{enter}')
        .should('have.value', '21:20')
        .clear()
        .type('20:20{enter}')
        .should('have.value', '10:10 - 20:20');
    });
  });

  context('datetime', () => {
    before(() => {
      cy.changeProps({
        from: '1399/6/1 10:10',
        to: '1399/6/31 20:20',
        type: 'datetime',
      });
    });

    it('with click', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-day[value="1"]').first().click();
      cy.get('.pdp-day[value="31"]').first().click();
      cy.get('.pdp-input')
        .focus()
        .selectTime(20, 20, 'last')
        .selectTime(14, 10);
      cy.get('.pdp-input').should(
        'have.value',
        '1399/06/01 14:10 - 1399/06/31 20:20'
      );
    });

    it('with type', () => {
      cy.get('.pdp-input')
        .type('1399/6/1 8:10{enter}')
        .should('have.value', '1399/6/1 8:10')
        .clear()
        .type('1399/6/1 10:10{enter}')
        .should('have.value', '')
        .type('1399/6/31 21:20{enter}')
        .should('have.value', '1399/6/31 21:20')
        .clear()
        .type('1399/6/31 20:20{enter}')
        .should('have.value', '1399/06/01 10:10 - 1399/06/31 20:20');
    });
  });

  context('date', () => {
    before(() => {
      cy.changeProps({ from: '1399', to: '1399/6/31', type: 'date' });
    });

    it('click on dates', () => {
      cy.get('.pdp-input').focus();
      for (let i = 1; i <= 30; i++) {
        cy.get(`.pdp-days [value="${i}"]`).last().click();
      }
      cy.get('.pdp-input').should('have.value', '');
    });

    it('click on arrows', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-arrow').last().click();
      cy.contains('شهریور');

      cy.get('.pdp-input').focus();
      const arrow = cy.get('.pdp-arrow').first();
      for (let i = 0; i < 6; i++) {
        arrow.click();
      }
      cy.get('.pdp-month').should('not.have.text', 'اسفند');
    });

    it('with arrow keys', () => {
      cy.get('.pdp-input')
        .type(
          '{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}'
        )
        .type('{leftarrow}{leftarrow}{leftarrow}');
      cy.get('.hover').should('contain.text', '31');

      cy.get('.pdp-month').first().click();
      cy.contains('فروردین').click();
      cy.get('.pdp-input').focus().type('{downarrow}{rightarrow}');
      cy.get('.hover').should('contain.text', '1');
    });

    it('with type the date', () => {
      cy.get('.pdp-input')
        .type('1398/12/29{enter}')
        .should('have.value', '1398/12/29')
        .clear()
        .type('1399/7/1{enter}')
        .should('have.value', '1399/7/1');
    });
  });
});

describe('locale prop', () => {
  context('fa and en', () => {
    before(() => {
      cy.changeProps('locale', 'fa,en');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی');
      cy.get('.pdp-header .top button').click();
      cy.get('.pdp-header .top div').should(
        'contain.text',
        'Gregorian Calendar'
      );
    });
  });

  context('en and fa', () => {
    before(() => {
      cy.changeProps('locale', 'en,fa');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-header .top div').should(
        'contain.text',
        'Gregorian Calendar'
      );
      cy.get('.pdp-header .top button').click();
      cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی');
    });
  });

  context('en', () => {
    before(() => {
      cy.changeProps('locale', 'en');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.contains('September');
    });
  });

  context('fa', () => {
    before(() => {
      cy.changeProps('locale', 'fa');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.contains('شهریور');
    });
  });
});

describe('localeConfig prop', () => {
  context('change default properties', () => {
    before(() => {
      cy.changeProps({
        'locale-config': {
          fa: {
            inputFormat: 'jMM/jDD',
            translations: {
              label: 'فارسی',
            },
          },
          en: {
            inputFormat: 'YYYY',
            translations: {
              label: 'انگلیسی',
            },
          },
        },
        locale: 'fa,en',
      });
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').should('have.value', '06/10 - 06/15').focus();
      cy.get('.pdp-header .top div').should('contain.text', 'تقویم شمسی');
      cy.get('.pdp-header .top button')
        .should('contain.text', 'انگلیسی')
        .click();
      cy.get('.pdp-input').should('have.value', '2020 - 2020');
      cy.get('.pdp-header .top div').should(
        'contain.text',
        'Gregorian Calendar'
      );
      cy.get('.pdp-header .top button').should('contain.text', 'فارسی');
    });
  });

  context('add arabic language', () => {
    before(() => {
      cy.changeProps({
        'locale-config': {
          ar: {
            calendar: 'gregorian',
            weekdays: ['ح ', 'ن ', 'ث ', 'ر ', 'خ ', 'ج ', 'س'],
            months: [
              'الفروردین',
              'الاردیبهشت',
              'الخرداد',
              'التیر',
              'المرداد',
              'الشهریور',
              'المهر',
              'الآبان',
              'الآذر',
              'الدی',
              'البهمن',
              'الاسفند',
            ],
            dir: {
              input: 'rtl',
              picker: 'ltr',
            },
            translations: {
              label: 'قمری',
              text: 'التقویم القمری',
              prevMonth: 'الماه قبل',
              nextMonth: 'الماه بعد',
              today: 'یوم',
              submit: 'التایید',
            },
            inputFormat: {
              date: 'date',
              datetime: 'datetime',
              time: 'time',
            },
            displayFormat: {
              date: '?D ?MMMM',
              datetime: '?D ?MMMM HH:mm',
              time: 'HH:mm',
            },
          },
        },
        locale: 'fa,ar',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-header .top button').should('contain.text', 'قمری').click();
      cy.get('.pdp-header .top div').should('contain.text', 'التقویم القمری');
      cy.get('.pdp-weekday').each((el) => {
        ['ح ', 'ن ', 'ث ', 'ر ', 'خ ', 'ج ', 'س'].includes(el.text());
      });
      cy.get('.pdp-month').first().should('contain.text', 'الآذر');
    });
  });
});

describe('formats', () => {
  context('with default values', () => {
    it('format prop', () => {
      cy.selectRangeDate();
      cy.get('.show').should(
        'have.text',
        'date/time is: [\n  "2020-08-31",\n  "2020-09-05"\n]'
      );
    });

    it('inputFormat prop', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').should('have.value', '1399/06/10 - 1399/06/15');
    });

    it('displayFormat prop', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').focus();
      cy.get('.pdp-footer > div').should('have.text', '10 شهریور - 15 شهریور');
    });
  });

  context('change values', () => {
    before(() => {
      cy.changeProps({
        format: 'YY-M-D',
        'input-format': 'jYY/jM/jD',
        'display-format': 'jD-jMMMM',
      });
    });

    it('change format prop', () => {
      cy.selectRangeDate();
      cy.get('.show').should(
        'have.text',
        'date/time is: [\n  "20-8-31",\n  "20-9-5"\n]'
      );
    });

    it('change inputFormat prop', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15');
    });

    it('change displayFormat prop', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').focus();
      cy.get('.pdp-footer > div').should('have.text', '10-شهریور - 15-شهریور');
    });
  });
});

describe('type prop', () => {
  context('datetime', () => {
    before(() => {
      cy.changeProps('type', 'datetime');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-date').should('exist');
      cy.get('.pdp-time').should('exist');
    });
  });
  context('time', () => {
    before(() => {
      cy.changeProps({ from: undefined, to: undefined, type: 'time' });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-date').should('not.exist');
      cy.get('.pdp-time').should('exist');
    });
  });
  context('date', () => {
    before(() => {
      cy.changeProps({ from: '1399', to: '1399/6/31', type: 'date' });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-date').should('exist');
      cy.get('.pdp-time').should('not.exist');
    });
  });
});

describe('show prop', () => {
  before(() => {
    cy.changeProps('show', false);
  });

  it('show prop', () => {
    cy.get('.pdp-picker').should('not.exist');
    cy.get('.show-picker').click();
    cy.get('.pdp-picker').should('exist');
    cy.get('.pdp-overlay').click({ force: true });
    cy.get('.pdp-picker').should('not.exist');
  });

  after(() => {
    cy.changeProps('show', false);
  });
});

describe('label prop', () => {
  context('label not exist', () => {
    it('test', () => {
      cy.get('.pdp-label').should('not.exist');
    });
  });

  context('label exist', () => {
    before(() => {
      cy.changeProps('label', 'select date:');
    });

    it('test', () => {
      cy.get('.pdp-label')
        .should('exist')
        .should('contain.text', 'select date:');
    });
  });
});

describe('clickOn prop', () => {
  context('with none value', () => {
    before(() => {
      cy.changeProps('click-on', 'none');
    });

    it('test', () => {
      cy.get('.pdp-picker').should('not.exist');
      cy.get('.pdp-input').focus();
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-input').click();
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-icon').click();
      cy.get('.pdp-picker').should('not.exist');
    });
  });

  context('with icon value', () => {
    before(() => {
      cy.changeProps('click-on', 'icon');
    });

    it('test', () => {
      cy.get('.pdp-picker').should('not.exist');
      cy.get('.pdp-input').focus();
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-input').click();
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-icon').click();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');
    });
  });

  context('with input value', () => {
    before(() => {
      cy.changeProps('click-on', 'input');
    });

    it('test', () => {
      cy.get('.pdp-picker').should('not.exist');
      cy.get('.pdp-input').focus();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-input').click();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-icon').click();
      cy.get('.pdp-picker').should('not.exist');
    });
  });

  context('with all value', () => {
    before(() => {
      cy.changeProps('click-on', 'all');
    });

    it('test', () => {
      cy.get('.pdp-picker').should('not.exist');
      cy.get('.pdp-input').focus();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-input').click();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');

      cy.get('.pdp-icon').click();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-overlay').click({ force: true });
      cy.get('.pdp-picker').should('not.exist');
    });
  });
});

describe('icon', () => {
  before(() => {
    cy.changeProps('icon-inside', true);
  });

  it('iconInside prop', () => {
    cy.get('.pdp-icon')
      .should('have.attr', 'class')
      .and('match', /pdp-inside/);
  });
});

describe('div class attribute', () => {
  context('remove class', () => {
    before(() => {
      cy.changeProps('div-class', '');
    });

    it('test', () => {
      cy.get('.pdp-group').should('not.exist');
    });
  });

  context('replace class', () => {
    before(() => {
      cy.changeProps('div-class', 'replace-class');
    });

    it('test', () => {
      cy.get('.replace-class').should('exist');
    });
  });

  context('add class', () => {
    before(() => {
      cy.changeProps('div-class', 'pdp-group add-class');
    });

    it('test', () => {
      cy.get('.pdp-group').should('have.class', 'add-class');
    });
  });
});

describe('input class attribute', () => {
  context('remove class', () => {
    before(() => {
      cy.changeProps('firstInput-class', '');
    });

    it('test', () => {
      cy.get('.pdp-input').should('not.exist');
    });
  });

  context('replace class', () => {
    before(() => {
      cy.changeProps('firstInput-class', 'replace-class');
    });

    it('test', () => {
      cy.get('.replace-class').should('exist');
    });
  });

  context('add class', () => {
    before(() => {
      cy.changeProps('firstInput-class', 'pdp-input add-class');
    });

    it('test', () => {
      cy.get('.pdp-input').should('have.class', 'add-class');
    });
  });
});

describe('column prop', () => {
  const types = ['date', 'time', 'datetime'];
  const sizes = ['iphone-4', 'ipad-2', 'macbook-15'];

  before(() => {
    cy.changeProps({ from: undefined, to: undefined });
  });

  types.forEach((type) => {
    context(type + ' type', () => {
      Cypress._.times(3, (i) => {
        i = +i + 1;
        context('number value => ' + i, () => {
          before(() => {
            cy.changeProps({ column: i, type });
          });

          it('test', () => {
            cy.get('.pdp-input').focus();
            if (type === 'time')
              cy.get('.pdp-column div').should('have.length', i);
            else cy.get('.pdp-column').should('have.length', i);
          });
        });
      });

      context('object value', () => {
        before(() => {
          cy.changeProps('column', { '576': 1, '992': 2, '2000': 3 });
        });

        it('test', () => {
          sizes.forEach((size, index) => {
            cy.viewport(size as Cypress.ViewportPreset);
            cy.get('.pdp-input').focus();
            if (type === 'time')
              cy.get('.pdp-column div').should('have.length', index + 1);
            else cy.get('.pdp-column').should('have.length', index + 1);
          });
        });
      });
    });
  });
});

describe('alternative field', () => {
  context('not exist', () => {
    it('test', () => {
      cy.get('input[type="hidden"]').should('not.exist');
    });
  });

  context('exist - String', () => {
    before(() => {
      cy.changeProps('alt-name', 'date');
    });

    it('test', () => {
      cy.get('input[type="hidden"]').should('exist');
      cy.selectRangeDate();
      cy.get('input[type="hidden"]').should('have.value', '21-3-30,21-4-4');
    });
  });

  context('exist - Array', () => {
    before(() => {
      cy.changeProps('alt-name', 'date[]');
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('input[type="hidden"]').first().should('have.value', '21-3-30');
      cy.get('input[type="hidden"]').last().should('have.value', '21-4-4');
    });
  });

  context('without alt-format', () => {
    before(() => {
      cy.changeProps('format', 'YYYY MM');
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('input[type="hidden"]').first().should('have.value', '2021 03');
      cy.get('input[type="hidden"]').last().should('have.value', '2021 04');
    });
  });

  context('with alt-format', () => {
    before(() => {
      cy.changeProps('alt-format', 'MM YYYY DD');
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('input[type="hidden"]').first().should('have.value', '03 2021 30');
      cy.get('input[type="hidden"]').last().should('have.value', '04 2021 04');
    });
  });
});

describe('disable prop', () => {
  context('String in time type', () => {
    before(() => {
      cy.changeProps({
        from: undefined,
        to: undefined,
        type: 'time',
        disable: '15:52',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 52);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
    });
  });

  context('RegExp in time type', () => {
    before(() => {
      cy.changeProps('disableR', '15:*');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 0);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(3).as('momentButtonThree');
      cy.get('.pdp-time .pdp-moment > div').first().as('momentFirstDiv');
      for (let i = 1; i <= 59; i++) {
        cy.get('@momentButtonThree').click();
        cy.get('@momentFirstDiv')
          .should('have.attr', 'class')
          .and('match', /disabled/);
      }
    });
  });

  context('Array in time type', () => {
    before(() => {
      cy.changeProps({
        disableR: undefined,
        disable: ['15:52', '15:53', '15:54'],
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 52);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(2).click();
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(2).click();
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
    });
  });

  context('Function in time type', () => {
    before(() => {
      cy.changeProps('disableF', '(date)=>date.hour()==15');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 0);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(3).as('momentButtonThree');
      cy.get('.pdp-time .pdp-moment > div').first().as('momentFirstDiv');
      for (let i = 1; i <= 59; i++) {
        cy.get('@momentButtonThree').click();
        cy.get('@momentFirstDiv')
          .should('have.attr', 'class')
          .and('match', /disabled/);
      }
    });
  });

  context('String in datetime type', () => {
    before(() => {
      cy.changeProps({
        from: '1399',
        to: '1399/6/31',
        type: 'datetime',
        disableF: undefined,
        disable: '1399/6/15 15:52',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-day[value="15"]').first().click();
      cy.selectTime(15, 52);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
    });
  });

  context('RegExp in datetime type', () => {
    before(() => {
      cy.changeProps('disableR', '1399/5/2 15:*');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-arrow').first().click();
      cy.get('.pdp-day[value="2"]').first().click();
      cy.selectTime(15, 0);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment > div').first().as('momentFirstDiv');
      for (let i = 1; i <= 59; i++) {
        cy.get('@momentFirstDiv')
          .should('have.attr', 'class')
          .and('match', /disabled/);
      }
    });
  });

  context('Array in datetime type', () => {
    before(() => {
      cy.changeProps({
        disableR: undefined,
        disable: [
          '1399/6/10 15:52',
          '1399/6/10 15:53',
          '1399/6/10 15:54',
          '1399/6/11',
        ],
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('[data-column="0"] .pdp-day[value="11"]')
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('[data-column="0"] .pdp-day[value="10"]').click();
      cy.selectTime(15, 52);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(2).click();
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(2).click();
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
    });
  });

  context('Function in datetime type', () => {
    before(() => {
      cy.changeProps('disableF', '(date)=>date.hour()==15');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('[data-column="0"] .pdp-day[value="10"]').click();
      cy.selectTime(15, 0);
      cy.get('.pdp-time .pdp-moment > div')
        .first()
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('.pdp-time .pdp-moment button').eq(3).as('momentButtonThree');
      cy.get('.pdp-time .pdp-moment > div').first().as('momentFirstDiv');
      for (let i = 1; i <= 59; i++) {
        cy.get('@momentButtonThree').click();
        cy.get('@momentFirstDiv')
          .should('have.attr', 'class')
          .and('match', /disabled/);
      }
    });
  });

  context('String in date type', () => {
    before(() => {
      cy.changeProps({
        type: 'date',
        disableF: undefined,
        disable: '1399/6/15',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-day[value="15"]').should(
        'have.attr',
        'class',
        'pdp-day disabled'
      );
    });
  });

  context('RegExp in date type', () => {
    before(() => {
      cy.changeProps('disableR', '1399/5/*/');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-arrow').first().click();
      for (let i = 1; i <= 31; i++) {
        cy.get(`[data-column="0"] .pdp-day[value="${i}"]`)
          .should('have.attr', 'class')
          .and('match', /disabled/);
      }
    });
  });

  context('Array in date type', () => {
    before(() => {
      cy.changeProps({
        disableR: undefined,
        disable: ['1399/6/10', '1399/6/15', '1399/6/20'],
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('[data-column="0"] .pdp-day[value="10"]')
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('[data-column="0"] .pdp-day[value="15"]')
        .should('have.attr', 'class')
        .and('match', /disabled/);
      cy.get('[data-column="0"] .pdp-day[value="20"]')
        .should('have.attr', 'class')
        .and('match', /disabled/);
    });
  });

  context('Function in date type', () => {
    before(() => {
      cy.changeProps('disableF', '(date)=>date.date()==5');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('[data-column="0"] .pdp-day[value="5"]').as('fifthDay');
      cy.get('.pdp-arrow').first().as('firstArrow');
      for (let i = 0; i < 5; i++) {
        cy.get('@fifthDay')
          .should('have.attr', 'class')
          .and('match', /disabled/);
        cy.get('@firstArrow').click();
      }
    });
  });
});

describe('mode prop', () => {
  context('single in date type', () => {
    before(() => {
      cy.changeProps('mode', 'single');
    });

    it('test', () => {
      cy.selectDate();
      cy.get('.pdp-input').should('have.value', '99/6/10');
    });
  });

  context('single in time type', () => {
    before(() => {
      cy.changeProps({
        from: undefined,
        to: undefined,
        'input-format': undefined,
        type: 'time',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 52);
      cy.get('.pdp-input').should('have.value', '15:52');
    });
  });

  context('range in time type', () => {
    before(() => {
      cy.changeProps('mode', 'range');
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(6, 52);
      cy.selectTime(20, 48, 'last');
      cy.get('.pdp-input').should('have.value', '06:52 - 20:48');
    });
  });

  context('range in date type', () => {
    before(() => {
      cy.changeProps({
        from: '1399',
        to: '1399/6/31',
        'input-format': 'jYY/jM/jD',
        type: 'date',
      });
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15');
    });
  });
});

describe('clearable prop', () => {
  context('without clearable', () => {
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-clear').should('not.exist');
    });
  });
  context('with clearable', () => {
    before(() => {
      cy.changeProps({ clearable: true, mode: 'single' });
    });

    it('test', () => {
      cy.selectDate();
      cy.get('.pdp-input').should('have.value', '99/6/10');
      cy.get('.pdp-clear').click();
      cy.get('.pdp-input').should('not.have.value');
      cy.changeProps('mode', 'range');
      cy.get('.pdp-input').focus();
      cy.get('.pdp-clear').should('exist');
      cy.selectRangeDate();
      cy.get('.pdp-input').should('have.value', '99/6/10 - 99/6/15');
      cy.get('.pdp-clear').click();
      cy.get('.pdp-input').should('not.have.value');
    });
  });
});

describe('autoSubmit prop', () => {
  context('true value in date type', () => {
    before(() => {
      cy.changeProps('auto-submit', true);
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('.pdp-picker').should('not.exist');
    });
  });

  context('true value in time type', () => {
    before(() => {
      cy.changeProps({
        from: undefined,
        to: undefined,
        type: 'time',
        format: undefined,
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(15, 52);
      cy.get('.status').should('contain.text', '15:52');
    });
  });

  context('false value in time type', () => {
    before(() => {
      cy.changeProps('auto-submit', false);
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.selectTime(6, 52);
      cy.selectTime(20, 48, 'last');
      cy.get('.pdp-submit').click();
      cy.get('.pdp-picker').should('not.exist');
      cy.get('.status').should('contain.text', '06:52,20:48');
    });
  });

  context('false value in date type', () => {
    before(() => {
      cy.changeProps({ type: 'date', format: 'YY-M-D' });
    });

    it('test', () => {
      cy.selectRangeDate();
      cy.get('.pdp-picker').should('exist');
      cy.get('.pdp-submit').click();
      cy.get('.pdp-picker').should('not.exist');
    });
  });
});

describe('change styles', () => {
  context('with styles prop', () => {
    before(() => {
      cy.changeProps('styles', {
        'primary-color': 'red',
        'secondary-color': 'blue',
      });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-submit').should(
        'have.css',
        'background-color',
        'rgb(255, 0, 0)'
      );
    });
  });

  context('with color prop', () => {
    before(() => {
      cy.changeProps({ styles: undefined, color: 'red' });
    });

    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-submit').should(
        'have.css',
        'background-color',
        'rgb(199, 0, 76)'
      );
    });
  });
});

describe('modal prop', () => {
  before(() => {
    cy.changeProps('modal', true);
  });

  it('modal mode', () => {
    cy.get('.pdp-input').focus();
    cy.get('.pdp-modal').should('be.visible');
  });
});

describe('attributes', () => {
  before(() => {
    cy.changeProps({
      required: true,
      placeholder: 'تاریخ تولد',
      readonly: true,
      disabled: true,
      id: 'input',
      'label-id': 'label',
      'div-id': 'div',
      'picker-id': 'picker',
    });
  });

  it('check attributes', () => {
    cy.get('.pdp-icon').click();
    cy.get('.pdp-input').should('have.attr', 'required');
    cy.get('.pdp-input').should('have.attr', 'readonly');
    cy.get('.pdp-input').should('have.attr', 'disabled');
    cy.get('.pdp-input').should('have.attr', 'placeholder', 'تاریخ تولد');
    cy.get('.pdp-input').should('have.attr', 'id', 'input');
    cy.get('.pdp-label').should('have.attr', 'id', 'label');
    cy.get('.pdp-group').should('have.attr', 'id', 'div');
    cy.get('.pdp-picker').should('have.attr', 'id', 'picker');
  });
});
