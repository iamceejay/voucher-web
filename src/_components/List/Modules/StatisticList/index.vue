<template>
  <div class="flex flex-wrap">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-full sm:w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6 border rounded m-2 p-2 text-center"
    >
      <div class="text-xs px-2 h-12">
        {{ row.title }}
      </div>
      <div class="text-lg font-semibold">
        {{ row.value }}
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