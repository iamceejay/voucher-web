<template>
  <div class="m-2 p-2 border border-gray-900 rounded text-center w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6">
    <div class="text-sm my-3 font-bold font-display text-gray-900">
      {{ data.name }}
    </div>
    <div class="text-sm font-body font-bold text-gray-900 uppercase">
      €{{ data.value }}
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      data: {
        type: Array,
        default() {
          return []
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
</style>