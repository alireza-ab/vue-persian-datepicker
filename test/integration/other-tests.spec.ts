/// <reference types="Cypress" />

before(() => {
  cy.changeProps(null, null, true);
  cy.changeSlots();
});

describe('scroll in year-select section', () => {
  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.get('.pdp-year')
      .first()
      .click()
      .wait(1)
      .then(() => {
        expect(cy.$$('.pdp-select-year').scrollTop()).not.equal(0);
      });
  });
});

describe('select range date and change locale', () => {
  before(() => {
    cy.changeProps({ from: '1399', to: '1399/6/31', locale: 'fa,en' });
  });

  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.contains('15').first().click();
    cy.contains('20').first().click();
    cy.get('.pdp-input').focus();
    cy.get('.pdp-header .top button').click();
    cy.contains('September');
    cy.get('.start-range').should('contain.text', '5');
    cy.get('.end-range').should('contain.text', '10');
  });
});

describe('select single date and change locale', () => {
  before(() => {
    cy.changeProps({ locale: 'en,fa', mode: 'single' });
  });

  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.contains('10').first().click();
    cy.get('.pdp-input').focus();
    cy.get('.pdp-header .top button').click();
    cy.get('.pdp-month').should('contain.text', 'شهریور');
    cy.get('.start-range').should('contain.text', '20');
  });
});

describe('disable dates and change locale', () => {
  before(() => {
    cy.changeProps(
      { locale: 'fa,en', disable: ['1399/10/5', '1399/9/20', '1399/7/1'] },
      null,
      true
    );
  });
  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.get('button.pdp-year').first().click();
    cy.get('li').contains('1399').click();
    cy.get('button.pdp-month').first().click();
    cy.get('.pdp-select-month > :nth-child(10)').click();
    cy.get('[data-column="0"] .pdp-day[value="5"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-arrow').first().click();
    cy.get('[data-column="0"] .pdp-day[value="20"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-arrow').first().click().click();
    cy.get('[data-column="0"] .pdp-day[value="1"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-header .top button').click();
    cy.get('button.pdp-year').first().click();
    cy.get('li').contains('2020').click();
    cy.get('button.pdp-month').first().click();
    cy.get('li').contains('September').click();
    cy.get('[data-column="0"] .pdp-day[value="22"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-arrow').last().click().click().click();
    cy.get('[data-column="0"] .pdp-day[value="10"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('[data-column="0"] .pdp-day[value="25"]')
      .should('have.attr', 'class')
      .and('match', /disabled/);
  });
});

describe('disable datetimes and change locale', () => {
  before(() => {
    cy.changeProps({
      type: 'datetime',
      disable: ['1399/10/5 15:52', '1399/10/5 15:53', '1399/10/5 15:54'],
    });
  });

  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.get('button.pdp-year').first().click();
    cy.get('li').contains('1399').click();
    cy.get('button.pdp-month').first().click();
    cy.get('.pdp-select-month > :nth-child(10)').click();
    cy.get('[data-column="0"] .pdp-day[value="5"]').click();
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
    cy.get('.pdp-header .top button').click();
    cy.get('button.pdp-year').first().click();
    cy.get('li').contains('2020').click();
    cy.get('button.pdp-month').first().click();
    cy.get('li').contains('September').click();
    cy.get('.pdp-arrow').last().click().click().click();
    cy.get('.pdp-time .pdp-moment > div')
      .first()
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-time .pdp-moment button').eq(3).click();
    cy.get('.pdp-time .pdp-moment > div')
      .first()
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-time .pdp-moment button').eq(3).click();
    cy.get('.pdp-time .pdp-moment > div')
      .first()
      .should('have.attr', 'class')
      .and('match', /disabled/);
  });
});

describe('select single datetime and change locale', () => {
  before(() => {
    cy.changeProps({ from: '1399', to: '1399/6/31', locale: 'en,fa' });
  });

  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.get('.pdp-day').contains('10').first().click();
    cy.get('.pdp-input').focus();
    cy.selectTime(15, 52);
    cy.get('.pdp-header .top button').click();
    cy.get('.pdp-month').should('contain.text', 'شهریور');
    cy.get('.start-range').should('contain.text', '20');
    cy.get('.pdp-time .pdp-moment > div .hour')
      .first()
      .should('contain.text', '15');
    cy.get('.pdp-time .pdp-moment > div .minute')
      .first()
      .should('contain.text', '52');
  });
});

describe('select range datetime and change locale', () => {
  before(() => {
    cy.changeProps({ locale: 'fa,en', mode: 'range', type: 'datetime' });
  });

  it('test', () => {
    cy.get('.pdp-input').focus();
    cy.get('.pdp-day').contains('15').first().click();
    cy.get('.pdp-day').contains('20').first().click();
    cy.get('.pdp-input').focus();
    cy.selectTime(15, 52);
    cy.selectTime(20, 48, 'last');
    cy.get('.pdp-header .top button').click();
    cy.contains('September');
    cy.get('.start-range').should('contain.text', '5');
    cy.get('.end-range').should('contain.text', '10');
    cy.get('.pdp-time .pdp-moment > div .hour')
      .first()
      .should('contain.text', '15');
    cy.get('.pdp-time .pdp-moment > div .minute')
      .first()
      .should('contain.text', '52');
    cy.get('.pdp-time .pdp-moment > div .hour')
      .last()
      .should('contain.text', '20');
    cy.get('.pdp-time .pdp-moment > div .minute')
      .last()
      .should('contain.text', '48');
  });
});

describe('today button', () => {
  before(() => {
    cy.changeProps({ from: undefined, to: undefined });
  });

  it('test', () => {
    cy.selectDate();
    const date = new Date(2021, 2, 30, 12);
    cy.get('.pdp-input').focus();
    cy.get('.pdp-moment > :first-child button:first-child').click({
      multiple: true,
    });
    cy.get('.hour').last().should('contain.text', date.getHours());
    cy.get('.minute').last().should('contain.text', date.getMinutes());
    cy.get('.pdp-today').click();
    cy.get('.pdp-day.today').should('have.class', 'tada');
    cy.get('.hour').should('contain.text', date.getHours());
    cy.get('.minute').should('contain.text', date.getMinutes());
  });
});

describe('model with value', () => {
  context('range mode - datetime type', () => {
    before(() => {
      cy.changeProps({ model: ['2020-8-31 20:18', '2020-9-10 10:20'] });
    });
    it('test', () => {
      cy.get('.pdp-input')
        .should('have.value', '1399/06/10 20:18 - 1399/06/20 10:20')
        .focus();
      cy.get('.start-range').should('contain.text', '10');
      cy.get('.end-range').should('contain.text', '20');
      cy.get('.pdp-moment div:first-child .hour').should('contain.text', '20');
      cy.get('.pdp-moment div:first-child .minute').should(
        'contain.text',
        '18'
      );
      cy.get('.pdp-moment div:last-child .hour').should('contain.text', '10');
      cy.get('.pdp-moment div:last-child .minute').should('contain.text', '20');
    });
  });

  context('range mode - date type', () => {
    before(() => {
      cy.changeProps({ type: 'date', model: ['2020-8-31', '2020-9-10'] });
    });

    it('test', () => {
      cy.get('.pdp-input')
        .should('have.value', '1399/06/10 - 1399/06/20')
        .focus();
      cy.get('.start-range').should('contain.text', '10');
      cy.get('.end-range').should('contain.text', '20');
    });
  });

  context('range mode - time type', () => {
    before(() => {
      cy.changeProps({ type: 'time', model: ['10:20', '20:18'] });
    });

    it('test', () => {
      cy.get('.pdp-input').should('have.value', '10:20 - 20:18').focus();
      cy.get('.pdp-moment div:first-child .hour').should('contain.text', '10');
      cy.get('.pdp-moment div:first-child .minute').should(
        'contain.text',
        '20'
      );
      cy.get('.pdp-moment div:last-child .hour').should('contain.text', '20');
      cy.get('.pdp-moment div:last-child .minute').should('contain.text', '18');
    });
  });

  context('single mode - time type', () => {
    before(() => {
      cy.changeProps({ mode: 'single', model: '10:20' });
    });

    it('test', () => {
      cy.get('.pdp-input').should('have.value', '10:20').focus();
      cy.get('.pdp-moment div .hour').should('contain.text', '10');
      cy.get('.pdp-moment div .minute').should('contain.text', '20');
    });
  });

  context('single mode - date type', () => {
    before(() => {
      cy.changeProps({ type: 'date', model: '2020-8-31' });
    });

    it('test', () => {
      cy.get('.pdp-input').should('have.value', '1399/06/10').focus();
      cy.get('.start-range').should('contain.text', '10');
    });
  });

  context('single mode - datetime type', () => {
    before(() => {
      cy.changeProps({ type: 'datetime', model: '2020-8-31 20:18' });
    });

    it('test', () => {
      cy.get('.pdp-input').should('have.value', '1399/06/10 20:18').focus();
      cy.get('.start-range').should('contain.text', '10');
      cy.get('.pdp-moment div .hour').should('contain.text', '20');
      cy.get('.pdp-moment div .minute').should('contain.text', '18');
    });
  });
});

describe('show top of input and focus line', () => {
  it('test', () => {
    cy.get('.pdp').invoke('attr', 'style', 'margin-top:50rem;');
    cy.get('.pdp-input').focus();
    cy.wait(1).then(() => {
      const input = cy.$$('.pdp-input');
      const inputTop = input.offset().top;
      const pickerTop = cy.$$('.pdp-picker').offset().top;
      input.hasClass('pdp-focus');
      expect(pickerTop).lt(inputTop);
    });
  });
});
