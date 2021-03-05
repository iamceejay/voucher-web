<template>
  <div v-if="!isLoading" id="app">
    <router-view />
    <Footer />
  </div>
</template>
<script>
  import Footer from './_components/Footer'
  
  export default {
    name: 'App',
    components: {
        Footer
    },
    data() {
      return {
        isLoading: true
      }
    },
    mounted() {
      (async() => {
        this.isLoading = true
        const auth = JSON.parse(await localStorage.getItem('_auth') )
        if(auth) {
          await this.$store.commit('SET_AUTH_USER', auth)
          if( auth.role.name == 'user' ) {
            await this.onFetchCategories()
            await this.onFetchTotalUserCart()
          }
        }
        this.isLoading = false
      })()
    },
    methods: {
      async onFetchCategories()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_CATEGORIES')
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
    }
  }
</script>
<style>
</style>
