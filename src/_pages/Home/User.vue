<template>
  <div class="flex flex-col w-full">
    <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize">
      Hi {{ AUTH_USER.data.detail && AUTH_USER.data.detail.firstName }}!
    </div>
    <SearchInputField
      id="search-here"
      class="m-2"
      placeholder="Search here ..."
    />
    <div class="w-full flex flex-col mb-3">
      <Header1 label="Featured Vouchers" />
      <VoucherList
        :data="VOUCHERS"
        type="feature"
      />
    </div>
    <SaleStatistics />
    <Quicklinks />
  </div>
</template>
<script>
  import SearchInputField from '_components/Form/SearchInputField';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import SaleStatistics from '_components/Modules/Home/SaleStatistics';
  import Quicklinks from '_components/Modules/Home/Quicklinks';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      SearchInputField,
      VoucherList,
      SaleStatistics,
      Quicklinks,
      Header1
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
      }
    },
    mounted() {

    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>