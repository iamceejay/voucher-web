<template>
  <transition name="fade-shrink-in" appear>
    <div
      v-show="open" id="seller-modal"
      class="fixed inset-0 p-4 overflow-auto" style="background-color: hsla(0, 0%, 0%, .5); z-index: 999"
      @click="close"
    >
      <div class="max-w-6xl w-full mx-auto bg-white rounded py-12 mt-8 z-10 shadow-lg relative" @click.stop>
        <div v-if="USER" class="content-container flex flex-col w-full px-8">
          <button
            type="button" class="focus:outline-none focus:shadow-none border-1 font-display bg-peach text-white w-32 py-1 px-2 rounded-full text-2xs"
            @click="close"
          >
            <span><i class="fas fa-arrow-left" /><span class="ml-2">Zurück</span></span>
          </button>
          <div class="w-full flex flex-col">
            <div class="flex flex-row">
              <Header1
                class="pb-0"
                :label="`${ USER.company.name }`"
              />
              <div class="self-center ml-auto">
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
            <p class="text-sm font-bold ml-2">
              {{ USER.username }}
              <!-- {{ `${USER.detail.firstName} ${USER.detail.lastName}` }} -->
            </p>
            <p class="text-xs font-semibold ml-2 md:w-4/5 lg:w-1/2">
              {{
                `${ USER.detail.address || '' }
                ${ (USER.detail.city) ? `, ${USER.detail.city}` : '' }${ (USER.detail.zip_code) ? `, ${USER.detail.zip_code}` : '' }`
              }}
            </p>
            <p class="text-xs font-semibold ml-2">
              {{ USER.company.region || '' }}
            </p>
            <a
              v-if="(USER.company && USER.company.url)"
              class="web-container ml-2 w-full sm:w-1/2 md:w-1/4 mt-2"
              :href="addHttp(USER.company.url)"
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
              title="Alle Gutscheine"
              class="mb-3"
              :data="VOUCHERS.data"
              :withQR="false"
            />
          </div>
        </div>
        <div v-if="isLoading" class="fixed inset-0 py-20">
          <img
            src="@/_assets/img/epasnets-loader.png" alt="loading"
            class="mx-auto p-20"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Header1 from '_components/Headers/Header1'
  import VoucherList from '_components/List/Modules/VoucherList/'

  export default {
    name: 'SellerModal',
    components: {
      Header1,
      VoucherList,
    },
    props: ['open'],
    data() {
      return {
        isLoading: false,
        page: 1
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      VOUCHERS()
      {
        return this.$store.getters.SELLER_VOUCHERS
      },
      USER()
      {
        return this.$store.getters.USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      SELLER_ID()
      {
        return this.$store.getters.SELLER_ID
      },
    },
    watch: {
      open(val) {
        if (val) {
          (async() => {

            document.body.classList.add('overflow-hidden')
            try {
              this.page = 1
              this.isLoading = true
              await this.$store.commit('SET_SELLER_VOUCHERS', [])
              await this.onFetchUser()
              await this.onFetchVouchers()
              this.isLoading = false
            } catch (err) {
              this.isLoading = false
            }
          })()
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      },
    },
    mounted() {
      const obj = document.getElementById('seller-modal')
      obj.onscroll = async (ev) => {
        // if( !self.IS_LOADING.status && !self.IS_PROCESSING.status && self.IS_INFINITE_LOAD ) {
        if (obj.scrollTop + 25 >= (obj.scrollHeight - obj.offsetHeight) && this.VOUCHERS.last_page > this.page && !this.isLoading) {
          this.isLoading = true
          this.page++
          await this.onFetchVouchers()
          this.isLoading = false
        }
      // }
      }
    },
    created() {

      document.addEventListener('keydown', (e) => {
        if (this.open && e.keyCode == 27) {
          this.close()
        }
      })
    },
    methods: {
      close() {
        this.$store.commit('SET_SELLER_MODAL', false)
        document.body.classList.remove('overflow-hidden')
      },
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
            id: this.SELLER_ID
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHERS', {
            seller_id: this.SELLER_ID,
            page: this.page,
            isSeller: true
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
  .company-logo {
    width: 160px;
    height: 64px;
  }
  @media only screen and (max-width: 600px) {
    .company-logo {
      width: 100px;
      height: 40px;
    }
  }
</style>