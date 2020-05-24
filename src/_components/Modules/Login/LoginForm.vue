<template>
  <div id="login-form-component">
    <form 
      class="container" 
      @submit.prevent
    >
      <div v-if="error" class="text-center mb-2">
        <span class="text-red-500 font-bold font-body">{{ error }}</span>
      </div>
      <div>
        <InputField
          id="email"
          v-model="loginForm.email"
          class="m-2"
          label="Email Address"
          type="email"
          :errorMessages="errorMessages.email"
        />
        <InputField
          id="password"
          v-model="loginForm.password"
          class="m-2"
          label="Password"
          type="password"
          :errorMessages="errorMessages.password"
        />
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
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button';

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
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
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
          await setToken()
          const auth = {
            isAuth: true,
            token,
            data: user,
            role: user.user_role.role,
          }
          await this.$store.commit('SET_AUTH_USER', auth)
          await localStorage.setItem('_auth', JSON.stringify(auth))
          if( auth.role.name == 'user' ) {
            await this.onFetchCategories()
          }
          this.submitting = false
          this.$router.push('/home')
        } catch (err) {
          this.submitting = false
          if(err.response?.status === 422) {
            this.errorMessages = err.response.data.errors
          } else if(err.response?.status === 404) {
            this.error = err.response.data.message
          }
          console.log('err', err)
        }
      },
      async onFetchCategories()
      {
        await this.$store.dispatch('FETCH_CATEGORIES')
      },
    }
  };
</script>
<style lang='css' scoped>
</style>