<template>
  <div class="w-full flex flex-col">
    <div class="font-bold text-lg py-2">
      Sales Statistics
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(stat, index) in stats"
        :key="`stat-${index}`"
        class="h-24 w-32 border rounded m-2 p-2 text-center"
      >
        <div class="text-xs px-2 h-12">
          {{ stat.title }}
        </div>
        <div class="text-lg font-semibold">
          {{ stat.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
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