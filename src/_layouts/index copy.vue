<template>
  <div 
    id="main-layout-component"
    class="w-full flex flex-row overflow-auto"
    :class="`${ isHideSideBar ? 'hide-sidebar' : 'show-sidebar' }`"
  >
    <Sidebar
      @onHide="isHideSideBar = $event"
    />
    <div :class="`main-container py-16 px-8`">
      <div 
        id="infinite-scroll" 
        class="flex flex-col h-full w-full m-c"
      >
        <router-link 
          v-if="AUTH_USER && AUTH_USER.role && AUTH_USER.role.name && AUTH_USER.role.name === 'user'"
          class="cart-icon relative"
          to="/cart"
        >
          <div class="cart-count">
            {{ COUNT_CART }}
          </div>
          <i class="fas fa-shopping-cart text-base text-2xl" />
        </router-link>
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  export default {
    components: {
      Sidebar
    },
    props: [],
    data() {
      return {
        isHideSideBar: false,
        isLoading: true,
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
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
              title: 'Loading!',
              text: 'Please wait ...',
              allowOutsideClick: false,
              showConfirmButton: false
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
              title: 'Processing!',
              text: 'Please wait ...',
              allowOutsideClick: false,
              showConfirmButton: false
            })
            await this.$store.commit('SET_IS_PROCESSING', {
              status: 'processing',
              data: processing
            })
          }
        }
      },
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
        document.onscroll = async () => {
          if( !self.IS_LOADING.status && !self.IS_PROCESSING.status && self.IS_INFINITE_LOAD ) {
            const listElm = document.querySelector('#infinite-scroll')
            const doc = document.documentElement
            if(doc.scrollTop + window.innerHeight == doc.scrollHeight)
            {
              await self.$store.commit('SET_IS_LOAD_MORE', true)
            }
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .main-container.hide {
    transition: all 0.6s;
  }
  .cart-icon {
    position: absolute;
    top: 16px;
    right: 40px;
    color: rgb(26, 32, 44);;
  }
  .cart-count {
    position: absolute;
    width: 18px;
    height: 18px;
    font-size: 12px;
    border-radius: 50%;
    text-align: center;
    background: #ccc;
    top: -8px;
    right: -8px;
  }
  @media only screen and (max-width: 600px) {
    .main-container.hide {
      background: rgba(0, 0, 0, 0.80);
    }
  }
</style>