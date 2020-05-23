<template>
  <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
    <Header1
      label="Vouchers"
    />
    <VoucherList
      class="mb-3"
      :data="VOUCHERS.data"
      :withQR="false"
    />
  </div>
</template>
<script>
  import VoucherList from '_components/List/Modules/VoucherList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      VoucherList,
      Header1,
    },
    data() {
      return {
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    created() {
      (async() => {
        console.log('test guest')
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchVouchers()
      {
        await this.$store.dispatch('FETCH_VOUCHERS')
      },
    }
  }
</script>
<style lang='css' scoped>
</style>