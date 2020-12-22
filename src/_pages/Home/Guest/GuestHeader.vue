<template>
  <div class="bg-dirty -m-10">
    <div class="content-container header-container flex flex-col items-center px-8 py-20 lg:py-32">
      <div class="font-display font-bold text-2xl w-full sm:w-11/12 md:w-6/12 lg:w-9/12">
        Entdecke die nettesten Gutscheine aus Tirol
      </div>
      <div class="font-body text-lg w-full sm:w-11/12 md:w-9/12 lg:w-6/12 ">
        Zum Verschenken oder selber Erleben
      </div>

      <router-link
        class="flex flex-col w-full sm:w-11/12 md:w-9/12 lg:w-9/12"
        to="/vouchers/search"
      >
        <SearchInputField
          id="search-voucher"
          class="m-2 w-full"
          placeholder="Unternehmen & Aktivitäten finden"
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
    justify-content: center;
    text-align: center;
  }
</style>