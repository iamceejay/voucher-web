<template>
  <div class="flex flex-wrap ">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6"
    >
      <div class="m-2 p-2 border rounded text-center">
        <div class="text-xs px-2 my-3 font-body text-gray-600">
          {{ row.title }}
        </div>
        <div class="text-xl font-bold font-display text-gray-900">
          {{ row.value }}
        </div>
      </div>
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