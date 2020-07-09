<template>
  <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
    <GuestHeader />
    <GuestContent />
    <VoucherList
      class="content-container mb-3 py-6 px-8"
      title="Gesponserte Gutscheine"
      :data="FEATURED_VOUCHERS"
      :isInline="true"
      :withQR="false"
      type="feature"
      listId="featured-voucher-list"
    />
    <CategoryList
      class="content-container mb-3 py-6 px-8"
      title="Kategorien"
      :data="CATEGORIES"
    />
    <GuestSellerContent />
    <VoucherList
      class="content-container mb-3 py-6 px-8"
      title="Gutscheine entdecken"
      :data="VOUCHERS.data"
      sortLabel="Sortieren nach:"
      :withSort="true"
      filterLabel="Filtern nach:"
      :withFilter="true"
      :withQR="false"
      listId="search-voucher-list"
      @onChange="onFetchData"
      @onFilter="onSearchData($event, 'filter')"
      @onSort="onSearchData($event, 'sort')"
    />
    <GuestFooter />
  </div>
</template>
<script>
  import VoucherList from '_components/List/Modules/VoucherList/'
  import CategoryList from '_components/List/Modules/CategoryList/'
  import GuestHeader from './GuestHeader'
  import GuestContent from './GuestContent'
  import GuestSellerContent from './GuestSellerContent'
  import GuestFooter from './GuestFooter'

  export default {
    components: {
      GuestHeader,
      GuestContent,
      GuestSellerContent,
      GuestFooter,
      VoucherList,
      CategoryList,
    },
    data() {
      return {
        params: {
          keyword: '',
          page: 1,
          paginate: 5,
          isNewest: true,
          isMostPopular: false,
          isLowestPrice: false,
          isPrice: null,
          isLoading: false,
        }
      }
    },
    computed: {
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      },
      FEATURED_VOUCHERS()
      {
        return this.$store.getters.FEATURED_VOUCHERS
      },
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      IS_LOAD_MORE()
      {
        return this.$store.getters.IS_LOAD_MORE
      },
    },
    watch: {
      async IS_LOAD_MORE(newVal)
      {
        if( newVal ) {
          await this.onFetchData({
            ...this.params,
            page: this.params.page + 1
          })
          await this.$store.commit('SET_IS_LOAD_MORE', false)
        }
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_INFINITE_LOAD', true)
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_VOUCHERS', [])
          await this.$store.commit('SET_FEATURED_VOUCHERS', [])
          await this.$store.commit('SET_CATEGORIES', [])
          await this.onFetchNewestVouchers()
          await this.onFetchFeaturedVouchers()
          await this.onFetchCategories()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onSearchData( data = null, action )
      {
        if ( action == 'sort' ) {
          this.params.keyword = ''
        }
        let params = ( action == 'sort' || action == 'filter' )
          ? {
            ...this.params,
            ...data,
            page: 1
          }
          : {
            ...this.params,
            page: 1
          }
        await this.$store.commit('SET_VOUCHERS', [])
        await this.onFetchData(params)
      },
      async onFetchData( data )
      {
        await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data,
        }
        await this.onFetchNewestVouchers()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchNewestVouchers()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SEARCH_VOUCHERS', this.params)
          if( data.vouchers.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchCategories()
      {
        try {
          await this.$store.dispatch('FETCH_CATEGORIES')
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchFeaturedVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_FEATURED_VOUCHERS')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>