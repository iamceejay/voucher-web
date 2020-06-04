<template>
  <div class="header-container flex flex-col items-center">
    <div class="font-bold text-lg w-full sm:w-11/12 md:w-6/12 lg:w-5/12 ">
      Lorem ipsum dolor sit amet
    </div>
    <div class="text-sm w-full sm:w-11/12 md:w-6/12 lg:w-5/12 ">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis sed odio morbi quis commodo odio.
    </div>
    <router-link 
      class="flex flex-col sm:w-11/12 md:w-6/12 lg:w-5/12" 
      to="/vouchers/search"
    >
      <SearchInputField
        id="search-voucher"
        class="m-2 w-full" 
        placeholder=""
      />
    </router-link>
  </div>
</template>
<script>
  import SearchInputField from '_components/Form/SearchInputField'

  export default {
    components: {
      SearchInputField,
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
  .header-container {
    background: #f5f5f5;
    padding: 60px;
    justify-content: center;
    text-align: center;
  }
</style>