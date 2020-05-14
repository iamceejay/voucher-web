<template>
  <div class="flex flex-wrap ">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-1/2 md:w-1/4	lg:w-1/5"
    >
      <div class="m-2 p-2 border border-gray-900 rounded text-center card-container">
        <div class="text-xl my-3 font-bold font-display text-gray-900">
          {{ row.value }}
        </div>
        <div class="text-sm font-body font-bold text-gray-900 uppercase">
          {{ row.type }}
        </div>
        <div class="text-xs mb-3 font-body font-semibold text-gray-700 lowercase">
          {{ row.title }} 
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
  .card-container {
    min-height: 125px;
  }
</style>