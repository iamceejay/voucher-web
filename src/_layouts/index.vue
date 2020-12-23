<template>
  <div
    id="main-layout-component"
    class="w-full flex flex-col overflow-auto relative"
    :class="`${ isHideSideBar ? 'hide-sidebar' : 'show-sidebar' }`"
  >
    <Sidebar
      :class="isHideSideBar ? 'hidden' : ''"
      @onHide="isHideSideBar = $event"
    />
    <HeaderNavMenu
      ref="header"
      @onHide="isHideSideBar = $event"
    />
    <div
      :class="`w-full pb-16 min-h-screen`" style="
    margin-top: 82px;
"
    >
      <div
        id="infinite-scroll"
        class="flex flex-col h-full w-full m-c pt-10"
      >
        <BackBtn class="px-8" />
        <slot name="content" />
      </div>
    </div>
    <CookieLaw
      class="cookie-container"
      buttonClass="cookie-btn"
    >
      <template #default="props">
        <div class="flex flex-col">
          <p class="text-xs">
            Diese Webseite verwendet Cookies, um dir das bestmögliche Erlebnis zu bieten.
          </p>
          <p class="text-xs">
            <a
              class="text-peach font-bold"
              href="https://verkaufen.epasnets.com/datenschutz"
              target="_blank"
            >
              Klicke hier,
            </a>
            um mehr über die Datenschutzbedingungen zu erfahren.
          </p>
        </div>
        <button
          class="cookie-btn"
          @click="props.accept"
        >
          Akzeptieren
        </button>
      </template>
    </CookieLaw>
    <voucher-modal :open="$store.getters.MODAL" />
    <seller-modal :open="IS_SELLER_MODAL_SHOW" />
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  import HeaderNavMenu from '_components/Menus/HeaderNavMenu'
  import CookieLaw from 'vue-cookie-law'
  import LoaderImg from '_assets/img/epasnets-loader.png'
  import VoucherModal from '_components/Modals/voucher-modal'
  import SellerModal from '_components/Modals/seller-modal'

  export default {
    components: {
      Sidebar,
      HeaderNavMenu,
      CookieLaw,
      VoucherModal,
      SellerModal
    },
    props: [],
    data() {
      return {
        isHideSideBar: true,
        isLoading: true,
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      IS_PROCESSING()
      {
        return this.$store.getters.IS_PROCESSING
      },
      IS_INFINITE_LOAD()
      {
        return this.$store.getters.IS_INFINITE_LOAD
      },
      IS_SELLER_MODAL_SHOW()
      {
        return this.$store.getters.SELLER_MODAL
      }
    },
    watch: {
      async IS_LOADING(newVal)
      {
        if( newVal.status ) {
          if( newVal.status == 'close' && newVal.data != null && typeof newVal.data == 'object' ) {
            await newVal.data.close()
            await this.$store.commit('SET_IS_LOADING', {
              status: null,
              data: null
            })
          }
          // if( newVal.status == 'processing' && typeof newVal.data == 'object' ) {
          //   await newVal.data.close()
          // }
          if( newVal.status == 'open' ) {
            let processing = this.$swal({
              // title: 'Wird geladen,',
              // text: 'bitte warten…',
              imageUrl: LoaderImg,
              imageHeight: 207,
              imageWidth: 259,
              allowOutsideClick: false,
              showConfirmButton: false,
              showClass: {
                popup: 'swal2-show-loader',
                backdrop: 'swal2-show-backdrop'
              },
              hideClass: {
                popup: 'swal2-hide-loader',
                backdrop: 'swal2-hide-backdrop'
              }
            })
            await this.$store.commit('SET_IS_LOADING', {
              status: 'processing',
              data: processing
            })
          }
        }
      },
      async IS_PROCESSING(newVal)
      {
        if( newVal.status ) {
          if( newVal.status == 'close' && typeof newVal.data == 'object' ) {
            await newVal.data.close()
            await this.$store.commit('SET_IS_PROCESSING', {
              status: null,
              data: null
            })
          }
          if( newVal.status == 'open' ) {
            let processing = this.$swal({
              imageUrl: LoaderImg,
              imageHeight: 207,
              imageWidth: 259,
              allowOutsideClick: false,
              showConfirmButton: false,
              showClass: {
                popup: 'swal2-show-loader',
                backdrop: 'swal2-show-backdrop'
              },
              hideClass: {
                popup: 'swal2-hide-loader',
                backdrop: 'swal2-hide-backdrop'
              }
            })
            await this.$store.commit('SET_IS_PROCESSING', {
              status: 'processing',
              data: processing
            })
          }
        }
      },
      isHideSideBar(value) {
        console.log(value)
      }

    },
    mounted() {
      (async() => {
        this.onScroll()
      })()
    },
    methods: {
      onScroll()
      {
        let self = this
        // document.onscroll = async () => {
        //   if( !self.IS_LOADING.status && !self.IS_PROCESSING.status && self.IS_INFINITE_LOAD ) {
        //     const listElm = document.querySelector('#infinite-scroll')
        //     const doc = document.documentElement

        //     if( listElm && doc.scrollTop + window.innerHeight == doc.scrollHeight )
        //     {
        //       await self.$store.commit('SET_IS_LOAD_MORE', true)
        //     }
        //   }
        // }

        window.onscroll = async (ev) => {
          if( !self.IS_LOADING.status && !self.IS_PROCESSING.status && self.IS_INFINITE_LOAD && !self.IS_SELLER_MODAL_SHOW) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 15) {
              await self.$store.commit('SET_IS_LOAD_MORE', true)
            }
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  #main-layout-component {
    margin: 0 auto;
  }
  .main-container.hide {
    transition: all 0.6s;
  }
  @media only screen and (max-width: 600px) {
    .main-container.hide {
      background: rgba(0, 0, 0, 0.80);
    }
  }
  .swal2-show-loader {
    background-color: transparent!important;
  }
</style>