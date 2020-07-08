<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full h-full px-8">
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
              title: `Thank you!`,
              text: data.message,
              // text: `We have recieved your registration application. As soon as you are verified, this message will be removed and you will be able to see your seller dashboard.`,
              showCancelButton: false,
              confirmButtonColor: '#6C757D',
              confirmButtonText: 'Confirm',
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
</style>