<template>
  <div class="bg-dirty">
    <div class="content-container header-container flex flex-col items-center">
      <div class="font-display font-bold text-3xl w-full sm:w-11/12 md:w-6/12 lg:w-5/12 ">
        Lorem ipsum dolor sit amet
      </div>
      <div class="font-body text-lg w-full sm:w-11/12 md:w-6/12 lg:w-5/12 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing
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
    padding: 80px 0;
    justify-content: center;
    text-align: center;
  }
</style>