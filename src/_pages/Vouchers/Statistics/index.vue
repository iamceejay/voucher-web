<template>
  <MainLayout>
    <template #content>
      <div class="w-full h-screen flex flex-col mb-4">
        <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize">
          Voucher Statistics
        </div>
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
            type: 'Vouchers',
            title: 'sold this day',
            value: '15'
          },{
            type: 'Earnings',
            title: 'this day',
            value: '€13,456'
          },{
            type: 'Vouchers',
            title: 'sold this week',
            value: '23'
          },{
            type: 'Earnings',
            title: 'this week',
            value: '€34,567'
          },{
            type: 'Vouchers',
            title: 'sold this month',
            value: '123'
          },{
            type: 'Earnings',
            title: 'this month',
            value: '€123,456'
          },{
            type: 'Vouchers',
            title: 'sold total',
            value: '234'
          },{
            type: 'Earnings',
            title: 'total',
            value: '234,456'
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>