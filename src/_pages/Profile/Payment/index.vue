<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full">
        <div data-v-6d1a851d="" class="font-medium mb-1 text-2xl text-center">
          Profil & Einstellungen
        </div>

        <span class="border-b-2 pb-6 flex flex-wrap text-sm mt-4 mx-8">
          <router-link
            class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
            to="/profile-info"
          >
            Profil
          </router-link>
          <router-link
            class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
            to="/profile-settings"
          >
            Passwort
          </router-link>
          <router-link
            class="px-3 py-1 rounded-md text-xs border border-black bg-black text-white mr-2 mb-2"
            to="/profile-payment"
          >
            Zahlungsmethoden
          </router-link>
          <router-link
            class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"
            to="/orders"
          >
            Bestellungen
          </router-link>
      </span>
        <div class="flex flex-col md:w-1/2 mt-6 mx-8">

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
            text: 'Informationen aktualisiert',
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