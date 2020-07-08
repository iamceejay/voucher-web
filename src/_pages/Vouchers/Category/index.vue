<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          :label="`${ CATEGORY ? CATEGORY.name : 'Category Name' }`"
        />
        <VoucherList
          class="mb-3"
          title="Gesponserte Gutscheine"
          :data="FEATURED_VOUCHERS"
          :withQR="false"
          :isInline="true"
          listId="featured-voucher-list"
        />
        <VoucherList
          class="mb-3"
          title="Neueste"
          :data="NEWEST_VOUCHERS.data"
          :withQR="false"
          listId="newest-voucher-list"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import VoucherList from '_components/List/Modules/VoucherList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Home',
    components: {
      MainLayout,
      VoucherList,
      Header1,
    },
    data() {
      return {
        params: {
          page: 1,
          paginate: 5,
          isCategory: null,
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
      NEWEST_VOUCHERS()
      {
        return this.$store.getters.NEWEST_VOUCHERS
      },
      CATEGORY()
      {
        return this.$store.getters.CATEGORY
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
      async '$route.params.id'()
      {
        await this.$store.commit('SET_FEATURED_VOUCHERS', [])
        await this.$store.commit('SET_NEWEST_VOUCHERS', [])
        await this.onFetchData()
      },
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
        await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_FEATURED_VOUCHERS', [])
        await this.$store.commit('SET_NEWEST_VOUCHERS', [])
        await this.onFetchData()
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onFetchData()
      {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchCategory()
          await this.onFetchFeaturedVouchers()
          await this.onFetchNewestVouchers()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      },
      async onLoadData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data
        }
        await this.onFetchNewestVouchers()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchFeaturedVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_FEATURED_VOUCHERS', {
            isCategory: this.params.isCategory
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchNewestVouchers()
      {
        try {
          const data = await this.$store.dispatch('FETCH_NEWEST_VOUCHERS', this.params)
          if( data.vouchers.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchCategory()
      {
        try {
          await this.$store.dispatch('FETCH_CATEGORY', this.$route.params.id)
          if( this.CATEGORY ) {
            this.params.isCategory = [ this.CATEGORY.name ]
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