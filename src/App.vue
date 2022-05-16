<template>
  <div v-if="!isLoading" id="app">
    <keep-alive :include="['Home','VouchersSearch']">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>


  export default {
    name: 'App',
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
          // if( auth.role.name == 'user' ) {
            // await this.onFetchCategories()
            // await this.onFetchTotalUserCart()
          // }
        }
        if (this.wildcard) {
          const { user } = await this.$store.dispatch('FETCH_USER_BY_NAME', {
            name: this.wildcard
          })

          if (!user) {
            window.location = window.location.origin.replace(this.wildcard + '.', '')
            return
          }

          let bg_color = '#1D4F55'
          let text_color = '#fff'

          if(user.company !== null) {
            bg_color = user.company.background_color ? user.company.background_color : '#1D4F55'

            text_color = user.company.text_color ? user.company.text_color : '#fff'
          }

          let root = document.documentElement;
          root.style.setProperty('--company-color', bg_color)
          root.style.setProperty('--text-color', text_color)
          root.style.setProperty('--company-color-opacity', `${bg_color}90`)
        }
        await this.onFetchCategories()
        await this.onFetchTotalUserCart()
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
