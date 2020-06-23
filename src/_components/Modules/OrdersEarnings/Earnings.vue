<template>
  <div class="w-full flex flex-col">
    <Header1
      label="Umsatz"
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
            title: 'gesamt verkauft',
            value: '234'
          },{
            type: 'Earnings',
            title: 'gesamt',
            value: '€234,567'
          }
        ]
      }
    }
  }
</script>
<style lang="css" scoped>
</style>