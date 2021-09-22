<script lang="ts">
  import { PropType, computed } from 'vue';
  import { Obj } from '../modules/types';

  type Direction = 'up' | 'down' | 'right' | 'left';

  export default {
    props: {
      direction: {
        default: 'up',
        type: String as PropType<Direction>,
      },
      inverse: {
        default: false,
        type: Boolean,
      },
    },

    setup(props: { direction: Direction; inverse: boolean }): Obj {
      const rotate = computed(() => {
        const directions = {
          up: -90,
          down: 90,
          right: 0,
          left: 180,
        };
        const deg = directions[props.direction] + (props.inverse ? 180 : 0);

        return `rotate(${deg} 0 0)`;
      });

      return { rotate };
    },
  };
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="314.6749267578125 199.97494506835938 370.62506103515625 600.050048828125"
    :transform="rotate"
  >
    <metadata>Arrow icon</metadata>
    <path
      d="M419.9 785.6l251.10000000000002-251c9.600000000000023-9.600000000000023 14.299999999999955-22.100000000000023 14.299999999999955-34.60000000000002s-4.7999999999999545-25.100000000000023-14.299999999999955-34.60000000000002l-251.10000000000002-251.09999999999997c-19.099999999999966-19.100000000000023-50.099999999999966-19.100000000000023-69.29999999999995 0l-21.600000000000023 21.599999999999994c-19.100000000000023 19.099999999999994-19.100000000000023 50.099999999999994 0 69.29999999999998l160.2 160.2c9.600000000000023 9.600000000000023 14.300000000000011 22.100000000000023 14.300000000000011 34.60000000000002s-4.800000000000011 25.100000000000023-14.300000000000011 34.60000000000002l-160.2 160.29999999999995c-19.100000000000023 19.100000000000023-19.100000000000023 50.10000000000002 0 69.30000000000007l21.600000000000023 21.59999999999991c19.19999999999999 19 50.19999999999999 19 69.29999999999995-0.1999999999999318z"
    />
  </svg>
</template>
