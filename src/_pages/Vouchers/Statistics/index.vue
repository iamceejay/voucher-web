<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status " class="content-container w-full flex flex-col px-8">
        <Header1
          label="Gutscheinstatistiken"
        />
        <StatisticList 
          :data="stats"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import StatisticList from '_components/List/Modules/StatisticList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      StatisticList,
      Header1,
    },
    data() {
      return {
        stats: []
      }
    },
    computed: {
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      }
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchVoucher()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchVoucher()
      {
        try {
          const data = await this.$store.dispatch('FETCH_VOUCHER', {
            id: this.$route.params.id,
            with_stat: true
          })
          await this.onSetStats(data)
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetStats(data)
      {
        this.stats = [
          // {
          //   type: 'Vouchers',
          //   title: 'sold this day',
          //   value: data.daily_voucher_sold
          // }
          // ,{
          //   type: 'Earnings',
          //   title: 'this day',
          //   value: `${this.$helpers.convertCurrency(data.daily_earnings)}`
          // }
          {
            type: 'Gutscheine',
            title: 'diese Woche verkauft',
            value: data.weekly_voucher_sold
          }
          ,{
            type: 'Umsatz',
            title: 'diese Woche',
            value: `${this.$helpers.convertCurrency(data.weekly_earnings)}`
          }
          // ,{
          //   type: 'Vouchers',
          //   title: 'sold this month',
          //   value: data.monthly_voucher_sold
          // }
          // ,{
          //   type: 'Earnings',
          //   title: 'this month',
          //   value: `${this.$helpers.convertCurrency(data.montyly_earnings)}`
          // }
          ,{
            type: 'Gutscheine',
            title: 'gesamt verkauft',
            value: data.voucher_total
          },{
            type: 'Umsatz',
            title: 'gesamt',
            value: `${this.$helpers.convertCurrency(data.total_earnings)}`
          },{
            type: 'Gutscheine eingelöst',
            title: 'heute',
            value: data.daily_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'diese Woche',
            value: data.weekly_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'diesen Monat',
            value: data.monthly_redemptions
          },{
            type: 'Gutscheine eingelöst',
            title: 'gesamt',
            value: data.total_redemptions
          }
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>