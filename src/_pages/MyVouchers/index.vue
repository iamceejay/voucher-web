<template>
  <MainLayout>
    <template #content>
      <div class="flex">
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col">
            <span class="font-bold text-lg">Create new voucher</span>
            <router-link
              to="vouchers/new"
            >
              <Button
                class="py-2"
                label="Create new voucher"
                size="w-full sm:w-64 py-2"
                variant="info"
                round="rounded-full"
              />
            </router-link>
          </div>
          <div>
            <VoucherList />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import MainLayout from '_layouts';

  export default {
    name: 'MyVouchers',
    components: {
      Button,
      MainLayout,
      VoucherList
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