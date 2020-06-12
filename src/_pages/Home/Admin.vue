<template>
  <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
    <Header1
      label="Admin Home"
    />
    <StatisticList 
      title="Sales Statistics"
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
            type: 'Vouchers',
            title: 'sold total',
            value: data.voucher_total
          },{
            type: 'Commision',
            title: 'earnings total',
            value: `€${data.total_earnings}`
          },{
            type: 'Vouchers',
            title: 'sold / month',
            value: data.voucher_month
          },{
            type: 'Commision',
            title: 'earnings / month',
            value: `€${data.monthly_earnings}`
          },{
            type: 'Vouchers',
            title: 'sold / week',
            value: data.voucher_week
          },{
            type: 'Commision',
            title: 'earnings / week',
            value: `€${data.weekly_earnings}`
          },
        ]
      },
      onSetTotalStats(data)
      {
        this.totalStats = [
          {
            type: 'Total Revenue',
            title: '',
            value: `€${data.total_revenue}`
          },{
            type: 'Monthly Revenue',
            title: '',
            value: `€${data.monthly_revenue}`
          },{
            type: 'Weekly Revenue',
            title: '',
            value: `€${data.weekly_revenue}`
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>