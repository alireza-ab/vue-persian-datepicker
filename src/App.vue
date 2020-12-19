<template>
	<div id="app" class="rtl">
		<form action="">
			<date-picker
				v-model="date"
				tabindex="1"
				from="1399/01/01"
				to="1399/6/31"
				format="YYYY-MM-DD"
				input-format="jYYYY/jMM/jDD"
				display-format="jDD jMMMM"
				:auto-submit="false"
				label="Please select the date:"
				:clearable="true"
				:show="show"
				mode="range"
				id="date"
				:modal="false"
				locale="fa,en"
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

			<date-picker locale="en,fa"></date-picker>
			<button type="reset">submit</button>
		</form>
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
				// console.log("blured");
			},
			input(e) {
				e.preventDefault();
				// console.log("input");
			},
			focus(e) {
				e.preventDefault();
				// console.log("focused");
			},
			change(e) {
				// console.log(e, "changed");
			},
			select(e) {
				console.log(e, "selected");
			},
			submit(e) {
				console.log(e, "submited");
			},
			keydown(e) {
				// console.log(e, "keydowned");
			},
		},
	};
</script>

<style lang="scss">
	@font-face {
		font-family: iran-b;
		font-style: normal;
		font-weight: 500;
		src: url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Medium.5a25001.eot);
		src: url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Medium.5a25001.eot?#iefix)
				format("embedded-opentype"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Medium.8451859.woff2)
				format("woff2"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Medium.32cc237.woff)
				format("woff"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Medium.caa93b1.ttf)
				format("truetype");
	}
	@font-face {
		font-family: iran;
		font-style: normal;
		font-weight: 300;
		src: url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Light.fe61680.eot);
		src: url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Light.fe61680.eot?#iefix)
				format("embedded-opentype"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Light.d11c490.woff2)
				format("woff2"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Light.74955f1.woff)
				format("woff"),
			url(https://cdn.raadina.com/raadina/fonts/IRANSansWeb_Light.1604933.ttf)
				format("truetype");
	}

	#app {
		font-family: iran-b !important;
		margin: 1px;
		padding: 30rem 0;
		direction: rtl;
		font-size: 16px;
	}

	.show {
		margin-top: 1rem;
	}
</style>
