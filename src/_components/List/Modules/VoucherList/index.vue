<template>
  <div 
    :key="`v-list-${listIndex}`"
    class="flex flex-col w-full"
  >
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <div
      v-if="withFilter"
      class="w-full flex flex-row"
    >
      <Button
        :key="`isNewest-${isNewest}`"
        class="py-2 px-1 w-full md:w-40"
        label="Newest"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isNewest ? 'primary' : 'info' }`"
        @onClick="onFilter('newest')"
      />
      <Button
        :key="`isPopular-${isPopular}`"
        class="py-2 px-1 w-full md:w-40"
        label="Most Popular"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isPopular ? 'primary' : 'info' }`"
        @onClick="onFilter('popular')"
      />
      <Button
        :key="`isLowest-${isLowest}`"
        class="py-2 px-1 w-full md:w-40"
        :label="`${ !isLowest ? 'Lowest' : 'Highest' } Price`"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isLowest ? 'primary' : 'info' }`"
        @onClick="onFilter('lowest')"
      />
    </div>
    <div 
      v-if="type === 'standard'"
      class="flex flex-wrap justify-center sm:justify-start"
    >
      <VoucherCard
        v-for="(voucher, index) in tempData"
        :key="`voucher-${index}`"
        :data="voucher"
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
  import Header2 from '_components/Headers/Header2';
  import Button from '_components/Button/'
  import moment from 'moment';

  export default {
    components: {
      VoucherCard,
      FeatureVoucherCard,
      Header2,
      Button,
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
      }, withFilter: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isPopular: false,
        isNewest: false,
        isLowest: false,
        tempData: [],
        listIndex: 0
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
      onFilter( action )
      {
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
          default:
            break
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>