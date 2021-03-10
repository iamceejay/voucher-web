<template>
  <div
    id="main-layout-component"
    class="absolute hide-sidebar inset-0"
    :class="{
      'grid': AUTH_USER.isAuth,
      'bg-white grid md:block': !AUTH_USER.isAuth,
      'overflow-hidden': !AUTH_USER.isAuth && categories.length,
    }"
  >

    <HeaderNavMenu
      ref="header"
      @onShowSubMenu="handleCategory"
    />
    <div class="bg-white md:hidden p-4 flex justify-between border-b">
      <router-link
        to="/home"
        >
        <img
          class="h-full"
          src="@/_assets/img/logo.png"
          alt=""
        />
      </router-link>
      <div v-if="AUTH_USER.isAuth">
        <router-link
          v-if="AUTH_USER && AUTH_USER.role && AUTH_USER.role.name && AUTH_USER.role.name === 'user'"
          class="flex flex-col items-center justify-center text-peach relative"
            to="/cart"
          >
          <div class="-mt-1 absolute mr-2 right-0 text-2xs text-black top-0">
            {{ COUNT_CART }}
          </div>
          <svg class="icon h-5 w-5 mb-1 text-peach">
            <use :xlink:href="`/icons/sprite.svg#bag`"/>
          </svg>
          <span class="text-2xs">Warenkorb</span>
        </router-link>
      </div>

      <div v-else class="text-sm flex space-x-4">
          <router-link class="hover:text-peach"  to="/login"> Login </router-link>
          <router-link class="hover:text-peach"  to="/register/buyer"> Registrieren </router-link>
      </div>

    </div>
    <div class="flex flex-col w-full relative" :class="`${categories.length ? 'overflow-hidden' : 'overflow-auto'}`" style="background: #F2F2F2;">
      <ul
        v-if="categories.length"
        id="mobile-category"
        class="fixed inset-0 z-50 px-6 py-4 overflow-auto "
        :class="AUTH_USER.isAuth ? 'md:hidden' : 'guest'"
        style="background-color: #F2F2F2">
          <li v-for="(category, index) in categories" :key="index"  class="border-b py-2 text-sm content-container ">
            <router-link :to="category.link">
                {{ category.title }}
            </router-link>
          </li>
      </ul>
      <div class="w-full pb-16">
        <div
          id="infinite-scroll"
          class="flex flex-col h-full w-full m-c pt-10"
        >
          <BackBtn class="px-8" :title="title" />
          <slot name="content" />
        </div>
      </div>

      <Footer />
    </div>
      <Sidebar @onShowSubMenu="handleCategory"
      />
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
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  import HeaderNavMenu from '_components/Menus/HeaderNavMenu'
  import CookieLaw from 'vue-cookie-law'
  import LoaderImg from '_assets/img/epasnets-loader.png'
  import VoucherModal from '_components/Modals/voucher-modal'
  import SellerModal from '_components/Modals/seller-modal'
  import Footer from '_components/Footer'

  export default {
    components: {
      Sidebar,
      HeaderNavMenu,
      CookieLaw,
      VoucherModal,
      SellerModal,
      Footer
    },
    props: ['title'],
    data() {
      return {
        isHideSideBar: true,
        isLoading: true,
        categories: []
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
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      },
      COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
      },
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
              imageHeight: 145,
              imageWidth: 181,
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
        // console.log(value)
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
      handleCategory(evt) {
        this.categories = evt
      }
    }
  }
</script>
<style lang="css" scoped>
  #main-layout-component {
    margin: 0 auto;
    grid-template-rows: 60px 1fr 70px;
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
  @screen md {
    #main-layout-component {
      grid-template-columns: 250px 1fr;
      grid-template-rows: none;
    }
  }
  #mobile-category {
    top: 60px;
    bottom: 70px;
  }
  #mobile-category.guest {
    bottom: 0px;
  }
</style>