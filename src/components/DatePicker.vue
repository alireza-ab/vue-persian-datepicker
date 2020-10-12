<template>
	<div
		:class="['pdp', 'pdp-fa', { 'pdp-range': range }, { 'pdp-modal': modal }]"
	>
		<slot name="before">
			<label v-if="label" :for="attrs.id" class="pdp-label">
				{{ label }}
			</label>
		</slot>
		<div :class="divClass">
			<slot name="icon">
				<div
					:class="[
						'pdp-icon',
						{ 'pdp-pointer': ['all', 'icon'].includes(clickOn) },
					]"
					@click="showPicker('icon')"
				>
					<calendar-icon width="20" height="20"></calendar-icon>
				</div>
			</slot>
			<input
				:class="inputClass"
				type="text"
				autocomplete="off"
				v-bind="attrs"
				v-on="$listeners"
				@focus="showPicker('input')"
				v-model="displayValue"
				@keydown="selectWithArrow"
			/>
		</div>
		<slot name="after"></slot>
		<div v-if="showDatePicker">
			<div class="pdp-overlay" @click="showDatePicker = false"></div>
			<div class="pdp">
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
				<ul class="pdp-select-year" v-show="showYearSelect">
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
					<button
						tabindex="-1"
						:class="[
							'pdp-arrow',
							{
								disabled: !checkDate(
									onDisplay.clone().subtractMonth(),
									'month'
								),
							},
						]"
						title="ماه قبل"
						@click="changeSelectedMonth('subtract')"
					>
						<slot name="right-arrow">
							<arrow-icon direction="right" width="10" height="10"></arrow-icon>
						</slot>
					</button>
					<div>
						<div v-for="(item, i) in columnCount" :key="i">
							<button
								@click="showPart('month')"
								class="pdp-month"
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
							<button @click="showPart('year')" class="pdp-year" tabindex="-1">
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
						:class="[
							'pdp-arrow',
							{ disabled: !checkDate(onDisplay.clone().addMonth(), 'month') },
						]"
						title="ماه بعد"
						@click="changeSelectedMonth('add')"
					>
						<slot name="left-arrow">
							<arrow-icon direction="left" width="10" height="10"></arrow-icon>
						</slot>
					</button>
				</div>

				<div class="pdp-main">
					<div
						class="pdp-month"
						v-for="(item, i) in columnCount"
						:key="i"
						:data-column="i"
					>
						<div class="pdp-week">
							<div
								class="pdp-weekday"
								v-for="(weekday, index) in weekdays"
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
						<slot name="startRange"></slot>
						<small v-if="startRange">
							{{ startRange.toString(displayFormat) }}
						</small>
						<small v-if="endRange">
							- {{ endRange.toString(displayFormat) }}
						</small>
					</div>
					<div>
						<button
							class="pdp-today"
							@click="goToToday()"
							:tabindex="+attrs.tabindex + 1 || undefined"
						>
							امروز
						</button>
						<button
							v-if="!autoSubmit"
							class="pdp-submit"
							@click="submitDate"
							:tabindex="+attrs.tabindex + 1 || undefined"
						>
							تایید
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//TODO: alt field
	//TODO: set model in range --> refactor
	//TODO: add select time
	//TODO: add attrs for div and other elements
	//TODO: add props for disable some dates
	//TODO: add clearable props
	//TODO: add close button for months and years
	//TODO: add resize function
	//TODO: test in all browser
	//TODO: add style must be optional
	//TODO: change range prop to mode
	//TODO: if now date is disabled, show last date
	//TODO: add to .pdp position relative
	//TODO: when use show prop false this when datepicker closed
	//TODO: refactor and write comment

	// Core
	import PersianDate from "@alireza-ab/persian-date/src/PersianDate";
	import { MONTHS } from "@alireza-ab/persian-date/src/utils";
	// components
	import arrowIcon from "./utils/ArrowIcon.vue";
	import calendarIcon from "./utils/CalendarIcon.vue";

	export { PersianDate };
	export default {
		name: "PersianRangeDatePicker",
		inheritAttrs: false,
		components: {
			arrowIcon,
			calendarIcon,
		},
		props: {
			/**
			 * the format of the model value
			 * @default YYYY-MM-DD
			 * @type String
			 * @see https://github.com/alireza-ab/persian-date#formats
			 */
			format: {
				default: "YYYY-MM-DD",
				type: String,
			},

			/**
			 * the format of the input value
			 * @default date
			 * @type String
			 * @see https://github.com/alireza-ab/persian-date#formats
			 */
			inputFormat: {
				default: "date",
				type: String,
			},

			/**
			 * the format of the value that shows in the footer of picker
			 * @default "jD jMMMM"
			 * @type String
			 * @see https://github.com/alireza-ab/persian-date#formats
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
			 * @default all
			 * @type String
			 * @values all | input | icon | none
			 */
			clickOn: {
				default: "all",
				type: String,
			},

			/**
			 * the classes for the div parent of input
			 * @default pdp-group
			 * @type String
			 */
			divClass: {
				default: "pdp-group",
				type: String,
			},

			/**
			 * the classes for the input
			 * @default pdp-input
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
			 * select range of dates or select on date
			 * @default true
			 * @type Boolean
			 */
			range: {
				default: true,
				type: Boolean,
			},
		},
		model: {
			prop: "value",
			event: "setdate",
		},
		watch: {
			show(val) {
				this.showDatePicker = val;
			},
			showDatePicker(val) {
				if (val) this.$emit("open");
				else this.$emit("close");
			},
		},
		data() {
			return {
				showDatePicker: this.show,
				showMonthSelect: false,
				showYearSelect: false,
				weekdays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
				onDisplay: "",
				startRange: "",
				endRange: "",
				fromDate: new PersianDate().parse(this.from),
				toDate: new PersianDate().parse(this.to),
				displayValue: "",
				documentWidth: this.$isServer ? 0 : window.innerWidth,
			};
		},
		computed: {
			attrs() {
				let attrs = { ...this.$attrs };
				delete attrs.value;
				attrs.id = attrs.id || "date-" + this.createUniqeNumber();
				return attrs;
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
						.toString("jd");
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
								month[week][day] = {
									friday: day == 6,
									key: this.onDisplay
										.clone()
										.addMonth(i)
										.date(showDay)
										.toString(),
									startRange:
										this.startRange &&
										this.startRange.isSame(
											selectedYear,
											selectedMonth,
											showDay
										),
									endRange:
										this.endRange &&
										this.endRange.isSame(selectedYear, selectedMonth, showDay),
									inRange:
										this.startRange &&
										this.startRange.isBefore(
											selectedYear,
											selectedMonth,
											showDay
										) &&
										this.endRange &&
										this.endRange.isAfter(selectedYear, selectedMonth, showDay),
									disabled: !this.checkDate(
										this.onDisplay
											.clone()
											.addMonth(i)
											.date(showDay),
										"date"
									),
									today: new PersianDate().isSame(
										selectedYear,
										selectedMonth,
										showDay
									),
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
						label: MONTHS["fa"][i],
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
					.sort((a, b) => b - a)
					.some((breakpoint) => {
						if (this.documentWidth <= breakpoint)
							column = this.column[breakpoint];
					});
				return column || 2;
			},
		},
		created() {
			let val = this.$attrs.value;
			if (val && this.checkDate(val)) {
				this.startRange = new PersianDate(val);
				this.onDisplay = this.startRange.clone();
				this.setModel();
			} else {
				this.setModel();
				this.onDisplay = new PersianDate();
			}
		},
		methods: {
			showPart(part) {
				if (part == "year") {
					this.showYearSelect = !this.showYearSelect;
					if (this.showYearSelect) {
						this.$nextTick(() => {
							let selectedYearTop = document.querySelector(
								".pdp-select-year li.selected"
							).offsetTop;
							document
								.querySelector(".pdp-select-year")
								.scroll({ top: selectedYearTop, behavior: "smooth" });
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
				} else if (month == "subtract") {
					this.onDisplay.subtractMonth();
				} else this.onDisplay.month(month);
				if (this.checkDate(this.onDisplay, "month"))
					this.showMonthSelect = false;
				else this.onDisplay = clone;
			},
			changeSelectedYear(year) {
				this.onDisplay.year(year);
				this.showYearSelect = false;
			},
			selectDate(date, column) {
				let onDisplay = this.onDisplay
					.clone()
					.addMonth(column || 0)
					.date(date);
				if (date) {
					if (this.range) {
						if (this.endRange) {
							this.startRange = onDisplay;
							this.endRange = "";
						} else if (this.startRange) {
							if (!onDisplay.isBefore(this.startRange.toString()))
								this.endRange = onDisplay;
							else this.startRange = onDisplay;
						} else this.startRange = onDisplay;
					} else this.startRange = onDisplay;
				} else if (this.displayValue) {
					if (this.range && this.startRange) {
						this.displayValue = this.displayValue.replace(
							this.startRange.toString(this.inputFormat) + " - ",
							""
						);
						if (new PersianDate().parse(this.displayValue).isValid())
							this.endRange = this.onDisplay.clone().parse(this.displayValue);
					} else {
						if (new PersianDate().parse(this.displayValue).isValid())
							this.startRange = this.onDisplay.clone().parse(this.displayValue);
					}
					this.submitDate(false);
				} else this.startRange = "";
				if (!this.checkDate(this.startRange, "date"))
					return (this.startRange = "");
				else if (
					this.autoSubmit &&
					(!this.range || (this.range && this.endRange))
				) {
					this.submitDate();
				}
				if (date) {
					this.$emit("select", onDisplay);
					if (this.range && !this.endRange) {
						document
							.querySelector(".pdp .pdp-main")
							.addEventListener("mouseover", this.selectInRangeDate);
					} else if (this.endRange) {
						document
							.querySelector(".pdp .pdp-main")
							.removeEventListener("mouseover", this.selectInRangeDate);
					}
				}
			},
			setModel(date) {
				this.$emit("setdate", date);
			},
			goToToday() {
				this.onDisplay = new PersianDate();
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
					from = this.fromDate.toString("jYYYY");
					to = this.toDate.toString("jYYYY");
				} else if (part == "month") {
					from = this.fromDate.toString("jYYYY/jMM");
					to = this.toDate.toString("jYYYY/jMM");
				} else {
					from = this.fromDate.toString();
					to = this.toDate.toString();
				}
				return this.onDisplay
					.clone()
					.parse(date)
					.isBetween(from, to, "[]");
			},
			showPicker(el) {
				if (this.clickOn == "all" || this.clickOn == el) {
					document.getElementById(this.attrs.id).focus();
					return (this.showDatePicker = true);
				}
			},
			async selectWithArrow(e) {
				// [37, 38, 39, 40] are key codes of arrow keys
				if ([37, 38, 39, 40].includes(e.keyCode)) {
					let arrow = {
						37: 1, // for left arrow must one day add
						38: -7, // for up arrow must seven day subtract
						39: -1, // for right arrow must one day subtract
						40: 7, // for down arrow must seven day add
					};
					let focusedDay = document.querySelectorAll(".pdp .pdp-day.hover");
					if (!focusedDay.length) {
						focusedDay = document.querySelectorAll(".pdp .pdp-day.in-range");
						if (!focusedDay.length)
							focusedDay = document.querySelectorAll(
								".pdp .pdp-day.start-range,.pdp .pdp-day.end-range"
							);
					}
					focusedDay = focusedDay[focusedDay.length - 1];
					if (focusedDay) {
						let column = this.getColumn(focusedDay);
						focusedDay.classList.remove("hover");
						let firstColumnMonth = this.onDisplay.toString("jy/jM");
						let focusedMonth = this.onDisplay.clone().addMonth(column);
						let nextElementValue = focusedMonth
							.date(focusedDay.innerText)
							.addDay(arrow[e.keyCode]);
						if (!this.checkDate(nextElementValue))
							return focusedDay.classList.add("hover");
						nextElementValue = nextElementValue.date();
						column = focusedMonth.diff(firstColumnMonth, "month");
						if (column < 0) {
							this.onDisplay.subtractMonth(this.columnCount);
							column = this.columnCount - 1;
						} else if (column >= this.columnCount) {
							this.onDisplay.addMonth(this.columnCount);
							column = 0;
						}
						await this.$nextTick(() => {
							focusedDay = document.querySelector(
								`.pdp .pdp-main .pdp-month[data-column='${column}'] .pdp-day[value='${nextElementValue}']`
							);
							focusedDay.classList.add("hover");
						});
					} else {
						focusedDay = document.querySelector(".pdp .pdp-day:not(.empty)");
						focusedDay.classList.add("hover");
					}
					if (this.range && this.startRange && !this.endRange) {
						this.selectInRangeDate({ target: focusedDay });
					}
				} else if (e.keyCode == 13) {
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
					if (onDisplay.isAfter(this.startRange.toString())) {
						for (let j = +date; j > 0; j--) {
							if (this.checkDate(onDisplay.date(j))) {
								target = document.querySelector(
									`.pdp .pdp-main .pdp-month[data-column='${i}'] .pdp-day[value='${j}']:not(.start-range)`
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
				if (!this.range) {
					displayDate = this.startRange.toString(this.inputFormat);
					date = this.startRange.toString(this.format);
				} else {
					displayDate =
						this.startRange.toString(this.inputFormat) +
						" - " +
						this.endRange.toString(this.inputFormat);
					date = [
						this.startRange.toString(this.format),
						this.endRange.toString(this.format),
					];
				}
				this.displayValue = displayDate;
				this.setModel(date);
				this.$emit(
					"change",
					this.range ? [this.startRange, this.endRange] : this.startRange
				);
				if (close) this.showDatePicker = false;
			},
			getColumn(el) {
				return el.parentNode.parentNode.parentNode.dataset.column;
			},
			createUniqeNumber() {
				return (
					new Date().getMilliseconds() + "" + Math.floor(Math.random() * 100)
				);
			},
		},
	};
</script>

<style lang="scss">
	@import "./assets/sass/app.scss";
</style>
