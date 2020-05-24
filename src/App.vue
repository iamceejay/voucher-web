<template>
  <div v-if="!isLoading" id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
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
          }
        }
        this.isLoading = false
      })()
    },
    methods: {
      async onFetchCategories()
      {
        await this.$store.dispatch('FETCH_CATEGORIES')
      },
    }
  }
</script>
<style>
</style>
