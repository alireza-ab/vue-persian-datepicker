/// <reference types="Cypress" />

describe('slots', () => {
  before(() => {
    cy.changeProps('clearable', true, true);
    cy.changeSlots(
      {
        before: '<label>select date:</label>',
        after: '<small>Please select date.</small>',
        icon: 'Date',
        'right-arrow': 'ماه قبل',
        'left-arrow': 'ماه بعد',
        footer: 'تاریخ انتخابی:',
        clear: 'بستن',
        'up-arrow': 'افزایش',
        'down-arrow': 'کاهش',
      },
      null,
      true
    );
  });

  it('before', () => {
    cy.get('label').should('contain.text', 'select date:');
  });

  it('after', () => {
    cy.get('small').should('contain.text', 'Please select date.');
  });

  it('icon', () => {
    cy.get('.pdp-icon').should('contain.text', 'Date');
  });

  it('right arrow', () => {
    cy.get('.pdp-input')
      .focus()
      .get('.pdp-arrow')
      .first()
      .should('contain.text', 'ماه قبل');
  });

  it('left arrow', () => {
    cy.get('.pdp-input')
      .focus()
      .get('.pdp-arrow')
      .last()
      .should('contain.text', 'ماه بعد');
  });

  it('footer', () => {
    cy.get('.pdp-input')
      .focus()
      .get('.pdp-footer')
      .should('contain.text', 'تاریخ انتخابی:');
  });

  it('clear', () => {
    cy.get('.pdp-clear').should('contain.text', 'بستن');
  });

  context('up arrow', () => {
    before(() => {
      cy.changeProps('type', 'time');
    });

    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.hour button:first-child,.minute button:first-child')
        .should('contain.text', 'افزایش');
    });
  });

  context('down arrow', () => {
    before(() => {
      cy.changeProps('type', 'datetime');
    });

    it('test', () => {
      cy.get('.pdp-input')
        .focus()
        .get('.hour button:last-child,.minute button:last-child')
        .should('contain.text', 'کاهش');
    });
  });
});
