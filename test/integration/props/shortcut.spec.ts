/// <reference types="Cypress" />

import PersianDate from '@alireza-ab/persian-date';

const date = new PersianDate([2021, 3, 30, 12]);

before(() => {
  cy.changeProps('shortcut', true, true);
  cy.changeSlots();
});

context('date', () => {
  describe('range (fa)', () => {
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('این هفته')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('هفته قبل')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('هفته بعد')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ماه قبل')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ماه بعد')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('این ماه')
        .should('exist')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        `${date.clone().startOf('month').toString()} - ${date
          .clone()
          .endOf('month')
          .toString()}`
      );
    });
  });

  describe('range (en)', () => {
    before(() => {
      cy.changeProps('locale', 'en');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('This Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Previous Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Next Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Previous Month')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Next Month')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('This Month')
        .should('exist')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        `${date
          .clone()
          .calendar('gregorian')
          .startOf('month')
          .toString()} - ${date
          .clone()
          .calendar('gregorian')
          .endOf('month')
          .toString()}`
      );
    });
  });

  describe('single (en)', () => {
    before(() => {
      cy.changeProps({ mode: 'single' });
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('Now')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Tomorrow')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('First of Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Last of Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Yesterday')
        .should('exist')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        date.clone().calendar('gregorian').subDay().toString()
      );
    });
  });

  describe('single (fa)', () => {
    before(() => {
      cy.changeProps({ locale: 'fa' });
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('هم اکنون')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('دیروز')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('اول هفته')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('آخر هفته')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('فردا')
        .should('exist')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        date.clone().addDay().toString()
      );
    });
  });
});

context('datetime', () => {
  describe('single (fa)', () => {
    before(() => {
      cy.changeProps({ type: 'datetime' });
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('هم اکنون')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('دیروز')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('فردا')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('اول هفته')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('آخر هفته')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        date.clone().endOf('week').toString('datetime')
      );
    });
  });

  describe('single (en)', () => {
    before(() => {
      cy.changeProps({ locale: 'en' });
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('Now')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Yesterday')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Tomorrow')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Last of Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('First of Week')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        date.clone().calendar('gregorian').startOf('week').toString('datetime')
      );
    });
  });

  describe('range (en)', () => {
    before(() => {
      cy.changeProps('mode', 'range');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('This Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Next Week')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('This Month')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Previous Month')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Next Month')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Previous Week')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        `${date
          .clone()
          .calendar('gregorian')
          .subWeek()
          .startOf('week')
          .toString('datetime')} - ${date
          .clone()
          .calendar('gregorian')
          .subWeek()
          .endOf('week')
          .toString('datetime')}`
      );
    });
  });

  describe('range (fa)', () => {
    before(() => {
      cy.changeProps('locale', 'fa');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('این هفته')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('هفته قبل')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('این ماه')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ماه قبل')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ماه بعد')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('هفته بعد')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        `${date.clone().addWeek().startOf('week').toString('datetime')} - ${date
          .clone()
          .addWeek()
          .endOf('week')
          .toString('datetime')}`
      );
    });
  });
});

context('time', () => {
  describe('range (fa)', () => {
    before(() => {
      cy.changeProps('type', 'time');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('این ساعت')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ساعت بعد')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('تمام روز')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('ساعت قبل')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        `${date.clone().subHour().startOf('hour').toString('time')} - ${date
          .clone()
          .subHour()
          .endOf('hour')
          .toString('time')}`
      );
    });
  });

  describe('range (en)', () => {
    before(() => {
      cy.changeProps('locale', 'en');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('This Hour')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Previous Hour')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('All Day')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Next Hour')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        `${date.clone().addHour().startOf('hour').toString('time')} - ${date
          .clone()
          .addHour()
          .endOf('hour')
          .toString('time')}`
      );
    });
  });

  describe('single (en)', () => {
    before(() => {
      cy.changeProps('mode', 'single');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('One Hour ago')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('One Hour later')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Midnight')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Now')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('Midday')
        .should('exist')
        .click();

      cy.get('.pdp-input').should(
        'have.value',
        date.clone().time('12:00').toString('time')
      );
    });
  });

  describe('single (fa)', () => {
    before(() => {
      cy.changeProps('locale', 'fa');
    });
    it('test', () => {
      cy.get('.pdp-input').focus();
      cy.get('.pdp-shortcut')
        .should('exist')
        .contains('یک ساعت قبل')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('یک ساعت بعد')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('نیمه شب')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('نیمروز')
        .should('exist')
        .get('.pdp-shortcut')
        .contains('هم اکنون')
        .should('exist')
        .click();

      cy.get('.pdp-input').should('have.value', date.clone().toString('time'));
    });
  });
});

context('custom shortcut', () => {
  describe('range', () => {
    const stringDates = ['1400/01/10', '1400/01/20'];
    const persianDates = [
      date.clone().subDay(2).toString(),
      date.clone().addDay(2).toString(),
    ];
    before(() => {
      cy.changeProps({
        shortcut: {
          String: stringDates,
          PersianDate: persianDates,
        },
        type: 'date',
        mode: 'range',
      });
    });
    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.pdp-shortcut')
        .contains('String')
        .click();
      cy.get('.pdp-input')
        .should('have.value', stringDates.join(' - '))
        .focus()
        .get('.pdp-shortcut')
        .contains('PersianDate')
        .click();
      cy.get('.pdp-input').should('have.value', persianDates.join(' - '));
    });
  });

  describe('single', () => {
    const stringDates = ['1400/01/10'];
    const persianDates = [date.clone().subDay(2).toString()];
    before(() => {
      cy.changeProps({
        shortcut: {
          String: stringDates,
          PersianDate: persianDates,
        },
        mode: 'single',
      });
    });
    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.pdp-shortcut')
        .contains('String')
        .click();
      cy.get('.pdp-input')
        .should('have.value', stringDates[0])
        .focus()
        .get('.pdp-shortcut')
        .contains('PersianDate')
        .click();
      cy.get('.pdp-input').should('have.value', persianDates[0]);
    });
  });
});

context('date with disable', () => {
  before(() => {
    cy.changeProps({
      shortcut: true,
      type: 'date',
      from: date.clone().addDay().toString(),
      to: date.clone().endOf('month').toString(),
      disable: date.clone().addDay().toString(),
    });
  });

  describe('single', () => {
    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.pdp-shortcut')
        .should('have.length', 1)
        .contains('آخر هفته')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        date.clone().endOf('week').toString()
      );
    });
  });

  describe('range', () => {
    before(() => {
      cy.changeProps('mode', 'range');
    });

    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.pdp-shortcut')
        .should('have.length', 1)
        .contains('هفته بعد')
        .click();
      cy.get('.pdp-input').should(
        'have.value',
        `${date.clone().addWeek().startOf('week').toString()} - ${date
          .clone()
          .addWeek()
          .endOf('week')
          .toString()}`
      );
    });
  });
});
