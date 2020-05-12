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
      :isCategory="isCategory"
      :isRegion="isRegion"
      :isPrice="isPrice"
      @onFilter="onFilter"
    />
    <VoucherSort 
      v-if="withSort"
      :sortLabel="sortLabel"
      :isNewest="isNewest"
      :isPopular="isPopular"
      :isLowest="isLowest"
      @onFilter="onFilter"
    />
    <div 
      v-if="type === 'standard'"
      class="flex flex-wrap justify-center sm:justify-start"
    >
      <VoucherCard
        v-for="(voucher, index) in tempData"
        :key="`voucher-${index}`"
        :data="voucher"
        :withQR="withQR"
        class="m-2"
      />
    </div>
    <div 
      v-if="type === 'feature'"
      class="flex flex-wrap justify-center sm:justify-start"
    >
      <FeatureVoucherCard
        v-for="(voucher, index) in tempData"
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
      }
    },
    data() {
      return {
        isPopular: false,
        isNewest: false,
        isLowest: false,
        isCategory: false,
        isRegion: false,
        isPrice: false,
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
      onFilter( data )
      {
        const action = data[0]
        let value = data.length > 1 ? data[1] : null
        switch ( action ) {
          case 'newest':
            this.isNewest = !this.isNewest
            this.tempData = this.tempData.sort((a, b) => {
              a = moment(a.created_at).local()
              b = moment(b.created_at).local()
              return !this.isNewest ? (a - b) : (b - a)
            })
            break
          case 'popular':
            this.isPopular = !this.isPopular
            this.tempData = this.isPopular 
              ? this.tempData.filter( row => row.isPopular )
              : this.data
            break
          case 'lowest':
            this.isLowest = !this.isLowest
            this.tempData = this.tempData.sort((a, b) => {
              return !this.isLowest ? (a.value - b.value) : (b.value - a.value)
            })
            break
          case 'category':
            if( value ) {

            } else {
              this.isCategory = !this.isCategory
            }
            // if( value || this.isPrice ) {
            //   this.isCategory = true
            //   this.filterForm.categories = value
            //   value = value || []
            //   this.tempData = value.length > 0 || this.isPrice
            //     ? this.data.filter( row => {
            //       const priceCon = this.isPrice && this.filterForm.price
            //         ? row.value >= this.filterForm.price.from && row.value <= this.filterForm.price.to
            //         : true
            //       const categCon = value.length > 0 
            //         ? value.includes(row.category.label)
            //         : true
            //       return ( categCon && priceCon)
            //     })
            //     : this.data
            // } else {
            //   this.filterForm.categories = []
            //   this.isCategory = !this.isCategory
            //   this.tempData = this.data
            // }
            break
          case 'region':
            this.isRegion = !this.isRegion
            break
          case 'price':
            this.isPrice = !this.isPrice

            // if( value ) {
            //   this.filterForm.price = value
            //   this.tempData = value
            //     ? this.data.filter( row => row.value >= value.from && row.value <= value.to )
            //     : this.data
            // } else {
            //   this.filterForm.price = null
            //   this.isPrice = !this.isPrice
            //   this.tempData = this.data
            // }
            break
          default:
            break
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>