import type PersianDate from '@alireza-ab/persian-date/typings/PersianDate';
export { PersianDate };

export type Obj<
  T = unknown,
  U extends string | number | symbol = string
> = Record<U, T>;
export type StrOrRegex = string | RegExp;
export type FixedSizeArray<T, N extends number> = {
  [n: number]: T;
  length: N;
};
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, unknown>
    ? RecursivePartial<T[P]>
    : T[P];
};

export type Calendar = 'jalali' | 'gregorian';
export type Dir = 'rtl' | 'ltr';
export type Units =
  | 'year'
  | 'month'
  | 'date'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';
export type TypePart = 'date' | 'time';
export type CalendarPart = 'year' | 'month';

export type Attrs = {
  div: Obj<string | boolean>;
  label: Obj<string | boolean>;
  alt: Obj<string | boolean>;
  picker: Obj;
  firstInput: Obj<string | boolean>;
  secondInput: Obj<string | boolean>;
};
export type MonthDays = Obj<
  {
    empty?: boolean;
    friday?: boolean;
    raw?: PersianDate;
    startRange?: boolean;
    endRange?: boolean;
    inRange?: boolean;
    disabled?: boolean;
    today?: boolean;
    val?: number;
  },
  number
>;
export type Months = Obj<
  {
    label: string;
    selected: boolean;
    disabled: boolean;
  },
  number
>;
export type DefaultDate = { from: string; to: string };
export type Formats = {
  model: string;
  input: string;
  display: string;
  alt: string;
};
export type Shortcuts = Obj<PersianDate[]>;
export type Langs = {
  [locale: string]: {
    calendar: Calendar;
    weekdays: FixedSizeArray<string, 7>;
    months: FixedSizeArray<string, 12>;
    dir: {
      input: Dir;
      picker: Dir;
    };
    translations: {
      label: string;
      text: string;
      prevMonth: string;
      nextMonth: string;
      now: string;
      submit: string;
      /* use in shourcuts */
      // date-single
      yesterday: string;
      tomorrow: string;
      firstOfWeek: string;
      lastOfWeek: string;
      // date-range
      thisWeek: string;
      prevWeek: string;
      nextWeek: string;
      thisMonth: string;
      // time-single
      oneHourAgo: string;
      oneHourLater: string;
      midnight: string;
      midday: string;
      // time-range
      thisHour: string;
      prevHour: string;
      nextHour: string;
      allDay: string;
    };
    inputFormat: string;
    displayFormat: string;
  };
};
export type Styles = {
  'primary-color': string;
  'secondary-color': string;
  'in-range-background': string;
  'text-color': string;
  'hover-color': string;
  'border-color': string;
  'icon-background': string;
  'overlay-color': string;
  'main-box-shadow': string;
  'day-dimensions': string;
  'z-index': string | number;
  'disabled-opacity': string | number;
  'time-scale': string | number;
  radius: string;
  background: string;
};
export type PickerPlace = { top: boolean; right: boolean; left: boolean };
export type Inputs = 'firstInput' | 'secondInput';
export type Disable =
  | StrOrRegex
  | StrOrRegex[]
  | ((date: PersianDate) => boolean);
