// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { Obj } from '../../src/components/utils/modules/types';
import { mount } from '@cypress/vue';
import Test from './Test.vue';

declare namespace Cypress {
  interface Chainable {
    changeProps(prop: Obj, value: null, replace?: boolean): void;
    changeProps(prop: string, value: unknown, replace?: boolean): void;
    changeSlots(slot: Obj, value: null, replace?: boolean): void;
    changeSlots(slot: string, value: unknown, replace?: boolean): void;

    selectDate(): void;
    selectRangeDate(): void;
    selectTime(hour?: number, minute?: number, child?: 'first' | 'last'): void;

    getProps(): Obj;
    getSlots(): Obj;
  }
}

// *********************** Variable ***********************
let props: Obj = {
  from: '1399',
  to: '1399/06/31',
};
let slots: Obj = {};

// *********************** Commands ***********************
Cypress.Commands.add('selectDate', () => {
  cy.get('.pdp-input').focus();
  cy.get('.pdp-day').contains('10').click();
});
Cypress.Commands.add('selectRangeDate', () => {
  cy.get('.pdp-input').focus();
  cy.get('.pdp-day').contains('10').click();
  cy.get('.pdp-day').contains('15').click();
});
Cypress.Commands.add('selectTime', (hour = 0, minute = 0, child = 'first') => {
  let nowHour = new Date(2021, 2, 30, 12).getHours();
  nowHour = hour - nowHour;
  if (nowHour < 0) nowHour += 24;
  let button = cy.get(
    `.pdp-time .pdp-moment > div:${child}-child .hour button:first-child`
  );
  for (let i = 0; i < nowHour; i++) {
    button.click();
  }
  let nowMinute = new Date(2021, 2, 30, 12).getMinutes();
  nowMinute = minute - nowMinute;
  if (nowMinute < 0) nowMinute += 60;
  button = cy.get(
    `.pdp-time .pdp-moment > div:${child}-child .minute button:first-child`
  );
  for (let i = 0; i < nowMinute; i++) {
    button.click();
  }
});
Cypress.Commands.add('changeProps', (prop, value, replace = false) => {
  if (replace) {
    props = {};
  }
  if (prop) {
    if (typeof prop == 'string') {
      props[prop] = value;
    } else {
      Object.assign(props, prop);
    }
  }
});
Cypress.Commands.add('changeSlots', (slot, value, replace = false) => {
  if (replace) {
    slots = {};
  }
  if (slot) {
    if (typeof slot == 'string') {
      slots[slot] = value;
    } else {
      Object.assign(slots, slot);
    }
  }
});

// *********************** Test ***********************
beforeEach(() => {
  cy.clock(new Date(2021, 2, 30, 12)).then(() => {
    mount(Test, {
      propsData: {
        props,
        slots,
      },
    });
  });
});
