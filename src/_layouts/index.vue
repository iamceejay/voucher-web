<template>
  <section>
    <div id="mobile-header" class="bg-white md:hidden p-4 flex items-center justify-between border-b">
      <router-link
        to="/home"
        >
        <img
          class="h-6"
          src="@/_assets/img/header.svg"
          alt=""
        />
      </router-link>
      <div v-if="AUTH_USER.isAuth" class="flex">
        <router-link
          to="/wish-list"
          class="menu-item  text-xs mr-2"
        >
          <span class="hover:text-peach relative z-10 flex flex-col items-center">
            <svg class="icon h-5 w-5 text-peach mb-1">
              <use :xlink:href="`/icons/sprite.svg#heart`"/>
            </svg>
            <span class="text-2xs text-peach">Meine Wishlist</span>
          </span>
        </router-link>
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
        <a
          href="javascript:void(0)"
          class="menu-item  text-xs"
        >
          <span class="hover:text-peach relative z-10 flex flex-col items-center">
            <svg class="icon h-4 w-4 text-peach">
              <use :xlink:href="`/icons/sprite.svg#heart`"/>
            </svg>
            Meine Wishlist
          </span>
        </a>
        <router-link
          class="flex flex-col items-center justify-center relative"
            to="/cart"
          >
          <div class="relative  h-4 w-4">
            <svg class="relative icon h-4 w-4 text-peach">
              <use :xlink:href="`/icons/sprite.svg#bag`"/>
            </svg>
            <div class="-m-3 absolute bg-peach flex h-4 items-center justify-center right-0 rounded-full text-2xs  text-white top-0 w-4">
              {{ COUNT_CART }}
            </div>
          </div>

          <span class="text-xs">Warenkorb</span>
        </router-link>
      </div>

    </div>
    <div
      id="main-layout-component"
      class="absolute hide-sidebar inset-0 grid h-full"
      :class="{
        'md:block': !AUTH_USER.isAuth || (AUTH_USER.isAuth && AUTH_USER.role.name == 'user'),
        'overflow-hidden': !AUTH_USER.isAuth && categories.length,
      }"
    >
      <div v-if="IS_LOADING.data || IS_PROCESSING.data" class="absolute bg-black bg-opacity-25 inset-0" style="z-index: 99999;">
        <lottie-animation path="./loading.json"/>
      </div>
      <HeaderNavMenu
        ref="header"
        @onShowSubMenu="handleCategory"
      />

      <div
        class="flex flex-col w-full relative"
        :class="`${categories.length ? 'overflow-hidden' : 'overflow-auto overflow-x-hidden'} ${!AUTH_USER.isAuth || AUTH_USER.role.name === 'user' ? 'guest-container' : ''}`"
        :style="contentStyle"
      >
        <ul
          v-if="categories.length"
          id="mobile-category"
          class="categories-menu fixed inset-0 z-110 px-6 py-4 overflow-auto "
          :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'md:hidden' : 'guest'"
          style="background-color: #F2F2F2">
            <li v-for="(category, index) in categories" :key="index" class="categories-menu__item content-container">
              <a :href="category.link" class="flex flex-wrap items-center py-2 lg:py-4 text-sm">
                <img  v-if="category.icon.indexOf('fas') == -1" :src="onSetLogo('set', category.icon)" class="h-12 lg:h-16 rounded-md mr-6 lg:mr-8" :alt="category.title">
                <img v-else class="h-12 lg:h-16 rounded-md mr-6 lg:mr-8" src="@/_assets/img/placeholder-400-300.jpg" :alt="category.title">
                <span>{{ category.title }}</span>
              </a>
            </li>
        </ul>
        <div class="w-full">
          <div
            id="infinite-scroll"
            class="flex flex-col h-full w-full m-c pt-10"
          >
            <BackBtn class="px-8" :title="title" v-if="showBackButton" />
            <slot name="content" />
          </div>
        </div>

        <Footer v-if="!AUTH_USER.isAuth || (AUTH_USER.role.name === 'user' && $route.name == 'vouchers-search')"/>
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
  </section>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  import HeaderNavMenu from '_components/Menus/HeaderNavMenu'
  import CookieLaw from 'vue-cookie-law'
  import LoaderImg from '_assets/img/epasnets-loader.png'
  import VoucherModal from '_components/Modals/voucher-modal'
  import SellerModal from '_components/Modals/seller-modal'
  import Footer from '_components/Footer'
  import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

  export default {
    components: {
      Sidebar,
      HeaderNavMenu,
      CookieLaw,
      VoucherModal,
      SellerModal,
      Footer,
      LottieAnimation
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      showBackButton: {
        type: Boolean,
        default: true,
      },
      contentStyle: {
        type: String,
        defaul: ''
      }
    },
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
              // imageUrl: LoaderImg,
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
              // imageUrl: LoaderImg,
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
        var doc = document.querySelectorAll('.guest-container')[0];

        var prevScroll = doc.scrollTop;
        var curScroll;
        var direction = 0;
        var prevDirection = 0;

        var mobile = document.getElementById('mobile-header');

        var checkScroll = function() {

          /*
          ** Find the direction of scroll
          ** 0 - initial, 1 - up, 2 - down
          */

          curScroll = doc.scrollTop;
          if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
          }
          else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
          }

          if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
          }

          prevScroll = curScroll;
        };

        var toggleHeader = function(direction, curScroll) {
          if (direction === 2 && curScroll > 52) {

            //replace 52 with the height of your header in px

            mobile.classList.add('hide');
            prevDirection = direction;
          }
          else if (direction === 1) {
            mobile.classList.remove('hide');
            prevDirection = direction;
          }
        };

        doc.addEventListener('scroll', checkScroll);

        this.onScroll();
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
      },
      async onLogout()
      {
        try {
          this.isLoggingOut = true
          const data = await this.$store.dispatch('LOGOUT')
          await this.onRemoveAuth()
        } catch (err) {
          await this.onRemoveAuth()
        }
      },
      async onRemoveAuth()
      {
        await localStorage.removeItem('_auth')
        await this.$store.commit('SET_AUTH_USER', {
          isAuth: false,
          token: '',
          role: {
            id: null,
            name: null,
          },
          data: null,
        })
        await localStorage.removeItem('_userWishlist')
        await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', [])
        this.isLoggingOut = false
        this.$router.push('/login')
      },
      onSetLogo(action, value)
      {
        if( action == 'set' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .categories-menu__item {
    @apply border-b-2 border-input-border;
  }
  .categories-menu__item:last-child {
    @apply border-b-0;
  }
  #main-layout-component {
    margin: 0 auto;
    grid-template-rows: 1fr 70px;
  }

  .main-container.hide {
    transition: all 0.6s;
  }

  .guest-container {
    padding-top: 70px;
  }

  @media only screen and (max-width: 600px) {
    .main-container.hide {
      background: rgba(0, 0, 0, 0.80);
    }
  }
  .swal2-show-loader {
    background-color: transparent!important;
  }

  #mobile-category {
    top: 70px;
    bottom: 70px;
  }
  #mobile-category.guest {
    bottom: 70px;
  }

  @screen md {
    #mobile-category.guest {
       bottom: 0px;
    }
    #main-layout-component {
      grid-template-columns: 250px 1fr;
      grid-template-rows: none;
    }
    .guest-container {
      margin-top: 90px;
    }
  }

  #mobile-header {
    height: 70px;
    position: fixed;
    top: 0;
    z-index: 9999;
    transition: top .3s ease;
    left: 0;
    right: 0;
  }

  #mobile-header.hide {
      top: -71px;
  }
</style>