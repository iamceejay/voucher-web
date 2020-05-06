<template>
  <div class="w-full flex flex-col">
    <div 
      v-if="title != ''"
      class="font-bold text-lg py-2"
    >
      {{ title }}
    </div>
    <div class="flex flex-wrap">
      <VoucherCard
        v-for="(voucher, index) in VOUCHERS"
        :key="`voucher-${index}`"
        :data="voucher"
      />
    </div>
  </div>
</template>
<script>
  import VoucherCard from './VoucherCard/'

  export default {
    components: {
      VoucherCard
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
</style>