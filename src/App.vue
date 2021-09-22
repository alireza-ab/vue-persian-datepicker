<template>
  <DatePicker dual-input clearable></DatePicker>
</template>

<script lang="ts">
  import DatePicker from './components/DatePicker.vue';
  import { Obj } from './components/utils/modules/types';

  export default {
    components: {
      DatePicker,
    },
    setup(): Obj {
      const focus = (e: Event, inputNumber: number): void => {
        e.preventDefault();
        console.log('focus:' + inputNumber);
      };

      return { focus };
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
