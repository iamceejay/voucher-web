<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <div class="w-full flex flex-col mb-5">
          <Header1
            label="Umsatz"
          />
          <StatisticList 
            :data="earnings"
          />
        </div>
        <div class="w-full flex flex-col mb-5">
          <Header1
            label="Bestellungen"
          />
          <OrderList 
            :isInvoice="true"
            :data="WALLETS.data"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import OrderList from '_components/List/Modules/OrderList/'
  import StatisticList from '_components/List/Modules/StatisticList/'
  import Header1 from '_components/Headers/Header1';
  import Orders from '_components/Modules/OrdersEarnings/Orders';

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      OrderList,
      StatisticList,
      Header1,
    },
    data() {
      return {
        submitting: false,
        earnings: [],
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
        try {
          await this.$store.commit('SET_IS_INFINITE_LOAD', true)
          await this.$store.commit('SET_WALLETS', [])
          this.params.seller_id = this.AUTH_USER.data.id
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.onFetchWalletStat()
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
      onSetEarnings({ voucher_total, total_earnings, total_earnings_with_commission, waiting_for_payout, days_until_next_payout, payout_every })
      {
        this.earnings = [
          {
            type: 'Gutscheine',
            title: 'gesamt verkauft',
            value: voucher_total
          }, {
            type: 'Umsatz',
            title: 'gesamt',
            value: `${this.$helpers.convertCurrency(total_earnings)}`,
            extra: {
              title: 'Kommission:',
              value: `${this.$helpers.convertCurrency(total_earnings_with_commission)}`
            }
          }, {
            type: 'Payout',
            title: 'Wartend',
            value: `${this.$helpers.convertCurrency(waiting_for_payout)}`
          }, {
            type: 'Tage',
            title: 'bis zur nächsten Auszahlung',
            value: days_until_next_payout,
            extra: {
              title: 'Auszahlung:',
              value: `alle ${payout_every} Tage`
            }
          }, 
        ]
      },
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
      async onFetchWalletStat()
      {
        try {
          const data = await this.$store.dispatch('FETCH_WALLET_STAT', {
            seller_id: this.AUTH_USER.data.id,
            with_stat: true,
            status: 'completed'
          })
          await this.onSetEarnings(data)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>