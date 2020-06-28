<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Statistics"
        />
        <StatisticList 
          :data="stats"
        />
        <Header1
          label="Orders"
        />
        <OrderList 
          :role="AUTH_USER.role.name"
          :data="WALLETS.data"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import StatisticList from '_components/List/Modules/StatisticList/';
  import OrderList from '_components/List/Modules/OrderList/'
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Home',
    components: {
      MainLayout,
      StatisticList,
      OrderList,
      Header1,
    },
    data() {
      return {
        orders: [],
        stats: [],
        params: {
          page: 1,
          paginate: 5,
          user_id: null,
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
        try {
          await this.$store.commit('SET_IS_INFINITE_LOAD', true)
          await this.$store.commit('SET_WALLETS', [])
          this.params.user_id = this.AUTH_USER.data.id
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.onFetchUser()
          await this.onSetOrders()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
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
      async onFetchUser()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER', {
            id: this.AUTH_USER.data.id,
            with_stat: true
          })
          this.onSetStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetStats({ voucher_used, vouchers_bought })
      {
        this.stats = [
          {
            type: 'Vouchers used',
            title: '',
            value: voucher_used
          },{
            type: 'Vouchers bought',
            title: '',
            value: `${vouchers_bought}`
          }
        ]
      },
      onSetOrders()
      {
        this.orders = [
          {
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>