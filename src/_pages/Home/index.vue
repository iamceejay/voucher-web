<template>
  <MainLayout>
    <template #content>
      <div class="font-bold text-lg py-2 text-4xl font-display text-gray-900">
        Hi Company!
      </div>
      <router-link to="/scanner">
        <Button
          class="py-2 my-3"
          label="Scan Voucher"
          size="w-full md:w-64 py-4"
          round="rounded-full"
        />
      </router-link>
      <SaleStatistics />
      <Quicklinks />
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import SaleStatistics from '_components/Modules/Home/SaleStatistics';
  import Quicklinks from '_components/Modules/Home/Quicklinks';
  import MainLayout from '_layouts';

  export default {
    name: 'Dashboard',
    components: {
      Button,
      MainLayout,
      SaleStatistics,
      Quicklinks
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