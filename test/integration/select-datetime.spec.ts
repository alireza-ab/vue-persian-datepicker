/// <reference types="Cypress" />

describe('select date and time - range', () => {
  before(() => {
    cy.changeProps('type', 'datetime');
    cy.changeSlots();
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('10').click();
    cy.contains('15').click();
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
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .hour button:last-child'
    );
    for (let i = 0; i < Math.abs(hour); i++) {
      button.click();
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .minute button:last-child'
    );
    for (let i = 0; i < Math.abs(minute); i++) {
      button.click();
    }
    cy.get('.pdp-input').should(
      'have.value',
      '1399/06/10 20:18 - 1399/06/15 15:12'
    );
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
      .type('{downarrow}{rightarrow}{rightarrow}{enter}');
    let hour = new Date(2021, 2, 30, 12).getHours();
    cy.get('.pdp-input').focus();
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
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get('.pdp-moment button').eq(5).focus();
    for (let i = 0; i < Math.abs(hour); i++) {
      button.type('{enter}');
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get('.pdp-moment button').eq(7).focus();
    for (let i = 0; i < Math.abs(minute); i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-input').should(
      'have.value',
      '1399/06/10 20:18 - 1399/06/15 15:12'
    );
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('1399/06/10 20:18{enter}')
      .type('1399/06/15 15:12{enter}')
      .should('have.value', '1399/06/10 20:18 - 1399/06/15 15:12');
  });
});

describe('select date and time - single', () => {
  before(() => {
    cy.changeProps('mode', 'single');
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('10').click();
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
    cy.get('.pdp-input').should('have.value', '1399/06/10 20:18');
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
      .focus();
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
    cy.get('.pdp-input').should('have.value', '1399/06/10 20:18');
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('1399/06/10 20:18{enter}')
      .should('have.value', '1399/06/10 20:18');
  });
});

describe('select date and time with disable date - single', () => {
  before(() => {
    cy.changeProps('disable', '1399/6/5 20:18');
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('5').click();
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
    cy.get('.pdp-input').should('have.value', '1399/06/05 20:17');
    cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    ).click();
    cy.get('.pdp-input').should('have.value', '1399/06/05 20:19');
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{enter}')
      .focus();
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
    cy.get('.pdp-input').should('have.value', '1399/06/05 20:17');
    cy.get('.pdp-moment button').eq(2).focus().type('{enter}');
    cy.get('.pdp-input').should('have.value', '1399/06/05 20:19');
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('1399/06/05 20:18{enter}')
      .should('have.value', '1399/06/05 20:18')
      .clear()
      .type('1399/06/06 20:18{enter}')
      .should('have.value', '1399/06/06 20:18')
      .focus();
    cy.get('.pdp-day.start-range').should('contain.text', '6');
    cy.get('.hour').should('contain.text', '20');
    cy.get('.minute').should('contain.text', '18');
  });
});

describe('select date and time with disable date - range', () => {
  before(() => {
    cy.changeProps({ disable: '1399/6/5 20:18', mode: 'range' });
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('5').click();
    cy.get('.pdp-day.start-range').should('contain.text', '5');
    cy.get('.pdp-day[value="6"]').first().click();
    cy.get('.pdp-input').focus();
    cy.get('.pdp-day.end-range').should('contain.text', '6');
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
    cy.get('.pdp-time .pdp-moment > div:first-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input').should(
      'contain.value',
      '1399/06/05 20:17 - 1399/06/06 '
    );
    cy.get(
      '.pdp-time .pdp-moment > div:first-child .minute button:first-child'
    ).click();
    cy.get('.pdp-input').should(
      'contain.value',
      '1399/06/05 20:19 - 1399/06/06 '
    );
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .hour button:last-child'
    );
    for (let i = 0; i < Math.abs(hour); i++) {
      button.click();
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .minute button:last-child'
    );
    for (let i = 0; i < Math.abs(minute); i++) {
      button.click();
    }
    cy.get('.pdp-input').should(
      'have.value',
      '1399/06/05 20:19 - 1399/06/06 15:12'
    );
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{downarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{enter}');
    cy.get('.pdp-day.start-range').should('contain.text', '5');
    cy.get('.pdp-input')
      .type('{leftarrow}{leftarrow}{leftarrow}{enter}')
      .focus();
    cy.get('.pdp-day.end-range').should('contain.text', '8');
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
    cy.get('.pdp-time .pdp-moment > div:first-child')
      .should('have.attr', 'class')
      .and('match', /disabled/);
    cy.get('.pdp-input')
      .focus()
      .should('contain.value', '1399/06/05 20:17 - 1399/06/08 ');
    cy.get('.pdp-moment button').eq(2).focus().type('{enter}');
    cy.get('.pdp-input')
      .focus()
      .should('contain.value', '1399/06/05 20:19 - 1399/06/08 ');
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get('.pdp-moment button').eq(5).focus();
    for (let i = 0; i < Math.abs(hour); i++) {
      button.type('{enter}');
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get('.pdp-moment button').eq(7).focus();
    for (let i = 0; i < Math.abs(minute); i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-input')
      .focus()
      .should('have.value', '1399/06/05 20:19 - 1399/06/08 15:12');
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('1399/06/05 20:18{enter}')
      .should('have.value', '1399/06/05 20:18')
      .clear()
      .type('1399/06/03 20:18{enter}')
      .should('have.value', '');
    cy.get('.pdp-day.start-range').should('contain.text', '3');
    cy.get('.hour').first().should('contain.text', '20');
    cy.get('.minute').first().should('contain.text', '18');
    cy.get('.pdp-input')
      .clear()
      .type('1399/06/05 20:18{enter}')
      .should('have.value', '1399/06/05 20:18')
      .clear()
      .type('1399/06/04 20:18{enter}')
      .should('have.value', '1399/06/03 20:18 - 1399/06/04 20:18')
      .focus();
    cy.get('.pdp-day.end-range').should('contain.text', '4');
    cy.get('.hour').last().should('contain.text', '20');
    cy.get('.minute').last().should('contain.text', '18');
  });
});

describe('select date and time in en locale - range', () => {
  before(() => {
    cy.changeProps('locale', 'en');
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('10').click();
    cy.contains('15').click();
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
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .hour button:last-child'
    );
    for (let i = 0; i < Math.abs(hour); i++) {
      button.click();
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get(
      '.pdp-time .pdp-moment > div:last-child .minute button:last-child'
    );
    for (let i = 0; i < Math.abs(minute); i++) {
      button.click();
    }
    cy.get('.pdp-input').should(
      'have.value',
      '2020-09-10 20:18 - 2020-09-15 15:12'
    );
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{downarrow}{downarrow}{leftarrow}{leftarrow}{enter}')
      .type('{downarrow}{rightarrow}{rightarrow}{enter}');
    let hour = new Date(2021, 2, 30, 12).getHours();
    cy.get('.pdp-input').focus();
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
    hour = new Date(2021, 2, 30, 12).getHours();
    hour = 15 - hour;
    hour -= 24;
    button = cy.get('.pdp-moment button').eq(5).focus();
    for (let i = 0; i < Math.abs(hour); i++) {
      button.type('{enter}');
    }
    minute = new Date(2021, 2, 30, 12).getMinutes();
    minute = 12 - minute;
    minute -= 60;
    button = cy.get('.pdp-moment button').eq(7).focus();
    for (let i = 0; i < Math.abs(minute); i++) {
      button.type('{enter}');
    }
    cy.get('.pdp-input').should(
      'have.value',
      '2020-09-06 20:18 - 2020-09-15 15:12'
    );
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('2020-09-10 20:18{enter}')
      .type('2020-09-15 15:12{enter}')
      .should('have.value', '2020-09-10 20:18 - 2020-09-15 15:12');
  });
});

describe('select date and time in en locale - single', () => {
  before(() => {
    cy.changeProps('mode', 'single');
  });

  it('with click', () => {
    cy.get('.pdp-input').focus();
    cy.contains('10').click();
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
    cy.get('.pdp-input').should('have.value', '2020-09-10 20:18');
  });

  it('with keys', () => {
    cy.get('.pdp-input')
      .focus()
      .wait(1)
      .type('{downarrow}{downarrow}{rightarrow}{rightarrow}{enter}')
      .focus();
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
    cy.get('.pdp-input').should('have.value', '2020-09-10 20:18');
  });

  it('with type', () => {
    cy.get('.pdp-input')
      .focus()
      .type('2020-09-10 20:18{enter}')
      .should('have.value', '2020-09-10 20:18');
  });
});
