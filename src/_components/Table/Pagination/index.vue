<template>
  <div class="flex flex-col">
    <ul class="pagination self-center">
      <li 
        class="page-item cursor-pointer action-btn" 
        :class="{'disabled': isOnFirstPage}"
        @click="loadPage('prev')"
      >
        <i class="fas fa-arrow-left" />
      </li>
      <template v-if="notEnoughPages">
        <li 
          v-for="(n, index) in totalPage"
          :key="`page-${index}`"
          class="page-item cursor-pointer" 
          :class="{'active': isCurrentPage(n)}"
          @click="loadPage(n)"
        >
          {{ n }}
        </li>
      </template>
      <template v-else>
        <li
          v-for="(n, index) in windowSize"
          :key="`page-${index}`"
          class="page-item cursor-pointer"
          :class="{'active': isCurrentPage(windowStart+n-1)}"
          @click="loadPage(windowStart+n-1)"
        >
          {{ windowStart+n-1 }}
        </li>
      </template>
      <li 
        class="page-item cursor-pointer action-btn" 
        :class="{'disabled': isOnLastPage}"
        @click="loadPage('next')"
      >
        <i class="fas fa-arrow-right" />
      </li>
    </ul>
  </div>
</template>
<script>
  import VuetablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin';
  export default {
    mixins: [VuetablePaginationMixin]
  }
</script>
<style lang="css">
  .pagination {
    display: inline-block;
  }
  .pagination .page-item.action-btn {
    border: 0px;
  }
  .pagination .page-item {
    color: #1a202c;
    font-weight: bold;
    float: left;
    padding: 4px 12px;
    margin: 5px;
    /* border: 1px solid #1a202c; */
    text-decoration: none;
    border-radius: 50%;
  }
  .pagination .page-item.active {
    background-color: #1a202c;
    color: white;
  }
</style>