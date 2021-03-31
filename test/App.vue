<template>
	<div id="app">
		<date-picker
			v-bind="props"
			v-model="model"
			@input="input"
			@close="close"
			@blur="blur"
			@focus="focus"
			@open="open"
			@select="select"
			@submit="submit"
		>
			<div
				v-for="(slot, name) in slots"
				:key="name"
				:slot="name"
				v-html="slot"
			></div>
		</date-picker>

		<div class="show">date/time is: {{ model }}</div>

		<button class="show-picker" @click="props.show = true">show picker</button>

		<div class="status" style="display:none;">{{ status }}</div>
	</div>
</template>

<script>
	import datePicker, { PersianDate } from "../src/components/DatePicker";
	window.PersianDate = PersianDate;
	export default {
		name: "App",
		components: { datePicker },
		data() {
			return {
				model: "",
				status: "",
				props: require("./props.json"),
				slots: require("./slots.json"),
			};
		},
		beforeMount() {
			if (this.props.disableR) {
				this.props.disable = new RegExp(this.props.disableR);
				delete this.props.disableR;
			} else if (this.props.disableF) {
				this.props.disable = eval(this.props.disableF);
				delete this.props.disableF;
			}
			if (this.props.model) this.model = this.props.model;
		},
		methods: {
			open() {
				this.status += "open";
			},
			close() {
				this.status += "close";
			},
			focus(e, inputNumber) {
				e.preventDefault();
				this.status += "focus:" + inputNumber;
			},
			blur(e, inputNumber) {
				e.preventDefault();
				this.status += "blur:" + inputNumber;
			},
			input(e, inputNumber) {
				e.preventDefault();
				this.status += "input:" + inputNumber;
			},
			submit(e) {
				this.status +=
					"submit:" +
					(Array.isArray(e)
						? e.map((date) => date.toString(this.props.type || "date"))
						: e.toString(this.props.type || "date"));
			},
			select(e) {
				this.status += "select:" + e.toString(this.props.type || "date");
			},
		},
	};
</script>

<style lang="scss">
	.show {
		margin-top: 1rem;
	}
</style>
