<template>
  <transition name="fade-shrink-in" appear>
    <div
      v-show="open" class="fixed inset-0 p-4 overflow-auto"
      style="background-color: hsla(0, 0%, 0%, .5); z-index: 999" @click="close"
    >
      <div class="max-w-4xl w-full mx-auto bg-white rounded py-12 mt-8 z-10 shadow-lg relative" @click.stop>
        <div v-if="!isLoading && VOUCHER" class="content-container w-full flex flex-col px-4">
          <button
            type="button" class="focus:outline-none focus:shadow-none border-1 font-display bg-peach text-white w-32 py-1 px-2 rounded-full text-2xs"
            @click="close"
          >
            <span><i class="fas fa-arrow-left" /><span class="ml-2">Zurück</span></span>
          </button>
          <div class="flex flex-col w-full">
            <VoucherCard
              class="self-center"
              :voucher="VOUCHER"
              :isFlippable="false"
              :withQR="false"
            />
            <span class="block border-b font-semibold pb-3 pt-6 text-lg text-center">
              {{ VOUCHER.title }}
            </span>
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

          </div>
          <ValidationObserver
            v-if="AUTH_USER.isAuth && AUTH_USER.role.name != 'admin'"
            v-slot="{ handleSubmit }"
          >
            <form
              class="flex flex-col w-full mt-4 order__form"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <section class="gap-12 grid grid-cols-2">
                <div class="flex flex-col items-end">
                  <span class="font-semibold text-lg">
                    {{ $helpers.convertCurrency(form.value * ( (VOUCHER.type != 'quantity') ? 1 : VOUCHER.qty_val )) }}
                  </span>
                  <span class="text-2xs text-gray-500">inkl. MwSt.</span>
                </div>
                <div class="order__form-group">
                  <input
                    v-model="form.value"
                    type="number"
                    :min="(VOUCHER.type == 'quantity') ? VOUCHER.qty_min : VOUCHER.val_min"
                    :max="(VOUCHER.type == 'quantity') ? VOUCHER.qty_max : VOUCHER.val_max"
                    required
                  />
                  <div
                    class="order__form-number order-up"
                    @click="form.value++"
                  >+</div>
                  <div
                    class="order__form-number order-down"
                    @click="form.value--"
                  >-</div>
                </div>
              </section>
              <Button
                class="self-center w-full md:w-1/2 mt-3 "
                :label="`zum Warenkorb hinzufügen`"
                :icon="`${ isAdded ? 'check' : '' }`"
                size="w-full py-3"
                round="rounded-md"
                :type="`${ isAdded ? 'button' : 'submit' }`"
                @onClick=" isAdded ? onRemoveCart() : null"
              />
            </form>

            <section class="border flex md:w-1/2 mt-3 mx-auto p-4 w-full">
              <i class="fa fa-palette mr-2 mt-1"></i>
              <span class="text-sm">Du kannst den Gutschein nach dem Kauf personalisieren.</span>
            </section>

            <span class="block md:w-1/2 mx-auto my-6 w-full">
              {{ VOUCHER.description }}
            </span>

            <div v-if="VOUCHER.data_json != null" class="flex mx-auto overflow-x-scroll space-x-3 md:w-1/2 w-full">
              <img v-if="VOUCHER.data_json.image_1" :src="VOUCHER.data_json.image_1" width="150" height="150">
              <img v-if="VOUCHER.data_json.image_2" :src="VOUCHER.data_json.image_2" width="150" height="150">
              <img v-if="VOUCHER.data_json.image_3" :src="VOUCHER.data_json.image_3" width="150" height="150">
            </div>

             <div v-if="VOUCHER.data_json != null" class="border-b flex md:w-1/2 mx-auto py-6 mb-8 text-xs w-full whitespace-pre">{{ VOUCHER.data_json.long_description }}</div>

            <div
              class="self-center w-full md:w-1/2 mx-auto"
              @click="toSeller(VOUCHER.seller_id)"
            >
              <Button
                label="Mehr Infos & Gutscheine von diesem Verkäufer"
                size="w-full py-3"
                round="rounded-md"
              />
            </div>
          </ValidationObserver>
        </div>
        <div v-else class="flex justify-center py-20">
          <img
            src="@/_assets/img/epasnets-loader.png" alt="loading"
            class="flex justify-center p-20"
          />
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
    name: 'VoucherModal',
    components: {
      VoucherCard,
      InputField,
      Button,
    },
    props: ['open'],
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
              document.body.classList.add('overflow-hidden')
              this.isLoading = true
              await this.onFetchVoucher()
              this.isLoading = false
            } catch (err) {
              console.log(err)
              this.isLoading = false
            }
          })()
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      }
    },
    created() {
      document.addEventListener('keydown', (e) => {
        if (this.open && e.keyCode == 27) {
          this.close()
        }
      })
    },
    methods: {
      close() {
        document.body.classList.remove('overflow-hidden')
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
        this.$store.commit('SET_SELLER_MODAL', true)
        this.$store.commit('SET_SELLER_ID', id)
      // this.$router.push(`/seller/${id}`)
      }
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