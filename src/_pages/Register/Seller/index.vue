<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full h-full items-center">
        <div class="font-bold py-2 text-2xl md:text-4xl font-display mb-1 text-gray-900">
          Registrieren
        </div>
        <div class="container flex flex-col items-center">
          <RegisterTabs
            type="seller"
          />

          <RegisterStep1
            v-if="step == 1"
            :data="form"
            @onChangeStep="onChangeStep"
          />
          <RegisterStep2
            v-if="step == 2"
            :data="form"
            @onChangeStep="onChangeStep"
          />
          <RegisterStep3
            v-if="step == 3"
            :data="form"
            @onChangeStep="onChangeStep"
          />
          <ReigsterStep4
            v-if="step == 4"
            @onChangeStep="onChangeStep"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import RegisterTabs from '_components/Modules/Register/Tabs'
  import RegisterStep1 from '_components/Modules/Register/Seller/Step1/'
  import RegisterStep2 from '_components/Modules/Register/Seller/Step2/'
  import RegisterStep3 from '_components/Modules/Register/Seller/Step3/'
  import ReigsterStep4 from '_components/Modules/Register/Seller/Step4'

  export default {
    name: 'Register',
    components: {
      RegisterTabs,
      MainLayout,
      RegisterStep1,
      RegisterStep2,
      RegisterStep3,
      ReigsterStep4
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
          phone_number: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region: '',
            vat_number: ''
          },
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_GLOBAL_SETTING', null)
          await this.onFetchGlobalSetting()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
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
              title: `Danke! `,
              text: data.message,
              // text: `We have recieved your registration application. As soon as you are verified, this message will be removed and you will be able to see your seller dashboard.`,
              showCancelButton: false,
              confirmButtonColor: '#48BB78',
              allowOutsideClick: false,
              confirmButtonText: 'Bestätigen',
            }).then(async (result) => {
              if(result.value){
                this.$router.push('/home')
              }
            })
          } catch (err) {
            if( err?.response?.status == 422 ) {
              this.errorMessages = err.response.data.errors
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
        }
      },
      async onFetchGlobalSetting()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_GLOBAL_SETTING', 1)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
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