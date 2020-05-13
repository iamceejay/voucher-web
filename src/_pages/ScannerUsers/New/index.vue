<template>
  <MainLayout>
    <template #content>
      <div class="flex w-full">
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col">
            <Header1
              label="Add Scanner User"
            />
          </div>
          <ScanerUserForm />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import ScanerUserForm from '_components/Modules/ScannerUser/ScannerUserForm';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      Header1,
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