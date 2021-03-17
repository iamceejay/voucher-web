<template>
  <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
    <GuestHeader />
    <!-- <GuestContent /> -->
    <div class="bg-white">
      <GuestVoucherCategories />
    </div>
    <VoucherList
      class="content-container mb-3 py-6 px-8"
      title="Unsere Lieblinge"
      :data="FEATURED_VOUCHERS"
      :isInline="true"
      :withQR="false"
      type="feature"
      listId="featured-voucher-list"
    />
    <CategoryList
      id="categories"
      class="content-container mb-3 py-6 px-8"
      title="Kategorien"
      :data="CATEGORIES"
    />
    <GuestSellerContent />
    <VoucherList
      class="content-container mb-3 pb-6 px-8 py-12"
      title=""
      :data="VOUCHERS.data"
      :withPagination="true"
      :currentPage="VOUCHERS.current_page"
      :lastPage="VOUCHERS.last_page"
      sortLabel="Sortieren nach:"
      :withSort="true"
      filterLabel="Filtern nach:"
      :withFilter="true"
      :withQR="false"
      listId="search-voucher-list"
      @onChange="onFetchData"
      @onFilter="onSearchData($event, 'filter')"
      @onSort="onSearchData($event, 'sort')"
      @onPaginate="onPaginateVouchers($event)"
    />
    <!-- <GuestFooter /> -->

    <div
      v-if="showAnnouncement" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
      :class="showAnnouncement ? 'modal-active' : ''"
    >
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" @click="showAnnouncement = false" />
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-xl font-bold">
              Schön dich bei epasnets zusehen!
            </p>
            <div class="modal-close cursor-pointer z-50" @click="showAnnouncement = false">
              <svg
                class="fill-current text-black" xmlns="http://www.w3.org/2000/svg"
                width="18" height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>
          <p>Unsere Seite befindet sich derzeit in der ersten Testphase und wird laufend weiterentwickelt. Hol dir als Erster einen kostenlosen Zugang zum epasnets Onlineshop und profitiere von unseren Early-Bird Konditionen. Du kannst schon jetzt alle Funktionen nutzen und Gutscheine aus Tirol kaufen, personalisieren und verschenken oder einlösen.</p>
          <div class="flex justify-end pt-2">
            <a href="https://www.epasnets.com/register/buyer" class="px-4 bg-transparent p-3 rounded-lg text-peach mr-2 text-xs">Jetzt als Käufer registrieren</a>
            <a href="https://verkaufen.epasnets.com" class="px-4 bg-peach p-3 rounded-lg text-white text-xs">Jetzt als Verkäufer registrieren</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VoucherList from '_components/List/Modules/VoucherList/'
  import CategoryList from '_components/List/Modules/CategoryList/'
  import GuestHeader from './GuestHeader'
  import GuestContent from './GuestContent'
  import GuestSellerContent from './GuestSellerContent'
  import GuestFooter from './GuestFooter'
  import GuestVoucherCategories from './VoucherCategories'

  export default {
    components: {
      GuestHeader,
      GuestContent,
      GuestSellerContent,
      GuestFooter,
      VoucherList,
      CategoryList,
      GuestVoucherCategories
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
        },
        showAnnouncement: false
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

      setTimeout(() => {
        this.showAnnouncement = false
        if (location.hash == '#categories') {
          var elmnt = document.getElementById("categories");
          elmnt.scrollIntoView();
        }
      }, 3000)
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