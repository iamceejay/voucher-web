<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-1 justify-center items-center flex-col w-full">
        <div class="container">
          <div class="text-center font-bold text-4xl font-display mb-10">
            Login
          </div>
          <div class="content-container">
            <LoginForm />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import LoginForm from '_components/Modules/Login/LoginForm';

  export default {
    name: 'Login',
    components: {
      MainLayout,
      LoginForm
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    mounted() {
      (async () => {
        await this.$store.commit('SET_COUNT_CART', 0)
        if( this.$route.query?.status ) {
          this.$swal({
            icon: 'success',
            // title: 'Successful!',
            text: `You account has been successfully activated. Thank you!`,
            allowOutsideClick: false,
            confirmButtonColor: '#6C757D',
          })
        }
      })()
    },
    methods: {
    },
  }
</script>
<style lang='css' scoped>
  .container {
    /* margin-top: -100px; */
    width: 40%;
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
