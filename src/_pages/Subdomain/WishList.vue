<template>
<MainLayout>
  <template #content>
      <div class="content-container flex flex-1 justify-center items-center flex-col w-full">
    <h2 class="text-center text-3xl mb-10 font-medium">Meine Wunschliste</h2>
    <VoucherList
      title=""
      :data="voucher"
      :withQR="false"
      listId="user-voucher-list"
    />
  </div>
  </template>
</MainLayout>
</template>
<script>
  import VoucherList from '_components/List/Modules/VoucherList/';
  import MainLayout from '_layouts/subdomain';

  export default {
    name: 'WishList',
    components: {
      VoucherList,
      MainLayout
    },
    data() {
      return {
        voucher: []
      }
    },
    computed: {
      AUTH_USER_VOUCHER_WISHLIST()
      {
        return this.$store.getters.AUTH_USER_VOUCHER_WISHLIST
      },
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
    },
    created() {
    },
    mounted() {
      (async() => {
        await this.$store.dispatch('FETCH_VOUCHERS_BY_USER', this.AUTH_USER.data.id)
        this.voucher = await this.AUTH_USER_VOUCHER_WISHLIST.map((vouch) => { return vouch.voucher })
      })()
    },
    beforeDestroy () {

    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
  .voucher-search >>> .input-field {
    @apply bg-white;
  }
</style>