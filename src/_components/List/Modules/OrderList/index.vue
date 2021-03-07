<template>
  <div>
    <div class="flex flex-wrap">
      <div
        v-for="(row, index) in data"
        :key="`stat-${index}`"
        class="w-full sm:w-1/2 md:w-1/4 order-container"
      >
        <CardOrder 
          :isInvoice="isInvoice"
          :role="role"
          :data="row"
        />
      </div>
      <div v-if="data.length <= 0" class="py-2 text-lg">
        Noch keine Daten vorhanden.
      </div>
    </div>
    <div v-if="withPagination && data.length != 0"
      class="text-center my-8">
      <button
        class="list-pagination"
        :disabled="currentPage === 1"
        @click="onPaginate('prev')">
        <i class="fas fa-chevron-left" />
      </button>
      <span class="mx-8"> {{currentPage}} von {{lastPage}} </span>
      <button
        class="list-pagination"
        :disabled="currentPage === lastPage"
        @click="onPaginate('next')">
        <i class="fas fa-chevron-right" />
      </button>
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
      }, withPagination: {
        type: Boolean,
        default: false
      }, currentPage: {
        type: Number,
        default: 1
      }, lastPage: {
        type: Number,
        default: 1
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
      onPaginate(action)
      {
        this.$emit('onPaginate', action)
      }
    }
  }
</script>
<style lang="css" scoped>
  .order-container {
    min-width: 300px;
  }
</style>