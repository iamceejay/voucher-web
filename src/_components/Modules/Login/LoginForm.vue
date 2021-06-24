<template>
  <div id="login-form-component">
    <form
      class="container w-full"
      @submit.prevent="onSubmit()"
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
          type="submit"
          class="mb-6"
          size="w-full py-3"
          round="rounded"
          :disabled="submitting"
          :isLoading="submitting"
          label="Login"
        />
        <div class="flex flex-col border-t-2 border-input-border">
          <p class="font-medium text-center text-lg py-4">Oder anmelden als Käufer mit:</p>
          <div class="flex">
            <GoogleLogin class="w-1/2" :params="params" :onSuccess="onSignIn" :onFailure="onFailure">
            <Button
              type="button"
              class="pr-1"
              size="w-full py-3"
              round="rounded border border-input-border"
              variant="white"
              :isDisabled="submitting"
              label="Google"
              icon="fab fa-google mr-2 text-2xl text-green-700"
              :fullIconClass="true"
              @onClick="onSSO('#')"
            />
           </GoogleLogin>
            <Button
              class="pl-1 w-1/2"
              size="w-full py-3"
              round="rounded border border-input-border"
              variant="white"
              :isDisabled="submitting"
              label="Facebook"
              icon="fab fa-facebook mr-2 text-2xl text-blue-700"
              :fullIconClass="true"
              @onClick="logInWithFacebook"
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
  import GoogleLogin from 'vue-google-login';


  export default {
    name: 'LoginForm',
    components: {
      InputField,
      Button,
      GoogleLogin
    },
    data() {
      return {
        submitting: false,
        error: '',
        errorMessages: [],
        loginForm: {
          email: '',
          password: ''
        },
        params: {
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
        }
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER
      },
    },
    async mounted() {
      await this.onFetchTotalUserCart()
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
    },
    methods: {
      async onSubmit()
      {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          this.submitting = true
          this.errorMessages = []
          const { token, user } = await this.$store.dispatch('LOGIN', this.loginForm)
          await this.setLoginAuth(token, user)
          this.submitting = false
          localStorage.setItem('cart', this.$store.getters.COUNT_CART)
          this.$router.go('/home')
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
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
      async setLoginAuth(token, user){
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
      },
      async logInWithFacebook() {

        window.FB.login((response) => {
          console.log(response)
          if (response.authResponse) {
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
            this.sendUserInfo()
          } else {
            alert("User cancelled login or did not fully authorize.");
          }
        }, {scope: 'public_profile,email'});
        return false;
      },
      async sendUserInfo() {
          await window.FB.api('/me', {fields: 'last_name,first_name,email'}, async (response) => {
              try {
                console.log(response)
                await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
                let loginForm = {
                  email: response.email,
                  password: response.id
                }
                const { token, user } = await this.$store.dispatch('LOGIN', loginForm)
                this.setLoginAuth(token, user)
                localStorage.setItem('cart', this.$store.getters.COUNT_CART)
                //this.$router.go('/home')
                window.location.reload()
              } catch (error) {
                try {
                  await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
                  let form = {
                    role_id: 3,
                    region_id: null,
                    address: '',
                    city: '',
                    zip_code: '',
                    phone_number: '',
                    firstName: response.first_name,
                    lastName: response.last_name,
                    username: response.email,
                    email: response.email,
                    password: response.id,
                    confirmPassword: response.id,
                    isActivated: 1,
                  }
                  const { token, user } = await this.$store.dispatch('ADD_USER', form)
                  this.setLoginAuth(token, user)
                  localStorage.setItem('cart', this.$store.getters.COUNT_CART)
                  //this.$router.go('/home')
                  window.location.reload()
                } catch (error) {
                  await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                  this.$swal({
                    icon: 'warning',
                    title: 'Something Went Wrong.',
                    text: 'Please try again later.',
                    allowOutsideClick: false,
                    confirmButtonColor: '#48BB78',
                  })
                }
              }
          });
      },
      async initFacebook() {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: "176924830908211", //You will need to change this
            cookie: true, // This is important, it's not enabled by default
            version: "v11.0"
          });
          window.FB.logout()
        };
      },
      async loadFacebookSDK(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      },
      async onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile()

        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          let loginForm = {
            email: profile.getEmail(),
            password: profile.getId()
          }
          const { token, user } = await this.$store.dispatch('LOGIN', loginForm)
          this.setLoginAuth(token, user)
          localStorage.setItem('cart', this.$store.getters.COUNT_CART)
          // this.$router.go('/home')
          window.location.reload()
        } catch (error) {
          try {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            let form = {
              role_id: 3,
              region_id: null,
              address: '',
              city: '',
              zip_code: '',
              phone_number: '',
              firstName: profile.getGivenName(),
              lastName: profile.getFamilyName(),
              username: profile.getEmail(),
              email: profile.getEmail(),
              password: profile.getId(),
              confirmPassword: profile.getId(),
              isActivated: 1,
            }
            const { token, user } = await this.$store.dispatch('ADD_USER', form)
            this.setLoginAuth(token, user)
            localStorage.setItem('cart', this.$store.getters.COUNT_CART)
            // this.$router.go('/home')
            window.location.reload()
          } catch (error) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
                icon: 'warning',
                title: 'Something Went Wrong.',
                text: 'Please try again later.',
                allowOutsideClick: false,
                confirmButtonColor: '#48BB78',
              })
          }

        }
      },
      onFailure(error) {
        console.log(error)
      },
      async onFetchTotalUserCart()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_TOTAL_USER_CART')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  };
</script>
<style lang='css'>
  .abcRioButton {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0.25rem!important;
    box-shadow: none!important;
    border: 1px solid #00000033;
  }
  .abcRioButtonContentWrapper {
    @apply flex justify-center items-center font-medium;
  }
</style>