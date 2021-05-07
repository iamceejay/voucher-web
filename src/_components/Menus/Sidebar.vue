<template>
  <div
    class="bg-white border-t flex h-full md:hidden overflow-x-auto overflow-y-hidden"
  >
    <div v-if="AUTH_USER && AUTH_USER.admin" class="admin-container w-full text-center text-white text-xs p-1">
      {{ `Admin: ${AUTH_USER.admin.detail.firstName} ${AUTH_USER.admin.detail.lastName}` }}
    </div>
    <ul class="flex justify-around w-full">
      <li
        v-for="(menu, index) in menus"
        :key="`menu-${index}`"
        :class="`flex flex-col justify-center text-center ${ menu.isChildShow ? 'text-peach' :  'text-black'} cursor-pointer text-xs hover:text-peach`"
        @click="onSelectMenu(menu, index)"
      >
        <div class="flex flex-col items-center justify-center px-3 py-2" >
          <!-- <img v-if="menu.icon" class="h-5" :src="menu.icon" alt=""> -->
          <svg class="icon h-5 w-5 mb-1 text-peach">
            <use :xlink:href="`/icons/sprite.svg#${menu.isChildShow ? 'x-circle' : menu.icon}`"/>
          </svg>
          {{ AUTH_USER.role.id != 2 ? menu.title : '' }}
        </div>
        <!-- <ul
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
        </ul> -->
      </li>
      <!-- <li
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
            Ausloggen
          </span>
        </div>
      </li> -->
    </ul>
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
        await this.$store.dispatch('FETCH_CATEGORIES')
        await this.onSetMenusByRole()
      },
      onSetMenusByRole()
      {
        let profileChild = [
          {
            title: 'Info',
            link: '/profile-info'
          },{
            title: 'Einstellungen',
            link: '/profile-settings'
          },
        ]

        if( this.AUTH_USER.role.id == 3 ) {
          profileChild = [
            ...profileChild,
            {
              title: 'Zahlungsmethoden',
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
                  link: '/home',
                  icon: 'grid-3x3-gap-fill',
                }, {
                  title: 'Verwalten',
                  link: '',
                  isChildShow: false,
                  icon: 'grid-3x3-gap-fill',
                  child: [
                    {
                      title: 'Benutzer',
                      link: '/users'
                    }, {
                      title: 'Bestellungen',
                      link: '/manage-orders'
                    }, {
                      title: 'Auszahlung',
                      link: '/payout'
                    }, {
                      title: 'Kategorien',
                      link: '/category'
                    }, {
                      title: 'Unterkategorien',
                      link: '/sub-category'
                    }, {
                      title: 'Templates',
                      link: '/template'
                    }, {
                      title: 'Gesponserte Gutscheine',
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
                  title: 'Dashboard',
                  link: '/home',
                  icon: 'grid-3x3-gap-fill',
                }, {
                  title: 'Profil & Einstellungen',
                  icon: 'person',
                  link: '/profile-info',
                  // isChildShow: false,
                  // child: profileChild,
                }, {
                  title: 'Gutschein scannen',
                  link: '/scanner',
                  icon: 'upc-scan',
                },{
                  title: 'Gutschein erstellen',
                  link: '/vouchers/new',
                  icon: 'palette',
                }, {
                  title: 'Meine Gutscheine',
                  link: '/vouchers',
                  icon: 'wallet',
                }, {
                  title: 'Verwalten',
                  link: '/orders-earnings',
                  isChildShow: false,
                  icon: 'laptop',
                  // child: [
                  //   {
                  //     title: 'Bestellungen & Verdienste',
                  //     link: '/orders-earnings'
                  //   }, {
                  //     title: 'Eingelöst',
                  //     link: '/redemptions'
                  //   }
                  // ],
                },
              ]
              break;
            case 3:
              const categories = this.CATEGORIES.map( categ => {
                let slug = this.$helpers.toSlug(categ.name)
                return {
                  title: categ.name,
                  link: `/vouchers/category/${slug}`,
                  icon: categ.icon
                }
              })
              this.menus = [
                // {
                //   title: 'Home',
                //   link: '/home'
                // },
                {
                  title: 'Mein Wallet',
                  link: '/wallet',
                  icon: 'wallet',
                },
                {
                  title: 'Mein Profil',
                  link: '/profile-info',
                  icon: 'person',
                  // isChildShow: false,
                  // child: profileChild,
                },
                {
                  title: 'Kategorien',
                  link: '',
                  icon: 'list',
                  child: categories,
                  // isChildShow: false
                },
                {
                  title: 'Suchen',
                  link: '/vouchers/search',
                  icon: 'search',
                },
                // {
                //   title: 'Bestellungen',
                //   link: '/orders'
                // },
              ]
              break;
            case 4:
              this.menus = [
                {
                  title: 'Home',
                  link: '/home',
                  icon: 'grid-3x3-gap-fill',
                }
              ]
              break
            default:
              break;
          }
        } else {
          const categories = this.CATEGORIES.map( categ => {
            let slug = this.$helpers.toSlug(categ.name)

            return {
              title: categ.name,
              link: `/vouchers/category/${slug}`,
              icon: categ.icon
            }
          })

          this.menus = [
            {
              title: 'Suchen',
              link: '/vouchers/search',
              icon: 'search',
            },
            {
              title: 'Kategorien',
              link: '',
              child: categories,
              isChildShow: false,
              icon: 'list',
            },
           {
              title: 'Meine Wallet',
              link: '/guest-wallet',
              icon: 'wallet',
            },
            {
              title: 'Anmelden',
              link: '/login',
              icon: 'person',
            },


            // {
            //   title: 'Login',
            //   link: '/login',
            // }, {
            //   title: 'Registrieren',
            //   link: '/register/buyer',
            //   borderB: true,
            // },
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
          if (!this.AUTH_USER.isAuth && menu.link == '#wallet') {
            this.$parent.$refs.header.showWallet = true
            this.$parent.$refs.header.isRegisterPop = false
            this.hideSidebar = true;
            return
          }

          if( this.$route.path != menu.link ) {
            this.$router.push(menu.link)
            this.$parent.$refs.header.hideSidebar = true
            this.hideSidebar = true;
            this.$emit('onHide', this.hideSidebar)
          }
          // this.onHideSidebar()
        } else {
          this.$emit('onShowSubMenu', !menu.isChildShow ? menu.child : [])
          this.menus = this.menus.map( (m, i) => {

            if(index === i) {
              m.isChildShow = !m.isChildShow
            } else {
              m.isChildShow = false
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
        window.location = '/login'
      }
    }
  };
</script>

<style scoped>
  .logo {
    width: 140px;
  }
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
    position: fixed;
    z-index: 9999;
    background: #fff;
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