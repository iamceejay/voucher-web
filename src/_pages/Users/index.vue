<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="User Management"
        />
        <div class="flex flex-col w-full p-2">
          <SearchInputField
            id="search-user"
            v-model="params.keyword"
            :value="params.keyword"
            class="m-2"
            placeholder="Search for users..."
            @input="onChangeTab(params.role)"
          />
          <div class="flex flex-row btn-switch m-2 w-full md:w-1/2 lg:w-4/12">
            <a
              class="btn btn-left"
              :class="(params.role == 'user') ? 'active' : ''"
              href="javascript:void(2)"
              @click="onChangeTab('user')"
            >
              Users
            </a>
            <a
              class="btn btn-right"
              :class="(params.role == 'seller') ? 'active' : ''"
              href="javascript:void(2)"
              @click="onChangeTab('seller')"
            >
              Sellers
            </a>
          </div>
          <Table
            class="mt-3 mx-2"
            :fields="fields"
            :data="USERS"
          >
            <template #customActions="props">
              <div class="flex flex-col">
                <a
                  v-if="params.role == 'seller' && !props.data.isActivated"
                  class="text-xs text-indigo-500 underline text-center"
                  href="javascript:void(0)"
                  @click="onActivateUser(props.data)"
                >
                  Aktivieren
                </a>
                <a
                  class="text-xs text-indigo-500 underline text-center"
                  href="javascript:void(0)"
                  @click="onChangeRole(props.data)"
                >
                  Take {{ params.role }} role
                </a>
                <router-link
                  v-if="params.role == 'seller'"
                  :to="`/settings/user/${props.data.id}`"
                  class="text-xs text-indigo-500 underline text-center"
                >
                  Payout setings
                </router-link>
                <a
                  class="text-xs text-indigo-500 underline text-center"
                  href="javascript:void(0)"
                  @click="onDelete(props.data)"
                >
                  Delete
                </a>
              </div>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import SearchInputField from '_components/Form/SearchInputField';
  import Table from '_components/Table';
  import { setToken } from '_helpers/ApiService'

  export default {
    components: {
      MainLayout,
      Header1,
      SearchInputField,
      Table,
    },
    data() {
      return {
        tableIndex: 0,
        params: {
          keyword: '',
          role: 'user',
        },
        fields: [
          {
            name: 'username',
            title: 'Benutzername',
            dataClass: 'text-center',
          }, {
            name: 'detail',
            title: 'Vorname',
            dataClass: 'text-center',
            formatter: val => `${val.firstName} ${val.lastName}`,
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
        search: ''
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      USERS() {
        return this.$store.getters.USERS;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_USERS', [])
          await this.onFetchUserFilter()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onChangeRole(data)
      {
        const fullName = `${data.detail.firstName} ${data.detail.lastName}`
        this.$swal({
          title: 'Change Role',
          text: `You are about to logout and login in ${fullName} credentials. Continue?`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              const { token, user } = await this.$store.dispatch('CHANGE_ROLE', {
                user_id: data.id
              })
              
              const auth = {
                isAuth: true,
                token,
                data: user,
                role: user.user_role.role,
                admin: this.AUTH_USER.data
              }

              await this.$store.commit('SET_AUTH_USER', auth)
              await localStorage.setItem('_auth', JSON.stringify(auth))
              if( auth.role.name == 'user' ) {
                await this.onFetchCategories()
                await this.onFetchTotalUserCart()
              }
              await setToken()
              const { user_voucher_wishlist } = await this.$store.dispatch('FETCH_VOUCHERS_BY_USER', { user_id: auth.data.id });
              await localStorage.removeItem('_userWishlist')
              await localStorage.setItem('_userWishlist', JSON.stringify(user_voucher_wishlist))
              await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', user_voucher_wishlist)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              window.location = '/home'
            } catch (err) {
              console.log(err)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              })
            }
          }
        })
      },
      async onDelete(data)
      {
        this.$swal({
          title: 'Benutzer löschen',
          text: `Bist du sicher, dass du diesen Benutzer löschen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('DELETE_USER', data)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Erfolgreich!',
                text: 'Deleting the user.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              });
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              })
            }
          }
        })
      },
      async onActivateUser(data)
      {
        this.$swal({
          title: 'Aktivieren',
          text: `Bist du sicher, dass du diesen Bennutzer aktiveren willst?`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('UPDATE_USER_STATUS', data)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Erfolgreich!',
                text: 'Aktiviere den Benutzer.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              });
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              })
            }
          }
        })
      },
      async onChangeTab( role )
      {
        this.params.role = role
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.onFetchUserFilter()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchCategories()
      {
        try {
          await this.$store.dispatch('FETCH_CATEGORIES')
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchTotalUserCart()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_TOTAL_USER_CART')
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchUserFilter()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_USER_FILTER', this.params)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
  .btn-switch {
    margin: 0 auto;
  }
  .btn-switch .btn {
    padding: 5px 10px;
    width: 100%;
    border: 1px solid #1a202c;
    text-align: center;
  }
  .btn-switch .btn.active {
    background-color: #1a202c;
    color: #fff;
  }
  .btn-switch .btn.btn-left {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .btn-switch .btn.btn-right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>