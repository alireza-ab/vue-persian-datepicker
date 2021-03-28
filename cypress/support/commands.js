// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

let props = {
    "from": "1399",
    "to": "1399/06/31"
}

let slots = {}

Cypress.Commands.add('changeProps', (prop, value, replace = false) => {
    if (replace) {
        props = {};
    }
    if (prop) {
        if (typeof prop == 'string') { props[prop] = value }
        else { Object.assign(props, prop) }
    }
    cy.writeFile('test/props.json', props)
})

Cypress.Commands.add('changeSlots', (slot, value, replace = false) => {
    if (replace) {
        slots = {};
    }
    if (slot) {
        if (typeof slot == 'string') { slots[slot] = value }
        else { Object.assign(slots, slot) }
    }
    cy.writeFile('test/slots.json', slots)
})

Cypress.Commands.add('selectDate', () => {
    cy.get('.pdp-input').focus()
    cy.get('.pdp-day').contains('10').click()
})

Cypress.Commands.add('selectRangeDate', () => {
    cy.get('.pdp-input').focus()
    cy.get('.pdp-day').contains('10').click()
    cy.get('.pdp-day').contains('15').click()
})

Cypress.Commands.add('selectTime', (hour = 0, minute = 0, child = 'first') => {
    let nowHour = new Date().getHours();
    nowHour = hour - nowHour;
    if (nowHour < 0)
        nowHour += 24
    let button = cy.get(`.pdp-time .pdp-moment > div:${child}-child .hour button:first-child`);
    for (let i = 0; i < nowHour; i++) {
        button.type('{enter}')
    }
    let nowMinute = new Date().getMinutes();
    nowMinute = minute - nowMinute;
    if (nowMinute < 0)
        nowMinute += 60
    button = cy.get(`.pdp-time .pdp-moment > div:${child}-child .minute button:first-child`);
    for (let i = 0; i < nowMinute; i++) {
        button.type('{enter}')
    }
})