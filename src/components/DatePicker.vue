<template>
  <div
    ref="root"
    :class="[
      'pdp',
      { 'pdp-range': mode === 'range' },
      { 'pdp-modal': modal },
      { 'pdp-dual': dualInput },
      lang.dir.input,
    ]"
  >
    <slot name="before">
      <label v-if="label" :for="attrs.firstInput.id" v-bind="attrs.label">
        {{ label }}
      </label>
    </slot>
    <div v-bind="attrs.div">
      <template v-for="(input, index) in inputs" :key="input"
        ><div
          v-if="!$slots.hasOwnProperty('icon') || $slots?.icon?.()?.length"
          :key="`icon-${input}`"
          :class="[
            'pdp-icon',
            { 'pdp-pointer': ['all', 'icon'].includes(clickOn) },
            { 'pdp-inside': iconInside },
          ]"
          @click="showPicker('icon', input)"
        >
          <slot name="icon">
            <Icon :icon="type" width="23" height="23"></Icon>
          </slot>
        </div>
        <input
          :ref="input"
          v-model="displayValue[index]"
          type="text"
          autocomplete="off"
          v-bind="attrs[input]"
          @focus="showPicker('input', input)"
          @keydown="selectWithArrow" /><button
          v-if="clearable"
          :key="`clear-${input}`"
          class="pdp-clear"
          type="button"
          @click="clear(input)"
        >
          <slot name="clear"><Icon icon="clear"></Icon></slot></button
      ></template>
    </div>
    <slot name="after"></slot>
    <div v-if="attrs.alt.name && attrs.alt.name.endsWith('[]')">
      <input
        v-for="(date, i) in selectedDates"
        :key="i"
        type="hidden"
        :name="attrs.alt.name"
        :value="date.toString(formats.alt)"
      />
    </div>
    <div v-else-if="attrs.alt.name">
      <input
        type="hidden"
        :name="attrs.alt.name"
        :value="selectedDates.map((date) => date.toString(formats.alt))"
      />
    </div>
    <div v-if="showDatePicker">
      <div class="pdp-overlay" @click="showDatePicker = false"></div>
      <div v-bind="attrs.picker" ref="pdpPicker">
        <div class="pdp-auto">
          <div v-if="type.includes('date')">
            <ul v-show="showMonthSelect" class="pdp-select-month">
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
              v-show="showYearSelect"
              ref="pdpSelectYear"
              class="pdp-select-year"
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
          <div v-if="type.includes('date')" class="pdp-header">
            <div v-if="locale.includes(',')" class="top">
              <div>{{ lang.translations.text }}</div>
              <button type="button" :tabindex="tabIndex" @click="changeLocale">
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
                <slot name="right-arrow"
                  ><Arrow
                    direction="right"
                    width="10"
                    height="10"
                    :inverse="lang.dir.picker == 'ltr'"
                  ></Arrow
                ></slot>
              </button>
              <div>
                <div v-for="(item, i) in columnCount" :key="i">
                  <button
                    class="pdp-month"
                    type="button"
                    tabindex="-1"
                    @click="showPart('month')"
                  >
                    {{
                      months[onDisplay.clone().addMonth(i).month()].label
                    }}</button
                  ><button
                    class="pdp-year"
                    type="button"
                    tabindex="-1"
                    @click="showPart('year')"
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
                <slot name="left-arrow"
                  ><Arrow
                    direction="left"
                    width="10"
                    height="10"
                    :inverse="lang.dir.picker == 'ltr'"
                  ></Arrow
                ></slot>
              </button>
            </div>
          </div>
          <div ref="pdpMain" class="pdp-main">
            <div v-if="type.includes('date')" class="pdp-date">
              <div
                v-for="(item, i) in columnCount"
                :key="i"
                class="pdp-column"
                :data-column="i"
              >
                <div class="pdp-week">
                  <div
                    v-for="(weekday, index) in lang.weekdays"
                    :key="index"
                    class="pdp-weekday"
                  >
                    {{ weekday }}
                  </div>
                </div>
                <div class="pdp-days">
                  <div v-for="(week, wIndex) in monthDays[i]" :key="wIndex">
                    <div
                      v-for="day in week"
                      :key="day.raw ? day.raw.toString() : undefined"
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
                      :value="day.val"
                      @click="selectDate(day.raw, 'date')"
                    >
                      {{ day.val }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type.includes('time')" class="pdp-time inline">
              <div v-if="type == 'time'" class="pdp-column">
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
                        selectedTimes[i] &&
                        (!checkDate(selectedTimes[i], 'time') ||
                          isInDisable(selectedTimes[i])),
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
                      <slot name="up-arrow"><Arrow></Arrow></slot></button
                    >{{
                      selectedTimes[i]
                        ? selectedTimes[i].hour('HH')
                        : core.hour('HH')
                    }}<button
                      type="button"
                      @touchstart.prevent="startChangeTime(i, 'hour', 'sub')"
                      @mousedown.prevent="startChangeTime(i, 'hour', 'sub')"
                      @keydown.enter.prevent="startChangeTime(i, 'hour', 'sub')"
                      @touchend.prevent="stopChangeTime"
                      @mouseup.prevent="stopChangeTime"
                      @keyup.enter.prevent="stopChangeTime"
                    >
                      <slot name="down-arrow"
                        ><Arrow direction="down"></Arrow
                      ></slot>
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
                      <slot name="up-arrow"><Arrow></Arrow></slot></button
                    >{{
                      selectedTimes[i]
                        ? selectedTimes[i].minute('mm')
                        : core.minute('mm')
                    }}<button
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
                      <slot name="down-arrow"
                        ><Arrow direction="down"></Arrow
                      ></slot>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pdp-footer">
            <div>
              <slot name="footer"></slot>
              <small v-if="selectedDates[0]">
                {{ selectedDates[0].toString(formats.display) }}
              </small>
              <small v-if="selectedDates.length == 2">
                - {{ selectedDates[1].toString(formats.display) }}
              </small>
            </div>
            <div>
              <button
                v-if="checkDate(core, 'date')"
                class="pdp-today"
                type="button"
                :tabindex="tabIndex"
                @click="goToToday"
              >
                {{ lang.translations.now }}</button
              ><button
                v-if="
                  !autoSubmit &&
                  !selectedDates.some((date) => isInDisable(date))
                "
                class="pdp-submit"
                type="button"
                :tabindex="tabIndex"
                @click="submitDate()"
              >
                {{ lang.translations.submit }}
              </button>
            </div>
          </div>
        </div>
        <ul
          v-if="shortcuts && Object.keys(shortcuts).length > 0"
          class="pdp-shortcut"
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

<script lang="ts">
  //TODO: use scoped slots
  //TODO: add time config
  //TODO: add tip for days
  //TODO: test the project with attention and test in nuxt
  //TODO: refactor and write comment --> pay a high attention

  // ************************ Core ************************
  import { defineComponent, PropType } from 'vue';
  import { PersianDate, Core } from './utils/modules/core';
  // ************************ Types ************************
  import {
    Obj,
    Attrs,
    Langs,
    RecursivePartial,
    Styles,
    Inputs,
    PickerPlace,
    TypePart,
    CalendarPart,
    Disable,
    Formats,
    MonthDays,
    Months,
    Shortcuts,
    DefaultDate,
  } from './utils/modules/types';
  // ************************ Components ************************
  import Arrow from './utils/components/Arrow.vue';
  import Icon from './utils/components/Icon.vue';

  export { PersianDate };
  export default defineComponent({
    components: {
      Arrow,
      Icon,
    },
    inheritAttrs: false,
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
        type: String as PropType<'date' | 'time' | 'datetime'>,
        default: 'date',
        validator: (val: string) => ['date', 'time', 'datetime'].includes(val),
      },

      /**
       * the date of start of the picker
       * @type String
       * @example 1400/7/1 | 1400-7
       */
      from: {
        type: String,
        default: (props: Obj) => (props.type === 'time' ? '' : '1300'),
      },

      /**
       * the date of end of the picker
       * @type String
       * @example 1400/7/1 | 1400-7
       */
      to: {
        type: String,
        default: (props: Obj) => (props.type === 'time' ? '23:59' : '1499'),
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
        default: 'all',
        type: String as PropType<'all' | 'input' | 'icon' | 'none'>,
        validator: (val: string) =>
          ['all', 'input', 'icon', 'none'].includes(val),
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
        default: () => ({ 576: 1 }),
        type: [Number, Object] as PropType<number | Record<number, number>>,
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
        default: 'range',
        type: String as PropType<'single' | 'range'>,
        validator: (val: string) => ['single', 'range'].includes(val),
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
        default: 'fa',
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
        type: [Array, String, Function, RegExp] as PropType<Disable>,
      },

      /**
       * the config for locales
       * @type Object
       * @since 2.0.0
       */
      localeConfig: {
        type: Object as PropType<RecursivePartial<Langs>>,
      },

      /**
       * the styles of the picker
       * @type Object
       * @since 2.0.0
       */
      styles: {
        type: Object as PropType<Styles>,
      },

      /**
       * the color of the picker
       * @type String
       * @values red | pink | orange | green | purple | gray
       * @since 2.0.0
       */
      color: {
        type: String as PropType<
          'blue' | 'red' | 'pink' | 'orange' | 'green' | 'purple' | 'gray'
        >,
        validator: (val: string) =>
          ['blue', 'red', 'pink', 'orange', 'green', 'purple', 'gray'].includes(
            val
          ),
      },

      /**
       * use two input for dispaly
       * @type Boolean
       * @default false
       * @since 2.2.0
       */
      dualInput: {
        type: Boolean,
        default: false,
      },

      /**
       * show icon inside of input
       * @type Boolean
       * @default false
       * @since 2.2.0
       */
      iconInside: {
        type: Boolean,
        default: false,
      },

      /**
       * shortcut for select date and time quickly
       * @type Boolean | Object
       * @since 2.2.0
       */
      shortcut: {
        type: [Boolean, Object] as PropType<boolean | Shortcuts>,
        default: false,
      },
    },
    emits: ['open', 'close', 'select', 'submit', 'update:modelValue'],
    data() {
      return {
        core: new PersianDate(),
        onDisplay: undefined as PersianDate | undefined,
        fromDate: undefined as PersianDate | undefined,
        toDate: undefined as PersianDate | undefined,
        selectedDates: [] as PersianDate[],
        selectedTimes: [] as PersianDate[],
        showDatePicker: false,
        showYearSelect: false,
        showMonthSelect: false,
        showTopOfInput: false,
        displayValue: [] as string[],
        inputName: 'firstInput' as Inputs,
        pickerPlace: {} as PickerPlace,
        documentWidth: window.innerWidth,
        langs: Core.langs,
        currentLocale: this.locale.split(',')[0],
        interval: null as number | null,
      };
    },
    computed: {
      lang(): Langs[string] {
        return this.langs[this.currentLocale];
      },
      attrs(): Attrs {
        const attrs: Attrs = {
          div: { class: 'pdp-group' },
          label: { class: 'pdp-label' },
          alt: {},
          picker: { class: 'pdp-picker' },
          firstInput: { class: 'pdp-input' },
          secondInput: { class: 'pdp-input' },
        };
        for (const key in this.$attrs) {
          try {
            const [, group, attr] = key.match(
              /(div|label|alt|picker|firstInput|secondInput)-(.*)/
            ) as [void, keyof Attrs, string];
            attrs[group][attr] = this.$attrs[key];
          } catch {
            attrs['firstInput'][key] = this.$attrs[key] as string;
          }
        }
        attrs.picker.class = [
          attrs.picker.class,
          {
            'pdp-top': this.pickerPlace.top,
            'pdp-left': this.pickerPlace.left,
            'pdp-right': this.pickerPlace.right,
          },
          this.lang.dir.picker,
        ];
        if (this.mode == 'single' && this.dualInput) {
          attrs['secondInput'].disabled = true;
        }
        if (this.showDatePicker) {
          attrs[this.inputName].class += ' pdp-focus';
        }
        return attrs;
      },
      years(): number[] {
        let start: number = this.fromDate!.year();
        const end: number = this.toDate!.year();
        return Array(end - start + 1)
          .fill(null)
          .map(() => start++);
      },
      columnCount(): number {
        let column = 2;
        if (Core.isNumber(this.column)) {
          column = this.column as number;
        } else {
          const breakpoint = Object.keys(this.column)
            .sort((a, b) => +a - +b)
            .find((bp) => this.documentWidth <= +bp);
          if (breakpoint) column = (this.column as Obj)[breakpoint] as number;
        }
        if (this.type.includes('time')) {
          const scale = column / (this.mode == 'single' ? 1 : 2);
          (this.$refs.root as HTMLElement).style.setProperty(
            '--time-scale',
            (scale > 1 ? scale : 1) + ''
          );
        }
        return column;
      },
      monthDays(): MonthDays[][] {
        let months: MonthDays[][] = [];
        for (let i = 0; i < this.columnCount; i++) {
          let emptyCells;
          const selectedYear = this.onDisplay!.clone().addMonth(i).year();
          const selectedMonth = this.onDisplay!.clone().addMonth(i).month();
          emptyCells = +this.onDisplay!.clone()
            .parse(selectedYear, selectedMonth, 1)
            .toString('?d');
          let daysOfMonthNumber = this.onDisplay!.getDaysInMonth(
            selectedYear,
            selectedMonth
          );
          const numberOfWeek = Math.ceil((daysOfMonthNumber + emptyCells) / 7);
          let month: MonthDays[] = [];
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
                  raw: this.onDisplay!.clone().addMonth(i).date(showDay),
                  startRange:
                    this.selectedDates[0] &&
                    this.selectedDates[0].isSame(
                      selectedYear,
                      selectedMonth,
                      showDay
                    ),
                  endRange:
                    this.selectedDates[1] &&
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
                        ...(this.selectedDates.map((date) =>
                          date.toString()
                        ) as [string, string])
                      ),
                  disabled:
                    !this.checkDate(
                      this.onDisplay!.clone().addMonth(i).date(showDay),
                      'date'
                    ) ||
                    this.isInDisable(
                      this.onDisplay!.clone().addMonth(i).date(showDay)
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
      months(): Months {
        const months: Months = {};
        for (let i = 1; i <= 12; i++) {
          months[i] = {
            label: this.lang.months[i - 1],
            selected: this.onDisplay!.month() == i,
            disabled: !this.checkDate(
              this.onDisplay!.clone().month(i),
              'month'
            ),
          };
        }
        return months;
      },
      nextLocale(): string {
        const locales = this.locale.split(',');
        const index = locales.indexOf(this.currentLocale);
        const locale = locales[index + 1] || locales[0];
        return this.langs[locale].translations.label;
      },
      formats(): Formats {
        const displayFormat: Obj<string, TypePart | 'datetime'> = {
          date: '?D ?MMMM',
          datetime: '?D ?MMMM HH:mm',
          time: 'HH:mm',
        };
        const format: Obj<string, TypePart | 'datetime'> = {
          date: 'YYYY-MM-DD',
          datetime: 'YYYY-MM-DD HH:mm',
          time: 'HH:mm',
        };
        return {
          model: this.format || format[this.type],
          input: this.inputFormat || this.lang.inputFormat || this.type,
          display:
            this.displayFormat ||
            this.lang.displayFormat ||
            displayFormat[this.type],
          alt:
            (this.attrs.alt.format as string) ||
            this.format ||
            format[this.type],
        };
      },
      defaultDate(): DefaultDate {
        const prefix =
          this.type === 'time' ? this.core.toString('jYYYY/jMM/jDD') + ' ' : '';
        return {
          from: prefix + this.from,
          to: prefix + this.to,
        };
      },
      inputs(): Inputs[] {
        return !this.dualInput ? ['firstInput'] : ['firstInput', 'secondInput'];
      },
      tabIndex(): number | undefined {
        return (
          +(this.attrs.secondInput.tabindex || this.attrs.firstInput.tabindex) +
            1 || undefined
        );
      },
      shortcuts(): Shortcuts | boolean {
        if (!this.shortcut) {
          return false;
        }
        const shortcuts: Shortcuts = {};
        const part = this.type.includes('date') ? 'date' : 'time';
        let d = this.core.clone().now();
        if (part == 'time' && !this.validate(d, part))
          d = this.toDate!.clone().subDay().now();

        const checkDate = (dates: PersianDate[]) => {
          return this.mode === 'single'
            ? this.validate(dates[0], part)
            : dates.some((d) => this.validate(d, part)) &&
                !this.isDisableBetween(
                  ...(dates as [PersianDate, PersianDate])
                );
        };
        const setShortcut = (obj: Shortcuts, fromProps = false) => {
          for (const phrase in obj) {
            const dates = fromProps
              ? obj[phrase].map((date: PersianDate) =>
                  part == 'date'
                    ? d.clone().fromJalali(date)
                    : d.clone().time(date)
                )
              : obj[phrase];
            if (checkDate(dates)) {
              shortcuts[phrase] =
                this.type == 'date'
                  ? dates.map((d: PersianDate) => d.startOf('date'))
                  : dates;
            }
          }
        };

        if (this.shortcut === true) {
          setShortcut(
            Core.getShortcuts(
              d,
              `${part}-${this.mode}`,
              this.lang.translations
            )!
          );
        } else {
          setShortcut(this.shortcut, true);
        }
        return shortcuts;
      },
    },
    watch: {
      show: {
        handler: function (val) {
          this.showDatePicker = val;
        },
      },
      showDatePicker: {
        handler: function (val) {
          if (val) this.$emit('open');
          else {
            if (!this.modal)
              document.removeEventListener('scroll', this.locate);
            this.$emit('close');
          }
        },
      },
      from: {
        handler: function (val) {
          this.fromDate!.fromJalali(val);
        },
      },
      to: {
        handler: function (val) {
          this.toDate!.fromJalali(val);
        },
      },
      mode: {
        handler: function (val) {
          if (val == 'single' && this.selectedDates.length == 2)
            this.selectedDates.pop();
        },
      },
      locale: {
        handler: function (val, oldVal) {
          const index = oldVal.split(',').indexOf(this.currentLocale);
          this.currentLocale = val.split(',')[index];
        },
      },
      localeConfig: {
        handler: function (val) {
          this.langs = Core.mergeObject(this.langs, val) as Langs;
        },
        deep: true,
      },
      styles: {
        handler: function (val) {
          Core.setStyles(val, this.$refs.root as HTMLElement);
        },
        deep: true,
      },
      color: {
        handler: function (val) {
          Core.setColor(val, this.$refs.root as HTMLElement);
        },
      },
    },
    beforeMount() {
      this.langs = Core.mergeObject(this.langs, this.localeConfig) as Langs;
    },
    mounted() {
      Core.setColor(this.color, this.$refs.root as HTMLElement);
      Core.setStyles(this.styles, this.$refs.root as HTMLElement);

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

      const val = this.$attrs.modelValue as string | string[];
      if (val) {
        this.setDate(val);
      } else {
        const today = this.core.clone();
        if (this.type == 'date') today.startOf('date');
        if (this.checkDate(today, 'date')) {
          this.onDisplay = today;
        } else {
          this.onDisplay = this.nearestDate(today).startOf('date');
        }
      }
      window.addEventListener('resize', () => {
        this.documentWidth = window.innerWidth;
      });
      if (this.type != 'date') {
        this.onDisplay!.time(this.core as PersianDate);
      }
      this.showDatePicker = this.show;
    },
    methods: {
      showPart(part: CalendarPart): void {
        if (part == 'year') {
          this.showMonthSelect = false;
          this.showYearSelect = !this.showYearSelect;
          if (this.showYearSelect) {
            this.$nextTick(() => {
              const selectedYearTop = (
                (this.$refs.pdpSelectYear as HTMLElement).querySelector(
                  'li.selected'
                ) as HTMLLIElement
              ).offsetTop;
              (this.$refs.pdpSelectYear as HTMLElement).scroll({
                top: selectedYearTop,
                behavior: 'smooth',
              });
            });
          }
        } else if (part == 'month') {
          this.showYearSelect = false;
          this.showMonthSelect = !this.showMonthSelect;
        }
      },
      changeSelectedMonth(month: 'add' | 'sub' | number): void {
        const clone = this.onDisplay!.clone();
        if (month == 'add') {
          this.onDisplay!.addMonth();
        } else if (month == 'sub') {
          this.onDisplay!.subMonth();
        } else this.onDisplay!.month(month);
        if (this.checkDate(this.onDisplay, 'month'))
          this.showMonthSelect = false;
        else this.onDisplay = clone;
      },
      changeSelectedYear(year: number): void {
        this.onDisplay!.year(year);
        if (!this.checkDate(this.onDisplay, 'date'))
          this.onDisplay = this.nearestDate(this.onDisplay as PersianDate);
        this.showYearSelect = false;
      },
      validate(date: PersianDate, part: TypePart): boolean {
        if (!this.checkDate(date, part) || this.isInDisable(date)) return false;
        return true;
      },
      isDisableBetween(first: PersianDate, second: PersianDate): boolean {
        if (!this.disable) return false;
        if (this.type != 'datetime' && Core.isString(this.disable)) {
          const date =
            this.type == 'time'
              ? second.clone().time(this.disable as string)
              : this.disable;
          return this.core
            .clone()
            .parse(date as PersianDate | string)
            .isBetween(first.toString(), second.toString());
        } else if (
          this.type != 'datetime' &&
          Array.isArray(this.disable) &&
          this.disable.some((date) => Core.isString(date))
        ) {
          return this.disable.some((date) => {
            if (this.type == 'time')
              date = second
                .clone()
                .time(date as string)
                .toString();
            return this.core
              .clone()
              .parse(date as string)
              .isBetween(first, second);
          });
        } else if (this.type != 'time') {
          const inRangeDate = second.clone().startOf('date').subDay();
          while (!inRangeDate.isSameOrBefore(first)) {
            if (this.isInDisable(inRangeDate)) return true;
            inRangeDate.subDay();
          }
        }
        return false;
      },
      selectDate(date: PersianDate, part: TypePart): number {
        let isValid = this.validate(date, part);
        if (!isValid) {
          return -1;
        } else if (this.mode == 'range' && this.selectedDates.length == 1) {
          isValid = !this.isDisableBetween(
            this.selectedDates[0] as PersianDate,
            date
          );
          if (!isValid) {
            return -2;
          }
        }
        if (this.type == 'date') {
          date.startOf('date');
        }
        if (this.mode == 'single') {
          this.selectedDates = [date];
        } else if (this.mode == 'range') {
          (this.$refs.pdpMain as HTMLElement).addEventListener(
            'mouseover',
            this.selectInRangeDate
          );
          if (this.selectedDates.length === 0) {
            this.selectedDates[0] = date;
            this.inputName = 'secondInput';
          } else if (this.inputName === 'secondInput') {
            this.inputName = 'firstInput';
            if (!date.isBefore(this.selectedDates[0] as PersianDate)) {
              this.selectedDates[1] = date;
            } else {
              if (this.selectedDates.length === 1)
                this.selectedDates.unshift(date);
              else {
                this.selectedDates = [date];
                this.inputName = 'secondInput';
              }
            }
          } else {
            this.selectedDates = [date];
            this.inputName = 'secondInput';
          }
          if (this.selectedDates.length == 2) {
            (this.$refs.pdpMain as HTMLElement).removeEventListener(
              'mouseover',
              this.selectInRangeDate
            );
          }
        }

        if (this.type == 'datetime') {
          this.selectedDates = this.selectedDates.map((d, i) => {
            if (this.selectedTimes[i]) {
              d.time(this.selectedTimes[i] as PersianDate);
            }
            this.selectedTimes[i] = d;
            return d;
          });
        }

        this.$emit('select', date);
        if (
          this.autoSubmit &&
          (this.mode !== 'range' ||
            (this.mode === 'range' && this.selectedDates.length == 2))
        ) {
          this.submitDate();
          return 1;
        }
        return 0;
      },
      setModel(date?: PersianDate | PersianDate[] | string | string[]): void {
        if (date === undefined) {
          date = this.selectedDates.map((el) => {
            return el.toString(this.formats.model);
          });
          if (this.mode == 'single') date = date[0];
        }
        this.$emit('update:modelValue', date);
      },
      goToToday(): void {
        this.showMonthSelect = this.showYearSelect = false;
        this.onDisplay = this.core.now().clone();
        if (this.type.includes('time') && this.selectedDates.length) {
          const lastIndex = this.selectedDates.length - 1;
          let time = this.selectedDates[lastIndex];
          time.time(this.onDisplay as PersianDate);
          if (this.selectedTimes[lastIndex]) {
            this.selectedTimes[lastIndex] = time.clone();
          }
          if (
            this.autoSubmit &&
            this.checkDate(time, 'time') &&
            !this.isInDisable(time as PersianDate)
          )
            this.submitDate(false);
        }
        if (this.type.includes('date'))
          this.$nextTick(() => {
            document.querySelector('.pdp-day.today')!.classList.add('tada');
            setTimeout(() => {
              document
                .querySelector('.pdp-day.today')!
                .classList.remove('tada');
            }, 1000);
          });
      },
      checkDate(date: unknown, part: CalendarPart | TypePart): boolean {
        let from, to;
        if (!Core.isPersianDate(date))
          date = this.core.clone().parse(date as PersianDate);
        switch (part) {
          case 'year':
            from = this.fromDate!.toString('?YYYY');
            to = this.toDate!.toString('?YYYY');
            break;
          case 'month':
            from = this.fromDate!.toString('?YYYY/?MM');
            to = this.toDate!.toString('?YYYY/?MM');
            break;
          case 'date':
            from = this.fromDate!.toString();
            to = this.toDate!.toString();
            break;
          case 'time':
            from = this.fromDate!.toString(
              this.type.includes('time') ? 'datetime' : 'date'
            );
            to = this.toDate!.toString(
              this.type.includes('time') ? 'datetime' : 'date'
            );
            break;
        }
        return (date as PersianDate).isBetween(from, to, '[]');
      },
      isInDisable(date: PersianDate, disable?: Disable): boolean {
        if (!this.disable) return false;
        disable = disable || this.disable;
        date = Core.isPersianDate(date)
          ? date.clone()
          : this.core.clone().parse(date);
        if (Core.isString(disable)) {
          if (this.type == 'time') disable = date.toString() + ' ' + disable;
          return date.calendar('jalali').isSame(disable as string);
        } else if (disable instanceof RegExp) {
          const format = {
            date: 'jYYYY/jM/jD',
            datetime: 'jYYYY/jM/jD H:m',
            time: 'H:m',
          };
          return disable.test(date.toString(format[this.type]));
        } else if (Core.isFunction(disable)) {
          return (disable as (date: PersianDate) => boolean)(date);
        } else if (Array.isArray(disable)) {
          return disable.some((val) => {
            if (Core.isString(val)) {
              if (this.type == 'time') val = date.toString() + ' ' + val;
              return date.calendar('jalali').isSame(val as string);
            } else if (val instanceof RegExp) {
              const format = {
                date: 'jYYYY/jM/jD',
                datetime: 'jYYYY/jM/jD H:m',
                time: 'H:m',
              };
              return val.test(date.toString(format[this.type]));
            }
          });
        } else {
          return false;
        }
      },
      showPicker(el: 'icon' | 'input', inputName: Inputs): void {
        if (this.clickOn == 'all' || this.clickOn == el) {
          if (this.dualInput) this.inputName = inputName;
          (this.$refs[inputName] as HTMLElement).focus();
          this.showDatePicker = true;
          if (!this.modal) {
            this.$nextTick(() => {
              this.locate();
            });
            document.addEventListener('scroll', this.locate);
          }
        }
      },
      async selectWithArrow(e: KeyboardEvent): Promise<void> {
        //FIXME: refactor
        //FIXME: when up arraw press go to last date
        // [37, 38, 39, 40] are key codes of arrow keys
        if (
          ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)
        ) {
          const arrow = {
            ArrowLeft: 1, // for left arrow must one day add in rtl picker
            ArrowUp: -7, // for up arrow must seven day subtract in rtl picker
            ArrowRight: -1, // for right arrow must one day subtract in rtl picker
            ArrowDown: 7, // for down arrow must seven day add in rtl picker
          };
          let numberOfDay = arrow[e.key as keyof typeof arrow];
          if (
            this.lang.dir.picker == 'ltr' &&
            ['ArrowLeft', 'ArrowRight'].includes(e.key)
          )
            numberOfDay = -numberOfDay;
          let focusedDay: HTMLElement | NodeListOf<HTMLElement> =
            document.querySelectorAll('.pdp .pdp-day.hover');
          if (!focusedDay.length) {
            focusedDay = document.querySelectorAll(
              '.pdp .pdp-day.start-range,.pdp .pdp-day.end-range'
            );
          }
          focusedDay = focusedDay[focusedDay.length - 1];
          if (focusedDay) {
            let column = this.getColumn(focusedDay);
            focusedDay.classList.remove('hover');
            const firstColumnMonth = this.onDisplay!.toString();
            let focusedMonth = this.onDisplay!.clone().addMonth(column);
            let nextElementValue: PersianDate | number = focusedMonth
              .date(focusedDay.innerText)
              .addDay(numberOfDay);
            if (!this.checkDate(nextElementValue, 'date'))
              return focusedDay.classList.add('hover');
            nextElementValue = nextElementValue.date();
            column = focusedMonth.diff(firstColumnMonth, 'month');
            if (column < 0) {
              this.onDisplay!.subMonth(this.columnCount);
              column = this.columnCount - 1;
            } else if (column >= this.columnCount) {
              this.onDisplay!.addMonth(this.columnCount);
              column = 0;
            }
            await this.$nextTick(() => {
              focusedDay = document.querySelector(
                `.pdp .pdp-main .pdp-column[data-column='${column}'] .pdp-day[value='${nextElementValue}']`
              ) as HTMLElement;
              focusedDay.classList.add('hover');
            });
          } else {
            focusedDay = document.querySelector(
              '.pdp .pdp-day:not(.empty):not(.disabled)'
            ) as HTMLElement;
            if (focusedDay) focusedDay.classList.add('hover');
            else {
              focusedDay = document.querySelector(
                `.pdp .pdp-main .pdp-column[data-column="0"] .pdp-day[value="${this.fromDate!.date()}"]`
              ) as HTMLElement;
              focusedDay.classList.add('hover');
            }
          }
          if (this.mode === 'range' && this.selectedDates.length == 1) {
            this.selectInRangeDate({ target: focusedDay } as MouseEvent);
          }
        } else if (e.key == 'Enter') {
          // 13 is key code of Enter key
          e.preventDefault();
          const focusedDay = document.querySelector(
            '.pdp .pdp-day.hover'
          ) as HTMLElement;
          if (focusedDay) {
            this.selectDate(
              this.onDisplay!.clone()
                .addMonth(this.getColumn(focusedDay) || 0)
                .date(focusedDay.innerText),
              'date'
            );
          } else {
            let onDisplay;
            this.displayValue.forEach((value, index) => {
              if (!value) return false;
              if (this.type == 'time') {
                const time = value.split(/[/ -.,:\\]/);
                if (this.checkDate(this.core.clone(), 'time'))
                  onDisplay = this.core.clone();
                else onDisplay = this.fromDate!.clone();
                onDisplay.time(time as [string]);
              } else {
                onDisplay = this.core.clone().parse(value);
              }
              if (this.selectDate(onDisplay, 'time') === 0) {
                const diff = onDisplay.diff(
                  this.onDisplay as PersianDate,
                  'month'
                );
                if (diff < 0 || diff >= this.columnCount)
                  this.onDisplay = onDisplay.clone();
                this.displayValue[index] = '';
              }
            });
          }
        }
      },
      selectInRangeDate(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('pdp-day')) return;
        document.querySelectorAll(`.pdp .pdp-day`).forEach((el) => {
          el.classList.remove('in-range');
        });

        let column = this.getColumn(target);
        let hoveredDate = this.onDisplay!.clone()
          .startOf('date')
          .addMonth(column)
          .date(target.innerText);
        const selectedDate = this.selectedDates[0].clone().startOf('date');
        const number = hoveredDate.isAfter(selectedDate) ? 1 : -1;
        const selectedDateDOM = document.querySelector(
          '.pdp-day.start-range,.pdp-day.end-range'
        ) as HTMLElement;
        if (selectedDateDOM) {
          column = +this.getColumn(selectedDateDOM);
          selectedDateDOM.classList.replace(
            ...((hoveredDate.isBefore(selectedDate)
              ? ['start-range', 'end-range']
              : ['end-range', 'start-range']) as [string, string])
          );
        } else {
          selectedDate.parse(this.onDisplay as PersianDate);
          if (number === 1) {
            selectedDate.startOf('month').subDay();
            column = -1;
          } else {
            selectedDate
              .addMonth(this.columnCount - 1)
              .endOf('month')
              .addDay()
              .startOf('date');
            column = this.columnCount;
          }
        }
        while (!hoveredDate.isSame(selectedDate)) {
          const oldMonth = selectedDate.month();
          selectedDate.addDay(number);
          if (oldMonth != selectedDate.month()) {
            column += number;
          }
          if (
            this.checkDate(selectedDate, 'date') &&
            !this.isInDisable(selectedDate)
          ) {
            document
              .querySelector(
                `.pdp-column[data-column='${column}'] .pdp-day[value='${selectedDate.date()}']`
              )!
              .classList.add('in-range');
          } else {
            break;
          }
        }
      },
      submitDate(close = true): void {
        const displayDate = this.selectedDates.map((el) => {
          return el.toString(this.formats.input);
        });
        if (this.dualInput) this.displayValue = displayDate;
        else this.displayValue[0] = displayDate.join(' - ');
        this.setModel();
        this.$emit(
          'submit',
          this.mode === 'range' ? this.selectedDates : this.selectedDates[0]
        );
        if (close) {
          this.showDatePicker = false;
        }
      },
      getColumn({ parentNode }: HTMLElement): number | string {
        return (parentNode!.parentNode!.parentNode as HTMLElement).dataset
          .column!;
      },
      nearestDate(date: PersianDate): PersianDate {
        return Math.abs(date.diff(this.fromDate as PersianDate)) <=
          Math.abs(date.diff(this.toDate as PersianDate))
          ? this.fromDate!.clone()
          : this.toDate!.clone();
      },
      locate(): void {
        this.pickerPlace = {
          top: false,
          left: false,
          right: false,
        };
        this.$nextTick(() => {
          const input = this.$refs.firstInput as HTMLInputElement;
          const inputOffset =
            input.offsetHeight + input.getBoundingClientRect().top;
          const picker = this.$refs.pdpPicker as HTMLElement;
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
      changeLocale(): void {
        const locales = this.locale.split(',');
        const index = locales.indexOf(this.currentLocale);
        this.currentLocale = locales[index + 1] || locales[0];
        const calendar = this.lang.calendar;
        this.core.calendar(calendar);
        this.fromDate!.calendar(calendar);
        this.toDate!.calendar(calendar);
        this.onDisplay!.calendar(calendar);
        for (const date of this.selectedDates) {
          date.calendar(calendar);
        }
        this.submitDate(false);
      },
      clear(inputName: Inputs): void {
        const inputIndex = inputName === 'firstInput' ? 0 : 1;

        this.displayValue[inputIndex] = '';
        if (this.dualInput) {
          const values = this.$attrs.value;
          if (values && Array.isArray(values))
            return this.setModel(
              values.map((val, i) => (i == inputIndex ? null : val))
            );
        }
        this.setModel('');
      },
      startChangeTime(
        timeIndex: 0 | 1,
        unit: 'minute' | 'hour',
        operator: 'add' | 'sub'
      ) {
        let time = this.selectedTimes[timeIndex];
        if (!time) {
          time = this.core.clone();
          if (!this.checkDate(time, 'time')) {
            time = this.toDate!.clone()
              .subDay()
              .time(this.core as PersianDate);
          }
          if (timeIndex == 1 && !this.selectedTimes.length)
            this.selectedTimes.push(time.clone());
          this.selectedTimes.push(time);
        }
        this.stopChangeTime();
        const maxAmount = unit == 'hour' ? 23 : 59;
        let currentAmount = time[unit]();
        const changeTime = () => {
          if (operator == 'add') {
            currentAmount++;
            if (currentAmount > maxAmount) currentAmount = 0;
          } else {
            currentAmount--;
            if (currentAmount < 0) currentAmount = maxAmount;
          }
          if (!this.checkDate(time[unit](currentAmount), 'time')) {
            time.parse(
              time.isSameOrAfter(this.toDate!.clone())
                ? this.toDate!.clone()
                : this.fromDate!.clone()
            );
          } else if (
            this.selectedTimes.length == 2 &&
            this.selectedTimes[0].isAfter(this.selectedTimes[1] as PersianDate)
          ) {
            time.parse(
              (timeIndex == 0
                ? this.selectedTimes[1]
                : this.selectedTimes[0]) as PersianDate
            );
          }
          if (!this.isInDisable(time as PersianDate)) {
            if (this.type == 'time') {
              this.selectedDates[timeIndex] = time;
            } else if (this.selectedDates[timeIndex]) {
              this.selectedDates[timeIndex].time(time as PersianDate);
            }
            this.$emit('select', time);
            if (
              this.autoSubmit &&
              !this.selectedTimes.some((sTime) =>
                this.isInDisable(sTime as PersianDate)
              )
            )
              this.submitDate(false);
          }
        };
        changeTime();
        this.interval = setInterval(changeTime, 100);
      },
      stopChangeTime() {
        clearInterval(this.interval!);
      },
      selectShorcut(dates: PersianDate[]) {
        this.selectedDates = dates.map((date, i) => {
          if (i == 0) this.onDisplay = date.clone();
          this.$emit('select', date);
          return date.clone();
        });
        if (this.autoSubmit) {
          this.submitDate();
        }
      },
      setDate(dates: string | string[]) {
        if (!dates) return;
        if (this.mode == 'single' && typeof dates === 'string') dates = [dates];
        (dates as string[]).some((d, index) => {
          const date = this.core
            .clone()
            .fromGregorian(
              (this.type == 'time'
                ? this.core.toString('YYYY-MM-DD') + ' '
                : '') + d
            );
          if (Core.isPersianDate(date)) {
            this.selectedDates.push(date.clone());
            this.selectedTimes.push(date.clone());
            if (index == 0) this.onDisplay = date.clone();
          } else {
            this.selectedDates = this.selectedTimes = [];
            return true;
          }
        });
        if (this.selectedDates.length) this.submitDate();
      },
    },
  });
</script>

<style lang="scss">
  @import './assets/sass/app.scss';
</style>
