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
        <a
           v-if="!AUTH_USER.isAuth"
          href="javascript:void(0)"
          :class="`flex flex-col sm:hidden self-center ${!hideSidebar ? 'hide' : ''}`"
          @click="showWallet = true; isRegisterPop = true"
        >
          <i class="fa fa-user text-lg text-gray-900" />
        </a>
      <!-- <span class="logo-text-1">epas</span><span class="logo-text-2">nets</span> -->
    </div>
    <div class="hidden sm:flex flex-row self-center nav-menu" v-if="AUTH_USER.isAuth">
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
        Ausloggen
      </a>
    </div>
    <div class="flex-row hidden justify-between nav-menu self-center sm:flex w-full" v-else>
      <span>
        <a
          v-for="(menu, index) in menus.slice(0, 3)"
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
            class="dropdown-menu flex flex-col left-0"
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
      </span>
      <span>
        <a
          v-for="(menu, index) in menus.slice(3)"
          :key="`menu-${index}`"
          :href="menu.link"
          class="menu-item font-bold font-display hover:text-peach"
        >
            {{ menu.title }}
        </a>
      </span>

    </div>
    <router-link
      v-if="hideSidebar && AUTH_USER && AUTH_USER.role && AUTH_USER.role.name && AUTH_USER.role.name === 'user'"
      class="cart-icon relative self-center"
      to="/cart"
    >
      <div class="cart-count" :class="`${COUNT_CART ? 'bg-peach text-white' : 'cart-count-default'}`">
        {{ COUNT_CART }}
      </div>
      <i class="fas fa-shopping-cart text-base text-lg" />
    </router-link>

    <div v-if="showWallet" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="showWallet ? 'modal-active' : ''">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" @click="showWallet = false; isRegisterPop = false"></div>
      <div class="bg-white md:max-w-2xl modal-container mx-auto overflow-y-auto rounded shadow-lg w-11/12 z-50">
        <div class="modal-content text-left relative">
          <div class="absolute cursor-pointer modal-close p-4 right-0 z-50" @click="showWallet = false">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
          <div class="p-4 sm:p-6 bg-gray-200" v-if="!isRegisterPop">
            <div class="flex justify-between items-center pb-3">
              <p class="font-bold text-center text-lg sm:text-2xl w-full">
                Erhalte Zugriff zu deiner eigenen Wallet
              </p>
            </div>
            <p class="text-center">In der Wallet sind deine Gutschein ein lebenlang gespeichert und du kannst von dort aus deine Gutscheine personalisieren und verschenken</p>
          </div>
          <div class="flex flex-col grid-template py-4 sm:grid">
            <div class="flex flex-col p-4 sm:p-6 justify-between">
              <p class="font-bold text-lg sm:text-2xl mx-6">Registriere dich kostenlos als Käufer</p>
                <a href="/register/buyer" class="px-4 bg-peach p-3 rounded-full mt-8 mx-6 sm:text-lg text-white text-center">Registrieren</a>
            </div>
            <div class="wrapper hidden sm:block">
              <div class="line"></div>
              <div class="wordwrapper">
                  <div class="word">oder</div>
              </div>
            </div>
            <div id="oder" class="block sm:hidden mt-10">
              <span class="bg-white px-3">oder</span>
            </div>​
            <div class="flex flex-col p-6 justify-between">
              <p class="font-bold text-lg sm:text-2xl mx-6">Melde dich als Käufer an</p>
                <a href="/login" class="px-4 bg-peach p-3 rounded-full mt-8 mx-6 sm:text-lg text-white text-center">Anmelden</a>
            </div>
          </div>
        </div>
      </div>
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
        hideSidebar: true,
        apiBaseURL: '',
        window_width: 0,
        menus: [],
        showWallet: false,
        isRegisterPop: false,
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
                  link: '/home'
                }, {
                  title: 'Verwalten',
                  link: '',
                  isChildShow: false,
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
                  title: 'Home',
                  link: '/home'
                }, {
                  title: 'Meine Gutscheine',
                  link: '/vouchers'
                }, {
                  title: 'Scannen',
                  link: '',
                  isChildShow: false,
                  child: [
                    {
                      title: 'Scanner',
                      link: '/scanner'
                    }, {
                      title: 'Scanner Profil',
                      link: '/scanner-users'
                    },
                  ],
                },  {
                  title: 'Verwalten',
                  link: '',
                  isChildShow: false,
                  child: [
                    {
                      title: 'Bestellungen & Verdienste',
                      link: '/orders-earnings'
                    }, {
                      title: 'Eingelöst',
                      link: '/redemptions'
                    }
                  ],
                }, {
                  title: 'Profil & Einstellungen',
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
                  title: 'Kategorien',
                  link: '',
                  child: categories,
                  isChildShow: false
                },{
                  title: 'Meine Wallet',
                  link: '/wallet'
                },{
                  title: 'Profil & Einstellungen',
                  link: '',
                  isChildShow: false,
                  child: profileChild,
                },{
                  title: 'Bestellungen',
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
            }, {
              title: 'Meine Wallet',
              link: '',
            }, {
              title: 'Kategorien',
              link: '',
              child: categories,
              isChildShow: false
            },  {
              title: 'Login',
              link: '/login',
            }, {
              title: 'Registrieren',
              link: '/register/buyer',
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

        if (menu.title == 'Meine Wallet' && !this.AUTH_USER.isAuth) {
          this.showWallet = true;
        }

        if(!menu.child) {
          if( this.$route.path != menu.link ) {
            this.$router.push(menu.link)
          }
        } else {
          const menuIcon = document.getElementById(`dropdown-${index}`).classList
          const icon = {
            r: !menu.isChildShow ? 'down' : 'up',
            a: !menu.isChildShow ? 'up' : 'down'
          }
          menuIcon.remove(`fa-caret-${icon.r}`)
          menuIcon.add(`fa-caret-${icon.a}`)
          this.menus = this.menus.map( (m, i) => {
            m.isChildShow = (index === i) ? !m.isChildShow : false
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
    z-index: 10;
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
    top: -8px;
    right: 5px;
  }
  .cart-count-default {
    background: #ccc;
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

  #oder {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;
    line-height: 0.1em;

    span {
      color: #ccc;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 15px;
      background: #fff;
    }
  }
  .grid-template {
    grid-template-columns: 1fr 20px 1px 1fr;
  }

  .wrapper {
    position: relative;
    margin: 10px;
  }

  .line {
      position: absolute;
      left: 49%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: #ccc;
      z-index: 1;
  }

  .wordwrapper {
      text-align: center;
      height: 12px;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      margin-top: -12px;
      z-index: 2;
  }

  .word {
      color: #ccc;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px;
      font: bold 12px arial,sans-serif;
      background: #fff;
      margin-left: -24px;
      width: 50px;
      z-index: 999;
  }
</style>