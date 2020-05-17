<template>
  <div class="flex flex-col w-full">
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
    },
    mounted() {
      this.onSetStats()
      this.onSetTotalStats()
    },
    methods: {
      onSetStats()
      {
        this.stats = [
          {
            type: 'Vouchers',
            title: 'sold total',
            value: '15'
          },{
            type: 'Commision',
            title: 'earnings total',
            value: '€13,456'
          },{
            type: 'Vouchers',
            title: 'sold / month',
            value: '23'
          },{
            type: 'Commision',
            title: 'earnings / month',
            value: '€34,567'
          },{
            type: 'Vouchers',
            title: 'sold / week',
            value: '123'
          },{
            type: 'Commision',
            title: 'earnings / week',
            value: '€123,456'
          },
        ]
      },
      onSetTotalStats()
      {
        this.totalStats = [
          {
            type: 'Total Revenue',
            title: '',
            value: '€13,456'
          },{
            type: 'Monthly Revenue',
            title: '',
            value: '€13,456'
          },{
            type: 'Weekly Revenue',
            title: '',
            value: '€13,456'
          },
        ]
      }
    }
  }
</script>
<style lang='css' scoped>
</style>