<template>
  <MainLayout>
    <template #content>
      <div class="flex w-full">
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col">
            <span class="font-bold text-lg">New Voucher!</span>
          </div>
          <div>
            <VoucherForm />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import VoucherForm from '_components/Modules/Voucher/VoucherForm';
  import MainLayout from '_layouts';

  export default {
    components: {
      MainLayout,
      VoucherForm
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