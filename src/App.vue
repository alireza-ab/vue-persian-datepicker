<template>
	<div id="app" class="rtl">
		<date-picker
			v-model="date"
			tabindex="1"
			required
			from="1399"
			to="1399/6/31"
			format="YYYY-MM-DD"
			input-format="jYYYY/jMM/jDD"
			display-format="jDD jMMMM"
			:auto-submit="false"
			:show="show"
			mode="range"
			id="date"
			@input="input"
			@close="close"
			@blur="blur"
			@focus="focus"
			@open="open"
			@select="select"
			@change="change"
		>
		</date-picker>
		<div class="show">date is: {{ date }}</div>
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

<style lang="scss">
	#app {
		margin: 1px;
		padding: 30rem 0;
	}

	.show {
		margin-top: 1rem;
	}
</style>
