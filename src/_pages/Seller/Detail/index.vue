<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && USER" class="content-container flex flex-col w-full px-8">
        <div class="w-full flex flex-col">
          <img
            v-if="!USER && USER.company.logo"
            class="h-32 md:h-64bg-white mb-6 object-cover"
            :src="onSetImage(USER.company.logo)"
            alt=""
          />
          <img
            v-else
            class="h-32 md:h-64 bg-white mb-6 object-cover"
            src="@/_assets/img/placeholder-1080.jpg"
            alt=""
          />
          <div class="flex flex-row">
            <div class="self-center mx-auto">
              <img
                v-if="USER && USER.company.logo"
                class="company-logo"
                :src="onSetImage(USER.company.logo)"
                alt=""
              />
              <img
                v-else
                class="company-logo"
                src="@/_assets/img/company-default-logo.png"
                alt=""
              />
            </div>
          </div>
          <div class="border-b-2 ml-2 mt-4 pb-6 flex flex-col">
            <div class="overflow-hidden" :class="{'h-20 md:h-10 show-more' : !isShowMore}">
              {{ USER.company.description }}
            </div>
            <div>
                <button
                  type="button"
                  @click="isShowMore = !isShowMore"
                  class="px-3 py-3 rounded-md text-xs mt-6"
                  :class="'border border-black text-black'"
                  >
                  {{ !isShowMore ? 'Mehr lesen' : 'Lese weniger' }}
                </button>
              </div>
          </div>

        </div>
        <div class="mt-6 p-6 border" style="background-color: #F7F7F7">
          <p class="text-sm font-bold">
            {{ USER.company.name }}
            <!-- {{ `${USER.detail.firstName} ${USER.detail.lastName}` }} -->
          </p>
          <p class="text-xs">
            {{
              `${ USER.detail.address || '' }
              ${ (USER.detail.city) ? `, ${USER.detail.city}` : '' }${ (USER.detail.zip_code) ? `, ${USER.detail.zip_code}` : '' }`
            }}
          </p>
          <p class="text-xs ">
            {{ USER.company.region || '' }}
          </p>
          <a
            v-if="(USER.company && USER.company.url)"
            class="web-container w-full mt-2"
            :href="addHttp(USER.company.url)"
            target="_blank"
          >
            {{ USER.company.url.replace(/(^\w+:|^)\/\//, '') }}
          </a>
        </div>
        <div class="w-full flex flex-col">
          <div class="font-medium text-base text-center my-6">Gutscheine</div>
          <VoucherList
            title=""
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
    components: {
      MainLayout,
      Header1,
      VoucherList,
    },
    data() {
      return {
        isLoading: true,
        isShowMore: false,
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
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_VOUCHERS', [])
          await this.onFetchUser()
          await this.onFetchVouchers()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      addHttp(url) {
        if(!url) {
          return ''
        }
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
          url = "http://" + url;
        }
        return url;
      },
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
  .show-more {
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top, color-stop(0.00, rgba(0,0,0,0)), color-stop(1.00, rgba(0,0,0,1)));
  }
  .web-container {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: #1a202c;
    border-radius: 9999px;
    font-size: 0.875rem;
    color: #fff;
    text-align: center;
  }
  .company-logo {
    height: 50px;
  }
  @media only screen and (max-width: 600px) {
    .company-logo {
      height: 40px;
    }
  }
</style>