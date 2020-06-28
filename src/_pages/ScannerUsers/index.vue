<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container w-full flex flex-col px-8">
        <Header1
          label="Scanner Profil"
        />
        <ScannerUserList 
          :data="SCANNER_USERS"
        />
        <router-link to="/scanner-users/new">
          <Button
            class="py-2 w-full md:w-1/2"
            label="Füge ein neues Scanner Profil  hinzu"
            size="w-full py-3"
            round="rounded-full"
            fontSize="text-xs"
          />
        </router-link>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button'
  import MainLayout from '_layouts'
  import ScannerUserList from '_components/List/Modules/ScannerUserList'
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      Button,
      ScannerUserList,
      Header1,
    },
    data() {
      return {
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      SCANNER_USERS()
      {
        return this.$store.getters.SCANNER_USERS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_SCANNER_USERS', [])
          await this.onFetchScannerUsers()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onFetchScannerUsers()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SCANNER_USERS', {
            seller_id: this.AUTH_USER.id
          })

        } catch (err) {
          console.log('err', err)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
  .container {
    /* margin-top: -100px; */
    width: 40%;
  }
  .header-container {
    font-size: 28px;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  .content-container {
  }
  @media only screen and (max-width: 599px) {
    .container {
      width: 90% !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .container {
      width: 60%;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .container {
      width: 50%;
    }
  }
</style>