<template>
  <MainLayout>
    <template #content>
      <div class="font-bold text-lg py-2">
        {{ ($route.params.id) ? 'Update Voucher' : 'New Voucher' }}
      </div>
      <VoucherForm />
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