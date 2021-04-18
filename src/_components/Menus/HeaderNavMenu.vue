<template>
  <div
    class="bg-white w-full nav-container hidden md:flex border-b"
    :id="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'site-header' : 'guest-header'"
    >
    <div class="content-container mx-auto w-full hidden md:flex"  :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col' : 'flex-row'">
      <div class="nav-logo flex"  :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col' : 'flex-row'">
        <a
          href="javascript:void(0)"
          :class="`flex flex-col sm:hidden self-center menu-toggle ${!hideSidebar ? 'hide' : ''}`"
          @click="onHideSidebar()"
        >
          <i class="fas fa-bars text-lg text-gray-900" />
        </a>
        <router-link class="flex justify-center" to="/">
          <img
            class="self-center"
            src="@/_assets/img/header.svg"
            alt=""
          />
        </router-link>
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
      <div v-if="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user'" class="border border-black mx-8 opacity-25" style="margin-bottom: 20px"></div>
      <div v-if="AUTH_USER.isAuth" class="flex flex-1 justify-between mx-8 text-sm"
        :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col' : 'flex-row'"
        >
        <div
          class="flex"
          :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col space-y-4' : 'flex-row space-x-4 items-center flex-1 justify-center'">
            <a
            v-for="(menu, index) in menus"
            :key="`menu-${index}`"
            href="javascript:void(0)"
            class="menu-item "
            @click="onSelectMenu(menu, index)"
          >
            <span
              class="hover:text-peach relative z-10 flex items-center"
              :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-row' : 'flex-col'">
              <svg
                v-if="menu.icon"
                class="icon h-4 w-4"
                :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'mr-2' : 'text-peach'">
                <use :xlink:href="`/icons/sprite.svg#${menu.isChildShow ? 'x-circle' : menu.icon}`"/>
              </svg>
              {{ menu.title }}
              <span
                v-if="menu.child && AUTH_USER.role.name !== 'user'"
                class="absolute right-0"
              >
                <i
                  :id="`dropdown-${index}`"
                  class="fas fa-caret-down"
                />
              </span>
            </span>
            <!-- <div v-if="menu.child && menu.isChildShow" class="fixed inset-0 z-0" /> -->
            <div
              v-if="menu.child && menu.isChildShow && AUTH_USER.role.name !== 'user'"
              class="dropdown-menu flex flex-col"
            >
              <a
                v-for="(child, cIndex) in menu.child"
                :key="`child-${cIndex}`"
                href="javascript:void(0)"
                class="dropdown-item"
                @click="onSelectMenu(child, cIndex)"
              >
                {{ child.title }}
              </a>
            </div>
          </a>
        </div>
        <div
          class="flex"
          :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col space-y-4 mt-8 pb-8 items-start' : 'items-center'">
          <router-link
            v-if="hideSidebar && AUTH_USER && AUTH_USER.role && AUTH_USER.role.name && AUTH_USER.role.name === 'user'"
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

            <span class="text-sm">Warenkorb</span>
          </router-link>
          <a
            v-if="AUTH_USER.isAuth"
            href="javascript:void(0)"
            class="flex items-center justify-center relative"
            :class="AUTH_USER.isAuth && AUTH_USER.role.name == 'user' ? 'flex-col ml-4' : 'space-x-2'"
            @click="onLogout()"
            >
            <div class="relative  h-4 w-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="relative icon h-4 w-4 text-peach" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </div>
            <span class="text-sm">Ausloggen</span>
          </a>
        </div>
      </div>
      <div
        v-else
        class="flex flex-1 justify-between mx-8 text-sm"
        :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col' : 'flex-row'">
        <div
          class="flex"
          :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col space-y-4' : 'flex-row items-center space-x-4 flex-1 justify-center'">
          <a
            v-for="(menu, index) in menus.slice(0, 4)"
            :key="`menu-${index}`"
            href="javascript:void(0)"
            class="menu-item  "
            @click="onSelectMenu(menu, index)"
          >
            <span class="hover:text-peach relative z-10 flex flex-col items-center">
              <svg v-if="menu.icon" class="icon h-4 w-4 text-peach">
                <use :xlink:href="`/icons/sprite.svg#${menu.isChildShow ? 'x-circle' : menu.icon}`"/>
              </svg>
              {{ menu.title }}
            </span>
          </a>
        </div>
        <div
          class="flex mt-8 pb-8"
          :class="AUTH_USER.isAuth && AUTH_USER.role.name !== 'user' ? 'flex-col space-y-4 items-start' : 'flex-row items-center space-x-4'"
          >
          <router-link
            href="javascript:void(0)"
            class="flex flex-col items-center justify-center relative"
            to="/wish-list"
          >
            <span class="hover:text-peach relative z-10 flex flex-col items-center">
              <svg class="icon h-4 w-4 text-peach">
                <use :xlink:href="`/icons/sprite.svg#heart`"/>
              </svg>
              Meine Wishlist
            </span>
          </router-link>
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

            <span class="text-sm">Warenkorb</span>
          </router-link>
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
       COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
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
        (function(){
          var doc = document.documentElement;
          var w = window;

          var prevScroll = w.scrollY || doc.scrollTop;
          var curScroll;
          var direction = 0;
          var prevDirection = 0;

          var header = document.getElementById('guest-header');

          var checkScroll = function() {

            /*
            ** Find the direction of scroll
            ** 0 - initial, 1 - up, 2 - down
            */

            curScroll = w.scrollY || doc.scrollTop;
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

              header.classList.add('hide');
              prevDirection = direction;
            }
            else if (direction === 1) {
              header.classList.remove('hide');
              prevDirection = direction;
            }
          };

          window.addEventListener('scroll', checkScroll);

        })();
        await this.onFetchData()
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
                    },
                    {
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
                  icon: 'grid-3x3-gap-fill',
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
                  icon: categ.icon,
                  link: `/vouchers/category/${slug}`
                }
              })
              this.menus = [
                {
                  title: 'Suche',
                  link: '/vouchers/search',
                  icon: 'search',
                },{
                  title: 'Kategorien',
                  link: '',
                  icon: 'list',
                  child: categories,
                  isChildShow: false
                },{
                  title: 'Meine Wallet',
                  link: '/wallet',
                  icon: 'wallet',
                },{
                  title: 'Profil & Einstellungen',
                  link: '/profile-info',
                  icon: 'person',
                  // isChildShow: false,
                  // child: profileChild,
                },
                // {
                //   title: 'Bestellungen',
                //   icon: 'clipboard-data',
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
              title: 'Search',
              link: '/vouchers/search',
              icon: 'search',
            },{
              title: 'Kategorien',
              link: '',
              icon: 'list',
              child: categories,
              isChildShow: false
            }, {
              title: 'Meine Wallet',
              link: '/guest-wallet',
              icon: 'wallet',
            }, {
              title: 'Anmelden',
              link: '/login',
              icon: 'person',
            }, {
              title: 'Login',
              link: '/login',
            }, {
              title: 'Meine Wallet',
              link: '/guest-wallet',
              icon: 'wallet',
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

        // if (menu.title == 'Meine Wallet' && !this.AUTH_USER.isAuth) {
        //   this.showWallet = true;
        // }

        if(!menu.child) {
          if( this.$route.path != menu.link ) {
            this.$router.push(menu.link)
          }
        } else {
          if (!this.AUTH_USER.isAuth || (this.AUTH_USER.isAuth && this.AUTH_USER.role.name == 'user')) {
            this.$emit('onShowSubMenu', !menu.isChildShow ? menu.child : [])
            this.menus = this.menus.map( (m, i) => {

              if(index === i) {
                m.isChildShow = !m.isChildShow
              } else {
                m.isChildShow = false
              }
              return m
            })
            return
          }
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
        await localStorage.removeItem('_userWishlist')
        await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', [])
        this.isLoggingOut = false
        this.$router.push('/login')
      }
    }
  };
</script>
<style lang="css" scoped>
  #guest-header {
    height: 90px;
    position: fixed;
    top: 0;
    z-index: 9999;
    transition: top .3s ease;
  }

  #guest-header.hide {
      top: -91px;
  }

  #site-header {
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    transition: top .3s ease;
    box-shadow: 0 1px 25px rgba(0,0,0, .1);
    overflow: auto;
  }

  .nav-container .nav-logo {
    padding: 40px 30px 20px;
    font-weight: bold;
  }
  #guest-header .nav-logo {
    padding: 20px 30px 20px;
  }
  .nav-logo img {
    width: auto;
    height: 24px;
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
    padding: 0px 15px;
    color: rgb(26, 32, 44);
    margin-left: -15px;
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
    .show-sidebar  #site-header {
      background: transparent;
      top: 0;
    }
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