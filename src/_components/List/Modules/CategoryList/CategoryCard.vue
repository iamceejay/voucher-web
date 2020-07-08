<template>
  <div class="m-2 py-2 px-3 shadow-custom rounded text-center card-container w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6">
    <router-link :to="`/vouchers/category/${data.id}`">
      <div class="text-2xl my-3 font-bold font-display text-gray-900 h-8">
        <i :class="`fas fa-${data.icon}`" />
      </div>
      <div class="text-sm font-body font-bold text-gray-900 uppercase">
        {{ data.name }}
      </div>
    </router-link>
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
  .card-container {
    display: inline-block;
    min-width: 200px;
  }
</style>