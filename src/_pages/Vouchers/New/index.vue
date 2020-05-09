<template>
  <MainLayout>
    <template #content>
      <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize mb-3">
        {{ ($route.params.id) ? 'Update Voucher' : 'New Voucher' }}
      </div>
      <VoucherForm 
        :data="data"
      />
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