import PersianDate from "@alireza-ab/persian-date"

const Core = {
    langs: {
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
                now: "هم اکنون",
                submit: "تایید",
                /* use in shourcuts */
                // date-single
                yesterday: "دیروز",
                tomorrow: "فردا",
                firstOfWeek: "اول هفته",
                lastOfWeek: "آخر هفته",
                // date-range
                thisWeek: "این هفته",
                prevWeek: "هفته قبل",
                nextWeek: "هفته بعد",
                thisMonth: "این ماه",
                // time-single
                oneHourAgo: "یک ساعت قبل",
                oneHourLater: "یک ساعت بعد",
                midnight: "نیمه شب",
                midday: "نیمروز",
                // time-range
                thisHour: "این ساعت",
                prevHour: "ساعت قبل",
                nextHour: "ساعت بعد",
                allDay: "تمام روز"
            },
            inputFormat: "",
            displayFormat: "",
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
                prevMonth: "Previous Month",
                nextMonth: "Next Month",
                now: "Now",
                submit: "Submit",
                /* use in shourcuts */
                // date-single
                yesterday: "Yesterday",
                tomorrow: "Tomorrow",
                firstOfWeek: "First of Week",
                lastOfWeek: "Last of Week",
                // date-range
                thisWeek: "This Week",
                prevWeek: "Previous Week",
                nextWeek: "Next Week",
                thisMonth: "This Month",
                // time-single
                onHourAgo: "One Hour ago",
                onHourLater: "One Hour later",
                midnight: "Midnight",
                midday: "Midday",
                // time-range
                thisHour: "This Hour",
                prevHour: "Previous Hour",
                nextHour: "Next Hour",
                allDay: "All Day"
            },
            inputFormat: "",
            displayFormat: "",
        },
    },
    mergeObject: function (original, changed) {
        let newObject = JSON.parse(JSON.stringify(original));
        for (const key in changed) {
            if (original[key] && Object.prototype.toString.call(changed[key]) === "[object Object]")
                newObject[key] = this.mergeObject(original[key], changed[key])
            else newObject[key] = changed[key];
        }
        return newObject;
    },
    setStyles: function (styles, root) {
        for (const name in styles) {
            root.style.setProperty("--" + name, styles[name]);
        }
    },
    setColor: function (color, root) {
        if (!color)
            return;
        let colors = {}
        switch (color) {
            case "red":
                colors = {
                    "primary-color": "#c7004c",
                    "secondary-color": "#ffaaaa",
                    "in-range-background": "#ffd2d2",
                }
                break;
            case "pink":
                colors = {
                    "primary-color": "#e56ab3",
                    "secondary-color": "#ef87be",
                    "in-range-background": "#fcbcd7",
                }
                break;
            case "orange":
                colors = {
                    "primary-color": "#ffa500",
                    "secondary-color": "#ffbe47",
                    "in-range-background": "#ffe0a6",
                }
                break;
            case "green":
                colors = {
                    "primary-color": "#38a169",
                    "secondary-color": "#89dda3",
                    "in-range-background": "#c6f6d5",
                }
                break;
            case "purple":
                colors = {
                    "primary-color": "#7825d0",
                    "secondary-color": "#c196ed",
                    "in-range-background": "#d4baf3",
                }
                break;
            case "gray":
                colors = {
                    "primary-color": "#494848",
                    "secondary-color": "#909090",
                    "in-range-background": "#b4b4b4",
                }
                break;
            default:
                break;
        }
        this.setStyles(colors, root)
    },
    getLastUnit: function (date, type) {
        const unitsCount = date.split(/[/ -.,:\\]/).length + (type == "time" ? 3 : 0);
        switch (unitsCount) {
            case 1:
                return "year";
            case 2:
                return "month";
            case 3:
                return "date";
            case 4:
                return "hour";
            case 5:
                return "minute";
            case 6:
                return "second";
            default:
                return "millisecond";
        }
    },
    isString: function (val) {
        return typeof val == "string";
    },
    isNumber: function (val) {
        return typeof val == "number";
    },
    isFunction: function (val) {
        return typeof val == "function";
    },
    isPersianDate: function (val) {
        return PersianDate.isPersianDate(val)
    },
}

export { PersianDate, Core }