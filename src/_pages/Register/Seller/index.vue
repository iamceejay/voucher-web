<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full h-full">
        <RegisterStep1 
          v-if="step == 1"
          @onChangeStep="onChangeStep"
        />
        <RegisterStep2 
          v-if="step == 2"
          @onChangeStep="onChangeStep"
        />
        <RegisterStep3 
          v-if="step == 3"
          @onChangeStep="onChangeStep"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Button from '_components/Button'
  import RegisterStep1 from '_components/Modules/Register/Seller/Step1/'
  import RegisterStep2 from '_components/Modules/Register/Seller/Step2/'
  import RegisterStep3 from '_components/Modules/Register/Seller/Step3/'

  export default {
    name: 'Register',
    components: {
      MainLayout,
      RegisterStep1,
      RegisterStep2,
      RegisterStep3,
    },
    data() {
      return {
        submitting: false,
        step: 1,
        form: {
          role_id: 2,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          iban: '',
          bic: '',
          company: null,
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
      onChangeStep({ step, form })
      {
        this.onChange(form)
        if( step == 'done' ) {
          this.onSubmit()
        } else {
          this.step = step
        }
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data
        }
        console.log('onChange', this.form)
      },
      async onSubmit( isValid )
      {
        if( !isValid ) {
          try {
            this.errorMessages = []
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            const data = await this.$store.dispatch('ADD_USER', this.form)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Thank you!',
              text: 'We have recieved your registration application. As soon as you are verified, this message will be removed and you will be able to see your seller dashboard.',
              confirmButtonColor: '#6C757D',
            })
            this.$router.push('/home')
          } catch (err) {
            if( err?.response?.status == 422 ) {
              this.errorMessages = err.response.data.errors
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>