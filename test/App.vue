<template>
	<div id="app">
		<date-picker
			v-bind="props"
			v-model="date"
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

		<div class="show">date is: {{ date }}</div>

		<button class="show-picker" @click="props.show = true">show picker</button>

		<div class="status">{{ status }}</div>
	</div>
</template>

<script>
	import datePicker, { PersianDate } from "../src/components/DatePicker";

	export default {
		name: "App",
		components: { datePicker },
		data() {
			return {
				date: "",
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
		},
		methods: {
			open() {
				this.status += "open";
			},
			close() {
				this.status += "close";
			},
			focus(e) {
				e.preventDefault();
				this.status += "focus";
			},
			blur(e) {
				e.preventDefault();
				this.status += "blur";
			},
			input(e) {
				e.preventDefault();
				this.status += "input";
			},
			submit(e) {
				this.status += "submit:" + e;
			},
			select(e) {
				this.status += "select:" + e.toString();
			},
		},
	};
</script>

<style lang="scss">
	.show {
		margin-top: 1rem;
	}
</style>
