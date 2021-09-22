<script lang="ts">
  import { reactive, defineComponent } from 'vue';
  import DatePicker, { PersianDate } from '../../src/components/DatePicker.vue';

  declare global {
    interface Window {
      PersianDate: PersianDate;
    }
  }
  window.PersianDate = PersianDate;

  export default defineComponent({
    components: {
      DatePicker,
    },
    props: {
      props: {
        required: true,
        type: Object,
      },
      slots: {
        required: true,
        type: Object,
      },
    },
    setup(myProps) {
      const [props, slots] = [myProps.props, myProps.slots];

      const state = reactive({
        model: null,
        status: '',
      });

      if (props.disableR) {
        props.disable = new RegExp(props.disableR);
        delete props.disableR;
      } else if (props.disableF) {
        props.disable = eval(props.disableF);
        delete props.disableF;
      }
      if (props.model) state.model = props.model;

      // *************** Methods ***************
      const open = () => {
        state.status += 'open';
      };
      const close = () => {
        state.status += 'close';
      };
      const focus = (e: Event, inputNumber: number) => {
        e.preventDefault();
        state.status += 'focus:' + inputNumber;
      };
      const blur = (e: Event, inputNumber: number) => {
        e.preventDefault();
        state.status += 'blur:' + inputNumber;
      };
      const input = (e: Event, inputNumber: number) => {
        e.preventDefault();
        state.status += 'input:' + inputNumber;
      };
      const submit = (e: PersianDate[]) => {
        state.status +=
          'submit:' +
          (Array.isArray(e)
            ? e.map((date) => date.toString(props.type || 'date'))
            : e.toString(props.type || 'date'));
      };
      const select = (e: PersianDate) => {
        state.status += 'select:' + e.toString(props.type || 'date');
      };
      const show = () => {
        props.show = true;
      };

      return {
        newProps: props,
        newSlots: slots,
        state,
        open,
        close,
        focus,
        blur,
        input,
        submit,
        select,
        show,
      };
    },
  });
</script>

<template>
  <div id="app">
    <DatePicker
      v-model="state.model"
      v-bind="newProps"
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
      <template v-for="(slot, name) in newSlots" :key="name" #[name]>
        <div v-html="slot"></div>
      </template>
    </DatePicker>

    <div class="show">date/time is: {{ state.model }}</div>

    <button class="show-picker" @click="show">show picker</button>

    <div class="status" style="display: none">{{ state.status }}</div>
  </div>
</template>

<style lang="scss">
  .show {
    margin-top: 1rem;
  }
</style>
