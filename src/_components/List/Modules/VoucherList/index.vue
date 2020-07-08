<template>
  <div
    :id="listId"
    :key="`v-list-${listIndex}`"
    class="flex flex-col w-full"
  >
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <VoucherFilter 
      v-if="withFilter"
      :filterLabel="filterLabel"
      :isCategory="params.isCategory"
      :isRegion="params.isRegion"
      :isPrice="params.isPrice"
      @onFilter="onFilter"
    />
    <VoucherSort 
      v-if="withSort"
      :sortLabel="sortLabel"
      :isNewest="params.isNewest"
      :isMostPopular="params.isMostPopular"
      :isLowestPrice="params.isLowestPrice"
      @onFilter="onSort"
    />
    <div 
      v-if="type === 'standard'"
      :class="`${ isInline ? 'flex overflow-x-auto scroll ' : 'flex flex-wrap justify-center sm:justify-start' }`"
    >
      <VoucherCard
        v-for="(voucher, index) in tempData"
        :key="`voucher-${index}`"
        :listId="listId"
        :data="voucher"
        :role="role"
        :withQR="withQR"
      />
      <div v-if="tempData.length <= 0" class="py-2 text-lg">
        No data found.
      </div>
    </div>
    <div 
      v-if="type === 'feature'"
    >
      <slider
        ref="slider"
        :options="options"
      >
        <slideritem
          v-for="(voucher, index) in tempData"
          :key="`voucher-${index}`"
        >
          <VoucherCard
            :listId="listId"
            :data="voucher"
            :role="role"
            :withQR="withQR"
          />
        </slideritem>
      </slider>
      <div v-if="tempData.length <= 0" class="py-2 text-lg">
        No data found.
      </div>
    </div>
  </div>
</template>
<script>
  import VoucherCard from './VoucherCard/'
  import VoucherSort from './VoucherFilter/Sort'
  import VoucherFilter from './VoucherFilter/Filter'
  import Header2 from '_components/Headers/Header2';
  import moment from 'moment';
  import { slider, slideritem } from 'vue-concise-slider'

  export default {
    components: {
      VoucherCard,
      Header2,
      VoucherSort,
      VoucherFilter,
      slider,
      slideritem,
    },
    props: {
      listId: {
        type: String,
        default: 'voucher-list'
      }, title: {
        type: String,
        default: ''
      }, data: {
        type: Array,
        default() {
          return []
        }
      }, role: {
        type: String,
        default: 'seller'
      }, type: {
        type: String,
        default: 'standard'
      }, sortLabel: {
        type: String,
        default: ''
      }, withSort: {
        type: Boolean,
        default: false
      }, filterLabel: {
        type: String,
        default: ''
      }, withFilter: {
        type: Boolean,
        default: false
      }, withQR: {
        type: Boolean,
        default: true
      }, isInline: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        options: {
          pagination: true,
          thresholdDistance: 100, // Sliding distance threshold
          thresholdTime: 300, // Sliding time threshold decision
          grabCursor: true, // Scratch style
          speed: 300 
        },

        params: {
          isMostPopular: false,
          isNewest: false,
          isLowestPrice: false,
          isCategory: false,
          isRegion: false,
          isPrice: null,
        },
        tempData: [],
        listIndex: 0,
        filterForm: {
          categories: [],
          price: null,
        },
      }
    },
    watch: {
      data(newVal)
      {
        this.tempData = newVal
      }
    },
    mounted() {
      this.tempData = this.data
    },
    methods: {
      onSort( data )
      {
        this.params = {
          ...this.params,
          isMostPopular: false,
          isNewest: false,
          isLowestPrice: false,
          [data]: !this.params[data]
        }
        this.$emit('onSort', this.params)
      },
      onFilter( data )
      {
        this.$emit('onFilter', data)
      }
    }
  }
</script>
<style lang="css">
  .slider-container {
    white-space: unset !important;
  }
  .slider-wrapper .slider-item {
    font-size: unset;
    text-align: unset;
    color: unset;
    visibility: hidden;
  }
  .slider-wrapper .slider-item.slider-active {
    visibility: visible;
  }
  .slider-pagination {
    position: unset !important;
  }
  .slider-pagination-bullet {
    height: 10px !important;
    width: 10px !important;
  }
  .swiper-container-horizontal .slider-pagination-bullet-active, .swiper-container-vertical .slider-pagination-bullet-active {
    background: #ff5563 !important;
  }
</style>