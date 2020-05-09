<template>
  <MainLayout>
    <template #content>
      <Earnings />
      <Orders />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Earnings from '_components/Modules/OrdersEarnings/Earnings';
  import Orders from '_components/Modules/OrdersEarnings/Orders';

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      Earnings,
      Orders
    },
    data() {
      return {
        submitting: false
      }
    },
    mounted() {

    },
    methods: {
      async onLogout()
      {
        try {
          this.submitting = true
          const data = await this.$store.dispatch('LOGOUT')
          this.$store.commit('SET_AUTH_USER', {
            isAuth: false,
            token: '',
            data: {},
          })
          localStorage.removeItem('_auth')
          this.submitting = false
          this.$router.push('/login')
        } catch (err) {
          this.submitting = false
          console.log('err', err)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>