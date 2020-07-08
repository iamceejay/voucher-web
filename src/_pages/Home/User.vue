<template>
  <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
    <Header1
      :label="`Hi ${ AUTH_USER.data.detail && AUTH_USER.data.detail.firstName }!`"
    />
    <router-link class="w-full flex" to="/vouchers/search">
      <SearchInputField
        id="search-here"
        class="m-2"
        placeholder="Suche hier nach Gutscheinen"
      />
    </router-link>
    <VoucherList
      class="mb-3"
      title="Gesponserte Gutscheine"
      :data="FEATURED_VOUCHERS"
      :isInline="true"
      :withQR="false"
      listId="featured-voucher-list"
    />
    <CategoryList
      class="mb-3"
      title="Kategorien"
      :data="CATEGORIES"
    />
    <VoucherList
      :withSort="true"
      class="mb-3"
      title="Gutscheine"
      :data="VOUCHERS.data"
      :withQR="false"
      listId="search-voucher-list"
      @onSort="onSearchData($event, 'sort')"
    />
  </div>
</template>
<script>
  import SearchInputField from '_components/Form/SearchInputField';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import CategoryList from '_components/List/Modules/CategoryList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      SearchInputField,
      VoucherList,
      CategoryList,
      Header1,
    },
    data() {
      return {
        params: {
          keyword: '',
          page: 1,
          paginate: 5,
          isNewest: false,
          isMostPopular: false,
          isLowestPrice: false,
          isPrice: null,
          isLoading: false,
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      FEATURED_VOUCHERS()
      {
        return this.$store.getters.FEATURED_VOUCHERS
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
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
          await this.$store.commit('SET_VOUCHERS', [])
          await this.$store.commit('SET_FEATURED_VOUCHERS', [])
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchVouchers()
          await this.onFetchFeaturedVouchers()
          await this.onFetchTotalUserCart()
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
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchVouchers()
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
      async onFetchFeaturedVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_FEATURED_VOUCHERS')
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchTotalUserCart()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_TOTAL_USER_CART')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>