<template>
  <MainLayout title="Weiter shoppen">
    <template #content>
      <div class="bg-custom-gray">
        <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-4 pt-10">
          <h1 class="font-medium text-xl mx-auto">Warenkorb</h1>
          <div class="flex items-start max-w-lg p-4 w-full mx-auto mb-6">
            <svg class="h-6 icon mr-2 w-6">
              <use :xlink:href="`/icons/sprite.svg#palette`"/>
            </svg>
            <span class="text-xs">
              Du kannst den Gutschein nach dem Kauf personalisieren
            </span>
          </div>

          <!-- <div class="bg-white flex flex-col items-start max-w-sm mb-10 mt-6 mx-auto pb-8 pt-4 px-8 w-full">
            <div class="flex items-baseline justify-center w-full">
                <span class="text-xs mr-3">Summe ({{WALLETS.length}} Artikel):</span>
                <span class="border-b border-black font-medium text-xl">{{ $helpers.convertCurrency(totalAmount) }}</span>
            </div>
            <button
              @click="$router.push('/payment')"
              class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-4 w-full"
              :class="{'opacity-50': !WALLETS.length}"
              :disabled="!WALLETS.length"
              >
                Zur Kasse
            </button>
          </div> -->
          <div class="bg-white max-w-2xl mb-12 md:mx-auto px-4 md:px-12 py-12 w-full">
            <CartList
              v-if="WALLETS && WALLETS.length >= 0"
              class="mb-3"
              :role="AUTH_USER.role.name"
              :data="WALLETS"
              @onDelete="onDelete"
            />
            <div class="bg-white flex items-start justify-between max-w-xl mx-auto">
              <div class="flex flex-col items-baseline justify-center">
                  <span class="text-sm ">Gesamt</span>
                  <span class="font-medium text-4xl">{{ $helpers.convertCurrency(totalAmount) }}</span>
              </div>
              <button
                @click="$router.push('/payment')"
                class="px-5 py-3 rounded-md text-sm text-white"
                style="background-color: var(--company-color, #ff5563);"
                :class="{'opacity-50': !WALLETS.length}"
                :disabled="!WALLETS.length"
                >
                  Zur Kasse
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts/subdomain';
  import Header1 from '_components/Headers/Header1';
  import CartList from '_components/List/Modules/CartList/';

  export default {
    components: {
      MainLayout,
      Header1,
      CartList,
    },
    data() {
      return {
        role: null,
        search: '',
        totalPrice: 0,
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
      },
      totalAmount() {
        let total = 0
        if( this.WALLETS ) {
          this.WALLETS.map( data => {
            let value = (data.voucher.type == 'quantity') ? data.qty : data.value * data.qty
            let vouchTotal = value

            if( data.voucher.type == 'quantity' ) {
              vouchTotal = value * data.voucher.price_filter
            }

            total = total + vouchTotal

          })
        }

        return total
      },
    },
    watch: {
       watch: {
        async WALLETS(newVal)
        {
          this.totalPrice = 0
          await this.onGetTotalPrice()
        }
      },
    },
    mounted() {
      (async() => {

        try {
          await this.$store.commit('SET_WALLETS', [])
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.onGetTotalPrice()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
          if( this.$route.query?.status == 'failed' ) {
            this.$swal({
              icon: 'warning',
              // title: 'Erfolgreich!',
              text: `Zahlung wurde abgebrochen. Bitte versuche es erneut oder wähle eine andere Zahlungsmethode.`,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onFetchWallets()
      {
        await this.$store.dispatch('FETCH_WALLETS', {
          user_id: this.AUTH_USER.data ? this.AUTH_USER.data.id : null,
          status: 'pending'
        })
      },
      async onDelete( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('DELETE_WALLET', data)
        await this.$store.commit('SET_COUNT_CART', this.COUNT_CART - 1)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        this.$swal({
          icon: 'success',
          title: 'Aus dem Warenkorb entfernt!',
          text: 'Der Gutschein wurde soeben entfernt.',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'Bestätigen'
        })
      },
      onGetTotalPrice()
      {
        if( this.WALLETS ) {
          this.WALLETS.map( row => {
            this.totalPrice += this.onGetTotal(row)
          })
        }
      },
      onGetTotal(data)
      {
        let value = (data.voucher.type == 'quantity') ? data.qty : data.value
        let total = value

        if( data.voucher.type == 'quantity' ) {
          total = value * data.voucher.price_filter
        }

        return total
      },
    }
  }
</script>
<style lang='css' scoped>
</style>