/// <reference types="Cypress" />

import PersianDate from "@alireza-ab/persian-date";

const date = new PersianDate([2021, 3, 30, 12]);

beforeEach(() => {
	cy.clock(new Date(2021, 2, 30, 12));
});

describe("shortcut prop", () => {
	before(() => {
		cy.changeProps("shortcut", true, true);
		cy.changeSlots();
	});

	it("date - range", () => {
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("این هفته")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("هفته قبل")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("هفته بعد")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ماه قبل")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ماه بعد")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("این ماه")
			.should("exist")
			.click();
		cy.get(".pdp-input").should(
			"have.value",
			`${date
				.clone()
				.startOf("month")
				.toString()} - ${date
				.clone()
				.endOf("month")
				.toString()}`
		);
	});

	it("date - range in en locale", () => {
		cy.changeProps("locale", "en");
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("This Week")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("Previous Week")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("Next Week")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("Previous Month")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("Next Month")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("This Month")
			.should("exist")
			.click();
		cy.get(".pdp-input").should(
			"have.value",
			`${date
				.clone()
				.calendar("gregorian")
				.startOf("month")
				.toString()} - ${date
				.clone()
				.calendar("gregorian")
				.endOf("month")
				.toString()}`
		);
	});

	it("date - single", () => {
		cy.changeProps({ locale: "fa", mode: "single" });
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("هم اکنون")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("دیروز")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("اول هفته")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("آخر هفته")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("فردا")
			.should("exist")
			.click();
		cy.get(".pdp-input").should(
			"have.value",
			date
				.clone()
				.addDay()
				.toString()
		);
	});

	it("datetime - single", () => {
		cy.changeProps({ type: "datetime", mode: "single" });
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("هم اکنون")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("دیروز")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("فردا")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("اول هفته")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("آخر هفته")
			.should("exist")
			.click();

		cy.get(".pdp-input").should(
			"have.value",
			date
				.clone()
				.endOf("week")
				.toString("datetime")
		);
	});

	it("datetime - range", () => {
		cy.changeProps("mode", "range");
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("این هفته")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("هفته قبل")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("این ماه")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ماه قبل")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ماه بعد")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("هفته بعد")
			.should("exist")
			.click();

		cy.get(".pdp-input").should(
			"have.value",
			`${date
				.clone()
				.addWeek()
				.startOf("week")
				.toString("datetime")} - ${date
				.clone()
				.addWeek()
				.endOf("week")
				.toString("datetime")}`
		);
	});

	it("time - range", () => {
		cy.changeProps("type", "time");
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("این ساعت")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ساعت بعد")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("تمام روز")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("ساعت قبل")
			.should("exist")
			.click();

		cy.get(".pdp-input").should(
			"have.value",
			`${date
				.clone()
				.subHour()
				.startOf("hour")
				.toString("time")} - ${date
				.clone()
				.subHour()
				.endOf("hour")
				.toString("time")}`
		);
	});

	it("time - single", () => {
		cy.changeProps("mode", "single");
		cy.visit("/");
		cy.get(".pdp-input").focus();
		cy.get(".pdp-shortcut")
			.should("exist")
			.contains("یک ساعت قبل")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("یک ساعت بعد")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("نیمه شب")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("نیمروز")
			.should("exist")
			.get(".pdp-shortcut")
			.contains("هم اکنون")
			.should("exist")
			.click();

		cy.get(".pdp-input").should("have.value", date.clone().toString("time"));
	});

	it("custom shortcut - range", () => {
		const stringDates = ["1400/01/10", "1400/01/20"];
		const persianDates = [
			date
				.clone()
				.subDay(2)
				.toString(),
			date
				.clone()
				.addDay(2)
				.toString(),
		];
		cy.changeProps({
			shortcut: {
				String: stringDates,
				PersianDate: persianDates,
			},
			type: "date",
			mode: "range",
		});
		cy.visit("/");
		cy.get(".pdp-input")
			.focus()
			.get(".pdp-shortcut")
			.contains("String")
			.click();
		cy.get(".pdp-input")
			.should("have.value", stringDates.join(" - "))
			.focus()
			.get(".pdp-shortcut")
			.contains("PersianDate")
			.click();
		cy.get(".pdp-input").should("have.value", persianDates.join(" - "));
	});

	it("custom shortcut - single", () => {
		const stringDates = ["1400/01/10"];
		const persianDates = [
			date
				.clone()
				.subDay(2)
				.toString(),
		];
		cy.changeProps({
			shortcut: {
				String: stringDates,
				PersianDate: persianDates,
			},
			mode: "single",
		});
		cy.visit("/");
		cy.get(".pdp-input")
			.focus()
			.get(".pdp-shortcut")
			.contains("String")
			.click();
		cy.get(".pdp-input")
			.should("have.value", stringDates[0])
			.focus()
			.get(".pdp-shortcut")
			.contains("PersianDate")
			.click();
		cy.get(".pdp-input").should("have.value", persianDates[0]);
	});

	it("date - single with disable", () => {
		cy.changeProps({
			shortcut: true,
			from: date
				.clone()
				.addDay()
				.toString(),
			to: date
				.clone()
				.endOf("month")
				.toString(),
			disable: date
				.clone()
				.addDay()
				.toString(),
		});
		cy.visit("/");
		cy.get(".pdp-input")
			.focus()
			.get(".pdp-shortcut")
			.should("have.length", 1)
			.contains("آخر هفته")
			.click();
		cy.get(".pdp-input").should(
			"have.value",
			date
				.clone()
				.endOf("week")
				.toString()
		);
	});
});
