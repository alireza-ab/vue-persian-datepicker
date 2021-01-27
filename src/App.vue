<template>
	<div id="app" class="rtl">
		<!-- <form action="">
			<date-picker
				v-model="date"
				tabindex="1"
				:locale-config="localeConfig"
				type="datetime"
				from="1398/11/30"
				to="1399/6/30"
				:auto-submit="false"
				label="Please select the date:"
				label-id="label"
				div-id="div"
				:clearable="true"
				:show="show"
				name="date"
				mode="range"
				disable="1398/11/30"
				id="date"
				:modal="false"
				locale="fa,ar,en"
				color="indigo"
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
			</date-picker>
			<div class="show">date is: {{ date }}</div>

			<button type="submit">submit</button>
		</form> -->
		<date-picker style="margin-bottom:2rem;"></date-picker>
		<date-picker color="red" style="margin-bottom:2rem;"></date-picker>
		<date-picker color="pink" style="margin-bottom:2rem;"></date-picker>
		<date-picker color="green" style="margin-bottom:2rem;"></date-picker>
		<date-picker color="orange" style="margin-bottom:2rem;"></date-picker>
		<date-picker color="purple" style="margin-bottom:2rem;"></date-picker>
		<date-picker color="gray" style="margin-bottom:2rem;"></date-picker>
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
				localeConfig: {
					fa: {
						inputFormat: {
							date: "jYYYY/jMM",
							datetime: "jYYYY/jMM",
							time: "jYYYY/jMM",
						},
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
							today: "بوم",
							submit: "التایید",
						},
						inputFormat: {
							date: "date",
							datetime: "datetime",
							time: "time",
						},
						displayFormat: {
							date: "?D ?MMMM",
							datetime: "?D ?MMMM HH:mm",
							time: "HH:mm",
						},
					},
				},
				styles: { "primary-color": "blue", "secondary-color": "red" },
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
	// @font-face {
	// 	font-family: Shabnam;
	// 	src: url("file:///home/alireza/Downloads/shabnam-font-5.0.1/dist/Shabnam.eot");
	// 	src: url("file:///home/alireza/Downloads/shabnam-font-5.0.1/dist/Shabnam.eot?#iefix")
	// 			format("embedded-opentype"),
	// 		url("file:///home/alireza/Downloads/shabnam-font-5.0.1/dist/Shabnam.woff2")
	// 			format("woff2"),
	// 		url("file:///home/alireza/Downloads/shabnam-font-5.0.1/dist/Shabnam.woff")
	// 			format("woff"),
	// 		url("file:///home/alireza/Downloads/shabnam-font-5.0.1/dist/Shabnam.ttf")
	// 			format("truetype");
	// 	font-weight: normal;
	// }

	#app {
		font-family: Shabnam !important;
		margin: 1px;
		padding: 30rem 0;
		direction: rtl;
		font-size: 16px;
	}

	.show {
		margin-top: 1rem;
	}
</style>
