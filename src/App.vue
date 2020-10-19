<template>
	<div id="app" class="rtl">
		<date-picker
			v-model="date"
			tabindex="1"
			required
			from="1398"
			to="1401"
			format="YYYY-MM-DD"
			input-format="jYYYY/jMM/jDD"
			display-format="jDD jMMMM"
			:auto-submit="false"
			:show="show"
			mode="range"
			@input="input"
			@close="close"
			@blur="blur"
			@focus="focus"
			@open="open"
			@select="select"
			@change="change"
		>
		</date-picker>
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
		mounted() {
			console.log(this.core.toString());
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
				console.log(e, "selected");
			},
		},
	};
</script>

<style>
	@font-face {
		font-family: IRANSans;
		font-style: normal;
		font-weight: 300;
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

	body {
		height: 500rem;
		font-family: IRANSans;
	}
	#app {
		margin: 1px;
		padding: 40rem;
	}

	.rtl {
		direction: rtl;
	}
</style>
