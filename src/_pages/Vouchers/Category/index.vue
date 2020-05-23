<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          :label="`${ CATEGORY ? CATEGORY.name : 'Category Name' }`"
        />
        <VoucherList
          class="mb-3"
          title="Featured Vouchers"
          :data="FEATURED_VOUCHERS.data"
          :withQR="false"
          :isInline="true"
        />
        <VoucherList
          class="mb-3"
          title="Newest"
          :data="NEWEST_VOUCHERS.data"
          :withQR="false"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import VoucherList from '_components/List/Modules/VoucherList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Home',
    components: {
      MainLayout,
      VoucherList,
      Header1,
    },
    data() {
      return {
        role: null,
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
      NEWEST_VOUCHERS()
      {
        return this.$store.getters.NEWEST_VOUCHERS
      },
      CATEGORY()
      {
        return this.$store.getters.CATEGORY
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
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      },
      async '$route.params.id'()
      {
        await this.onFetchData()
      }
    },
    mounted() {
      (async() => {
        await this.onFetchData()
      })()
    },
    methods: {
      async onFetchData()
      {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onSetRole()
        await this.onFetchCategory()
        await this.onFetchFeaturedVouchers()
        await this.onFetchNewestVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      },
      async onFetchFeaturedVouchers()
      {
        await this.$store.dispatch('FETCH_FEATURED_VOUCHERS')
      },
      async onFetchNewestVouchers()
      {
        await this.$store.dispatch('FETCH_NEWEST_VOUCHERS')
        console.log('NEWEST_VOUCHERS', this.NEWEST_VOUCHERS)
      },
      async onFetchCategory()
      {
        await this.$store.dispatch('FETCH_CATEGORY', this.$route.params.id)
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>