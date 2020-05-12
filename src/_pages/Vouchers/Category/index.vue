<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          :label="`${ category ? category.label : 'Category Name' }`"
        />
        <VoucherList
          class="mb-3"
          title="Featured Vouchers"
          :data="featuredVouchers"
          type="feature"
        />
        <VoucherList
          class="mb-3"
          title="Newest"
          :data="VOUCHERS"
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
        featuredVouchers: [],
        category: null,
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
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      },
      '$route.params.id'()
      {
        this.onFetchCategory()
      }
    },
    created() {
      this.onSetRole()
      this.onFetchFeaturedVouchers()
      this.onFetchCategory()
      console.log('this.$route.params.id', this.$route.params.id)
    },
    methods: {
      onFetchCategory()
      {
        this.category = this.CATEGORIES.filter( categ => categ.id == this.$route.params.id )[0]
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
      onFetchFeaturedVouchers()
      {
        this.featuredVouchers = this.VOUCHERS.filter( vouch => vouch.isFeatured )
      }
    }
  }
</script>
<style lang='css' scoped>
</style>