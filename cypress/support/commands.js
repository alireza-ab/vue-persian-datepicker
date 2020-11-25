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
    cy.contains('10').click()
})

Cypress.Commands.add('selectRangeDate', () => {
    cy.get('.pdp-input').focus()
    cy.contains('10').click()
    cy.contains('15').click()
})