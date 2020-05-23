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
      <div class="flex flex-col h-full w-full m-c">
        <router-link 
          v-if="role === 'user'"
          class="cart-icon relative"
          to="/cart"
        >
          <div class="cart-count">
            {{ CARTS.length }}
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
        role: null
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      CARTS()
      {
        return this.$store.getters.CARTS
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      }
    },
    mounted() {
      this.onSetRole()
    },
    methods: {
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      }
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