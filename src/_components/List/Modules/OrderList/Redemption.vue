<template>
  <div class="flex flex-wrap">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-full sm:w-1/2 md:w-1/4 order-container"
    >
      <CardOrder 
        :data="row.order"
        :otherData="row"
        :role="role"
        :isRedemption="true"
      />
    </div>
  </div>
</template>
<script>
  import CardOrder from './CardOrder'

  export default {
    components: {
      CardOrder
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }, role: {
        type: String,
        default: 'seller'
      }, isInvoice: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        onShowModal: false
      }
    },
    mounted() {
    },
    methods: {
      
    }
  }
</script>
<style lang="css" scoped>
  .order-container {
    min-width: 300px;
  }
</style>