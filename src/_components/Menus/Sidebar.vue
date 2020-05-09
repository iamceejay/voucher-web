<template>
  <div
    class="sidebar-container"
    :class="!hideSidebar ? 'min-h-screen clearfix' : ''"
  >
    <a 
      href="javascript:void(0)" 
      :class="`menu-toggle ${!hideSidebar ? 'hide' : ''}`" 
      @click="onHideSidebar()"
    >
      <i class="fas fa-bars text-base text-2xl text-gray-900" />
    </a>
    <div class="w-64" :class="hideSidebar ? 'hidden' : ''">
      <div class="h-16 justify-center items-center text-2xl font-bold flex font-display">
        Hi Company!
      </div>
      <ul class="list-reset scroll mt-5">
        <li 
          v-for="(menu, index) in menus"
          :key="`menu-${index}`"
          class="border-t py-2"
        >
          <div class="pl-5 block hover:border-purple-900 ">
            <router-link 
              :to="menu.link"
              class="text-black hover:no-underline font-semibold hover:font-semibold hover:font-gray-800 border-gray-black font-body"
            >
              {{ menu.title }}
            </router-link>
          </div>
        </li>
        <li class="border-t py-2 border-b">
          <div class="pl-5 block hover:border-purple-900 ">
            <a
              href="javascript:void(0)"
              class="text-black hover:no-underline font-semibold hover:font-semibold hover:font-gray-800 border-gray-black font-body"
              @click="onLogout()"
            >
              <div
                v-if="isLoggingOut"
                class="sm-spinner m-auto" 
              />
              <span v-else>
                Logout
              </span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        isLoggingOut: false,
        hideSidebar: false,
        apiBaseURL: '',
        window_width: 0,
        menus: []
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      AUTH_USER(newVal, oldVal)
      {
        this.onSetMenusByRole()
      }
    },
    created() {
      this.onSetMenusByRole()
      // this.apiBaseURL = process.env.apiBaseURL;
      // Listen browser width
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth)
        this.getWindowWidth()
      });
    },
    methods: {
      onSetMenusByRole()
      {
        console.log('AUTH_USER', this.AUTH_USER)
        if(this.AUTH_USER.isAuth) {
          switch ( this.AUTH_USER.data.user_role.role_id ) {
            case 1:
              break;
            case 2:
              this.menus = [
                {
                  title: 'Home',
                  link: '/home'
                },{
                  title: 'My Vouchers',
                  link: '/vouchers'
                },{
                  title: 'Scanner',
                  link: '/scanner'
                },{
                  title: 'Orders & Earnings',
                  link: '/orders-earnings'
                },{
                  title: 'Redemptions',
                  link: '/redemptions'
                },{
                  title: 'Profile & Settings',
                  link: '/profile-settings'
                },{
                  title: 'Scanner Users',
                  link: '/scanner-users'
                },
              ]
              break;
            case 3:
              break;
            default:
              break;
          }
        }
      },
      getWindowWidth() {
        this.window_width = document.documentElement.clientWidth;
        if (this.window_width < 767) {
          this.hideSidebar = true;
        }
      },
      onHideSidebar() {
        this.hideSidebar = !this.hideSidebar;
        this.$emit('onHide', !this.hideSidebar)
      },
      async onLogout()
      {
        try {
          this.isLoggingOut = true
          const data = await this.$store.dispatch('LOGOUT')
          this.$store.commit('SET_AUTH_USER', {
            isAuth: false,
            token: '',
            data: {},
          })
          localStorage.removeItem('_auth')
          this.isLoggingOut = false
          this.$router.push('/login')
        } catch (err) {
          localStorage.removeItem('_auth')
          this.isLoggingOut = false
          this.$router.push('/login')
          console.log('err', err)
        }
      }
    }
  };
</script>

<style scoped>
  .menu-toggle {
    right: -50px;
    position: absolute;
    padding: 0.5rem;
    top: 10px;
  }
  a:hover {
    color: black;
  }
  .profile-image .round-image {
    min-width: 60px;
    height: 60px;
  }
  .sidebar-container {
    box-shadow: 3px 1px 3px 0px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    position: relative;
  }
  @media only screen and (max-width: 640px) {
    .menu-toggle.hide i {
      color: #fff !important;
      content: '\f00d' !important;
    }
  }

</style>