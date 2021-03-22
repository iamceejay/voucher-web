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
          placeholder="E-Mail"
          type="email"
          :errorMessages="errorMessages.email"
        />
        <InputField
          id="password"
          class="mb-5"
          v-model="loginForm.password"
          placeholder="Passwort"
          type="password"
          :errorMessages="errorMessages.password"
          :passwordToggle="true"
        />
        <router-link to="/register/buyer" class="underline text-center text-xs mx-2 mb-2">
          Registrieren
        </router-link>
        <router-link to="/forgot-password" class="text-center text-xs mx-2 mb-5">
          Passwort vergessen?
        </router-link>
        <Button
          class="mb-6"
          size="w-full py-3"
          round="rounded"
          :disabled="submitting"
          :isLoading="submitting"
          label="Login"
          @onClick="onSubmit()"
        />
        <div class="flex flex-col border-t-2 border-input-border">
          <p class="font-medium text-center text-lg py-4">Oder anmelden mit:</p>
          <div class="flex">
            <Button
              class="pr-1 w-1/2"
              size="w-full py-3"
              round="rounded border border-input-border"
              variant="white"
              :isDisabled="submitting"
              label="Google"
              icon="fab fa-google mr-2 text-2xl text-green-700"
              :fullIconClass="true"
              @onClick="onSSO('#')"
            />
            <Button
              class="pl-1 w-1/2"
              size="w-full py-3"
              round="rounded border border-input-border"
              variant="white"
              :isDisabled="submitting"
              label="Facebook"
              icon="fab fa-facebook mr-2 text-2xl text-blue-700"
              :fullIconClass="true"
              @onClick="onSSO('#')"
            />
          </div>
        </div>
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
            role: user.user_role.role
          }
          await localStorage.removeItem('_auth')
          await localStorage.setItem('_auth', JSON.stringify(auth))
          await this.$store.commit('SET_AUTH_USER', auth)
          if( auth.role.name == 'user' ) {
            await this.onFetchCategories()
          }
          await setToken()
          const { user_voucher_wishlist } = await this.$store.dispatch('FETCH_VOUCHERS_BY_USER', { user_id: auth.data.id });
          await localStorage.removeItem('_userWishlist')
          await localStorage.setItem('_userWishlist', JSON.stringify(user_voucher_wishlist))
          await this.$store.commit('SET_AUTH_USER_VOUCHER_WISHLIST', user_voucher_wishlist)
          this.submitting = false
          this.$router.push('/home')
        } catch (err) {
          this.submitting = false
          if(err.response?.status === 422) {
            this.errorMessages = err.response.data.errors
          } else if(err.response?.status === 404) {
            this.error = err.response.data.message
          } else {
            console.log(err)
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
      async onSSO(value) {
        // TODO: when SSO is available
        this.$router.push(value);
      }
    }
  };
</script>
<style lang='css' scoped>

</style>