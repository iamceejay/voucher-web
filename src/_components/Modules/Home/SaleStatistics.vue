<template>
  <div class="w-full flex flex-col mb-3">
    <div class="font-bold text-2xl py-2 font-display text-gray-700">
      Sales Statistics
    </div>
    <StatisticList 
      :data="stats"
    />
  </div>
</template>
<script>
  import StatisticList from '_components/List/Modules/StatisticList/'

  export default {
    components: {
      StatisticList,
    },
    props: [],
    data() {
      return {
        stats: [],
      };
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
<style lang="css" scoped>
</style>