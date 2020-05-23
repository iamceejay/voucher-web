<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          :label="`${($route.params.id) ? 'Update Voucher' : 'New Voucher'}`"
        />
        <VoucherForm 
          :data="data"
        />
      </div>
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
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      }
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onSetVoucher()
        await this.onFetchCategories()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchCategories()
      {
        await this.$store.dispatch('FETCH_CATEGORIES')
      },
      async onSetVoucher()
      {
        if( this.$route.params.id ) {
          const { voucher } = await this.$store.dispatch('FETCH_VOUCHER', this.$route.params.id)
          this.data = voucher
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>