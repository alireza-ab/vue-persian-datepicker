/// <reference types="Cypress" />

const focusEvent = () => {
  cy.get('.pdp-input').focus();
  cy.get('.status').should('contain.text', 'focus');
};
const blurEvent = () => {
  cy.get('.pdp-input').focus();
  cy.get('.pdp-overlay').click({ force: true });
  cy.get('.status').should('contain.text', 'blur');
};
const inputEvent = () => {
  cy.get('.pdp-input').type('1');
  cy.get('.status').should('contain.text', 'input');
};
const openEvent = () => {
  cy.get('.pdp-input').focus();
  cy.get('.status').should('contain.text', 'open');
};
const closeEvent = () => {
  cy.get('.pdp-input').focus();
  cy.get('.pdp-overlay').click({ force: true });
  cy.get('.status').should('contain.text', 'close');
};

before(() => {
  cy.changeProps(null, null, true);
  cy.changeSlots();
});

describe('date type', () => {
  before(() => {
    cy.changeProps('type', 'date');
  });

  it('focus', focusEvent);
  it('blur', blurEvent);
  it('input', inputEvent);
  it('open', openEvent);
  it('close', closeEvent);
  it('select & submit', () => {
    cy.get('.pdp-input').type('1399/06/01{enter}');
    cy.get('.status').should('contain.text', 'select:1399/06/01');
    cy.get('.pdp-input').type('1399/06/02{enter}');
    cy.get('.status')
      .should('contain.text', 'select:1399/06/02')
      .should('contain.text', 'submit:1399/06/01,1399/06/02');
  });
});

describe('time type', () => {
  before(() => {
    cy.changeProps('type', 'time');
  });

  it('focus', focusEvent);
  it('blur', blurEvent);
  it('input', inputEvent);
  it('open', openEvent);
  it('close', closeEvent);
  it('select & submit', () => {
    cy.get('.pdp-input').type('15:12{enter}');
    cy.get('.status').should('contain.text', 'select:15:12');
    cy.get('.pdp-input').type('20:18{enter}');
    cy.get('.status')
      .should('contain.text', 'select:20:18')
      .should('contain.text', 'submit:15:12,20:18');
  });
});

describe('datetime type', () => {
  before(() => {
    cy.changeProps('type', 'datetime');
  });

  it('focus', focusEvent);
  it('blur', blurEvent);
  it('input', inputEvent);
  it('open', openEvent);
  it('close', closeEvent);
  it('select & submit', () => {
    cy.get('.pdp-input').type('1399/06/01 20:18{enter}');
    cy.get('.status').should('contain.text', 'select:1399/06/01 20:18');
    cy.get('.pdp-input').type('1399/06/02 15:12{enter}');
    cy.get('.status')
      .should('contain.text', 'select:1399/06/02 15:12')
      .should('contain.text', 'submit:1399/06/01 20:18,1399/06/02 15:12');
  });
});
