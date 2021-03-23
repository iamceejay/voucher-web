<template>
  <div class="-mt-10">
    <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
      <div class="bg-custom-gray text-center py-24 voucher-search">
        <h1 class="font-display text-xl md:text-3xl lg:text-4xl mb-1">
          Entdecke Gutscheine
        </h1>
        <router-link class="w-full flex" to="/vouchers/search">
          <SearchInputField
            id="search-here"
            class="m-2"
            placeholder="Suche nach Aktivitäten oder Unternehmen"
          />
        </router-link>
      </div>
      <div class="voucher-list__container content-container w-11/12 sm:w-9/12 xl:w-7/12 pt-16">
        <h2 class="text-center text-3xl mb-10 font-medium">Unsere Lieblinge</h2>
        <VoucherList
          title=""
          :data="VOUCHERS.data"
          :withPagination="true"
          :currentPage="VOUCHERS.current_page"
          :lastPage="VOUCHERS.last_page"
          :withQR="false"
          listId="guest-voucher-list"
          @onChange="onFetchData"
          @onPaginate="onPaginateVouchers($event)"
        />
      </div>
      <SellerContent class="mt-8" />
    </div>
  </div>
</template>
<script>
  import SearchInputField from '_components/Form/SearchInputField';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import CategoryList from '_components/List/Modules/CategoryList/';
  import SellerContent from '_pages/Home/shared/SellerContent'

  export default {
    components: {
      SearchInputField,
      VoucherList,
      CategoryList,
      SellerContent,
    },
    data() {
      return {
        params: {
          keyword: '',
          page: 1,
          paginate: 9,
          isNewest: false,
          isMostPopular: false,
          isLowestPrice: false,
          isPrice: null,
          isLoading: false,
          seed: new Date().getTime()
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
      // IS_LOAD_MORE()
      // {
      //   return this.$store.getters.IS_LOAD_MORE
      // },
    },
    // watch: {
    //   async IS_LOAD_MORE(newVal)
    //   {
    //     if( newVal ) {
    //       await this.onFetchData({
    //         ...this.params,
    //         page: this.params.page + 1
    //       })
    //       await this.$store.commit('SET_IS_LOAD_MORE', false)
    //     }
    //   },
    // },
    mounted() {
      (async() => {
        try {
          // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
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
      async onPaginateVouchers(action)
      {
        let params =
        {
          ...this.params,
          page: (action === "prev") ? this.params.page - 1 : this.params.page + 1
        }
        await this.$store.commit('SET_VOUCHERS', [])
        await this.onFetchData(params)
        document.querySelector(".voucher-list__container").scrollIntoView();
      },
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
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
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
  .voucher-search >>> .input-field {
    @apply bg-white;
  }
</style>