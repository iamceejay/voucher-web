<template>
  <div 
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
        :data="voucher"
        :role="role"
        :withQR="withQR"
      />
      <div v-if="tempData.length <= 0" class="py-2 text-lg">
        Keine Daten gefunden.
      </div>
    </div>
    <div 
      v-if="type === 'feature'"
      class="scroll-horizontal scroll"
    >
      <FeatureVoucherCard
        v-for="(voucher, index) in tempData"
        :key="`voucher-${index}`"
        :data="voucher"
        class="m-2"
      />
      <div v-if="tempData.length <= 0" class="py-2 text-lg">
        Keine Daten gefunden.
      </div>
    </div>
  </div>
</template>
<script>
  import VoucherCard from './VoucherCard/'
  import FeatureVoucherCard from './FeatureVoucherCard/'
  import VoucherSort from './VoucherFilter/Sort'
  import VoucherFilter from './VoucherFilter/Filter'
  import Header2 from '_components/Headers/Header2';
  import moment from 'moment';

  export default {
    components: {
      VoucherCard,
      FeatureVoucherCard,
      Header2,
      VoucherSort,
      VoucherFilter,
    },
    props: {
      title: {
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
        
        // this.params
        // const action = data[0]
        // let value = data.length > 1 ? data[1] : null
        // switch ( action ) {
        //   case 'newest':
        //     this.isNewest = !this.isNewest
        //     this.tempData = this.tempData.sort((a, b) => {
        //       a = moment(a.created_at).local()
        //       b = moment(b.created_at).local()
        //       return !this.isNewest ? (a - b) : (b - a)
        //     })
        //     break
        //   case 'popular':
        //     this.isMostPopular = !this.isMostPopular
        //     this.tempData = this.isMostPopular 
        //       ? this.tempData.filter( row => row.isMostPopular )
        //       : this.data
        //     break
        //   case 'lowest':
        //     this.isLowest = !this.isLowest
        //     this.tempData = this.tempData.sort((a, b) => {
        //       return !this.isLowest ? (a.value - b.value) : (b.value - a.value)
        //     })
        //     break
        //   case 'category':
        //     if( value ) {

        //     } else {
        //       this.isCategory = !this.isCategory
        //     }
        //     // if( value || this.isLowestPrice ) {
        //     //   this.isCategory = true
        //     //   this.filterForm.categories = value
        //     //   value = value || []
        //     //   this.tempData = value.length > 0 || this.isLowestPrice
        //     //     ? this.data.filter( row => {
        //     //       const priceCon = this.isLowestPrice && this.filterForm.price
        //     //         ? row.value >= this.filterForm.price.from && row.value <= this.filterForm.price.to
        //     //         : true
        //     //       const categCon = value.length > 0 
        //     //         ? value.includes(row.category.label)
        //     //         : true
        //     //       return ( categCon && priceCon)
        //     //     })
        //     //     : this.data
        //     // } else {
        //     //   this.filterForm.categories = []
        //     //   this.isCategory = !this.isCategory
        //     //   this.tempData = this.data
        //     // }
        //     break
        //   case 'region':
        //     this.isRegion = !this.isRegion
        //     break
        //   case 'price':
        //     this.isLowestPrice = !this.isLowestPrice

        //     // if( value ) {
        //     //   this.filterForm.price = value
        //     //   this.tempData = value
        //     //     ? this.data.filter( row => row.value >= value.from && row.value <= value.to )
        //     //     : this.data
        //     // } else {
        //     //   this.filterForm.price = null
        //     //   this.isLowestPrice = !this.isLowestPrice
        //     //   this.tempData = this.data
        //     // }
        //     break
        //   default:
        //     break
        // }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>