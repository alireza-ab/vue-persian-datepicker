<template>
	<div
		:class="[
			'pdp',
			{ 'pdp-range': mode === 'range' },
			{ 'pdp-modal': modal },
			langs[currentLocale].dir.input,
		]"
	>
		<slot name="before">
			<label v-if="label" :for="attrs.input.id" class="pdp-label">
				{{ label }}
			</label>
		</slot>
		<div :class="divClass">
			<div
				:class="[
					'pdp-icon',
					{ 'pdp-pointer': ['all', 'icon'].includes(clickOn) },
				]"
				@click="showPicker('icon')"
			>
				<slot name="icon">
					<calendar-icon width="20" height="20"></calendar-icon>
				</slot>
			</div>
			<input
				type="text"
				autocomplete="off"
				ref="pdpInput"
				v-model="displayValue"
				:class="inputClass"
				v-bind="attrs.input"
				v-on="$listeners"
				@focus="showPicker('input')"
				@keydown="selectWithArrow"
			/>
			<div v-if="attrs.alt.name" class="d-none">
				<div v-if="attrs.alt.name.endsWith('[]')">
					<input
						v-for="(date, i) in selectedDates"
						:key="i"
						type="hidden"
						:name="attrs.alt.name"
						:value="date.toString(attrs.alt.format || format)"
					/>
				</div>
				<input
					v-else
					type="hidden"
					:name="attrs.alt.name"
					:value="
						selectedDates.map((date) =>
							date.toString(attrs.alt.format || format)
						)
					"
				/>
			</div>
			<button class="pdp-clear" type="button" @click="clear" v-if="clearable">
				<slot name="close">
					<close-icon></close-icon>
				</slot>
			</button>
		</div>
		<slot name="after"></slot>
		<div v-if="showDatePicker">
			<div class="pdp-overlay" @click="showDatePicker = false"></div>
			<div
				:class="[
					'pdp-picker',
					{ 'pdp-top': showTopOfInput },
					langs[currentLocale].dir.picker,
				]"
			>
				<ul class="pdp-select-month" v-show="showMonthSelect">
					<li
						v-for="(month, index) in months"
						:key="index"
						:class="[
							{ selected: month.selected },
							{ disabled: month.disabled },
						]"
						@click="changeSelectedMonth(index)"
					>
						{{ month.label }}
					</li>
				</ul>
				<ul class="pdp-select-year" v-show="showYearSelect" ref="pdpSelectYear">
					<li
						v-for="(year, index) in years"
						:key="index"
						:class="{ selected: onDisplay.year() == year }"
						@click="changeSelectedYear(year)"
					>
						{{ year }}
					</li>
				</ul>
				<div class="pdp-header">
					<div class="top" v-if="locale.includes(',')">
						<div>{{ lang.translations.text }}</div>
						<button
							type="button"
							@click="changeLocale"
							:tabindex="+attrs.input.tabindex + 1 || undefined"
						>
							{{ nextLocale }}
						</button>
					</div>
					<div class="bottom">
						<button
							tabindex="-1"
							type="button"
							:class="[
								'pdp-arrow',
								{
									disabled: !checkDate(onDisplay.clone().subMonth(), 'month'),
								},
							]"
							:title="lang.translations.prevMonth"
							@click="changeSelectedMonth('sub')"
						>
							<slot name="right-arrow">
								<arrow-icon
									direction="right"
									width="10"
									height="10"
									:inverse="langs[currentLocale].dir.picker == 'ltr'"
								></arrow-icon>
							</slot>
						</button>
						<div>
							<div v-for="(item, i) in columnCount" :key="i">
								<button
									@click="showPart('month')"
									class="pdp-month"
									type="button"
									tabindex="-1"
								>
									{{
										months[
											onDisplay
												.clone()
												.addMonth(i)
												.month()
										].label
									}}
								</button>
								<button
									type="button"
									@click="showPart('year')"
									class="pdp-year"
									tabindex="-1"
								>
									{{
										onDisplay
											.clone()
											.addMonth(i)
											.year()
									}}
								</button>
							</div>
						</div>
						<button
							tabindex="-1"
							type="button"
							:class="[
								'pdp-arrow',
								{ disabled: !checkDate(onDisplay.clone().addMonth(), 'month') },
							]"
							:title="lang.translations.nextMonth"
							@click="changeSelectedMonth('add')"
						>
							<slot name="left-arrow">
								<arrow-icon
									direction="left"
									width="10"
									height="10"
									:inverse="langs[currentLocale].dir.picker == 'ltr'"
								></arrow-icon>
							</slot>
						</button>
					</div>
				</div>

				<div class="pdp-main" ref="pdpMain">
					<div
						class="pdp-column"
						v-for="(item, i) in columnCount"
						:key="i"
						:data-column="i"
					>
						<div class="pdp-week">
							<div
								class="pdp-weekday"
								v-for="(weekday, index) in langs[currentLocale].weekdays"
								:key="index"
							>
								{{ weekday }}
							</div>
						</div>
						<div class="pdp-days">
							<div v-for="(week, wIndex) in monthDays[i]" :key="wIndex">
								<div
									v-for="day in week"
									:key="day.key"
									:class="[
										'pdp-day',
										{ empty: day.empty },
										{ friday: day.friday },
										{ today: day.today },
										{ 'start-range': day.startRange },
										{ 'end-range': day.endRange },
										{ disabled: day.disabled },
										{ 'in-range': day.inRange },
									]"
									@click="selectDate(day.val, i)"
									:value="day.val"
								>
									{{ day.val }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="pdp-footer">
					<div>
						<slot name="footer"></slot>
						<small v-if="selectedDates.length">
							{{ selectedDates[0].toString(displayFormat) }}
						</small>
						<small v-if="selectedDates.length == 2">
							- {{ selectedDates[1].toString(displayFormat) }}
						</small>
					</div>
					<div>
						<button
							v-if="this.checkDate(this.core)"
							type="button"
							class="pdp-today"
							@click="goToToday"
							:tabindex="+attrs.input.tabindex + 1 || undefined"
						>
							{{ lang.translations.today }}
						</button>
						<button
							v-if="!autoSubmit"
							type="button"
							class="pdp-submit"
							@click="submitDate"
							:tabindex="+attrs.input.tabindex + 1 || undefined"
						>
							{{ lang.translations.submit }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//TODO: alt field
	//TODO: add select time
	//TODO: add attrs for div and other elements
	//TODO: add props for disable some dates
	//TODO: change node-sass to sass
	//TODO: add styles and colors
	//TODO: add two input for range
	//TODO: do better the select with arrows
	//TODO: when the date select with type focus on date that selected and clear the input
	//TODO: move the before and after slots to group div --> if this is better
	//TODO: instead of start Range and endRange use array
	//TODO: add nuxt support - locale and clearable prop - close slot in doc
	//TODO: change "change event" to "submit event" in doc
	//TODO: refactor and write comment

	// Core
	import PersianDate from "@alireza-ab/persian-date/src/PersianDate";
	import { CALENDAR } from "@alireza-ab/persian-date/src/utils";
	// components
	import arrowIcon from "./utils/ArrowIcon.vue";
	import calendarIcon from "./utils/CalendarIcon.vue";
	import closeIcon from "./utils/CloseIcon.vue";

	export { PersianDate };
	export default {
		name: "DatePicker",
		inheritAttrs: false,
		components: {
			arrowIcon,
			calendarIcon,
			closeIcon,
		},
		props: {
			/**
			 * the format of the model value
			 * @default "YYYY-MM-DD"
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 */
			format: {
				default: "YYYY-MM-DD",
				type: String,
			},

			/**
			 * the format of the input value
			 * @default "date"
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 */
			inputFormat: {
				default: "date",
				type: String,
			},

			/**
			 * the format of the value that shows in the footer of picker
			 * @default "jD jMMMM"
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 */
			displayFormat: {
				default: "jD jMMMM",
				type: String,
			},

			/**
			 * the date of start of the picker
			 * @default "1300"
			 * @type String
			 * @example 1400/7/1 | 1400-7
			 */
			from: {
				default: "1300",
				type: String,
			},

			/**
			 * the date of end of the picker
			 * @default "1500"
			 * @type String
			 * @example 1400/7/1 | 1400-7
			 */
			to: {
				default: "1500",
				type: String,
			},

			/**
			 * show or hide the picker
			 * @default false
			 * @type Boolean
			 */
			show: {
				default: false,
				type: Boolean,
			},

			/**
			 * show the picker with click on the some sections
			 * @default "all"
			 * @type String
			 * @values all | input | icon | none
			 */
			clickOn: {
				default: "all",
				type: String,
			},

			/**
			 * the classes for the div parent of input
			 * @default "pdp-group"
			 * @type String
			 */
			divClass: {
				default: "pdp-group",
				type: String,
			},

			/**
			 * the classes for the input
			 * @default "pdp-input"
			 * @type String
			 */
			inputClass: {
				default: "pdp-input",
				type: String,
			},

			/**
			 * show the picker in modal mode
			 * @default true
			 * @type Boolean
			 */
			modal: {
				default: false,
				type: Boolean,
			},

			/**
			 * text for label tag
			 * @default Null
			 * @type String
			 */
			label: {
				type: String,
			},

			/**
			 * number of column
			 * @default "{ 576: 1 }"
			 * @type Object | Number
			 * @desc 1. you can send the number of column
			 *  	or send the object of the number of
			 *  	column in the breakpoint.
			 * 		2. if the breaking point in the object
			 * 		is not specified, the default value it's 2
			 */
			column: {
				default: () => {
					return { 576: 1 };
				},
				type: [Number, Object],
			},

			/**
			 * submit when date selected or not
			 * @default true
			 * @type Boolean
			 */
			autoSubmit: {
				default: true,
				type: Boolean,
			},

			/**
			 * mode of select date
			 * @default "range"
			 * @type String
			 * @values range | single
			 */
			mode: {
				default: "range",
				type: String,
			},

			/**
			 * the locale of datepicker
			 * @default "fa"
			 * @type String
			 * @values fa | en | fa,en
			 */
			locale: {
				default: "fa",
				type: String,
			},

			/**
			 * The user can clear the selected dates or not
			 * @default false
			 * @type Boolean
			 */
			clearable: {
				default: false,
				type: Boolean,
			},
		},
		model: {
			prop: "value",
			event: "setDate",
		},
		watch: {
			show(val) {
				this.showDatePicker = val;
			},
			showDatePicker(val) {
				if (val) this.$emit("open");
				else {
					if (!this.modal) document.removeEventListener("scroll", this.locate);
					this.$emit("close");
				}
			},
		},
		data() {
			return {
				core: new PersianDate(),
				showDatePicker: this.show,
				showTopOfInput: false,
				showMonthSelect: false,
				showYearSelect: false,
				onDisplay: "",
				selectedDates: [],
				startRange: "",
				endRange: "",
				fromDate: new PersianDate().parse(this.from),
				toDate: new PersianDate().parse(this.to),
				displayValue: "",
				documentWidth: this.$isServer ? 0 : window.innerWidth,
				langs: {
					//TODO: send to utils folder
					fa: {
						calendar: "jalali",
						weekdays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
						months: [
							"فروردین",
							"اردیبهشت",
							"خرداد",
							"تیر",
							"مرداد",
							"شهریور",
							"مهر",
							"آبان",
							"آذر",
							"دی",
							"بهمن",
							"اسفند",
						],
						dir: {
							input: "rtl",
							picker: "rtl",
						},
						translations: {
							label: "شمسی",
							text: "تقویم شمسی",
							prevMonth: "ماه قبل",
							nextMonth: "ماه بعد",
							today: "امروز",
							submit: "تایید",
						},
					},
					en: {
						calendar: "gregorian",
						weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
						months: [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						],
						dir: {
							input: "rtl",
							picker: "ltr",
						},
						translations: {
							label: "میلادی",
							text: "Gregorian Calendar",
							prevMonth: "prev Month",
							nextMonth: "next Month",
							today: "Today",
							submit: "Submit",
						},
					},
				},
				currentLocale: this.locale.split(",")[0],
			};
		},
		computed: {
			attrs() {
				let attrs = {
					div: {},
					label: {},
					alt: {},
					input: {},
				};
				let $attrs = { ...this.$attrs };
				delete $attrs.value;
				for (const key in $attrs) {
					//FIXME: change to switch
					if (key.startsWith("label-"))
						attrs.label[key.replace("label-", "")] = $attrs[key];
					else if (key.startsWith("alt-"))
						attrs.alt[key.replace("alt-", "")] = $attrs[key];
					else if (key.startsWith("div-"))
						attrs.div[key.replace("div-", "")] = $attrs[key];
					else attrs.input[key.replace("input-", "")] = $attrs[key];
				}
				return attrs;
				// let attrs = { ...this.$attrs };
				// delete attrs.value;
				// return attrs;
			},
			years() {
				let years = [];
				for (
					let startYear = this.fromDate.year();
					startYear <= this.toDate.year();
					startYear++
				) {
					years.push(startYear);
				}
				return years;
			},
			monthDays() {
				let months = [];
				for (let i = 0; i < this.columnCount; i++) {
					let emptyCells;
					let selectedYear = this.onDisplay
						.clone()
						.addMonth(i)
						.year();
					let selectedMonth = this.onDisplay
						.clone()
						.addMonth(i)
						.month();
					emptyCells = +this.onDisplay
						.clone()
						.parse(selectedYear, selectedMonth, 1)
						.toString(this.lang.calendar == "jalali" ? "jd" : "d");
					let daysOfMonthNumber = this.onDisplay.getDaysInMonth(
						selectedYear,
						selectedMonth
					);
					let numberOfWeek = Math.ceil((daysOfMonthNumber + emptyCells) / 7);
					let month = [];
					let showDay = 1;
					for (let week = 0; week < numberOfWeek; week++) {
						month[week] = [];
						for (let day = 0; day < 7; day++) {
							if (emptyCells) {
								month[week][day] = { empty: true };
								--emptyCells;
							} else if (daysOfMonthNumber) {
								//FIXME: refactor
								month[week][day] = {
									friday: day == 6,
									key: this.onDisplay
										.clone()
										.addMonth(i)
										.date(showDay)
										.toString(),
									startRange:
										this.selectedDates.length &&
										this.selectedDates[0].isSame(
											selectedYear,
											selectedMonth,
											showDay
										),
									endRange:
										this.selectedDates.length == 2 &&
										this.selectedDates[1].isSame(
											selectedYear,
											selectedMonth,
											showDay
										),
									inRange:
										this.selectedDates.length == 2 &&
										this.core
											.clone()
											.parse(selectedYear, selectedMonth, showDay)
											.isBetween(...this.selectedDates),
									// this.selectedDates[0].isBefore(
									// 	selectedYear,
									// 	selectedMonth,
									// 	showDay
									// ) &&
									// this.selectedDates[1].isAfter(
									// 	selectedYear,
									// 	selectedMonth,
									// 	showDay
									// ),
									disabled: !this.checkDate(
										this.onDisplay
											.clone()
											.addMonth(i)
											.date(showDay),
										"date"
									),
									today: this.core
										.clone()
										.isSame(selectedYear, selectedMonth, showDay),
									val: showDay++,
								};
								--daysOfMonthNumber;
							} else month[week][day] = { empty: true };
						}
					}
					months.push(month);
				}
				return months;
			},
			months() {
				let months = {};
				for (let i = 1; i <= 12; i++) {
					months[i] = {
						label: this.lang.months[i - 1],
						selected: this.onDisplay.month() == i,
						disabled: !this.checkDate(this.onDisplay.clone().month(i), "month"),
					};
				}
				return months;
			},
			columnCount() {
				if (typeof this.column == "number") return this.column;
				let column;
				Object.keys(this.column)
					.sort((a, b) => a - b)
					.some((breakpoint) => {
						if (this.documentWidth <= breakpoint)
							return (column = this.column[breakpoint]);
					});
				return column || 2;
			},
			lang() {
				return this.langs[this.currentLocale];
			},
			nextLocale() {
				let locales = this.locale.split(",");
				let index = locales.indexOf(this.currentLocale);
				let locale = locales[index + 1] || locales[0];
				return this.langs[locale].translations.label;
			},
		},
		async mounted() {
			let calendar = this.lang.calendar;
			this.core.calendar(calendar);
			this.fromDate.calendar(calendar);
			this.toDate.calendar(calendar);
			let val = this.$attrs.value;
			if (val && this.checkDate(val)) {
				//FIXME: read from val and set (single and range)
				this.$set(this.selectedDates, 0, this.core.clone().parse(val));
				// this.selectedDates[0] = this.core.clone().parse(val);
				this.onDisplay = this.selectedDates[0].clone();
				this.setModel();
			} else {
				this.setModel();
				let today = this.core.clone().startOf("date");
				if (await this.checkDate(today.toString())) {
					this.onDisplay = today;
				} else {
					this.onDisplay = this.nearestDate(today);
				}
			}
			window.addEventListener("resize", () => {
				this.documentWidth = window.innerWidth;
			});
		},
		methods: {
			showPart(part) {
				if (part == "year") {
					this.showYearSelect = !this.showYearSelect;
					if (this.showYearSelect) {
						this.$nextTick(() => {
							let selectedYearTop = this.$refs.pdpSelectYear.querySelector(
								"li.selected"
							).offsetTop;
							this.$refs.pdpSelectYear.scroll({
								top: selectedYearTop,
								behavior: "smooth",
							});
						});
					}
				} else if (part == "month") {
					this.showMonthSelect = !this.showMonthSelect;
				}
			},
			changeSelectedMonth(month) {
				let clone = this.onDisplay.clone();
				if (month == "add") {
					this.onDisplay.addMonth();
				} else if (month == "sub") {
					this.onDisplay.subMonth();
				} else this.onDisplay.month(month);
				if (this.checkDate(this.onDisplay, "month"))
					this.showMonthSelect = false;
				else this.onDisplay = clone;
			},
			changeSelectedYear(year) {
				this.onDisplay.year(year);
				if (!this.checkDate(this.onDisplay))
					this.onDisplay = this.nearestDate(this.onDisplay);
				this.showYearSelect = false;
			},
			selectDate(date, column) {
				let onDisplay = this.onDisplay
					.clone()
					.addMonth(column || 0)
					.date(date);
				if (date) {
					onDisplay.startOf("date");
					if (this.mode === "range") {
						if (this.selectedDates.length == 2) {
							this.$set(this.selectedDates, 0, onDisplay);
							// this.selectedDates[0] = onDisplay;
							this.$delete(this.selectedDates, 1);
							// this.selectedDates[1] = "";
						} else if (this.selectedDates.length) {
							if (!onDisplay.isBefore(this.selectedDates[0].toString()))
								this.$set(this.selectedDates, 1, onDisplay);
							// this.selectedDates[1] = onDisplay;
							else this.$set(this.selectedDates, 0, onDisplay);
							// this.selectedDates[0] = onDisplay;
						} else this.$set(this.selectedDates, 0, onDisplay);
						// this.selectedDates[0] = onDisplay;
					} else this.$set(this.selectedDates, 0, onDisplay);
					// this.selectedDates[0] = onDisplay;
				} else if (this.displayValue) {
					if (this.mode === "range" && this.selectedDates.length) {
						// let endRangeDate = this.displayValue.replace(
						// 	this.selectedDates[0].toString(this.inputFormat) + " - ",
						// 	""
						// );
						date = this.core.clone().parse(this.displayValue);
						if (date.isValid() && this.checkDate(date)) {
							let diff = date.diff(this.onDisplay, "month");
							if (diff < 0 || diff >= this.columnCount)
								this.onDisplay = date.clone();
							this.$set(this.selectedDates, 1, date.clone());
							this.displayValue = "";
							// // this.selectedDates[1] = date;
							// this.submitDate(false);
						}
					} else {
						date = this.core.clone().parse(this.displayValue);
						if (date.isValid() && this.checkDate(date)) {
							let diff = date.diff(this.onDisplay, "month");
							if (diff < 0 || diff >= this.columnCount)
								this.onDisplay = date.clone();
							this.$set(this.selectedDates, 0, date.clone());
							this.displayValue = "";
							// // this.selectedDates[0] = date;
							// this.submitDate(false);
						}
					}
				} else this.$delete(this.selectedDates, 0);
				// this.selectedDates[0] = "";
				if (!this.checkDate(this.selectedDates[0], "date"))
					return this.$delete(this.selectedDates, 0);
				// (this.selectedDates[0] = "");
				else if (
					this.autoSubmit &&
					(this.mode !== "range" ||
						(this.mode === "range" && this.selectedDates.length == 2))
				) {
					this.submitDate();
				}
				if (date) {
					this.$emit("select", onDisplay);
					if (this.mode === "range" && this.selectedDates.length != 2) {
						this.$refs.pdpMain.addEventListener(
							"mouseover",
							this.selectInRangeDate
						);
					} else if (this.selectedDates.length == 2) {
						this.$refs.pdpMain.removeEventListener(
							"mouseover",
							this.selectInRangeDate
						);
					}
				}
			},
			setModel(date) {
				this.$emit("setDate", date);
			},
			goToToday() {
				this.showMonthSelect = this.showYearSelect = false;
				this.onDisplay = this.core.clone();
				this.$nextTick(() => {
					document.querySelector(".pdp-day.today").classList.add("tada");
				});
				setTimeout(() => {
					document.querySelector(".pdp-day.today").classList.remove("tada");
				}, 1000);
			},
			checkDate(date, part) {
				let from, to;
				if (part == "year") {
					let format = this.lang.calendar == "jalali" ? "jYYYY" : "YYYY";
					from = this.fromDate.toString(format);
					to = this.toDate.toString(format);
				} else if (part == "month") {
					let format = this.lang.calendar == "jalali" ? "jYYYY/jMM" : "YYYY/MM";
					from = this.fromDate.toString(format);
					to = this.toDate.toString(format);
				} else {
					from = this.fromDate.toString();
					to = this.toDate.toString();
				}
				return this.core
					.clone()
					.parse(date)
					.isBetween(from, to, "[]");
			},
			showPicker(el) {
				if (this.clickOn == "all" || this.clickOn == el) {
					this.$refs.pdpInput.focus();
					this.showDatePicker = true;
					if (!this.modal) {
						this.$nextTick(() => {
							this.locate();
						});
						document.addEventListener("scroll", this.locate);
					}
				}
			},
			async selectWithArrow(e) {
				// [37, 38, 39, 40] are key codes of arrow keys
				if ([37, 38, 39, 40].includes(e.keyCode)) {
					let arrow = {
						37: 1, // for left arrow must one day add in rtl picker
						38: -7, // for up arrow must seven day subtract in rtl picker
						39: -1, // for right arrow must one day subtract in rtl picker
						40: 7, // for down arrow must seven day add in rtl picker
					};
					let numberOfDay = arrow[e.keyCode];
					if (this.lang.dir.picker == "ltr" && [37, 39].includes(e.keyCode))
						numberOfDay = -numberOfDay;
					let focusedDay = document.querySelectorAll(".pdp .pdp-day.hover");
					if (!focusedDay.length) {
						focusedDay = document.querySelectorAll(
							".pdp .pdp-day.start-range,.pdp .pdp-day.end-range"
						);
					}
					focusedDay = focusedDay[focusedDay.length - 1];
					if (focusedDay) {
						let column = this.getColumn(focusedDay);
						focusedDay.classList.remove("hover");
						let firstColumnMonth = this.onDisplay.toString();
						let focusedMonth = this.onDisplay.clone().addMonth(column);
						let nextElementValue = focusedMonth
							.date(focusedDay.innerText)
							.addDay(numberOfDay);
						if (!this.checkDate(nextElementValue))
							return focusedDay.classList.add("hover");
						nextElementValue = nextElementValue.date();
						column = focusedMonth.diff(firstColumnMonth, "month");
						if (column < 0) {
							this.onDisplay.subMonth(this.columnCount);
							column = this.columnCount - 1;
						} else if (column >= this.columnCount) {
							this.onDisplay.addMonth(this.columnCount);
							column = 0;
						}
						await this.$nextTick(() => {
							focusedDay = document.querySelector(
								`.pdp .pdp-main .pdp-column[data-column='${column}'] .pdp-day[value='${nextElementValue}']`
							);
							focusedDay.classList.add("hover");
						});
					} else {
						focusedDay = document.querySelector(
							".pdp .pdp-day:not(.empty):not(.disabled)"
						);
						if (focusedDay) focusedDay.classList.add("hover");
						else if ([37, 39].includes(e.keyCode)) {
							this.onDisplay.addMonth(numberOfDay);
						}
					}
					if (this.mode === "range" && this.selectedDates.length == 1) {
						this.selectInRangeDate({ target: focusedDay });
					}
				} else if (e.keyCode == 13) {
					e.preventDefault();
					// 13 is key code of Enter key
					let focusedDay = document.querySelector(".pdp .pdp-day.hover");
					if (focusedDay)
						this.selectDate(focusedDay.innerText, this.getColumn(focusedDay));
					else this.selectDate();
				}
			},
			selectInRangeDate({ target }) {
				if (!target.classList.contains("pdp-day")) return;
				let column = this.getColumn(target);
				let date = target.innerText;
				document.querySelectorAll(`.pdp .pdp-day`).forEach((el) => {
					el.classList.remove("in-range");
				});
				let onDisplay;
				columnLoop: for (let i = column; i >= 0; i--) {
					onDisplay = this.onDisplay
						.clone()
						.addMonth(i)
						.date(date);
					if (onDisplay.isAfter(this.selectedDates[0].toString())) {
						for (let j = +date; j > 0; j--) {
							if (this.checkDate(onDisplay.date(j))) {
								target = document.querySelector(
									`.pdp .pdp-main .pdp-column[data-column='${i}'] .pdp-day[value='${j}']:not(.start-range)`
								);
								if (target) target.classList.add("in-range");
								else break columnLoop;
							}
						}
						date = this.onDisplay
							.clone()
							.addMonth(i - 1)
							.getDaysInMonth();
					}
				}
			},
			submitDate(close = true) {
				let date, displayDate;
				// if (this.mode !== "range") {
				// 	displayDate = this.selectedDates[0].toString(this.inputFormat);
				// 	date = this.selectedDates[0].toString(this.format);
				// } else {
				displayDate = this.selectedDates.map((el) => {
					return el.toString(this.inputFormat);
				});
				date = this.selectedDates.map((el) => {
					return el.toString(this.format);
				});
				// [
				// 	this.selectedDates[0].toString(this.format),
				// 	this.selectedDates[1].toString(this.format),
				// ];
				// }
				this.displayValue = displayDate.join(" - ");
				this.setModel(date);
				if (close) {
					this.$emit(
						"submit",
						this.mode === "range" ? this.selectedDates : this.selectedDates[0]
					);
					this.showDatePicker = false;
				}
			},
			getColumn({ parentNode }) {
				return parentNode.parentNode.parentNode.dataset.column;
			},
			nearestDate(date) {
				return Math.abs(date.diff(this.fromDate)) <=
					Math.abs(date.diff(this.toDate))
					? this.fromDate.clone()
					: this.toDate.clone();
			},
			locate() {
				let input = this.$refs.pdpInput;
				let inputOffset =
					input.offsetHeight + input.getBoundingClientRect().top;
				let picker = document.querySelector(".pdp-picker");
				let pickerOffset = picker.offsetHeight + 10;
				if (inputOffset < pickerOffset) this.showTopOfInput = false;
				else if (window.innerHeight - (inputOffset + pickerOffset) < 0)
					this.showTopOfInput = true;
			},
			changeLocale() {
				let locales = this.locale.split(",");
				let index = locales.indexOf(this.currentLocale);
				this.currentLocale = locales[index + 1] || locales[0];
				let calendar = this.lang.calendar;
				this.core.calendar(calendar);
				this.fromDate.calendar(calendar);
				this.toDate.calendar(calendar);
				this.onDisplay.calendar(calendar);
				for (let i = 0; i < this.selectedDates.length; i++) {
					this.selectedDates[i].calendar(calendar);
				}
				// if (this.selectedDates[0]) this.selectedDates[0].calendar(calendar);
				// if (this.selectedDates[1]) this.selectedDates[1].calendar(calendar);
			},
			clear() {
				this.displayValue = "";
				this.$emit("setDate", "");
			},
		},
	};
</script>

<style lang="scss">
	@import "./assets/sass/app.scss";
</style>
