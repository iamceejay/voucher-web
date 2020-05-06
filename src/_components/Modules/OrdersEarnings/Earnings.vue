<template>
  <div class="w-full flex flex-col">
    <div class="font-bold text-lg py-2">
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
            title: 'Vouchers sold total',
            value: '234'
          },{
            title: 'Earnings total',
            value: '€234,567'
          }
        ]
      }
    }
  }
</script>
<style lang="css" scoped>
</style>