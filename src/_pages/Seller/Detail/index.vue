<template>
  <MainLayout>
    <template #content>
      <div v-if="!isLoading" class="w-full flex flex-col">
        <div class="w-full flex flex-col">
          <div class="flex flex-row">
            <Header1
              class="pb-0"
              :label="`${ SELLER.detail.companyName }`"
            />
            <img 
              class="w-32 h-10 ml-auto"
              src="@/_assets/img/company-default-logo.png" 
              alt=""
            />
          </div>
          <p class="text-sm font-bold ml-2">
            {{ `${SELLER.user.detail.firstName} ${SELLER.user.detail.lastName}` }}
          </p>
          <p class="text-xs font-semibold ml-2">
            {{ SELLER.user.detail.address }}
          </p>
          <p class="text-xs font-semibold ml-2">
            Region {{ SELLER.user.detail.region }}
          </p>
          <a 
            class="web-container ml-2 w-full sm:w-1/2 md:w-1/4 mt-2" 
            :href="`${SELLER.detail.webUrl}`"
            target="_blank"
          >
            {{ SELLER.detail.webUrl.replace(/(^\w+:|^)\/\//, '') }}
          </a>
          <div class="mt-4 ml-2">
            {{ SELLER.detail.description }}
          </div>
        </div>
        <div class="w-full flex flex-col">
          <VoucherList
            title="All vouchers"
            class="mb-3"
            :data="SELLER.vouchers"
            :withQR="false"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Header1 from '_components/Headers/Header1'
  import VoucherList from '_components/List/Modules/VoucherList/'

  export default {
    name: 'Home',
    components: {
      MainLayout,
      Header1,
      VoucherList,
    },
    data() {
      return {
        role: null,
        isLoading: true,
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      SELLER()
      {
        return this.$store.getters.SELLER
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      },
      SELLER(newVal)
      {
        console.log('newVal seller', newVal)
      }
    },
    mounted() {
      (async() => {
        this.isLoading = true
        await this.onSetRole()
        await this.FETCH_SELLER()
        this.isLoading = false
      })()
    },
    methods: {
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
      async FETCH_SELLER()
      {
        this.$store.dispatch('FETCH_SELLER', this.$route.params.id)
      }
    }
  }
</script>
<style lang='css' scoped>
  .web-container {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: #1a202c;
    border-radius: 9999px;
    font-size: 0.875rem;
    color: #fff;
    text-align: center;
  }
</style>