<template>
	<div id="app" class="rtl">
		<date-picker
			v-model="date"
			placeholder="لطفا یک تاریخ را انتخاب کنید"
			tabindex="1"
			required
			from="1399"
			to="1399/12/15"
			format="YYYY-MM-DD"
			input-format="jYYYY/jMM/jDD"
			display-format="jDD jMMMM"
			:auto-submit="false"
			:show="show"
			:range="true"
			@input="input"
			@close="close"
			@blur="blur"
			@focus="focus"
			@open="open"
			@select="select"
			@change="change"
			:modal-mode="true"
		>
			<template #before>
				<label for="date">
					select date:
				</label>
			</template>
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
			change() {
				console.log("changed");
			},
			select() {
				console.log("selected");
			},
		},
	};
</script>

<style>
	#app {
		margin: 1px;
		/* padding: 100px; */
	}

	.rtl {
		direction: rtl;
	}
</style>
