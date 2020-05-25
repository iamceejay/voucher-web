<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          label="Search Voucher"
        />
        <SearchInputField
          id="search-here"
          v-model="search"
          class="m-2"
          placeholder="Search for vouchers ..."
        />
        <VoucherList
          class="mb-3"
          sortLabel="Sort by:"
          :withSort="true"
          filterLabel="Filter by:"
          :withFilter="true"
          :data="VOUCHERS.data"
          :withQR="false"
          listId="search-voucher-list"
          @onChange="onFetchData"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import SearchInputField from '_components/Form/SearchInputField';
  import VoucherList from '_components/List/Modules/VoucherList/';

  export default {
    components: {
      MainLayout,
      Header1,
      SearchInputField,
      VoucherList,
    },
    data() {
      return {
        search: '',
        params: {
          page: 1,
          paginate: 5,
          isNewest: false,
          isMostPopular: false,
          isLowestPrice: false,
          isPrice: null,
          isLoading: false,
        }
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
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
        await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_VOUCHERS', [])
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onFetchData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data
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
    }
  }
</script>
<style lang='css' scoped>
</style>