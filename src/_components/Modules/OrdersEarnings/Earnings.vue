<template>
  <div class="w-full flex flex-col">
    <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize mb-3">
      Earnings
    </div>
    <StatisticList 
      :data="earnings"
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
        earnings: [],
      };
    },
    mounted() {
      this.onSetEarnings()
    },
    methods: {
      onSetEarnings()
      {
        this.earnings = [
          {
            type: 'Vouchers',
            title: 'sold total',
            value: '234'
          },{
            type: 'Earnings',
            title: 'total',
            value: '€234,567'
          }
        ]
      }
    }
  }
</script>
<style lang="css" scoped>
</style>