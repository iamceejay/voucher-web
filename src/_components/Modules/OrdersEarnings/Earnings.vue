<template>
  <div class="w-full flex flex-col">
    <Header1
      label="Earnings"
    />
    <StatisticList 
      :data="earnings"
    />
  </div>
</template>
<script>
  import StatisticList from '_components/List/Modules/StatisticList/'
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      StatisticList,
      Header1,
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