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

Cypress.Commands.add('changeProps', (prop, value) => {
    if (prop)
        props[prop] = value
    cy.writeFile('test/props.json', props)
})

Cypress.Commands.add('changeSlots', (slot, value) => {
    if (slot)
        slots[slot] = value
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
    for (let i = 0; i < nowHour; i++) {
        cy.get(`.pdp-time .pdp-moment > div:${child}-child .hour button:first-child`).click()
    }
    let nowMinute = new Date().getMinutes();
    nowMinute = minute - nowMinute;
    if (nowMinute < 0)
        nowMinute += 60
    for (let i = 0; i < nowMinute; i++) {
        cy.get(`.pdp-time .pdp-moment > div:${child}-child .minute button:first-child`).click()
    }
})