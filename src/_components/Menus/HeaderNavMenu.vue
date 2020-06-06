<template>
  <div class="content-container w-full flex flex-row nav-container">
    <div class="flex self-center nav-logo">
      <a 
        href="javascript:void(0)" 
        :class="`flex flex-col sm:hidden self-center menu-toggle ${!hideSidebar ? 'hide' : ''}`" 
        @click="onHideSidebar()"
      >
        <i class="fas fa-bars text-base text-lg text-gray-900" />
      </a>
      <div class="flex self-center justify-center ml-12 w-full">
        <img
          class="self-center"
          src="@/_assets/img/logo.png" 
          alt=""
        />
      </div>
      <!-- <span class="logo-text-1">epas</span><span class="logo-text-2">nets</span> -->
    </div>
    <div class="hidden sm:flex flex-row self-center nav-menu">
      <a 
        v-for="(menu, index) in menus"
        :key="`menu-${index}`"
        href="javascript:void(0)" 
        class="menu-item font-bold font-display"
        @click="onSelectMenu(menu, index)"
      >
        <span class="hover:text-peach">
          {{ menu.title }}
        </span>
        <span 
          v-if="menu.child"
          class="ml-3"
        >
          <i
            :id="`dropdown-${index}`"
            class="fas fa-caret-down text-base" 
          />
        </span>
        <div
          v-if="menu.child && menu.isChildShow"
          class="dropdown-menu flex flex-col"
        >
          <a
            v-for="(child, cIndex) in menu.child"
            :key="`child-${cIndex}`"
            href="javascript:void(0)"
            class="dropdown-item font-bold font-display"
            @click="onSelectMenu(child, cIndex)"
          >
            {{ child.title }}
          </a>
        </div>
      </a>
      <a
        v-if="AUTH_USER.isAuth"
        href="javascript:void(0)" 
        class="menu-item font-bold font-display hover:text-peach" 
        @click="onLogout()"
      >
        Logout
      </a>
    </div>
    <router-link 
      v-if="hideSidebar && AUTH_USER && AUTH_USER.role && AUTH_USER.role.name && AUTH_USER.role.name === 'user'"
      class="cart-icon relative self-center"
      to="/cart"
    >
      <div class="cart-count">
        {{ COUNT_CART }}
      </div>
      <i class="fas fa-shopping-cart text-base text-lg" />
    </router-link>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        isLoggingOut: false,
        hideSidebar: true,
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
      },
      COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
      }, 
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
                  title: 'Manage',
                  link: '',
                  isChildShow: false,
                  child: [
                    {
                      title: 'Users',
                      link: '/users'
                    }, {
                      title: 'Orders',
                      link: '/manage-orders'
                    }, {
                      title: 'Payout',
                      link: '/payout'
                    }, {
                      title: 'Categories',
                      link: '/category'
                    }, {
                      title: 'Templates',
                      link: '/template'
                    }, {
                      title: 'Featured Vouchers',
                      link: '/featured-vouchers'
                    }, 
                  ],
                },
                {
                  title: 'Global Settings',
                  link: '/settings'
                }
              ]
              break;
            case 2:
              this.menus = [
                {
                  title: 'Home',
                  link: '/home'
                }, {
                  title: 'My Vouchers',
                  link: '/vouchers'
                }, {
                  title: 'Scan',
                  link: '',
                  isChildShow: false,
                  child: [
                    {
                      title: 'Scanner',
                      link: '/scanner'
                    }, {
                      title: 'Scanner Users',
                      link: '/scanner-users'
                    }, 
                  ],
                },  {
                  title: 'Manage',
                  link: '',
                  isChildShow: false,
                  child: [
                    {
                      title: 'Orders & Earnings',
                      link: '/orders-earnings'
                    }, {
                      title: 'Redemptions',
                      link: '/redemptions'
                    }
                  ],
                }, {
                  title: 'Profile & Settings',
                  link: '',
                  isChildShow: false,
                  child: profileChild,
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
<style lang="css" scoped>
  .nav-container {
    /* border: 1px solid #ccc; */
    height: 80px;
  }
  .nav-container .nav-logo {
    padding: 0px 20px;
    font-weight: bold;
  }
  .nav-logo img {
    width: 100px;
  }
  .nav-logo .logo-text-1 {
    color: #1f1f1f;
  }
  .nav-logo .logo-text-2 {
    color: #ff5563;
  }
  .nav-container .nav-menu {
    padding: 0px 0px;
    margin-left: auto;
  }
  .nav-menu .menu-item {
    font-size: 14px;
    padding: 0px 15px;
    position: relative;
  }
  .nav-menu .menu-item .dropdown-menu {
    position: absolute;
    background: #f5f5f5;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    min-width: 160px;
    padding: 10px 0px;
  }
  .dropdown-menu .dropdown-item {
    padding: 10px 15px;
  }
  .menu-toggle {
    /* right: 0; */
    position: absolute;
    /* top: 10px; */
    padding: 10px;
    font-size: 12px;
  }
  .cart-icon {
    position: relative;
    /* top: 16px; */
    padding: 0px 15px;
    /* right: 40px; */
    color: rgb(26, 32, 44);;
  }
  .cart-count {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 10px;
    border-radius: 50%;
    text-align: center;
    background: #ccc;
    top: -8px;
    right: 5px;
  }

  @media only screen and (max-width: 600px) {
    .nav-container .nav-logo {
      width: 100%;
    }
    .menu-toggle.hide i {
      color: #fff !important;
    }
    .menu-toggle.hide .fa-bars:before {
      content: '\f00d' !important;
    }
    .menu-toggle.hide  {
      right: 16px;
    }
    .nav-logo img {
      width: 100px;
      height: auto;
      /* margin: 0 auto; */
      
    }
  }
</style>