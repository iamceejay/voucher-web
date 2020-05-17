<template>
  <div 
    class="m-2 py-2 px-3 border border-gray-900 rounded bg-color text-center card-container w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6"
    :style="{ '--bgColor': data.bgColor }"
    :class="`${ data.isDarkText ? 'text-black' : 'text-white' }`"
  >
    <div class="px-2 self-center">
      <img 
        class="w-32 h-10 m-auto"
        src="@/_assets/img/company-default-logo.png" 
        alt=""
      />
    </div>
    <div class="text-sm my-2 font-bold font-display h-8">
      {{ data.name }}
    </div>
    <div class="text-sm font-body font-bold uppercase">
      €{{ data.value }}
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      data: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
  .bg-color {
    background-color: var(--bgColor);
  }
  .card-container {
    display: inline-block;
    min-width: 200px;
  }
</style>