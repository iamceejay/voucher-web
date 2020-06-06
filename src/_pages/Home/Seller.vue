<template>
  <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
    <Header1
      :label="`Hi ${AUTH_USER.isAuth ? AUTH_USER.data.company.name : 'Company'}!`"
    />
    <router-link to="/scanner">
      <Button
        class="py-2 mt-3 mb-4"
        label="Scan Voucher"
        size="w-full md:w-64 py-4"
        round="rounded-full"
      />
    </router-link>
    <StatisticList 
      title="Sales Statistics"
      :data="stats"
    />
    <Quicklinks />
  </div>
</template>
<script>
  import Button from '_components/Button';
  import StatisticList from '_components/List/Modules/StatisticList/'
  import Quicklinks from '_components/Modules/Home/Quicklinks';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      Header1,
      Button,
      StatisticList,
      Quicklinks
    },
    data() {
      return {
        stats: [],
        params: {
          seller_id: null,
          status: 'completed',
          with_stat: true,
        },
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        console.log('AUTH_USER', this.AUTH_USER)
        this.params.seller_id = this.AUTH_USER.data.id
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchWallets()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_WALLETS', this.params)
          await this.onSetStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetStats( data )
      {
        this.stats = [
          {
            type: 'Voucher',
            title: 'sold this day',
            value: data.voucher_daily
          },{
            type: 'Earnings',
            title: 'this day',
            value: `€${data.daily_earnings}`
          },{
            type: 'Voucher',
            title: 'sold this week',
            value: data.voucher_week
          },{
            type: 'Earnings',
            title: 'this week',
            value: `€${data.weekly_earnings}`
          },{
            type: 'Voucher',
            title: 'sold this month',
            value: data.voucher_month
          },{
            type: 'Earnings',
            title: 'this month',
            value: `€${data.monthly_earnings}`
          },{
            type: 'Voucher',
            title: 'sold total',
            value: data.voucher_total
          },{
            type: 'Earnings',
            title: 'total',
            value: `€${data.total_earnings}`
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>