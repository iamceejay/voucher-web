<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
    },
    mounted() {
      (async() => {
        const auth = await localStorage.getItem('_auth') 
          ? await JSON.parse(localStorage.getItem('_auth')) 
          : null
        if(auth) {
          this.$store.commit('SET_AUTH_USER', auth)
        }
      })()
    },
    methods: {

    }
  }
</script>
<style>
</style>
