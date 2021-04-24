<template>
  <div id="app">
    <form action="">
      <date-picker shortcut :auto-submit="false" mode="single"></date-picker>
      <date-picker dual-input shortcut :auto-submit="false"></date-picker>
      <date-picker dual-input icon-inside clearable></date-picker>
      <date-picker dual-input clearable></date-picker>
      <date-picker icon-inside clearable></date-picker>
      <date-picker clearable></date-picker>
      <date-picker
        dual-input
        icon-inside
        clearable
        locale="en"
        :locale-config="ltrDirection"
        from="1399"
        to="1399/6"
      ></date-picker>
      <date-picker
        :locale-config="ltrDirection"
        dual-input
        clearable
      ></date-picker>
      <date-picker
        :locale-config="ltrDirection"
        icon-inside
        clearable
      ></date-picker>
      <date-picker :locale-config="ltrDirection" clearable></date-picker>
      <date-picker dual-input clearable></date-picker>
      <!-- <date-picker type="time"></date-picker> -->
      <!-- <date-picker
				v-model="date"
				tabindex="1"
				:locale-config="localeConfig"
				type="datetime"
				from="1399/6/1"
				to="1399/11/30"
				disable="1399/11/10"
				:auto-submit="false"
				label="Please select the date:"
				label-id="label"
				div-id="div"
				alt-name="date[]"
				:clearable="true"
				:show="show"
				name="date"
				:mode="mode"
				id="date"
				:modal="false"
				locale="fa"
				:color="color"
				:styles="styles"
				@input="input"
				@close="close"
				@blur="blur"
				@focus="focus"
				@open="open"
				@select="select"
				@change="change"
				@submit="submit"
				@keydown="keydown"
			>
			</date-picker> -->
      <div class="show">date is: {{ date }}</div>
      <button type="submit" @click.prevent="show = true">submit</button>
    </form>

    <!-- <date-picker type="datetime" /> -->
  </div>
</template>

<script>
import datePicker, { PersianDate } from "./components/DatePicker";

export default {
  name: "App",
  components: { datePicker },
  data() {
    return {
      date: "",
      show: false,
      core: new PersianDate(),
      ltrDirection: { fa: { dir: { input: "ltr" } } },
      localeConfig: {
        fa: {
          inputFormat: "jYYYY/jMM",
          translations: {
            label: "فارسی",
          },
        },
        en: {
          inputFormat: {
            date: "YYYY",
            datetime: "YYYY",
            time: "YYYY",
          },
          dir: {
            input: "rtl",
          },
        },
        ar: {
          calendar: "gregorian",
          weekdays: "ح_ن_ث_ر_خ_ج_س".split("_"),
          months: [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
          ],
          dir: {
            input: "rtl",
            picker: "ltr",
          },
          translations: {
            label: "قمری",
            text: "تقویم قمری",
            prevMonth: "الماه قبل",
            nextMonth: "الماه بعد",
            now: "بوم",
            submit: "التایید",
          },
          inputFormat: "datetime",
          displayFormat: {
            date: "?D ?MMMM",
            datetime: "?D ?MMMM HH:mm",
            time: "HH:mm",
          },
        },
        fr: {
          calendar: "gregorian",
          weekdays: ["di", "lu", "ma", "me", "je", "ve", "sa"],
          months: [
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre",
          ],
          dir: {
            input: "ltr",
            picker: "ltr",
          },
          translations: {
            label: "فرانسوی",
            text: "Calendrier français",
            prevMonth: "le mois dernier",
            nextMonth: "le mois prochain",
            now: "maintenant",
            submit: "Confirmation",
          },
          inputFormat: "date",
          displayFormat: "D MMMM",
        },
      },
      styles: null,
      mode: "range",
      color: "red",
    };
  },
  methods: {
    open() {
      console.log("opened");
    },
    close() {
      console.log("closed");
    },
    blur(e) {
      e.preventDefault();
      console.log("blured");
    },
    input(e) {
      e.preventDefault();
      console.log("input");
    },
    focus(e) {
      e.preventDefault();
      console.log("focused");
    },
    change(e) {
      console.log(e, "changed");
    },
    select(e) {
      console.log(e.toString("datetime"), "selected");
    },
    submit(e) {
      console.log(e, "submited");
    },
    keydown(e) {
      console.log(e, "keydowned");
    },
  },
  mounted() {
    window.PersianDate = PersianDate;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Shabnam !important;
  margin: 1px;
  padding: 30rem 40rem;
}

.show {
  margin-top: 1rem;
}

.pdp {
  margin: 3rem 0;
}
</style>
