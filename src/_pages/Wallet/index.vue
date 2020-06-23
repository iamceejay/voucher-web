<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="My Wallet"
        />
        <SearchInputField
          id="search-here"
          v-model="params.keyword"
          class="my-2"
          placeholder="Search for vouchers ..."
          @input="onLoadData($event, true)"
        />
        <CartList
          class="mb-3"
          :role="AUTH_USER.role.name"
          :data="WALLETS.data"
          :isCart="false"
          :withQR="true"
          :withCartDetail="false"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import SearchInputField from '_components/Form/SearchInputField';
  import CartList from '_components/List/Modules/CartList/';

  export default {
    components: {
      MainLayout,
      Header1,
      SearchInputField,
      CartList,
    },
    data() {
      return {
        search: '',
        params: {
          keyword: '',
          page: 1,
          paginate: 5,
          user_id: null,
          status: 'completed'
        }
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
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
          await this.onLoadData({
            ...this.params,
            page: this.params.page + 1
          })
          await this.$store.commit('SET_IS_LOAD_MORE', false)
        }
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_WALLETS', [])
        await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        this.params.user_id = this.AUTH_USER.data.id
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchSearchWallets()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onLoadData( data, fromSearch = false )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data,
          page: (this.params.keyword != '') ? 1 : data.page
        }
        if( fromSearch ) {
          await this.$store.commit('SET_WALLETS', [])
        }
        await this.onFetchSearchWallets()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchSearchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SEARCH_WALLETS', this.params)
          if( data.orders.next_page_url == null ) {
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