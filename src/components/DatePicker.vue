<template>
	<div
		:class="[
			'pdp',
			{ 'pdp-range': mode === 'range' },
			{ 'pdp-modal': modal },
			lang.dir.input,
		]"
		ref="root"
	>
		<slot name="before">
			<label v-if="label" :for="attrs.input.id" v-bind="attrs.label">
				{{ label }}
			</label>
		</slot>
		<div v-bind="attrs.div">
			<div
				v-if="!$slots.hasOwnProperty('icon') || !!$slots.icon"
				:class="[
					'pdp-icon',
					{ 'pdp-pointer': ['all', 'icon'].includes(clickOn) },
				]"
				@click="showPicker('icon')"
			>
				<slot name="icon">
					<calendar-icon
						v-if="type === 'date'"
						width="23"
						height="23"
					></calendar-icon>
					<clock-icon
						v-else-if="type === 'time'"
						width="23"
						height="23"
					></clock-icon>
					<calendar-clock-icon
						v-else
						width="23"
						height="23"
					></calendar-clock-icon>
				</slot>
			</div>
			<input
				type="text"
				autocomplete="off"
				ref="pdpInput"
				v-model="displayValue"
				v-bind="attrs.input"
				v-on="$listeners"
				@focus="showPicker('input')"
				@keydown="selectWithArrow"
			/>
			<div v-if="attrs.alt.name && attrs.alt.name.endsWith('[]')">
				<input
					v-for="(date, i) in selectedDates"
					:key="i"
					type="hidden"
					:name="attrs.alt.name"
					:value="date.toString(getFormat('alt'))"
				/>
			</div>
			<div v-else-if="attrs.alt.name">
				<input
					type="hidden"
					:name="attrs.alt.name"
					:value="selectedDates.map((date) => date.toString(getFormat('alt')))"
				/>
			</div>
			<button class="pdp-clear" type="button" @click="clear" v-if="clearable">
				<slot name="clear">
					<clear-icon></clear-icon>
				</slot>
			</button>
		</div>
		<slot name="after"></slot>
		<div v-if="showDatePicker">
			<div class="pdp-overlay" @click="showDatePicker = false"></div>
			<div v-bind="attrs.picker" ref="pdpPicker">
				<div class="pdp-auto">
					<div v-if="type.includes('date')">
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
						<ul
							class="pdp-select-year"
							v-show="showYearSelect"
							ref="pdpSelectYear"
						>
							<li
								v-for="(year, index) in years"
								:key="index"
								:class="{ selected: onDisplay.year() == year }"
								@click="changeSelectedYear(year)"
							>
								{{ year }}
							</li>
						</ul>
					</div>
					<div class="pdp-header" v-if="type.includes('date')">
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
										:inverse="lang.dir.picker == 'ltr'"
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
										{{ months[onDisplay.clone().addMonth(i).month()].label }}
									</button>
									<button
										type="button"
										@click="showPart('year')"
										class="pdp-year"
										tabindex="-1"
									>
										{{ onDisplay.clone().addMonth(i).year() }}
									</button>
								</div>
							</div>
							<button
								tabindex="-1"
								type="button"
								:class="[
									'pdp-arrow',
									{
										disabled: !checkDate(onDisplay.clone().addMonth(), 'month'),
									},
								]"
								:title="lang.translations.nextMonth"
								@click="changeSelectedMonth('add')"
							>
								<slot name="left-arrow">
									<arrow-icon
										direction="left"
										width="10"
										height="10"
										:inverse="lang.dir.picker == 'ltr'"
									></arrow-icon>
								</slot>
							</button>
						</div>
					</div>
					<div class="pdp-main" ref="pdpMain">
						<div class="pdp-date" v-if="type.includes('date')">
							<div
								class="pdp-column"
								v-for="(item, i) in columnCount"
								:key="i"
								:data-column="i"
							>
								<div class="pdp-week">
									<div
										class="pdp-weekday"
										v-for="(weekday, index) in lang.weekdays"
										:key="index"
									>
										{{ weekday }}
									</div>
								</div>
								<div class="pdp-days">
									<div v-for="(week, wIndex) in monthDays[i]" :key="wIndex">
										<div
											v-for="day in week"
											:key="day.raw ? day.raw.toString() : null"
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
											@click="selectDate(day.raw, 'date')"
											:value="day.val"
										>
											{{ day.val }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="pdp-time inline" v-if="type.includes('time')">
							<div class="pdp-column" v-if="type == 'time'">
								<div v-for="(c, i) in columnCount" :key="i"></div>
							</div>
							<div
								:class="[
									'pdp-moment',
									{ 'column-direction': mode == 'range' && columnCount == 1 },
								]"
							>
								<div
									v-for="(n, i) in mode == 'range' ? 2 : 1"
									:key="n"
									:class="[
										{
											disabled:
												(type != 'time' && !selectedDates[i]) ||
												(selectedDates[i] &&
													!checkDate(selectedDates[i], 'time')) ||
												isInDisable(selectedDates[i]),
										}, // FIXME: go to method
									]"
								>
									<div class="hour">
										<button
											type="button"
											@touchstart.prevent="startChangeTime(i, 'hour', 'add')"
											@mousedown.prevent="startChangeTime(i, 'hour', 'add')"
											@keydown.enter.prevent="startChangeTime(i, 'hour', 'add')"
											@touchend.prevent="stopChangeTime"
											@mouseup.prevent="stopChangeTime"
											@keyup.enter.prevent="stopChangeTime"
										>
											<slot name="up-arrow">
												<arrow-icon></arrow-icon>
											</slot>
										</button>
										{{
											selectedDates[i]
												? selectedDates[i].hour("HH")
												: core.hour("HH")
										}}
										<button
											type="button"
											@touchstart.prevent="startChangeTime(i, 'hour', 'sub')"
											@mousedown.prevent="startChangeTime(i, 'hour', 'sub')"
											@keydown.enter.prevent="startChangeTime(i, 'hour', 'sub')"
											@touchend.prevent="stopChangeTime"
											@mouseup.prevent="stopChangeTime"
											@keyup.enter.prevent="stopChangeTime"
										>
											<slot name="down-arrow">
												<arrow-icon direction="down"></arrow-icon>
											</slot>
										</button>
									</div>
									:
									<div class="minute">
										<button
											type="button"
											@touchstart.prevent="startChangeTime(i, 'minute', 'add')"
											@mousedown.prevent="startChangeTime(i, 'minute', 'add')"
											@keydown.enter.prevent="
												startChangeTime(i, 'minute', 'add')
											"
											@touchend.prevent="stopChangeTime"
											@mouseup.prevent="stopChangeTime"
											@keyup.enter.prevent="stopChangeTime"
										>
											<slot name="up-arrow">
												<arrow-icon></arrow-icon>
											</slot>
										</button>
										{{
											selectedDates[i]
												? selectedDates[i].minute("mm")
												: core.minute("mm")
										}}
										<button
											type="button"
											@touchstart.prevent="startChangeTime(i, 'minute', 'sub')"
											@mousedown.prevent="startChangeTime(i, 'minute', 'sub')"
											@keydown.enter.prevent="
												startChangeTime(i, 'minute', 'sub')
											"
											@touchend.prevent="stopChangeTime"
											@mouseup.prevent="stopChangeTime"
											@keyup.enter.prevent="stopChangeTime"
										>
											<slot name="down-arrow">
												<arrow-icon direction="down"></arrow-icon>
											</slot>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="pdp-footer">
						<div>
							<slot name="footer"></slot>
							<small v-if="selectedDates.length">
								{{ selectedDates[0].toString(getFormat("display")) }}
							</small>
							<small v-if="selectedDates.length == 2">
								&nbsp;-
								{{ selectedDates[1].toString(getFormat("display")) }}
							</small>
						</div>
						<div>
							<button
								v-if="this.checkDate(this.core, 'date')"
								type="button"
								class="pdp-today"
								@click="goToToday"
								:tabindex="+attrs.input.tabindex + 1 || undefined"
							>
								{{ lang.translations.now }}
							</button>
							<button
								v-if="
									!autoSubmit &&
									!selectedDates.some((date) => isInDisable(date))
								"
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
				<ul
					class="pdp-shortcut"
					v-if="shortcuts && Object.keys(shortcuts).length > 0"
				>
					<li
						v-for="(dates, name) in shortcuts"
						:key="name"
						:class="{
							selected: !dates.some(
								(date, i) =>
									!date.isSame(
										selectedDates[i] && selectedDates[i].toString('datetime')
									)
							),
						}"
						@click="selectShorcut(dates)"
					>
						{{ name }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	//TODO: add time config
	//TODO: test the project with attention and test in nuxt
	//TODO: refactor and write comment --> pay a high attention

	// Core
	import { PersianDate, Core } from "./utils/modules/core.js";
	// components
	import arrowIcon from "./utils/components/ArrowIcon.vue";
	import calendarIcon from "./utils/components/CalendarIcon.vue";
	import clockIcon from "./utils/components/ClockIcon.vue";
	import calendarClockIcon from "./utils/components/CalendarClockIcon.vue";
	import clearIcon from "./utils/components/ClearIcon.vue";

	export { PersianDate };
	export default {
		name: "DatePicker",
		inheritAttrs: false,
		components: {
			arrowIcon,
			calendarIcon,
			clockIcon,
			calendarClockIcon,
			clearIcon,
		},
		props: {
			/**
			 * the format of the model value
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 * @desc default value in "date" type is "YYYY-MM-DD"
			 * 		default value in "datetime" type is "YYYY-MM-DD HH:mm"
			 * 		default value in "time" type is "HH:mm"
			 */
			format: {
				type: String,
			},

			/**
			 * the format of the input value
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 * @desc default value equal to the value of "type" prop
			 */
			inputFormat: {
				type: String,
			},

			/**
			 * the format of the value that shows in the footer of picker
			 * @type String
			 * @see https://alireza-ab.ir/persian-date/formats#
			 * @desc default value in "date" type is "?D ?MMMM"
			 * 		default value in "datetime" type is "?D ?MMMM HH:mm"
			 * 		default value in "time" type is "HH:mm"
			 */
			displayFormat: {
				type: String,
			},

			/**
			 * the type of picker
			 * @default "date"
			 * @type String
			 * @values date | time | datetime
			 * @since 2.0.0
			 */
			type: {
				type: String,
				default: "date",
			},

			/**
			 * the date of start of the picker
			 * @type String
			 * @example 1400/7/1 | 1400-7
			 */
			from: {
				type: String,
				default() {
					if (this.type == "time") return "";
					return "1300";
				},
			},

			/**
			 * the date of end of the picker
			 * @type String
			 * @example 1400/7/1 | 1400-7
			 */
			to: {
				type: String,
				default() {
					if (this.type == "time") return "23:59";
					return "1499";
				},
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
			 * @values fa | en | fa,en |  en,fa
			 * @desc Except above values, you can add
			 *  	the language in "localeConfig" prop and use it.
			 * @since 2.0.0
			 */
			locale: {
				default: "fa",
				type: String,
			},

			/**
			 * user can clear the selected dates or not
			 * @default false
			 * @type Boolean
			 * @since 2.0.0
			 */
			clearable: {
				default: false,
				type: Boolean,
			},

			/**
			 * disable some dates or time
			 * @type [Array, String, Function, RegExp]
			 * @since 2.0.0
			 */
			disable: {
				type: [Array, String, Function, RegExp],
			},

			/**
			 * the config for locales
			 * @type Object
			 * @since 2.0.0
			 */
			localeConfig: {
				type: Object,
			},

			/**
			 * the styles of the picker
			 * @type Object
			 * @since 2.0.0
			 */
			styles: {
				type: Object,
			},

			/**
			 * the color of the picker
			 * @type String
			 * @values red | pink | orange | green | purple | gray
			 * @since 2.0.0
			 */
			color: {
				type: String,
			},

			/**
			 * shortcut for select date and time quickly
			 * @type Boolean | Object
			 * @since 2.2.0
			 */
			shortcut: {
				type: [Boolean, Object],
				default: false,
			},
		},
		model: {
			prop: "value",
			event: "setDate",
		},
		watch: {
			show: {
				handler: function (val) {
					this.showDatePicker = val;
				},
			},
			showDatePicker: {
				handler: function (val) {
					if (val) this.$emit("open");
					else {
						if (!this.modal)
							document.removeEventListener("scroll", this.locate);
						this.$emit("close");
					}
				},
			},
			from: {
				handler: function (val) {
					this.fromDate.fromJalali(val);
				},
			},
			to: {
				handler: function (val) {
					this.toDate.fromJalali(val);
				},
			},
			mode: {
				handler: function (val) {
					if (val == "single" && this.selectedDates.length == 2)
						this.$delete(this.selectedDates, 1);
				},
			},
			locale: {
				handler: function (val, oldVal) {
					const index = oldVal.split(",").indexOf(this.currentLocale);
					this.currentLocale = val.split(",")[index];
				},
			},
			localeConfig: {
				handler: function (val) {
					this.langs = Core.mergeObject(this.langs, val);
				},
				deep: true,
			},
			styles: {
				handler: function (val) {
					Core.setStyles(val, this.$refs.root);
				},
				deep: true,
			},
			color: {
				handler: function (val) {
					Core.setColor(val, this.$refs.root);
				},
			},
		},
		data() {
			return {
				core: new PersianDate(),
				showDatePicker: false,
				pickerPlace: {},
				showTopOfInput: false,
				showMonthSelect: false,
				showYearSelect: false,
				onDisplay: "",
				selectedDates: [],
				startRange: "",
				endRange: "",
				fromDate: null,
				toDate: null,
				displayValue: "",
				documentWidth: this.$isServer ? 0 : window.innerWidth,
				langs: Core.langs,
				currentLocale: this.locale.split(",")[0],
				interval: null,
			};
		},
		computed: {
			attrs() {
				let attrs = {
					picker: {
						class: [
							"pdp-picker",
							{
								"pdp-top": this.pickerPlace.top,
								"pdp-left": this.pickerPlace.left,
								"pdp-right": this.pickerPlace.right,
							},
							this.lang.dir.picker,
						],
					},
					div: {
						class: "pdp-group",
					},
					label: {
						class: "pdp-label",
					},
					input: {
						class: "pdp-input",
					},
					alt: {},
				};
				let $attrs = { ...this.$attrs };
				delete $attrs.value;
				for (const key in $attrs) {
					try {
						const [, group, attr] = key.match(
							/(div|label|alt|input|picker)-(.*)/
						);
						attrs[group][attr] = $attrs[key];
					} catch {
						attrs["input"][key] = $attrs[key];
					}
				}
				return attrs;
			},
			years() {
				let start = this.fromDate.year();
				const end = this.toDate.year();
				return Array(end - start + 1)
					.fill(null)
					.map(() => start++);
			},
			monthDays() {
				let months = [];
				for (let i = 0; i < this.columnCount; i++) {
					let emptyCells;
					const selectedYear = this.onDisplay.clone().addMonth(i).year();
					const selectedMonth = this.onDisplay.clone().addMonth(i).month();
					emptyCells = +this.onDisplay
						.clone()
						.parse(selectedYear, selectedMonth, 1)
						.toString(this.lang.calendar == "jalali" ? "jd" : "d");
					let daysOfMonthNumber = this.onDisplay.getDaysInMonth(
						selectedYear,
						selectedMonth
					);
					const numberOfWeek = Math.ceil((daysOfMonthNumber + emptyCells) / 7);
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
									raw: this.onDisplay.clone().addMonth(i).date(showDay),
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
											.isBetween(
												...this.selectedDates.map((date) => date.toString())
											),
									disabled:
										!this.checkDate(
											this.onDisplay.clone().addMonth(i).date(showDay),
											"date"
										) ||
										this.isInDisable(
											this.onDisplay.clone().addMonth(i).date(showDay)
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
				let column = 2;
				if (Core.isNumber(this.column)) column = this.column;
				else
					Object.keys(this.column)
						.sort((a, b) => a - b)
						.some((breakpoint) => {
							if (this.documentWidth <= breakpoint)
								return (column = this.column[breakpoint]);
						});
				if (this.type.includes("time")) {
					const scale = column / (this.mode == "single" ? 1 : 2);
					this.$refs.root.style.setProperty(
						"--time-scale",
						scale > 1 ? scale : 1
					);
				}
				return column;
			},
			lang() {
				return this.langs[this.currentLocale];
			},
			nextLocale() {
				const locales = this.locale.split(",");
				const index = locales.indexOf(this.currentLocale);
				const locale = locales[index + 1] || locales[0];
				return this.langs[locale].translations.label;
			},
			shortcuts() {
				if (this.shortcut == false) {
					return false;
				}
				let shortcuts = {};
				const part = this.type.includes("date") ? "date" : "time";
				const isDate = this.type == "date";
				const setShortcut = (date, phrase) => {
					if (Array.isArray(date)) {
						if (
							date.some((d) => this.validate(d, part)) &&
							!this.isDisableBetween(...date)
						) {
							shortcuts[phrase] = isDate
								? date.map((d) => d.startOf("date"))
								: date;
						}
					} else if (this.validate(date, part)) {
						if (isDate) date.startOf("date");
						shortcuts[phrase] = [date];
					}
				};
				let d = this.core.clone().now();
				if (part == "time" && !this.validate(d, part))
					d = this.toDate.clone().subDay().now();
				if (this.shortcut === true) {
					const translate = this.lang.translations;
					const clone = () => d.clone();
					if (part == "date") {
						if (this.mode == "single") {
							setShortcut(d, translate.now);
							setShortcut(clone().subDay(), translate.yesterday);
							setShortcut(clone().addDay(), translate.tomorrow);
							setShortcut(clone().startOf("week"), translate.firstOfWeek);
							setShortcut(clone().endOf("week"), translate.lastOfWeek);
						} else {
							setShortcut(
								[clone().startOf("week"), clone().endOf("week")],
								translate.thisWeek
							);
							setShortcut(
								[
									clone().subWeek().startOf("week"),
									clone().subWeek().endOf("week"),
								],
								translate.prevWeek
							);
							setShortcut(
								[
									clone().addWeek().startOf("week"),
									clone().addWeek().endOf("week"),
								],
								translate.nextWeek
							);
							setShortcut(
								[clone().startOf("month"), clone().endOf("month")],
								translate.thisMonth
							);
							setShortcut(
								[
									clone().subMonth().startOf("month"),
									clone().subMonth().endOf("month"),
								],
								translate.prevMonth
							);
							setShortcut(
								[
									clone().addMonth().startOf("month"),
									clone().addMonth().endOf("month"),
								],
								translate.nextMonth
							);
						}
					} else if (this.mode == "single") {
						setShortcut(d, translate.now);
						setShortcut(clone().subHour(), translate.oneHourAgo);
						setShortcut(clone().addHour(), translate.oneHourLater);
						setShortcut(clone().startOf("date"), translate.midnight);
						setShortcut(clone().time(12), translate.midday);
					} else {
						setShortcut(
							[clone().startOf("hour"), clone().endOf("hour")],
							translate.thisHour
						);
						setShortcut(
							[
								clone().subHour().startOf("hour"),
								clone().subHour().endOf("hour"),
							],
							translate.prevHour
						);
						setShortcut(
							[
								clone().addHour().startOf("hour"),
								clone().addHour().endOf("hour"),
							],
							translate.nextHour
						);
						setShortcut(
							[clone().startOf("date"), clone().endOf("date")],
							translate.allDay
						);
					}
				} else {
					for (const phrase in this.shortcut) {
						const value = this.shortcut[phrase].map((date) =>
							part == "date" ? d.clone().fromJalali(date) : d.clone().time(date)
						);
						setShortcut(this.mode == "single" ? value[0] : value, phrase);
					}
				}
				return shortcuts;
			},
			defaultDate() {
				const prefix =
					this.type == "time" ? this.core.toString("jYYYY/jMM/jDD") + " " : "";
				return {
					from: prefix + this.from,
					to: prefix + this.to,
				};
			},
		},
		beforeMount() {
			this.langs = Core.mergeObject(this.langs, this.localeConfig);
		},
		mounted() {
			Core.setColor(this.color, this.$refs.root);
			Core.setStyles(this.styles, this.$refs.root);
			const calendar = this.lang.calendar;

			this.fromDate = this.core
				.clone()
				.parse(this.defaultDate.from)
				.calendar(calendar);
			this.toDate = this.core
				.clone()
				.parse(this.defaultDate.to)
				.endOf(Core.getLastUnit(this.to, this.type))
				.calendar(calendar);
			this.core.calendar(calendar);
			let val = this.$attrs.value;
			if (val) {
				this.setDate(val);
			} else {
				let today = this.core.clone();
				if (this.type == "date") today.startOf("date");
				if (this.checkDate(today, "date")) {
					this.onDisplay = today;
				} else {
					this.onDisplay = this.nearestDate(today);
				}
			}
			window.addEventListener("resize", () => {
				this.documentWidth = window.innerWidth;
			});
			if (this.type != "date") {
				this.onDisplay.hour(this.core.hour());
				this.onDisplay.minute(this.core.minute());
			}
			this.showDatePicker = this.show;
		},
		methods: {
			showPart(part) {
				if (part == "year") {
					this.showMonthSelect = false;
					this.showYearSelect = !this.showYearSelect;
					if (this.showYearSelect) {
						this.$nextTick(() => {
							const selectedYearTop =
								this.$refs.pdpSelectYear.querySelector("li.selected").offsetTop;
							this.$refs.pdpSelectYear.scroll({
								top: selectedYearTop,
								behavior: "smooth",
							});
						});
					}
				} else if (part == "month") {
					this.showYearSelect = false;
					this.showMonthSelect = !this.showMonthSelect;
				}
			},
			changeSelectedMonth(month) {
				const clone = this.onDisplay.clone();
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
				if (!this.checkDate(this.onDisplay, "date"))
					this.onDisplay = this.nearestDate(this.onDisplay);
				this.showYearSelect = false;
			},
			validate(date, part) {
				if (!this.checkDate(date, part) || this.isInDisable(date)) return false;
				return true;
			},
			isDisableBetween(first, second) {
				if (!this.disable) return false;
				if (this.type != "datetime" && Core.isString(this.disable)) {
					const date =
						this.type == "time"
							? second.clone().time(this.disable)
							: this.disable;
					return this.core
						.clone()
						.parse(date)
						.isBetween(first.toString(), second.toString());
				} else if (
					this.type != "datetime" &&
					Array.isArray(this.disable) &&
					this.disable.some((date) => Core.isString(date))
				) {
					return this.disable.some((date) => {
						if (this.type == "time") date = second.clone().time(date);
						return this.core.clone().parse(date).isBetween(first, second);
					});
				} else if (this.type != "time") {
					let inRangeDate = second.clone().startOf("date").subDay();
					while (!inRangeDate.isSameOrBefore(first)) {
						if (this.isInDisable(inRangeDate)) return true;
						inRangeDate.subDay();
					}
				}
				return false;
			},
			selectDate(date, part) {
				let isValid = this.validate(date, part);
				if (!isValid) {
					return -1;
				} else if (this.mode == "range" && this.selectedDates.length == 1) {
					isValid = !this.isDisableBetween(this.selectedDates[0], date);
					if (!isValid) {
						return -2;
					}
				}
				if (this.type == "date") date.startOf("date");
				if (this.mode == "single") {
					this.$set(this.selectedDates, 0, date);
				} else if (this.mode == "range") {
					this.$refs.pdpMain.addEventListener(
						"mouseover",
						this.selectInRangeDate
					);
					if (this.selectedDates.length == 2) {
						this.selectedDates = [date];
					} else if (
						this.selectedDates.length &&
						!date.isBefore(this.selectedDates[0])
					) {
						this.$set(this.selectedDates, 1, date);
						this.$refs.pdpMain.removeEventListener(
							"mouseover",
							this.selectInRangeDate
						);
					} else this.$set(this.selectedDates, 0, date);
				}

				this.$emit("select", date);
				if (
					this.autoSubmit &&
					(this.mode !== "range" ||
						(this.mode === "range" && this.selectedDates.length == 2))
				) {
					this.submitDate();
					return 1;
				}
				return 0;
			},
			setModel(date) {
				if (date === undefined) {
					date = this.selectedDates.map((el) => {
						return el.toString(this.getFormat());
					});
					if (this.mode == "single") date = date[0];
				}
				this.$emit("setDate", date);
			},
			goToToday() {
				this.showMonthSelect = this.showYearSelect = false;
				this.onDisplay = this.core.now().clone();
				if (this.type.includes("time") && this.selectedDates.length) {
					let time = this.selectedDates[this.selectedDates.length - 1];
					time.hour(this.onDisplay.hour());
					time.minute(this.onDisplay.minute());
					if (
						this.autoSubmit &&
						this.checkDate(time, "time") &&
						!this.isInDisable(time)
					)
						this.submitDate(false);
				}
				if (this.type.includes("date"))
					this.$nextTick(() => {
						document.querySelector(".pdp-day.today").classList.add("tada");
						setTimeout(() => {
							document.querySelector(".pdp-day.today").classList.remove("tada");
						}, 1000);
					});
			},
			checkDate(date, part) {
				let from, to, format;
				if (!Core.isPersianDate(date)) date = this.core.clone().parse(date);
				switch (part) {
					case "year":
						format = this.lang.calendar == "jalali" ? "jYYYY" : "YYYY";
						from = this.fromDate.toString(format);
						to = this.toDate.toString(format);
						break;
					case "month":
						format = this.lang.calendar == "jalali" ? "jYYYY/jMM" : "YYYY/MM";
						from = this.fromDate.toString(format);
						to = this.toDate.toString(format);
						break;
					case "date":
						from = this.fromDate.toString();
						to = this.toDate.toString();
						break;
					case "time":
						from = this.fromDate.toString(
							this.type.includes("time") ? "datetime" : "date"
						);
						to = this.toDate.toString(
							this.type.includes("time") ? "datetime" : "date"
						);
						break;
				}
				return date.isBetween(from, to, "[]");
			},
			isInDisable(date, disable) {
				if (!this.disable) return false;
				disable = disable || this.disable;
				date = Core.isPersianDate(date)
					? date.clone()
					: this.core.clone().parse(date);
				if (Core.isString(disable)) {
					if (this.type == "time") disable = date.toString() + " " + disable;
					return date.calendar("j").isSame(disable);
				} else if (disable instanceof RegExp) {
					const format = {
						date: "jYYYY/jM/jD",
						datetime: "jYYYY/jM/jD H:m",
						time: "H:m",
					};
					return disable.test(date.toString(format[this.type]));
				} else if (Core.isFunction(disable)) {
					return disable(date);
				} else if (Array.isArray(disable)) {
					return disable.some((val) => {
						if (Core.isString(val)) {
							if (this.type == "time") val = date.toString() + " " + val;
							return date.calendar("j").isSame(val);
						} else if (val instanceof RegExp) {
							const format = {
								date: "jYYYY/jM/jD",
								datetime: "jYYYY/jM/jD H:m",
								time: "H:m",
							};
							return val.test(date.toString(format[this.type]));
						}
					});
				}
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
				//FIXME: refactor
				//FIXME: when up arraw press go to last date
				// [37, 38, 39, 40] are key codes of arrow keys
				if ([37, 38, 39, 40].includes(e.keyCode)) {
					const arrow = {
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
						const firstColumnMonth = this.onDisplay.toString();
						let focusedMonth = this.onDisplay.clone().addMonth(column);
						let nextElementValue = focusedMonth
							.date(focusedDay.innerText)
							.addDay(numberOfDay);
						if (!this.checkDate(nextElementValue, "date"))
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
						else {
							focusedDay = document.querySelector(
								`.pdp .pdp-main .pdp-column[data-column="0"] .pdp-day[value='${this.fromDate.date()}']`
							);
							focusedDay.classList.add("hover");
						}
					}
					if (this.mode === "range" && this.selectedDates.length == 1) {
						this.selectInRangeDate({ target: focusedDay });
					}
				} else if (e.keyCode == 13) {
					e.preventDefault();
					// 13 is key code of Enter key
					const focusedDay = document.querySelector(".pdp .pdp-day.hover");
					if (focusedDay) {
						this.selectDate(
							this.onDisplay
								.clone()
								.addMonth(this.getColumn(focusedDay) || 0)
								.date(focusedDay.innerText),
							"date"
						);
					} else {
						let onDisplay;
						if (this.type == "time") {
							const time = this.displayValue.split(/[/ -.,:\\]/);
							if (this.checkDate(this.core.clone(), "time"))
								onDisplay = this.core.clone();
							else onDisplay = this.fromDate.clone();
							onDisplay.hour(time[0] || 0).minute(time[1] || 0);
						} else {
							onDisplay = this.core.clone().parse(this.displayValue);
						}
						if (this.selectDate(onDisplay, "time") === 0) {
							const diff = onDisplay.diff(this.onDisplay, "month");
							if (diff < 0 || diff >= this.columnCount)
								this.onDisplay = onDisplay.clone();
							this.displayValue = "";
						}
					}
				}
			},
			selectInRangeDate({ target }) {
				if (!target.classList.contains("pdp-day")) return;
				const column = this.getColumn(target);
				let date = target.innerText;
				document.querySelectorAll(`.pdp .pdp-day`).forEach((el) => {
					el.classList.remove("in-range");
				});
				let onDisplay;
				columnLoop: for (let i = column; i >= 0; i--) {
					onDisplay = this.onDisplay.clone().addMonth(i).date(date);
					if (onDisplay.isAfter(this.selectedDates[0].toString())) {
						for (let j = +date; j > 0; j--) {
							if (this.checkDate(onDisplay.date(j), "date")) {
								target = document.querySelector(
									`.pdp .pdp-main .pdp-column[data-column='${i}'] .pdp-day[value='${j}']:not(.start-range)`
								);
								if (target) target.classList.add("in-range");
								else break columnLoop;
								if (this.isInDisable(onDisplay)) {
									document.querySelectorAll(`.pdp .pdp-day`).forEach((el) => {
										el.classList.remove("in-range");
									});
								}
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
				const displayDate = this.selectedDates.map((el) => {
					return el.toString(this.getFormat("input"));
				});
				this.displayValue = displayDate.join(" - ");
				this.setModel();
				this.$emit(
					"submit",
					this.mode === "range" ? this.selectedDates : this.selectedDates[0]
				);
				if (close) {
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
				this.pickerPlace = {
					top: false,
					left: false,
					right: false,
				};
				this.$nextTick(() => {
					const input = this.$refs.pdpInput;
					const inputOffset =
						input.offsetHeight + input.getBoundingClientRect().top;
					const picker = this.$refs.pdpPicker;
					const pickerHeight = picker.offsetHeight + 10;
					const pickerOffset = picker.getBoundingClientRect();
					this.pickerPlace = {
						top:
							inputOffset >= pickerHeight &&
							window.innerHeight - (inputOffset + pickerHeight) < 0,
						left: pickerOffset.left <= 0,
						right:
							window.innerWidth - (pickerOffset.left + pickerOffset.width) <= 0,
					};
				});
			},
			changeLocale() {
				const locales = this.locale.split(",");
				const index = locales.indexOf(this.currentLocale);
				this.currentLocale = locales[index + 1] || locales[0];
				const calendar = this.lang.calendar;
				this.core.calendar(calendar);
				this.fromDate.calendar(calendar);
				this.toDate.calendar(calendar);
				this.onDisplay.calendar(calendar);
				for (let i = 0; i < this.selectedDates.length; i++) {
					this.selectedDates[i].calendar(calendar);
				}
				this.submitDate(false);
			},
			clear() {
				this.displayValue = "";
				this.setModel("");
				this.$emit("clear");
			},
			startChangeTime(dateIndex, unit, operator) {
				let date = this.selectedDates[dateIndex];
				if (this.type != "time" && !date) return;
				else if (!date) {
					date = this.core.clone();
					if (dateIndex == 1 && !this.selectedDates.length)
						this.selectedDates.push(date.clone());
					this.selectedDates.push(date);
				}
				this.stopChangeTime();
				const maxAmount = unit == "hour" ? 23 : 59;
				let currentAmount = date[unit]();
				const changeTime = () => {
					if (operator == "add") {
						currentAmount++;
						if (currentAmount > maxAmount) currentAmount = 0;
					} else {
						currentAmount--;
						if (currentAmount < 0) currentAmount = maxAmount;
					}
					if (!this.checkDate(date[unit](currentAmount), "time")) {
						date.parse(
							date.isSameOrAfter(this.toDate.clone())
								? this.toDate.clone()
								: this.fromDate.clone()
						);
					} else if (
						this.selectedDates.length == 2 &&
						this.selectedDates[0].isAfter(this.selectedDates[1])
					) {
						date.parse(
							dateIndex == 0 ? this.selectedDates[1] : this.selectedDates[0]
						);
					}
					if (!this.isInDisable(date)) {
						this.$emit("select", date);
						if (
							this.autoSubmit &&
							!this.selectedDates.some((sDate) => this.isInDisable(sDate))
						)
							this.submitDate(false);
					}
				};
				changeTime();
				this.interval = setInterval(changeTime, 100);
			},
			stopChangeTime() {
				clearInterval(this.interval);
			},
			getFormat(which) {
				let format;
				switch (which) {
					case "input":
						return this.inputFormat || this.lang.inputFormat || this.type;
					case "display":
						format = {
							date: "?D ?MMMM",
							datetime: "?D ?MMMM HH:mm",
							time: "HH:mm",
						};
						return (
							this.displayFormat || this.lang.displayFormat || format[this.type]
						);
					case "alt":
						return this.attrs.alt.format || this.getFormat();
					default:
						format = {
							date: "YYYY-MM-DD",
							datetime: "YYYY-MM-DD HH:mm",
							time: "HH:mm",
						};
						return this.format || format[this.type];
				}
			},
			selectShorcut(dates) {
				this.selectedDates = dates.map((date, i) => {
					if (i == 0) this.onDisplay = date.clone();
					this.$emit("select", date);
					return date.clone();
				});
				if (this.autoSubmit) {
					this.submitDate();
				}
			},
			setDate(date) {
				if (!date) return;
				if (this.mode == "single" && typeof date === "string") date = [date];
				date.some((d, index) => {
					d = this.core
						.clone()
						.fromGregorian(
							(this.type == "time"
								? this.core.toString("YYYY-MM-DD") + " "
								: "") + d
						);
					if (Core.isPersianDate(d)) {
						this.selectedDates.push(d);
						if (index == 0) this.onDisplay = d.clone();
					} else {
						this.selectedDates = [];
						return true;
					}
				});
				if (this.selectedDates.length) this.submitDate();
			},
		},
	};
</script>

<style lang="scss">
	@import "./assets/sass/app.scss";
</style>
