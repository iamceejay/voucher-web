<template>
  <div id="login-form-component">
    <form 
      class="container w-full" 
      @submit.prevent
    >
      <div v-if="error" class="text-center mb-2">
        <span class="text-red-500 font-bold font-body">{{ error }}</span>
      </div>
      <div class="flex flex-col w-full">
        <InputField
          id="email"
          v-model="loginForm.email"
          class="m-2"
          label="Emailadresse "
          type="email"
          :errorMessages="errorMessages.email"
        />
        <InputField
          id="password"
          v-model="loginForm.password"
          class="m-2"
          label="Passwort"
          type="password"
          :errorMessages="errorMessages.password"
        />
        <router-link to="/forgot-password" class="text-peach text-right text-sm mx-2 mb-2">
          Passwort vergessen?
        </router-link>
      </div>
      <div class="flex justify-between">
        <Button
          class="ml-auto py-2"
          :disabled="submitting"
          :isLoading="submitting"
          label="Login"
          @onClick="onSubmit()"
        />
      </div>
    </form>
  </div>
</template>
<script>
  import { setToken } from '_helpers/ApiService'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'

  export default {
    name: 'LoginForm',
    components: {
      InputField,
      Button
    },
    data() {
      return {
        submitting: false,
        error: '',
        errorMessages: [],
        loginForm: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER
      }
    },
    mounted() {
    },
    methods: {
      async onSubmit() 
      {
        try {
          this.submitting = true
          this.errorMessages = []
          const { token, user } = await this.$store.dispatch('LOGIN', this.loginForm)
          const auth = {
            isAuth: true,
            token,
            data: user,
            role: user.user_role.role,
          }
          await localStorage.removeItem('_auth')
          await localStorage.setItem('_auth', JSON.stringify(auth))
          await this.$store.commit('SET_AUTH_USER', auth)
          if( auth.role.name == 'user' ) {
            await this.onFetchCategories()
          }
          await setToken()
          this.submitting = false
          this.$router.push('/home')
        } catch (err) {
          this.submitting = false
          if(err.response?.status === 422) {
            this.errorMessages = err.response.data.errors
          } else if(err.response?.status === 404) {
            this.error = err.response.data.message
          }
        }
      },
      async onFetchCategories()
      {
        try {
          await this.$store.dispatch('FETCH_CATEGORIES')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  };
</script>
<style lang='css' scoped>
</style>