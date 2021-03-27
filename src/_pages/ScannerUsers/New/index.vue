<template>
  <div class="flex flex-1 flex-col">
    <h2 class="font-semibold text-peach mb-4">Scanner Profil anlegen</h2>
    <ScanerUserForm @onButtonClick="() => $emit('onButtonClick')" />
  </div>
</template>
<script>
  import ScanerUserForm from '_components/Modules/ScannerUser/ScannerUserForm';

  export default {
    components: {
      ScanerUserForm
    },
    data() {
      return {
        submitting: false
      }
    },
    mounted() {

    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>