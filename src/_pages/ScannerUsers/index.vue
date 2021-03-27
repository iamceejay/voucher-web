<template>
  <div class="w-full">
    <h2 class="font-semibold text-peach mb-4">Scanner Profil</h2>
    <ScannerUserList 
      :data="SCANNER_USERS"
    />
    <p class="text-custom-gray-2 mb-6">Ein Scanner Benutzer kann nur Gutscheine für dein Unternehmen einlösen. Alle weiteren Funktionen sind für diesen Benutzer nicht sichtbar.</p>
    <Button
      label="Scanner Profil hinzufügen"
      fontWeight="font-normal"
      size="py-4 px-8"
      round="rounded"
      variant="black"
      @onClick="() => $emit('onButtonClick')"
    />
  </div>
</template>
<script>
  import Button from '_components/Button'
  import MainLayout from '_layouts'
  import ScannerUserList from '_components/List/Modules/ScannerUserList'

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      Button,
      ScannerUserList,
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