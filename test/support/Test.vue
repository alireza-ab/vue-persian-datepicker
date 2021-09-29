<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import DatePicker, { PersianDate } from '../../src/components/DatePicker.vue';

  const myProps = defineProps({
    props: {
      required: true,
      type: Object,
    },
    slots: {
      required: true,
      type: Object,
    },
  });

  const { props, slots } = reactive(myProps);

  const model = ref(null);
  const status = ref('');

  if (props.disableR) {
    props.disable = new RegExp(props.disableR);
    delete props.disableR;
  } else if (props.disableF) {
    props.disable = eval(props.disableF);
    delete props.disableF;
  }
  if (props.model) model.value = props.model;

  // *************** Methods ***************
  const open = () => {
    status.value += 'open';
  };
  const close = () => {
    status.value += 'close';
  };
  const focus = (e: Event, inputNumber: number) => {
    e.preventDefault();
    status.value += 'focus:' + inputNumber;
    console.log(status);
  };
  const blur = (e: Event, inputNumber: number) => {
    e.preventDefault();
    status.value += 'blur:' + inputNumber;
    console.log(status);
  };
  const input = (e: Event, inputNumber: number) => {
    e.preventDefault();
    status.value += 'input:' + inputNumber;
  };
  const submit = (e: PersianDate | PersianDate[]) => {
    status.value +=
      'submit:' +
      (Array.isArray(e)
        ? e.map((date) => date.toString(props.type || 'date'))
        : e.toString(props.type || 'date'));
  };
  const select = (e: PersianDate) => {
    status.value += 'select:' + e.toString(props.type || 'date');
  };
  const show = () => {
    props.show = true;
  };
</script>

<template>
  <div id="app">
    <DatePicker
      v-model="model"
      v-bind="props"
      :secondInput-onFocus="
        (e) => {
          focus(e, 2);
        }
      "
      @focus="focus($event, 1)"
      @input="input"
      @close="close"
      @blur="blur"
      @open="open"
      @select="select"
      @submit="submit"
    >
      <template v-for="(slot, name) in slots" :key="name" #[name]>
        <div v-html="slot"></div>
      </template>
    </DatePicker>

    <div class="show">date/time is: {{ model }}</div>

    <button class="show-picker" @click="show">show picker</button>

    <div class="status" style="display: none">{{ status }}</div>
  </div>
</template>

<style lang="scss">
  .show {
    margin-top: 1rem;
  }
</style>
