<template>
  <div class="w-full flex flex-col mb-3">
    <StatisticList 
      title="Sales Statistics"
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
            type: 'Voucher',
            title: 'sold this day',
            value: '15'
          },{
            type: 'Earnings',
            title: 'this day',
            value: '€13,456'
          },{
            type: 'Voucher',
            title: 'sold this week',
            value: '23'
          },{
            type: 'Earnings',
            title: 'this week',
            value: '€34,567'
          },{
            type: 'Voucher',
            title: 'sold this month',
            value: '123'
          },{
            type: 'Earnings',
            title: 'this month',
            value: '€123,456'
          },{
            type: 'Voucher',
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
<style lang="css" scoped>
</style>