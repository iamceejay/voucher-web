<template>
  <div
    class="sidebar-container flex flex-col min-h-screen clearfix"
  >
    <a 
      href="javascript:void(0)" 
      :class="`menu-toggle ${!hideSidebar ? 'hide' : ''}`" 
      @click="onHideSidebar()"
    >
      <i class="fas fa-bars text-base text-2xl text-gray-900" />
    </a>
    <div
      class="flex flex-col w-full h-full"
      :class="hideSidebar ? 'hidden' : ''"
    >
      <div v-if="AUTH_USER && AUTH_USER.admin" class="admin-container w-full text-center text-white text-xs p-1">
        {{ `Admin: ${AUTH_USER.admin.detail.firstName} ${AUTH_USER.admin.detail.lastName}` }}
      </div>
      <div class="h-16 justify-center items-center text-2xl font-bold flex font-display">
        Hi {{ 
          (AUTH_USER.role && AUTH_USER.data) && (
            AUTH_USER.role.name === 'seller'
              ? 'Company'
              : AUTH_USER.role.name === 'scanner'
                ? AUTH_USER.data.username
                : AUTH_USER.data.detail.firstName
          )
        }}!
      </div>
      <ul class="list-reset scroll mt-5">
        <li 
          v-for="(menu, index) in menus"
          :key="`menu-${index}`"
          :class="`border-t block flex flex-col text-black font-semibold font-body cursor-pointer ${ menu.borderB && 'border-b' }`"
          @click="onSelectMenu(menu, index)"
        >
          <div class="flex flex-row pl-5 py-2">
            {{ menu.title }}
            <span 
              v-if="menu.child"
              class="ml-auto mr-3"
            >
              <i
                :id="`dropdown-${index}`"
                class="fas fa-caret-down text-base" 
              />
            </span>
          </div>
          <ul
            v-if="menu.child && menu.isChildShow"
            class="list-reset scroll"
          >
            <li 
              v-for="(child, cIndex) in menu.child"
              :key="`child-${cIndex}`"
              class="border-t py-2 pl-5 block flex text-black font-semibold font-body cursor-pointer"
              @click="onSelectMenu(child, cIndex)"
            >
              <span class="ml-3">{{ child.title }}</span>
            </li>
          </ul>
        </li>
        <li 
          v-if="AUTH_USER.isAuth"
          class="border-t py-2 border-b cursor-pointer"
          @click="onLogout()"
        >
          <div class="pl-5 block hover:border-purple-900 text-black hover:no-underline font-semibold hover:font-semibold hover:font-gray-800 border-gray-black font-body">
            <div
              v-if="isLoggingOut"
              class="sm-spinner m-auto" 
            />
            <span v-else>
              Logout
            </span>
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
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      }
    },
    watch: {
      async AUTH_USER(newVal, oldVal)
      {
        // await this.onFetchData()
      }
    },
    mounted() {
      (async() => {
        await this.onFetchData()
        this.$emit('onHide', this.hideSidebar)
        this.$nextTick(function() {
          window.addEventListener('resize', this.getWindowWidth)
          this.getWindowWidth()
        })
      })()
    },
    methods: {
      async onFetchData()
      {
        await this.onSetMenusByRole()
      },
      onSetMenusByRole()
      {
        let profileChild = [
          {
            title: 'Info',
            link: '/profile-info'
          },{
            title: 'Settings',
            link: '/profile-settings'
          },
        ]

        if( this.AUTH_USER.role.id == 3 ) {
          profileChild = [
            ...profileChild,
            {
              title: 'Payment',
              link: '/profile-payment'
            }
          ]
        }
        if(this.AUTH_USER.isAuth) {
          switch ( this.AUTH_USER.role.id ) {
            case 1:
              this.menus = [
                {
                  title: 'Home',
                  link: '/home'
                }, {
                  title: 'Manage Users',
                  link: '/users'
                }, {
                  title: 'Payout Management',
                  link: '/payout'
                }, {
                  title: 'Categories',
                  link: '/category'
                }, {
                  title: 'Templates',
                  link: '/template'
                }, {
                  title: 'Global Settings',
                  link: '/settings'
                }, {
                  title: 'Featured Vouchers',
                  link: '/featured-vouchers'
                }, 
              ]
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
                  link: '',
                  isChildShow: false,
                  child: profileChild,
                },{
                  title: 'Scanner Users',
                  link: '/scanner-users'
                },
              ]
              break;
            case 3:
              const categories = this.CATEGORIES.map( categ => {
                return {
                  title: categ.name,
                  link: `/vouchers/category/${categ.id}`
                }
              })
              this.menus = [
                {
                  title: 'Home',
                  link: '/home'
                },{
                  title: 'Categories',
                  link: '',
                  child: categories,
                  isChildShow: false
                },{
                  title: 'My Wallet',
                  link: '/wallet'
                },{
                  title: 'Profile & Settings',
                  link: '',
                  isChildShow: false,
                  child: profileChild,
                },{
                  title: 'Orders',
                  link: '/orders'
                },
              ]
              break;
            case 4:
              this.menus = [
                {
                  title: 'Home',
                  link: '/home'
                }
              ]
              break
            default:
              break;
          }
        } else {
          this.menus = [
            {
              title: 'Home',
              link: '/home'
            }, {
              title: 'Login',
              link: '/login',
            }, {
              title: 'Register',
              link: '/register',
              borderB: true,
            }, 
          ]
        }
      },
      getWindowWidth() {
        this.window_width = document.documentElement.clientWidth;
        if (this.window_width < 767) {
          this.hideSidebar = true;
          this.$emit('onHide', this.hideSidebar)
        }
      },
      onSelectMenu(menu, index)
      {
        if(!menu.child) {
          if( this.$route.path != menu.link ) {
            this.$router.push(menu.link)
          }
          this.onHideSidebar()
        } else {
          const menuIcon = document.getElementById(`dropdown-${index}`).classList
          const icon = {
            r: !menu.isChildShow ? 'down' : 'up',
            a: !menu.isChildShow ? 'up' : 'down'
          }
          menuIcon.remove(`fa-caret-${icon.r}`)
          menuIcon.add(`fa-caret-${icon.a}`)
          this.menus = this.menus.map( (m, i) => {
            if(index === i) {
              m.isChildShow = !m.isChildShow
            }
            return m
          })
        }
      },
      onHideSidebar() {
        this.hideSidebar = !this.hideSidebar;
        this.$emit('onHide', this.hideSidebar)
      },
      async onLogout()
      {
        try {
          this.isLoggingOut = true
          const data = await this.$store.dispatch('LOGOUT')
          this.onRemoveAuth()
        } catch (err) {
          this.onRemoveAuth()
        }
      },
      onRemoveAuth()
      {
        localStorage.removeItem('_auth')
        this.$store.commit('SET_AUTH_USER', {
          isAuth: false,
          token: '',
          role: {
            id: null,
            name: null,
          },
          data: null,
        })
        this.isLoggingOut = false
        this.$router.push('/login')
      }
    }
  };
</script>

<style scoped>
  .admin-container {
    background-color: #1a202c;
  }
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
  @media only screen and (max-width: 600px) {
    .menu-toggle.hide i {
      color: #fff !important;
    }
    .menu-toggle.hide .fa-bars:before {
      content: '\f00d' !important;
    }
  }

</style>