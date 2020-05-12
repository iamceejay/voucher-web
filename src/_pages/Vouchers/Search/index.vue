<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900 capitalize">
          Search
        </div>
        <SearchInputField
          id="search-here"
          v-model="search"
          class="m-2"
          placeholder="Search for vouchers ..."
        />
        <VoucherList
          class="mb-3"
          title="Vouchers"
          sortLabel="Sort by:"
          :withSort="true"
          filterLabel="Filter by:"
          :withFilter="true"
          :data="VOUCHERS"
          :withQR="false"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from "_layouts";
  import SearchInputField from '_components/Form/SearchInputField';
  import VoucherList from '_components/List/Modules/VoucherList/';

  export default {
    name: "Home",
    components: {
      MainLayout,
      SearchInputField,
      VoucherList,
    },
    data() {
      return {
        role: null,
        search: ''
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
    },
    watch: {
      AUTH_USER(newVal) {
        this.onSetRole();
      }
    },
    mounted() {
      this.onSetRole();
    },
    methods: {
      onSetRole() {
        if (this.AUTH_USER?.data?.user_role) {
          this.role = this.AUTH_USER.data.user_role.role.name;
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>