<template>
  <MainLayout>
    <template #content>
      <div class="w-full h-screen flex flex-col">
        <div class="flex flex-col">
          <span class="font-bold text-lg">Voucher Statistics</span>
        </div>
        <div>
          <StatisticList 
            :data="stats"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import StatisticList from '_components/List/Modules/StatisticList/';

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      StatisticList
    },
    data() {
      return {
        stats: []
      }
    },
    mounted() {
      this.onSetStats()
    },
    methods: {
      onSetStats()
      {
        this.stats = [
          {
            title: 'Vouchers sold this day',
            value: '15'
          },{
            title: 'Earnings this day',
            value: '€13,456'
          },{
            title: 'Vouchers sold this week',
            value: '23'
          },{
            title: 'Earnings this week',
            value: '€34,567'
          },{
            title: 'Vouchers sold this month',
            value: '123'
          },{
            title: 'Earnings this month',
            value: '€123,456'
          },{
            title: 'Vouchers sold total',
            value: '234'
          },{
            title: 'Earnings total',
            value: '234,456'
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>