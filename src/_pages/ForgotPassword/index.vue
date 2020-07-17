<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-1 justify-center items-center flex-col w-full">
        <div class="container">
          <div class="text-center font-bold text-4xl font-display mb-10">
            Passwort vergessen
          </div>
          <ValidationObserver 
            v-slot="{ handleSubmit }"
            class="flex w-full h-full"
          >
            <form 
              class="w-full" 
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <div v-if="error" class="text-center mb-2">
                <span class="text-red-500 font-bold font-body">{{ error }}</span>
              </div>
              <div class="flex flex-col w-full">
                <InputField
                  id="email"
                  v-model="form.email"
                  class="m-2"
                  label="Emailadresse"
                  type="email"
                  :errorMessages="errorMessages.email"
                />
              </div>
              <div class="flex justify-between">
                <Button
                  class="ml-auto py-2"
                  :disabled="submitting"
                  :isLoading="submitting"
                  label="Abschicken"
                  @onClick="onSubmit()"
                />
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'

  export default {
    name: 'ForgotPassword',
    components: {
      MainLayout,
      InputField,
      Button
    },
    data() {
      return {
        submitting: false,
        error: '',
        errorMessages: [],
        form: {
          email: '',
        }
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER
      }
    },
    mounted() {
      (async () => {
        await this.$store.commit('SET_COUNT_CART', 0)
      })()
    },
    methods: {
      async onSubmit() 
      {
        try {
          this.submitting = true
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          this.errorMessages = []
          const { token, user } = await this.$store.dispatch('FORGOT_PASSWORD', this.form)
          this.submitting = false
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          // this.$router.push('/login')
          this.$swal({
            icon: 'success',
            title: 'Email verschickt!',
            text: `Du hast soeben ein Email bekommen, bitte öffne dort den Link, um dein Passwort zu ändern.`,
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
          })
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.submitting = false
          if(err.response?.status === 422) {
            this.errorMessages = err.response.data.errors
          } else if(err.response?.status === 404) {
            this.error = err.response.data.message
          }
          console.log('err', err)
        }
      },
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
