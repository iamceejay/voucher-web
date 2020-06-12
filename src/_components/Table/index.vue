<template>
  <div id="custom-datatable-component" class="flex flex-col w-full">
    <vuetable
      ref="vuetable"
      class="table w-full"
      :apiMode="false"
      :perPage="perPage"
      :fields="fields"
      :data-manager="dataManager"
      paginationPath="pagination"
      @vuetable:pagination-data="onPaginationData"
    >
      <template #actions="props">
        <slot name="customActions" :data="props.rowData" />
      </template>
      <template #sequence_="props">
        {{ props.rowIndex + 1 }}
      </template>
      <template #created_date_="props">
        {{ formatDate(props.rowData.created_at) }}
      </template>
      <template #icon_="props">
        <div class="flex">
          <!-- <span>
            {{ props.rowData.icon }} 
          </span> -->
          <i :class="`mx-2 ${props.rowData.icon}`" />
        </div>
      </template>
      <template #voucher_feature_="props">
        <span class="flex justify-center">
          {{ props.rowData.is_featured ? 'Featured' : 'Not Featured' }} 
        </span>
      </template>
      <template #order_reverse_="props">
        <span class="flex justify-center">
          {{ props.rowData.reversed ? 'Reversed' : 'Not Reversed' }} 
        </span>
      </template>
      <template #voucher_="props">
        <div class="flex">
          <router-link :to="`/vouchers/${props.rowData.id}`">
            {{ props.rowData.title }} 
          </router-link>
          <!-- <i :class="`ml-auto mx-2 fas ${props.rowData.icon}`" /> -->
        </div>
      </template>
      <template #photo_="props">
        <div class="flex justify-center">
          <img 
            v-if="props.rowData.image != ''"
            style="width: 120px; height: 130px;"
            :src="onSetPhoto(props.rowData.image)" 
            alt=""
          />
          <img 
            v-else
            style="width: 120px; height: 80px;"
            src="@/_assets/img/no-image-available.jpg" 
            alt=""
          />
        </div>
      </template>
    </vuetable>
    <Pagination
      ref="pagination"
      class="flex justify-center mt-2"
      @vuetable-pagination:change-page="onChangePage"
    />
  </div>
</template>
<script type="text/javascript">
  import Vuetable from 'vuetable-2/src/components/Vuetable';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import Pagination from './Pagination/';
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    components: {
      Vuetable,
      Pagination
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }, fields: {
        type: Array,
        default() {
          return []
        }
      }, perPage: {
        type: Number,
        default: 5
      },
    },
    data() {
      return {};
    },
    watch: {
      data(newVal, oldVal) {
        this.$refs.vuetable.refresh();
      }
    },
    mounted() {
    },
    methods: {
      formatDate(date)
      {
        return formatDate(date)
      },
      onSetPhoto(value)
      {
        if( value != '' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        }
        return ''
      },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page);
      },
      dataManager(sortOrder, pagination) {
        if (!this.data || this.data.length < 0) return;

        let local = this.data;

        pagination = this.$refs.vuetable.makePagination(
          local.length,
          this.perPage
        );

        let from = pagination.from - 1;
        let to = from + this.perPage;

        return {
          pagination: pagination,
          data: local.slice(from, to)
        }
      },
    }
  }
</script>
<style lang="css">
  .table .vuetable {
    width: 100%;
    position: unset;
  }
  .table td, .table th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .table tr:nth-child(even){
    background-color: #f2f2f2;
  }
  .table tr:hover {
    background-color: #ddd;
  }
  .table thead th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #1a202c;
    color: white;
  }
</style>