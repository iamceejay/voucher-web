<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <Header1
          label="Entdecke Gutscheine"
        />
        <SearchInputField
          id="search-here"
          v-model="params.keyword"
          :value="params.keyword"
          class="m-2"
          placeholder="Suche nach Gutscheinen"
          @input="onSearchData($event, 'search')"
        />
        <VoucherList
          class="mb-3"
          sortLabel="Sortieren nach:"
          :withSort="true"
          filterLabel="Filtern nach:"
          :withFilter="true"
          :data="VOUCHERS.data"
          :withQR="false"
          listId="search-voucher-list"
          @onChange="onFetchData"
          @onFilter="onSearchData($event, 'filter')"
          @onSort="onSearchData($event, 'sort')"
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
          keyword: '',
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
        try {
          await this.$store.commit('SET_IS_INFINITE_LOAD', true)
          await this.$store.commit('SET_VOUCHERS', [])
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchVouchers()
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
    }
  }
</script>
<style lang='css' scoped>
</style>