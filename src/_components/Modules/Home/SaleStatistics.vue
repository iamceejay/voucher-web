<template>
  <div class="w-full flex flex-col mb-3">
    <StatisticList 
      title="Verkaufsstatistiken"
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
            title: 'heute verkauft',
            value: '15'
          },{
            type: 'Earnings',
            title: 'heute',
            value: '€13,456'
          },{
            type: 'Voucher',
            title: 'diese Woche verkauft',
            value: '23'
          },{
            type: 'Earnings',
            title: 'diese Woche',
            value: '€34,567'
          },{
            type: 'Voucher',
            title: 'diesen Monat verkauft',
            value: '123'
          },{
            type: 'Earnings',
            title: 'diesen Monat',
            value: '€123,456'
          },{
            type: 'Voucher',
            title: 'gesamt verkauft',
            value: '234'
          },{
            type: 'Earnings',
            title: 'gesamt',
            value: '234,456'
          },
        ]
      }
    }
  }
</script>
<style lang="css" scoped>
</style>