<template>
  <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
    <Header1
      :label="`Hi ${ AUTH_USER.data.detail && AUTH_USER.data.detail.firstName }!`"
    />
    <router-link class="w-full flex" to="/vouchers/search">
      <SearchInputField
        id="search-here"
        class="m-2"
        placeholder="Search here ..."
      />
    </router-link>
    <VoucherList
      class="mb-3"
      title="Featured Vouchers"
      :data="FEATURED_VOUCHERS.data"
      :isInline="true"
      :withQR="false"
    />
    <CategoryList
      class="mb-3"
      title="Categories"
      :data="CATEGORIES"
    />
    <VoucherList
      :withFilter="true"
      class="mb-3"
      title="Vouchers"
      :data="VOUCHERS.data"
      :withQR="false"
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
      }
    },
    created() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchVouchers()
        await this.onFetchFeaturedVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchVouchers()
      {
        console.log('test 1')
        await this.$store.dispatch('FETCH_VOUCHERS')
      },
      async onFetchFeaturedVouchers()
      {
        console.log('test 2')
        await this.$store.dispatch('FETCH_FEATURED_VOUCHERS')
      },
    }
  }
</script>
<style lang='css' scoped>
</style>