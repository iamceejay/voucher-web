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
      @onHide="isHideSideBar = $event"
    />
    <div :class="`w-full pb-16 min-h-screen`">
      <div 
        id="infinite-scroll" 
        class="flex flex-col h-full w-full m-c"
      >
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
            This website uses cookies to ensure you get the best experience on our website.
          </p>
          <p class="text-xs">
            <a
              class="text-peach font-bold"
              href="https://verkaufen.epasnets.com/datenschutz"
              target="_blank"
            >
              Click Here
            </a>
            to view more about the Data Privacy.
          </p>
        </div>
        <button 
          class="cookie-btn" 
          @click="props.accept"
        >
          I accept
        </button>
      </template>
    </CookieLaw>
  </div>
</template>
<script>
  import Sidebar from '_components/Menus/Sidebar'
  import HeaderNavMenu from '_components/Menus/HeaderNavMenu'
  import CookieLaw from 'vue-cookie-law'

  export default {
    components: {
      Sidebar,
      HeaderNavMenu,
      CookieLaw,
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
              title: 'Loading',
              text: 'Please wait',
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
            if( listElm && doc.scrollTop + window.innerHeight == doc.scrollHeight )
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
</style>