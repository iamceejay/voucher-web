<template>
  <MainLayout>
    <template #content>
      <div class="flex">
        <div class="w-full flex flex-col">
          <div class="font-bold text-lg py-2">
            Profile & Settings
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 order-1">
              <div class="font-bold text-sm pt-2">
                Profile Info
              </div>
              <ProfileForm />
            </div>
            <div class="w-full md:w-1/2 order-2 md:order-3">
              <div class="font-bold text-sm pt-2">
                Company Info
              </div>
              <CompanyForm />
            </div>
            <div class="w-full md:w-1/2 order-3 md:order-2">
              <div class="font-bold text-sm pt-2">
                Payout Info
              </div>
              <PayoutForm />
            </div>
          </div>
          <Button
            class="py-2 mx-2"
            label="Save"
            size="w-full sm:w-64 py-2"
            variant="info"
            round="rounded-full"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import ProfileForm from '_components/Modules/Profile/Form/ProfileForm';
  import CompanyForm from '_components/Modules/Profile/Form/CompanyForm';
  import PayoutForm from '_components/Modules/Profile/Form/PayoutForm';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      ProfileForm,
      CompanyForm,
      PayoutForm,
      Button
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