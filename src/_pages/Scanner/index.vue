<template>
  <MainLayout>
    <template #content>
      <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize mb-3">
        Voucher Scanner
      </div>
      <VoucherScanner 
        v-if="!qr"
        @onSetVoucher="onSetVoucher"
      />
      <VoucherRedemption 
        v-if="qr"
        @onSetVoucher="onSetVoucher"
      />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherScanner from '_components/Modules/Scanner/VoucherScanner'
  import VoucherRedemption from '_components/Modules/Scanner/VoucherRedemption'
  
  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      VoucherScanner,
      VoucherRedemption
    },
    data() {
      return {
        qr: null
      }
    },
    mounted() {

    },
    methods: {
      onSetVoucher(data)
      {
        this.qr = data
      }
    }
  }
</script>
<style lang='css' scoped>
</style>