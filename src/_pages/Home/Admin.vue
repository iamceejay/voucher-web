<template>
  <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
    <Header1
      label="Admin Home"
    />
    <StatisticList 
      title="Verkaufsstatistiken"
      :data="stats"
    />
    <StatisticTotalList 
      :data="totalStats"
    />
  </div>
</template>
<script>
  import Header1 from '_components/Headers/Header1';
  import StatisticList from '_components/List/Modules/StatisticList/'
  import StatisticTotalList from '_components/List/Modules/StatisticList/Total/'

  export default {
    components: {
      Header1,
      StatisticList,
      StatisticTotalList,
    },
    data() {
      return {
        stats: [],
        totalStats: [],
      }
    },
    computed: {
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_WALLETS', [])
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchWalletStat()
        // await this.onFetchCommissionStat()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchWalletStat()
      {
        try {
          const data = await this.$store.dispatch('FETCH_WALLET_STAT', {
            with_stat: true,
            status: 'completed'
          })
          await this.onSetStats(data)
          await this.onSetTotalStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      // async onFetchCommissionStat()
      // {
      //   try {
      //     const data = await this.$store.dispatch('FETCH_COMMISSION_STAT')
      //     await this.onSetTotalStats(data)
      //   } catch (err) {
      //     console.log('err', err)
      //   }
      // },
      onSetStats(data)
      {
        this.stats = [
          {
            type: 'Gutscheine',
            title: 'gesamt verkauft',
            value: data.voucher_total
          },{
            type: 'Kommission',
            title: 'umsatz gesamt',
            value: `${this.$helpers.convertCurrency(data.total_earnings)}`
          },{
            type: 'Gutscheine',
            title: 'diesen Monat verkauft',
            value: data.voucher_month
          },{
            type: 'Kommission',
            title: 'umsatz dieses Monat',
            value: `${this.$helpers.convertCurrency(data.monthly_earnings)}`
          },{
            type: 'Gutscheine',
            title: 'diese Woche verkauft',
            value: data.voucher_week
          },{
            type: 'Kommission',
            title: 'umsatz diese Woche',
            value: `${this.$helpers.convertCurrency(data.weekly_earnings)}`
          },
        ]
      },
      onSetTotalStats(data)
      {
        this.totalStats = [
          {
            type: 'Total Revenue',
            title: '',
            value: `${this.$helpers.convertCurrency(data.total_revenue)}`
          },{
            type: 'Monthly Revenue',
            title: '',
            value: `${this.$helpers.convertCurrency(data.monthly_revenue)}`
          },{
            type: 'Weekly Revenue',
            title: '',
            value: `${this.$helpers.convertCurrency(data.weekly_revenue)}`
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>