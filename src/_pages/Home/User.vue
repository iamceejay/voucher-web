<template>
  <div class="flex flex-col w-full">
    <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize">
      Hi {{ AUTH_USER.data.detail && AUTH_USER.data.detail.firstName }}!
    </div>
    <router-link to="/vouchers/search">
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
      type="feature"
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

  export default {
    components: {
      SearchInputField,
      VoucherList,
      CategoryList,
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