<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <div class="flex flex-col w-full md:w-1/2">
          <Header2
            label="Zahlungsmethoden speichern"
          />
          <StripeForm 
            :key="`stripe-${key}`"
            :isPay="false"
            @onSubmit="onSubmit"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import StripeForm from '_components/Form/Modules/StripeForm';
  import Header2 from '_components/Headers/Header2';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      StripeForm,
      Header2
    },
    data() {
      return {
        key: 0
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
      async onSubmit( value )
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          const data = await this.$store.dispatch('ADD_USER_STRIPE', value)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.key = this.key + 1
          let confirm = this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Updating your payment info.',
            allowOutsideClick: false,
            showConfirmButton: false
          })
          setTimeout(() => {
            confirm.close()
            this.$router.push('/home')
          }, 1000)
        } catch (err) {
          console.log('err', err)
          if( err?.response?.status == 422 ) {
            this.errorMessages = err.response.data.errors
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>