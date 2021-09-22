/// <reference types="Cypress" />

describe('select time - range', () => {
  before(() => {
    cy.changeProps({ type: 'time' }, null, true);
    cy.changeSlots();
  });

  it('with click on times', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get(
      `.pdp-time .pdp-moment > div:last-child .hour button:first-child`
    );
    for (let i = 0; i < hour; i++) {
      button.click();
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      `.pdp-time .pdp-moment > div:last-child .minute button:first-child`
    );
    for (let i = 0; i < minute; i++) {
      button.click();
    }
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    if (hour < 0) hour += 24;
    button = cy.get(
      `.pdp-time .pdp-moment > div:first-child .hour button:first-child`
    );
    for (let i = 0; i < hour; i++) {
      button.click();
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      `.pdp-time .pdp-moment > div:first-child .minute button:first-child`
    );
    for (let i = 0; i < minute; i++) {
      button.click();
    }
    cy.get('.pdp-input').should('have.value', '15:12 - 20:18');
  });

  it('with keys', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get('.pdp-moment button').eq(4).focus();
    for (let i = 0; i < hour; i++) {
      button.type('{enter}');
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(6).focus();
    for (let i = 0; i < minute; i++) {
      button.type('{enter}');
    }
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    if (hour < 0) hour += 24;
    button = cy.get('.pdp-moment button').first().focus();
    for (let i = 0; i < hour; i++) {
      button.type('{enter}');
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(2).focus();
    for (let i = 0; i < minute; i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-input').should('have.value', '15:12 - 20:18');
  });

  it('with type the time', () => {
    cy.get('.pdp-input')
      .focus()
      .type('15:12{enter}')
      .type('20:18{enter}')
      .should('have.value', '15:12 - 20:18');
  });
});

describe('select time - single', () => {
  before(() => {
    cy.changeProps('mode', 'single');
  });

  it('with click on times', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .hour button:first-child'
    );
    for (let i = 0; i < hour; i++) {
      button.click();
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    );
    for (let i = 0; i < minute; i++) {
      button.click();
    }
    cy.get('.pdp-input').should('have.value', '20:18');
  });

  it('with keys', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get('.pdp-moment button').first().focus();
    for (let i = 0; i < hour; i++) {
      button.type('{enter}');
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(2).focus();
    for (let i = 0; i < minute; i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-input').should('have.value', '20:18');
  });

  it('with type the time', () => {
    cy.get('.pdp-input')
      .focus()
      .type('20:18{enter}')
      .should('have.value', '20:18');
  });
});

describe('select time with disable time - single', () => {
  before(() => {
    cy.changeProps('disable', '20:18');
  });

  it('with click on times', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .hour button:first-child'
    );
    for (let i = 0; i < hour; i++) {
      button.click();
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    );
    for (let i = 0; i < minute; i++) {
      button.click();
    }
    cy.get('.pdp-time .pdp-moment > div')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('have.value', '20:17');
    cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    ).click();
    cy.get('.pdp-input').should('have.value', '20:19');
  });

  it('with keys', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get('.pdp-moment button').first().focus();
    for (let i = 0; i < hour; i++) {
      button.type('{enter}');
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(2).focus();
    for (let i = 0; i < minute; i++) {
      button.type('{enter}');
    }

    cy.get('.pdp-time .pdp-moment > div')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('have.value', '20:17');
    cy.get('.pdp-moment button').eq(2).focus().type('{enter}');
    cy.get('.pdp-input').should('have.value', '20:19');
  });

  it('with type the time', () => {
    cy.get('.pdp-input')
      .focus()
      .type('20:18{enter}')
      .should('have.value', '20:18');
    cy.get('.hour').should('not.contain.value', '20');
    cy.get('.minute').should('not.contain.value', '18');
    cy.get('.pdp-input')
      .clear()
      .type('20:19{enter}')
      .should('have.value', '20:19');
    cy.get('.pdp-time').should('not.exist');
  });
});

describe('select time with disable time - range', () => {
  before(() => {
    cy.changeProps({ disable: ['20:18', '15:12'], mode: 'range' });
  });

  it('with click on times', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .hour button:first-child'
    );
    for (let i = 0; i < hour; i++) {
      button.click();
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .minute button:first-child'
    );
    for (let i = 0; i < minute; i++) {
      button.click();
    }
    cy.get('.pdp-time .pdp-moment > div:last-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('contain.value', ' - 20:17');
    cy.get(
      '.pdp-time .pdp-moment > div:last-child .minute button:first-child'
    ).click();
    cy.get('.pdp-input').should('contain.value', ' - 20:19');
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    if (hour < 0) hour += 24;
    button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .hour button:first-child'
    );
    for (let i = 0; i < Math.abs(hour); i++) {
      button.click();
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    if (minute < 0) minute += 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    );
    for (let i = 0; i < Math.abs(minute); i++) {
      button.click();
    }
    cy.get('.pdp-time .pdp-moment > div:first-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('have.value', '15:11 - 20:19');
    cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    ).click();
    cy.get('.pdp-input').should('have.value', '15:13 - 20:19');
  });

  it('with keys', () => {
    cy.get('.pdp-input').focus();
    let hour = new Date(2021, 2, 30, 12).getHours();
    hour = 20 - hour;
    if (hour < 0) hour += 24;
    let button = cy.get('.pdp-moment button').eq(4).focus();
    for (let i = 0; i < hour; i++) {
      button.type('{enter}');
    }
    let minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 18 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(6).focus();
    for (let i = 0; i < minute; i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-time .pdp-moment > div:last-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('contain.value', ' - 20:17');
    cy.get('.pdp-moment button').eq(6).focus().type('{enter}');
    cy.get('.pdp-input').should('contain.value', ' - 20:19');
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    if (hour < 0) hour += 24;
    button = cy.get('.pdp-moment button').first().focus();
    for (let i = 0; i < Math.abs(hour); i++) {
      button.type('{enter}');
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    if (minute < 0) minute += 60;
    button = cy.get('.pdp-moment button').eq(2).focus();
    for (let i = 0; i < Math.abs(minute); i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-time .pdp-moment > div:first-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should('have.value', '15:11 - 20:19');
    cy.get('.pdp-moment button').eq(2).focus().type('{enter}');
    cy.get('.pdp-input').should('have.value', '15:13 - 20:19');
  });

  it('with type the time', () => {
    cy.get('.pdp-input')
      .focus()
      .type('15:12{enter}')
      .should('have.value', '15:12');
    cy.get('.hour').should('not.contain.value', '15');
    cy.get('.minute').should('not.contain.value', '12');
    cy.get('.pdp-input')
      .clear()
      .type('15:13{enter}')
      .type('20:18{enter}')
      .should('have.value', '20:18');
    cy.get('.hour').should('not.contain.value', '20');
    cy.get('.minute').should('not.contain.value', '18');
    cy.get('.pdp-input').clear().type('20:17{enter}');
    cy.get('.pdp-input').should('have.value', '15:13 - 20:17');
  });
});
