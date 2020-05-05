<template>
  <MainLayout>
    <template #content>
      <div class="flex items-stretch h-screen">
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col">
            <span class="font-bold text-lg">Hi Company!</span>
            <Button
              class="py-2"
              label="Scan Voucher"
              size="w-64"
              variant="info"
              round="rounded-full"
            />
          </div>
          <div>
            <SaleStatistics />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import SaleStatistics from '_components/Modules/Home/SaleStatistics';
  import MainLayout from '_layouts';

  export default {
    name: 'Dashboard',
    components: {
      Button,
      MainLayout,
      SaleStatistics
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