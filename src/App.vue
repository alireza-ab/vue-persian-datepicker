<script lang="ts" setup>
  import DatePicker from './components/DatePicker.vue';

  const focus = () => {
    console.log('focus');
  };
</script>

<template>
  <DatePicker dual-input clearable @focus="focus"></DatePicker>
</template>

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
