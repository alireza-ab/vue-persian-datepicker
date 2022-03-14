/// <reference types="Cypress" />

const types = ["date", "time", "datetime"];

describe("focus", () => {
	beforeEach(() => {
		cy.changeProps("from", undefined);
		cy.changeProps("to", undefined);
		cy.changeSlots();
	});

	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-input").focus();
			cy.get(".status").should("contain.text", "focus");
		});
	}
});

describe("open", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-input").focus();
			cy.get(".status").should("contain.text", "open");
		});
	}
});

describe("blur", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-input").focus();
			cy.get(".pdp-overlay").click({ force: true });
			cy.get(".status").should("contain.text", "blur");
		});
	}
});

describe("close", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-input").focus();
			cy.get(".pdp-overlay").click({ force: true });
			cy.get(".status").should("contain.text", "close");
		});
	}
});

describe("input", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-input").type("1");
			cy.get(".status").should("contain.text", "input");
		});
	}
});

describe("select & submit", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("type", types[i]);
			cy.visit("/");
			if (types[i] == "date") {
				cy.get(".pdp-input").type("1399/06/01{enter}");
				cy.get(".status").should("contain.text", "select:1399/06/01");
				cy.get(".pdp-input").type("1399/06/02{enter}");
				cy.get(".status").should("contain.text", "select:1399/06/02");
				cy.get(".status").should(
					"contain.text",
					"submit:1399/06/01,1399/06/02"
				);
			} else if (types[i] == "time") {
				cy.get(".pdp-input").type("15:12{enter}");
				cy.get(".status").should("contain.text", "select:15:12");
				cy.get(".pdp-input").type("20:18{enter}");
				cy.get(".status").should("contain.text", "select:20:18");
				cy.get(".status").should("contain.text", "submit:15:12,20:18");
			} else if (types[i] == "datetime") {
				cy.get(".pdp-input").type("1399/06/01 20:18{enter}");
				cy.get(".status").should("contain.text", "select:1399/06/01 20:18");
				cy.get(".pdp-input").type("1399/06/02 15:12{enter}");
				cy.get(".status").should("contain.text", "select:1399/06/02 15:12");
				cy.get(".status").should(
					"contain.text",
					"submit:1399/06/01 20:18,1399/06/02 15:12"
				);
			}
		});
	}
});

describe("clear", () => {
	for (let i = 0; i < types.length; i++) {
		it(`${types[i]} type`, () => {
			cy.changeProps("clearable", true);
			cy.changeProps("type", types[i]);
			cy.visit("/");
			cy.get(".pdp-clear").click();
			cy.get(".status").should("contain.text", "clear");
		});
	}
});
