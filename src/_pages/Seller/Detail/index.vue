<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full px-8">
        <div class="w-full flex flex-col">
          <div class="flex flex-row">
            <Header1
              class="pb-0"
              :label="`${ USER.company.name }`"
            />

            <img
              v-if="USER && USER.company.logo"
              class="w-32 h-12 ml-auto"
              :src="onSetImage(USER.company.logo)" 
              alt=""
            />
            <img 
              v-else
              class="w-32 h-12 ml-auto"
              src="@/_assets/img/company-default-logo.png" 
              alt=""
            />
          </div>
          <p class="text-sm font-bold ml-2">
            {{ `${USER.detail.firstName} ${USER.detail.lastName}` }}
          </p>
          <p class="text-xs font-semibold ml-2">
            {{ USER.detail.address }}
          </p>
          <p class="text-xs font-semibold ml-2">
            Region {{ USER.detail.region || '' }}
          </p>
          <a 
            class="web-container ml-2 w-full sm:w-1/2 md:w-1/4 mt-2" 
            :href="`${USER.company.url}`"
            target="_blank"
          >
            {{ USER.company.url.replace(/(^\w+:|^)\/\//, '') }}
          </a>
          <div class="mt-4 ml-2">
            {{ USER.company.description }}
          </div>
        </div>
        <div class="w-full flex flex-col">
          <VoucherList
            title="All vouchers"
            class="mb-3"
            :data="VOUCHERS.data"
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
        isLoading: true,
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
      USER()
      {
        console.log('return this.$store.getters.USER', this.$store.getters.USER)
        return this.$store.getters.USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchUser()
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchUser()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER', {
            id: this.$route.params.id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHERS', {
            seller_id: this.$route.params.id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      onSetImage(value)
      {
        return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
      },
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