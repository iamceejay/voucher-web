<template>
  <div 
    id="main-layout-component"
    class="w-full flex flex-row overflow-auto"
  >
    <Sidebar />
    <div class="w-full flex">
      <div class="main-container p-8">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  export default {
    components: {
      Sidebar
    },
    props: [],
    data() {
      return {};
    },
    mounted() {},
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>