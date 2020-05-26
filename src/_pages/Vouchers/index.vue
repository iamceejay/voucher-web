<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          label="Create new voucher"
        />
        <router-link
          to="vouchers/new"
        >
          <Button
            class="p-2 mt-3 mb-5"
            label="Create new voucher"
            size="w-full sm:w-64 py-4"
            round="rounded-full"
          />
        </router-link>
        <VoucherList 
          :data="VOUCHERS.data"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Vouchers',
    components: {
      Button,
      MainLayout,
      VoucherList,
      Header1
    },
    data() {
      return {
        submitting: false
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        if( this.AUTH_USER?.data?.id ) {
          await this.$store.commit('SET_VOUCHERS', [])
          await this.onFetchVouchers(this.AUTH_USER.data.id)
        }
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchVouchers(id)
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHERS', {
            seller_id: id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>