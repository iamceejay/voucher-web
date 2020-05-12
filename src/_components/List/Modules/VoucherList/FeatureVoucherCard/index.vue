<template>
  <div class="m-2 py-2 px-3 border border-gray-900 rounded text-center w-1/2 md:w-1/4	lg:w-1/5 xl:w-1/6">
    <div class="px-2">
      <img 
        class="card-logo"
        src="@/_assets/img/company-default-logo.png" 
        alt=""
      />
    </div>
    <div class="text-sm my-2 font-bold font-display text-gray-900 h-8">
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
  .card-logo {
    width: 100%;
    height: 40px;
    margin-left: auto;
  }
</style>