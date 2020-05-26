<template>
  <MainLayout>
    <template #content>
      <Earnings class="mb-5" />
      <Header1
        label="Orders"
      />
      <OrderList 
        :isInvoice="true"
        :data="WALLETS.data"
      />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Earnings from '_components/Modules/OrdersEarnings/Earnings';
  import OrderList from '_components/List/Modules/OrderList/'
  import Header1 from '_components/Headers/Header1';
  import Orders from '_components/Modules/OrdersEarnings/Orders';

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      Earnings,
      OrderList,
      Header1,
    },
    data() {
      return {
        submitting: false,
        params: {
          page: 1,
          paginate: 5,
          seller_id: null,
          status: 'completed'
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      IS_LOAD_MORE()
      {
        return this.$store.getters.IS_LOAD_MORE
      },
    },
    watch: {
      async IS_LOAD_MORE(newVal)
      {
        if( newVal ) {
          await this.onLoadData({
            ...this.params,
            page: this.params.page + 1
          })
          await this.$store.commit('SET_IS_LOAD_MORE', false)
        }
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_WALLETS', [])
        this.params.seller_id = this.AUTH_USER.data.id
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchWallets()
        await this.onSetStats()
        await this.onSetOrders()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onLoadData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data
        }
        await this.onFetchWallets()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_WALLETS', this.params)
          if( data.orders.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>