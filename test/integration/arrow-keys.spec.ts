/// <reference types="Cypress" />

describe('arrow keys', () => {
  before(() => {
    cy.changeProps();
    cy.changeSlots();
  });

  it('without select date', () => {
    cy.get('.pdp-input').focus().wait(1).type('{downarrow}{rightarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '24');
    cy.get('.pdp-input').type(
      '{rightarrow}{rightarrow}{rightarrow}{rightarrow}'
    );
    cy.get('[data-column=1] .hover').should('contain.text', '20');
    cy.get('.pdp-input').type('{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '13');
    cy.get('.pdp-input').type('{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '14');
    cy.get('.pdp-input').type('{uparrow}{uparrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '1');
    cy.get('.pdp-input').type('{rightarrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '27');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '30');
    cy.get('.pdp-input').type('{leftarrow}{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '1');
    cy.get('.pdp-input').type(
      '{uparrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}'
    );
    cy.get('[data-column=0] .hover').should('contain.text', '19');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '29');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '1');
    cy.get('.pdp-input').type('{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '2');
  });

  it('with select date', () => {
    cy.get('.pdp-input').focus().get('.pdp-year').first().click();
    cy.get('li').contains('1399').click();
    cy.get('.pdp-input').focus().get('.pdp-month').first().click();
    cy.get('li').contains('فروردین').click();
    cy.get('.pdp-input').type('{downarrow}', { force: true });
    cy.get('.hover').should('contain.text', '1');
    cy.get('.pdp-input').type('{downarrow}{downarrow}{rightarrow}{enter}');
    cy.get('.start-range').should('contain.text', '14');
    cy.get('.pdp-input')
      .type('{downarrow}{downarrow}{downarrow}{downarrow}{rightarrow}{enter}')
      .should('have.value', '1399/01/14 - 1399/02/10')
      .focus()
      .get('.end-range')
      .should('contain.text', '10');
    cy.get('[data-column=0] .in-range')
      .should('not.contain.text', '14')
      .should('not.contain.text', '13');
    cy.get('[data-column=1] .in-range')
      .should('not.contain.text', '10')
      .should('not.contain.text', '11');
    cy.get('.pdp-input').type('{downarrow}{rightarrow}{rightarrow}{enter}');
    cy.get('.start-range').should('contain.text', '15');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{enter}').focus();
    cy.get('.start-range').should('contain.text', '25');
    cy.get('.end-range').should('contain.text', '15');
    cy.get('.pdp-input')
      .type(
        '{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
      )
      .get('.start-range')
      .should('contain.text', '26');
    cy.get('.pdp-arrow').first().click().click();
    cy.get('.pdp-input')
      .type('{uparrow}{enter}', { force: true })
      .should('have.value', '1399/01/01 - 1399/03/26')
      .focus();
    cy.get('.start-range').should('contain.text', '1');
  });
});

describe('arrow keys in "en" locale', () => {
  before(() => {
    cy.changeProps('locale', 'en');
  });

  it('without select date', () => {
    cy.get('.pdp-input').focus().wait(1).type('{downarrow}{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '24');
    cy.get('.pdp-input').type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '20');
    cy.get('.pdp-input').type('{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '13');
    cy.get('.pdp-input').type('{rightarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '14');
    cy.get('.pdp-input').type('{uparrow}{uparrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{rightarrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '1');
    cy.get('.pdp-input').type('{leftarrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '26');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '29');
    cy.get('.pdp-input').type('{rightarrow}{rightarrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '31');
    cy.get('.pdp-input').type(
      '{uparrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}'
    );
    cy.get('[data-column=0] .hover').should('contain.text', '18');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=1] .hover').should('contain.text', '27');
    cy.get('.pdp-input').type('{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '23');
    cy.get('.pdp-input').type('{rightarrow}');
    cy.get('[data-column=0] .hover').should('contain.text', '24');
  });

  it('with select date', () => {
    cy.get('.pdp-input').focus().get('.pdp-year').first().click();
    cy.get('li').contains('2020').click();
    cy.get('.pdp-input').focus().get('.pdp-month').first().click();
    cy.get('li').contains('March').click();
    cy.get('.pdp-input').type('{downarrow}', { force: true });
    cy.get('.hover').should('contain.text', '20');
    cy.get('.pdp-input').type('{downarrow}{downarrow}{leftarrow}{enter}');
    cy.get('.start-range').should('contain.text', '2');
    cy.get('.pdp-input')
      .type('{downarrow}{downarrow}{downarrow}{downarrow}{leftarrow}{enter}')
      .should('have.value', '2020-04-02 - 2020-04-29')
      .focus()
      .get('.end-range')
      .should('contain.text', '29');
    cy.get('[data-column=1] .in-range')
      .first()
      .should('not.contain.text', '2')
      .should('not.contain.text', '1');
    cy.get('[data-column=1] .in-range')
      .last()
      .should('not.contain.text', '29')
      .should('not.contain.text', '30');
    cy.get('.pdp-input').type('{downarrow}{leftarrow}{leftarrow}{enter}');
    cy.get('.start-range').should('contain.text', '4');
    cy.get('.pdp-input')
      .type('{uparrow}{uparrow}{uparrow}{enter}')
      .should('have.value', '2020-04-13 - 2020-05-04')
      .focus();
    cy.get('.start-range').should('contain.text', '13');
    cy.get('.pdp-input').type(
      '{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
    );
    cy.get('.start-range').should('contain.text', '25');
    cy.get('.pdp-arrow').first().click().click();
    cy.get('.pdp-input')
      .type(
        '{downarrow}{downarrow}{downarrow}{downarrow}{rightarrow}{rightarrow}{enter}',
        { force: true }
      )
      .should('have.value', '2020-04-12 - 2020-05-25')
      .focus()
      .get('.start-range')
      .should('contain.text', '12');
  });
});

describe('arrow keys with disabel date', () => {
  before(() => {
    cy.changeProps({ locale: 'fa', disable: '1399/6/10' });
  });

  it('with select date', () => {
    cy.get('.pdp-input').focus().wait(1).type('{downarrow}{enter}');
    cy.get('.start-range').should('contain.text', '1');
    cy.get('.pdp-input')
      .type('{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
      .type('{uparrow}{enter}{rightarrow}{enter}')
      .should('have.value', '1399/06/01 - 1399/06/09')
      .focus()
      .get('.end-range')
      .should('contain.text', '9');
  });
});
