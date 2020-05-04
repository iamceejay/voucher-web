<template>
  <div class="flex items-stretch h-screen">
    <div class="flex flex-1 justify-center items-center flex-col">
      <div class="container">
        <div class="header-container">
          Dashboard
          <Button
            class="py-2 justify-center"
            :disabled="submitting"
            :isLoading="submitting"
            label="Logout"
            @onClick="onLogout()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button';

  export default {
    name: 'Dashboard',
    components: {
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