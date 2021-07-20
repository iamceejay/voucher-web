<template>
  <MainLayout>
    <template #content>
      <div class="bg-custom-gray -mt-10">
        <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full py-10">
          <h1 class="text-3xl mx-auto">Kasse</h1>
          <div class="flex items-start justify-center max-w-lg mb-6 mx-auto p-4 w-full">
            <svg class="h-6 icon mr-2 w-6">
              <use :xlink:href="`/icons/sprite.svg#palette`"/>
            </svg>
            <span class="text-xs">
              Du kannst den Gutschein nach dem Kauf personalisieren
            </span>
          </div>
          <PaymentForm class="mt-8"/>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
   import MainLayout from '_layouts/subdomain';
  import PaymentForm from './PaymentForm';

  export default {
    components: {
      MainLayout,
      PaymentForm,
    },
    data() {
      return {
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_WALLETS', [])
          await this.onFetchWallets()
          await this.onFetchUser()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (error) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onFetchUser()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER', {
            id: this.AUTH_USER.data.id,
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchWallets()
      {
        await this.$store.dispatch('FETCH_WALLETS', {
          user_id: this.AUTH_USER.data.id,
          status: 'pending'
        })
      },
    }
  }
</script>
<style lang='css' scoped>
  .StripeElement {
    color: rgba(0, 0, 0, 0.75);
    border: 1px solid #ccc;
    background-color: transparent;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: Nunito, sans-serif;
    border-radius: 9999px;
  }
  .StripeElement--focus {
      box-shadow: 0 2px 5px 2px hsla(0,0%,0%,0.2)
  }
  .StripeElement--invalid {
      border-color: red;
  }
  .StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
  }
</style>