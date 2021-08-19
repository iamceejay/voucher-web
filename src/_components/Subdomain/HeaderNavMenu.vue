<template>
  <div
    class="bg-white w-full nav-container hidden md:flex border-b"
    id="guest-header"
  >
    <div
      class="content-container mx-auto w-full hidden md:flex"
      :class="
        AUTH_USER.isAuth && AUTH_USER.role.name !== 'user'
          ? 'flex-col'
          : 'flex-row'
      "
    >
      <div class="flex flex-1 justify-between mx-8 text-sm flex-row">
        <div class="w-1/3"></div>
        <div
          class="w-1/3 flex flex-row items-center space-x-4 flex-1 justify-center"
        >
          <router-link to="/" class="self-center mx-auto">
            <img
              v-if="USER && USER.company.logo"
              class="company-logo h-12"
              :src="onSetImage(USER.company.logo)"
              alt=""
            />
            <img
              v-else
              class="company-logo"
              src="@/_assets/img/company-default-logo.png"
              alt=""
            />
          </router-link>
        </div>
        <div
          class="w-1/3 flex mt-8 pb-8 flex-row items-center justify-end space-x-4"
        >
          <router-link
            href="javascript:void(0)"
            class="flex flex-col items-center justify-center relative"
            :to="AUTH_USER.isAuth ? '/wallet' : '/guest-wallet'"
          >
            <span
              class="hover:text-black relative z-10 flex flex-col items-center text-black"
            >
              <svg class="icon h-4 w-4 text-black">
                <use :xlink:href="`/icons/sprite.svg#wallet`" />
              </svg>
              Meine Wallet
            </span>
          </router-link>
          <router-link
            href="javascript:void(0)"
            class="flex flex-col items-center justify-center relative"
            to="/wish-list"
          >
            <span
              class="hover:text-black relative z-10 flex flex-col items-center text-black"
            >
              <svg class="icon h-4 w-4 text-black">
                <use :xlink:href="`/icons/sprite.svg#heart`" />
              </svg>
              Meine Wunschliste
            </span>
          </router-link>
          <router-link
            class="flex flex-col items-center justify-center relative"
            to="/cart"
          >
            <div class="relative  h-4 w-4">
              <svg class="relative icon h-4 w-4 text-black">
                <use :xlink:href="`/icons/sprite.svg#bag`" />
              </svg>
              <div
                class="-m-3 absolute bg-black flex h-4 items-center justify-center right-0 rounded-full text-2xs  text-white top-0 w-4"
              >
                {{ COUNT_CART }}
              </div>
            </div>

            <span class="text-sm text-black">Warenkorb</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isLoggingOut: false,
      hideSidebar: true,
      apiBaseURL: '',
      window_width: 0,
      menus: [],
      showWallet: false,
      isRegisterPop: false,
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    COUNT_CART() {
      return this.$store.getters.COUNT_CART;
    },
    CATEGORIES() {
      return this.$store.getters.CATEGORIES;
    },
    USER() {
      return this.$store.getters.COMPANY;
    },
  },
  watch: {
    async AUTH_USER(newVal, oldVal) {
      // await this.onFetchData()
    },
  },
  mounted() {
    (async () => {
      (function() {
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
          } else if (curScroll < prevScroll) {
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
          } else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
          }
        };

        window.addEventListener('scroll', checkScroll);
      })();
      await this.onFetchData();
    })();
  },
  methods: {
    async onFetchData() {
      await this.$store.dispatch('FETCH_CATEGORIES');
      await this.onSetMenusByRole();
    },
    onSetImage(value) {
      return value.search('base64') < 0
        ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
        : value;
    },
    onSetMenusByRole() {
      let profileChild = [
        {
          title: 'Info',
          link: '/profile-info',
        },
        {
          title: 'Einstellungen',
          link: '/profile-settings',
        },
      ];

      if (this.AUTH_USER.role.id == 3) {
        profileChild = [
          ...profileChild,
          {
            title: 'Zahlungsmethoden',
            link: '/profile-payment',
          },
        ];
      }
      if (this.AUTH_USER.isAuth) {
        switch (this.AUTH_USER.role.id) {
          case 1:
            this.menus = [
              {
                title: 'Home',
                link: '/home',
                icon: 'grid-3x3-gap-fill',
              },
              {
                title: 'Verwalten',
                link: '',
                isChildShow: false,
                icon: 'grid-3x3-gap-fill',
                child: [
                  {
                    title: 'Benutzer',
                    link: '/users',
                  },
                  {
                    title: 'Bestellungen',
                    link: '/manage-orders',
                  },
                  {
                    title: 'Auszahlung',
                    link: '/payout',
                  },
                  {
                    title: 'Kategorien',
                    link: '/category',
                  },
                  {
                    title: 'Unterkategorien',
                    link: '/sub-category',
                  },
                  {
                    title: 'Templates',
                    link: '/template',
                  },
                  {
                    title: 'Gesponserte Gutscheine',
                    link: '/featured-vouchers',
                  },
                  {
                    title: 'Subdomain',
                    link: '/subdomain',
                  },
                ],
              },
              {
                title: 'Global Settings',
                icon: 'grid-3x3-gap-fill',
                link: '/settings',
              },
            ];
            break;
          case 2:
            this.menus = [
              {
                title: 'Dashboard',
                link: '/home',
                icon: 'grid-3x3-gap-fill',
              },
              {
                title: 'Profil & Einstellungen',
                icon: 'person',
                link: '/profile-info',
                // isChildShow: false,
                // child: profileChild,
              },
              {
                title: 'Gutschein scannen',
                link: '/scanner',
                icon: 'upc-scan',
              },
              {
                title: 'Gutschein erstellen',
                link: '/vouchers/new',
                icon: 'palette',
              },
              {
                title: 'Meine Gutscheine',
                link: '/vouchers',
                icon: 'wallet',
              },
              {
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
            ];
            break;
          case 3:
            const categories = this.CATEGORIES.map((categ) => {
              let slug = this.$helpers.toSlug(categ.name);
              return {
                title: categ.name,
                icon: categ.icon,
                link: `/vouchers/category/${slug}`,
              };
            });
            this.menus = [
              {
                title: 'Suche',
                link: '/vouchers/search',
                icon: 'search',
              },
              {
                title: 'Kategorien',
                link: '',
                icon: 'list',
                child: categories,
                isChildShow: false,
              },
              {
                title: 'Meine Wallet',
                link: '/wallet',
                icon: 'wallet',
              },
              {
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
            ];
            break;
          case 4:
            this.menus = [
              {
                title: 'Home',
                link: '/home',
                icon: 'grid-3x3-gap-fill',
              },
            ];
            break;
          default:
            break;
        }
      } else {
        const categories = this.CATEGORIES.map((categ) => {
          let slug = this.$helpers.toSlug(categ.name);
          return {
            title: categ.name,
            link: `/vouchers/category/${slug}`,
            icon: categ.icon,
          };
        });

        this.menus = [
          {
            title: 'Suchen',
            link: '/vouchers/search',
            icon: 'search',
          },
          {
            title: 'Kategorien',
            link: '',
            icon: 'list',
            child: categories,
            isChildShow: false,
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
          {
            title: 'Login',
            link: '/login',
          },
          {
            title: 'Meine Wallet',
            link: '/guest-wallet',
            icon: 'wallet',
          },
        ];
      }
    },
    getWindowWidth() {
      this.window_width = document.documentElement.clientWidth;
      if (this.window_width < 767) {
        this.hideSidebar = true;
        this.$emit('onHide', this.hideSidebar);
      }
    },
    onSelectMenu(menu, index) {
      // if (menu.title == 'Meine Wallet' && !this.AUTH_USER.isAuth) {
      //   this.showWallet = true;
      // }

      if (!menu.child) {
        if (this.$route.path != menu.link) {
          this.$router.push(menu.link);
        }
      } else {
        if (
          !this.AUTH_USER.isAuth ||
          (this.AUTH_USER.isAuth && this.AUTH_USER.role.name == 'user')
        ) {
          this.$emit('onShowSubMenu', !menu.isChildShow ? menu.child : []);
          this.menus = this.menus.map((m, i) => {
            if (index === i) {
              m.isChildShow = !m.isChildShow;
            } else {
              m.isChildShow = false;
            }
            return m;
          });
          return;
        }
        const menuIcon = document.getElementById(`dropdown-${index}`).classList;
        const icon = {
          r: !menu.isChildShow ? 'down' : 'up',
          a: !menu.isChildShow ? 'up' : 'down',
        };
        menuIcon.remove(`fa-caret-${icon.r}`);
        menuIcon.add(`fa-caret-${icon.a}`);
        this.menus = this.menus.map((m, i) => {
          m.isChildShow = index === i ? !m.isChildShow : false;
          return m;
        });
      }
    },
    onHideSidebar() {
      this.hideSidebar = !this.hideSidebar;
      this.$emit('onHide', this.hideSidebar);
    },
    async onLogout() {
      try {
        this.isLoggingOut = true;
        const data = await this.$store.dispatch('LOGOUT');
        await this.onRemoveAuth();
      } catch (err) {
        await this.onRemoveAuth();
      }
    },
    async onRemoveAuth() {
      await localStorage.removeItem('_auth');
      await this.$store.commit('SET_AUTH_USER', {
        isAuth: false,
        token: '',
        role: {
          id: null,
          name: null,
        },
        data: null,
      });
      await localStorage.removeItem('_userWishlist');
      await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', []);
      this.isLoggingOut = false;
      window.location = '/login';
    },
  },
};
</script>
<style lang="css" scoped>
#guest-header {
  height: 90px;
  position: fixed;
  top: 0;
  z-index: 9999;
  transition: top 0.3s ease;
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
  transition: top 0.3s ease;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  .show-sidebar #site-header {
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
  .menu-toggle.hide {
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
  font: bold 12px arial, sans-serif;
  background: #fff;
  margin-left: -24px;
  width: 50px;
  z-index: 999;
}
</style>
