<template>
  <transition name="fade-shrink-in" appear>
    <div class="fixed inset-0 p-4 overflow-auto" @click="close" v-show="open"  style="background-color: hsla(0, 0%, 0%, .5); z-index: 999">

      <div @click.stop class="max-w-4xl w-full mx-auto bg-white rounded py-12 mt-8 z-10 shadow-lg relative">
        <div v-if="!isLoading && VOUCHER" class="content-container w-full flex flex-col px-4">
          <button type="button" class="focus:outline-none focus:shadow-none border-1 font-display bg-peach text-white w-32 py-1 px-2 rounded-full text-2xs" @click="close"><span><i class="fas fa-arrow-left"></i><span class="ml-2" >Zurück</span></span></button>
          <div class="flex flex-col w-full">
            <VoucherCard
              class="self-center"
              :voucher="VOUCHER"
              :isFlippable="false"
              :withQR="false"
            />
            <div v-if="!AUTH_USER.isAuth" class="py-2 text-sm text-center px-2">
              <a
                href="javascript:void(0)"
                class="text-peach cursor-pointer"
                @click="close(); $router.push('/login')"
              >
                Logge dich ein
              </a>
               oder <a
                  href="javascript:void(0)"
                  class="text-peach cursor-pointer"
                  @click="close(); $router.push('/register/buyer')"
              >
                registriere dich
              </a>, um Gutscheine zu kaufen.
            </div>
            <div
              class="self-center w-full md:w-1/2"
              @click="toSeller(VOUCHER.seller_id)"
            >
              <Button
                label="Mehr Infos über den Verkäufer"
                size="w-full py-1"
                round="rounded-full"

              />
            </div>
          </div>
          <ValidationObserver
            v-if="AUTH_USER.isAuth && AUTH_USER.role.name != 'admin'"
            v-slot="{ handleSubmit }"
          >
            <form
              class="flex flex-col w-full mt-8"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <InputField
                id="value"
                v-model="form.value"
                type="number"
                class="w-full md:w-1/2 self-center"
                :label="`Gib deinen ${ (VOUCHER.type == 'quantity') ? `Bestellmenge (${$helpers.convertCurrency(VOUCHER.price_filter)} pro Gutschein)` : 'Wunschbetrag' } an`"
                placeholder="Hier eingeben"
                :rules="`required|${ (VOUCHER.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_min : VOUCHER.val_min }|max_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_max : VOUCHER.val_max }`"
                :note="`
                ${
                  (VOUCHER.type == 'quantity')
                    ? `Menge zwischen ${VOUCHER.qty_min}x und ${VOUCHER.qty_max}x`
                    : `Wert zwischen ${$helpers.convertCurrency(VOUCHER.val_min)} und ${$helpers.convertCurrency(VOUCHER.val_max) }`
                }
                `"
                :disabled="isAdded ? true : false"
              />
              <div class="flex flex-col mt-3 self-center text-center">
                <span class="text-2xl">Preis</span>
                <span class="text-2xl font-bold">
                  {{ $helpers.convertCurrency(form.value * ( (VOUCHER.type != 'quantity') ? 1 : VOUCHER.qty_val )) }}
                </span>
              </div>
              <Button
                class="self-center w-full md:w-1/2 mt-3 "
                :label="`zum Warenkorb hinzufügen`"
                :icon="`${ isAdded ? 'check' : '' }`"
                size="w-full py-3"
                round="rounded-full"
                :type="`${ isAdded ? 'button' : 'submit' }`"
                @onClick=" isAdded ? onRemoveCart() : null"
              />
            </form>
          </ValidationObserver>
        </div>
        <div v-else class="flex justify-center py-20">
          <img src="@/_assets/img/epasnets-loader.png" alt="loading" class="flex justify-center p-20">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/'
import InputField from '_components/Form/InputField'
import Button from '_components/Button'
import LoaderImg from '_assets/img/epasnets-loader.png'

export default {
  name: 'voucher-modal',
  props: ['open'],
  components: {
    VoucherCard,
    InputField,
    Button,
  },
  data() {
    return {
      form: {
        id: null,
        voucher_id: null,
        user_id: null,
        value: null,
        qty: null,
        total_amount: 0,
      },
      symbol: '',
      isAdded: false,
      isLoading: false
    }
  },
  computed: {
    VOUCHER()
    {
      return this.$store.getters.VOUCHER
    },
    CARTS()
    {
      return this.$store.getters.CARTS
    },
    AUTH_USER()
    {
      return this.$store.getters.AUTH_USER
    },
    IS_LOADING()
    {
      return this.$store.getters.IS_LOADING
    },
    VOUCHER_ID()
    {
      return this.$store.getters.VOUCHER_ID
    },
  },
  watch: {
    open(val) {
      if (val) {
        (async() => {
          try {
            this.isLoading = true
            await this.onFetchVoucher()
            this.isLoading = false
          } catch (err) {
            console.log(err)
            this.isLoading = false
          }
        })()
      }
    },
    $route(to, from){
      console.log('new routes')
    }
  },
  methods: {
    close() {
      this.$store.commit('SET_MODAL', false)
    },
    async onSubmit()
    {
      this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
      this.$swal({
        title: 'Im Warenkorb hinzufügen',
        text: `Bist du sicher, dass du diesen Gutschein zum Warenkorb hinzufügen möchtest?`,
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Bestätigen',
        cancelButtonText: 'Abbrechen',
      }).then( async (result) => {
        if(result.value){
          try {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
            this.form.user_id = this.AUTH_USER.data.id
            this.form.voucher_id = this.VOUCHER.id
            if( this.VOUCHER.type == 'quantity' ) {
              this.form.qty = this.form.value
              this.form.value = null
            } else {
              this.form.value = this.form.value
            }
            const data = await this.$store.dispatch('ADD_WALLET', this.form)
            this.form = {
              id: null,
              voucher_id: null,
              user_id: null,
              value: null,
              qty: null,
              value: 0,
              total_amount: 0,
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            let confirm = this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Die Gutscheine wurden in den Warenkorb gelegt.',
              allowOutsideClick: false,
              showConfirmButton: false
            })
            setTimeout(() => {
              confirm.close()
              this.close()
            }, 1000)
          } catch (err) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'warning',
              title: 'Achtung! ',
              text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
        }
      })
    },
    async onRemoveCart()
    {
      this.$swal({
        title: 'Vom Warenkorb entfernen',
        text: `Bist du sicher, dass du diesen Gutschein vom Warenkorb entfernen möchtest?`,
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Bestätigen',
        cancelButtonText: 'Abbrechen',
      }).then( async (result) => {
        if(result.value){
          const newData = this.CARTS.filter( cart => this.form.id != cart.id )
          await this.$store.commit('SET_CARTS', newData)
          this.isAdded = false
          this.form = {
            id: null,
            user_id: null,
            value: null,
            type: '',
            voucher: null
          }
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Removing the voucher.',
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          })
          this.close()
        }
      })
    },
    async onFetchVoucher()
    {
      console.log('fetch')
      try {
        await this.$store.dispatch('FETCH_VOUCHER', {
          id: this.VOUCHER_ID
        })
        this.symbol = (this.VOUCHER.type == 'quantity') ? 'x' : '€'
      } catch (err) {
        console.log('err', err)
      }
    },
    toSeller(id) {
      this.close()
      this.$router.push(`/seller/${id}`)
    }
  },
  created() {
    document.addEventListener('keydown', (e) => {
      if (this.open && e.keyCode == 27) {
        this.close()
      }
    })
  }
}
</script>

<style>
  .fade-shrink-in-enter-active,
  .fade-shrink-in-leave-active {
    transition: all .3s ease;
  }

  .fade-shrink-in-enter,
  .fade-shrink-in-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
</style>