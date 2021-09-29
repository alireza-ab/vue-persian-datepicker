<script lang="ts" setup>
  import { PropType, reactive } from 'vue';

  const props = defineProps({
    icon: {
      type: String as PropType<'clear' | 'date' | 'datetime' | 'time'>,
      required: true,
    },
  });

  const { icon } = reactive(props);
</script>

<template>
  <svg
    v-if="icon === 'clear'"
    viewBox="0 0 512 512"
    width="1rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <metadata>Clear icon</metadata>
    <path
      d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
    />
  </svg>
  <svg
    v-else-if="icon === 'date'"
    version="1.1"
    viewBox="20.711000442504883 19.33300018310547 51.29999542236328 53.48200225830078"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <metadata>Calendar icon</metadata>
    <g>
      <path
        d="M30.35,19.333v2.76h-9.639V32.79v3.4v36.625h44.781c3.595,0,6.519-2.926,6.519-6.52V36.19v-3.4V22.093h-9.64v-2.76h-3.399   v2.76H48.061v-2.76h-3.399v2.76H33.75v-2.76H30.35z M68.61,66.296c0,1.719-1.398,3.119-3.118,3.119H24.111V36.19H68.61V66.296z    M44.661,25.493v2.906h3.399v-2.906h10.911v2.906h3.399v-2.906h6.239v7.297H24.111v-7.297h6.239v2.906h3.4v-2.906H44.661z"
      ></path>
      <path
        d="M38.073,40.157H27.448v10.625h10.625V40.157z M34.673,47.382h-3.825v-3.824h3.825V47.382z"
      ></path>
      <path
        d="M51.673,40.157H41.048v10.625h10.625V40.157z M48.273,47.382h-3.825v-3.824h3.825V47.382z"
      ></path>
      <path
        d="M65.273,40.157H54.648v10.625h10.625V40.157z M61.873,47.382h-3.825v-3.824h3.825V47.382z"
      ></path>
      <path
        d="M38.073,54.476H27.448v10.625h10.625V54.476z M34.673,61.7h-3.825v-3.826h3.825V61.7z"
      ></path>
      <path
        d="M51.673,54.476H41.048v10.625h10.625V54.476z M48.273,61.7h-3.825v-3.826h3.825V61.7z"
      ></path>
      <path
        d="M65.273,54.476H54.648v10.625h10.625V54.476z M61.873,61.7h-3.825v-3.826h3.825V61.7z"
      ></path>
    </g>
  </svg>
  <svg
    v-else-if="icon === 'datetime'"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="7.146755218505859 47.93895721435547 195.70648193359375 201.1220703125"
    version="1.1"
  >
    <metadata>Calendar And Clock Icon</metadata>
    <g
      id="g915"
      inkscape:label="calendar"
      inkscape:groupmode="layer"
      style="display: inline"
    >
      <g
        id="g907"
        transform="matrix(3.2971191,0,0,3.2971191,-61.13988,-15.80425)"
      >
        <path
          id="path893"
          d="m 30.35,19.333 v 2.76 h -9.639 v 10.697 3.4 36.625 h 44.781 c 3.595,0 6.519,-2.926 6.519,-6.52 V 36.19 32.79 22.093 h -9.64 v -2.76 h -3.399 v 2.76 H 48.061 v -2.76 h -3.399 v 2.76 H 33.75 v -2.76 z m 38.26,46.963 c 0,1.719 -1.398,3.119 -3.118,3.119 H 24.111 V 36.19 H 68.61 Z M 44.661,25.493 v 2.906 h 3.399 v -2.906 h 10.911 v 2.906 h 3.399 v -2.906 h 6.239 V 32.79 H 24.111 v -7.297 h 6.239 v 2.906 h 3.4 v -2.906 z"
        ></path>
        <path
          id="path895"
          d="M 38.073,40.157 H 27.448 v 10.625 h 10.625 z m -3.4,7.225 h -3.825 v -3.824 h 3.825 z"
        ></path>
        <path
          id="path897"
          d="M 51.673,40.157 H 41.048 v 10.625 h 10.625 z m -3.4,7.225 h -3.825 v -3.824 h 3.825 z"
        ></path>
        <path
          id="path899"
          d="M 65.273,40.157 H 54.648 v 10.625 h 10.625 z m -3.4,7.225 h -3.825 v -3.824 h 3.825 z"
        ></path>
        <path
          id="path901"
          d="M 38.073,54.476 H 27.448 v 10.625 h 10.625 z m -3.4,7.224 h -3.825 v -3.826 h 3.825 z"
        ></path>
        <path
          id="path903"
          d="M 51.673,54.476 H 41.048 v 10.625 h 10.625 z m -3.4,7.224 h -3.825 v -3.826 h 3.825 z"
        ></path>
        <path
          id="path905"
          d="M 65.273,54.476 H 54.648 v 10.625 h 10.625 z m -3.4,7.224 h -3.825 v -3.826 h 3.825 z"
        ></path>
      </g>
    </g>
    <g inkscape:groupmode="layer">
      <circle
        id="path918"
        style="fill: #ffffff; fill-opacity: 1; stroke-width: 2.46968"
        cx="156.58038"
        cy="201.26753"
        r="44.96637"
      ></circle>
    </g>
    <g inkscape:groupmode="layer">
      <g
        id="g932"
        style="clip-rule: evenodd; fill-rule: evenodd"
        transform="matrix(3.8598712,0,0,3.8598712,110.21634,156.42414)"
      >
        <path
          id="path921"
          d="M 12,0 C 18.623,0 24,5.377 24,12 24,18.623 18.623,24 12,24 5.377,24 0,18.623 0,12 0,5.377 5.377,0 12,0 Z m 0,1 C 18.071,1 23,5.929 23,12 23,18.071 18.071,23 12,23 5.929,23 1,18.071 1,12 1,5.929 5.929,1 12,1 Z m 0,11 h 6 v 1 H 11 V 4 h 1 z"
        ></path>
      </g>
    </g>
  </svg>
  <svg
    v-else-if="icon === 'time'"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 24 24"
  >
    <metadata>Clock Icon</metadata>
    <path
      d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"
    ></path>
  </svg>
</template>
