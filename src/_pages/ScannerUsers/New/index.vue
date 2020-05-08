<template>
  <MainLayout>
    <template #content>
      <div class="flex w-full">
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col">
            <span class="font-bold text-lg">Add Scanner User</span>
          </div>
          <div>
            <ScanerUserForm />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import ScanerUserForm from '_components/Modules/ScannerUser/ScannerUserForm';
  import MainLayout from '_layouts';

  export default {
    components: {
      MainLayout,
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