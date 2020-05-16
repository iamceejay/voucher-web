<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          label="My Wallet"
        />
        <SearchInputField
          id="search-here"
          v-model="search"
          class="m-2"
          placeholder="Search for vouchers ..."
        />
        <CartList
          class="mb-3"
          :role="role"
          :data="WALLETS"
          :isCart="false"
          :withQR="true"
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
        role: null,
        search: ''
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
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