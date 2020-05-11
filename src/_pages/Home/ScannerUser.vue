<template>
  <div class="flex flex-col w-full">
    <Header1 label="Voucher Scanner" />
    <VoucherScanner 
      v-if="!qr"
      @onSetVoucher="onSetVoucher"
    />
    <VoucherRedemption 
      v-if="qr"
      @onSetVoucher="onSetVoucher"
    />
  </div>
</template>
<script>
  import VoucherScanner from '_components/Modules/Scanner/VoucherScanner'
  import VoucherRedemption from '_components/Modules/Scanner/VoucherRedemption'
  import Header1 from '_components/Headers/Header1'
  
  export default {
    components: {
      VoucherScanner,
      VoucherRedemption,
      Header1
    },
    data() {
      return {
        qr: null
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
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