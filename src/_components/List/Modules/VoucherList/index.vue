<template>
  <div class="flex flex-col w-full">
    <div 
      v-if="title != ''"
      class="font-bold text-lg py-2 flex flex-col w-full font-display"
    >
      {{ title }}
    </div>
    <div 
      v-if="type === 'standard'"
      class="flex flex-wrap"
    >
      <VoucherCard
        v-for="(voucher, index) in data"
        :key="`voucher-${index}`"
        :data="voucher"
        class="m-2"
      />
    </div>
    <div 
      v-if="type === 'feature'"
      class="flex flex-wrap"
    >
      <FeatureVoucherCard
        v-for="(voucher, index) in data"
        :key="`voucher-${index}`"
        :data="voucher"
        class="m-2"
      />
    </div>
  </div>
</template>
<script>
  import VoucherCard from './VoucherCard/'
  import FeatureVoucherCard from './FeatureVoucherCard/'

  export default {
    components: {
      VoucherCard,
      FeatureVoucherCard
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      type: {
        type: String,
        default: 'standard'
      }
    },
    data() {
      return {
        
      }
    },
    created() {
      console.log('data', this.data)
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
</style>