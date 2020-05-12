<template>
  <MainLayout>
    <template #content>
      <Header1
        :label="`${($route.params.id) ? 'Update Voucher' : 'New Voucher'}`"
      />
      <VoucherForm 
        :data="data"
      />
    </template>
  </MainLayout>
</template>
<script>
  import VoucherForm from '_components/Modules/Voucher/VoucherForm';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      VoucherForm,
      Header1,
    },
    data() {
      return {
        data: null,
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      }
    },
    mounted() {
      this.onSetVoucher()
    },
    methods: {
      onSetVoucher()
      {
        if( this.$route.params.id ) {
          this.data = this.VOUCHERS.filter( vouch => vouch.id == this.$route.params.id )[0]
          console.log('this.data', this.data)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>