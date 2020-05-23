<template>
  <div class="flex flex-col w-full">
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
      :data="featuredVouchers"
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
      :data="VOUCHERS"
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
        featuredVouchers: []
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
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      }
    },
    mounted() {
      this.onFetchFeaturedVouchers()
    },
    methods: {
      onFetchFeaturedVouchers()
      {
        this.featuredVouchers = this.VOUCHERS.filter( vouch => vouch.isFeatured )
      }
    }
  }
</script>
<style lang='css' scoped>
</style>