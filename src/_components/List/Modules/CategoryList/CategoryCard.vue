<template>
  <div class="shadow-custom rounded text-center card-container w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6 mx-2 my-1">
    <router-link
      class="card-content flex flex-col justify-center"
      :to="`/vouchers/category/${data.name}`"
    >
      <div class="text-2xl my-3 font-bold font-display text-gray-900">
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
    min-height: 125px;
    min-width: 200px;
  }
  .card-content {
    min-height: 125px;
  }
</style>