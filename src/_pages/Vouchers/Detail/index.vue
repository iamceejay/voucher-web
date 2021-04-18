<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && VOUCHER" class="content-container w-full flex flex-col px-8 pb-10">
        <div class="flex flex-col md:flex-row w-full items-start justify-center">
          <div class="max-w-md w-full">
            <VoucherCard
              class="self-center"
              :voucher="VOUCHER"
              :isFlippable="false"
              :withQR="false"
            />
          </div>
          <div class="flex-1 md:mx-4 w-full" style="max-width: 465px">
            <span class="block font-semibold pb-3 pt-6 text-lg">
              {{ VOUCHER.title }}
            </span>
            <span class="block mb-3 w-full border-b pb-4">
              {{ VOUCHER.description }}
            </span>
            <div v-if="VOUCHER.data_json != null" class="w-full">
                <slider ref="slider" :options="options" >
                    <!-- slideritem wrapped package with the components you need -->
                    <slideritem >
                      <img class="mr-4" v-if="VOUCHER.data_json.image_1" :src="VOUCHER.data_json.image_1" width="150" height="150">
                      <img class="mr-4" v-if="VOUCHER.data_json.image_2" :src="VOUCHER.data_json.image_2" width="150" height="150">
                      <img class="mr-4" v-if="VOUCHER.data_json.image_3" :src="VOUCHER.data_json.image_3" width="150" height="150">
                    </slideritem>
                    <!-- Customizable loading -->
                </slider>
            </div>

            <div
              v-if="VOUCHER.data_json != null"
              class="flex py-6 mb-4 text-xs w-full overflow-hidden"
              :class="{'h-20 md:h-10 show-more' : !isShowMore}"
              >
              {{ VOUCHER.data_json.long_description }}
            </div>

            <div>
              <button
                type="button"
                @click="isShowMore = !isShowMore"
                class="px-3 py-3 rounded-md text-xs mt-6 mr-3"
                :class="'border border-black text-black'"
                >
                {{ !isShowMore ? 'Mehr lesen' : 'Lese weniger' }}
              </button>

              <router-link
                class="px-3 py-3 rounded-md text-xs border border-black text-black"
                :to="`/seller/${VOUCHER.seller_id}`"
              >
                Verkäufer Info
              </router-link>
            </div>

            <span class="block mb-3 w-full border-b pb-4 mt-10 font-semibold">
              Gutschein Info
            </span>

            <div class="flex space-x-6">
              <div class="flex flex-col">
                <span class="text-xs font-bold mb-1">Einlösbar:</span>
                <span
                  v-if="VOUCHER.valid_day && VOUCHER.valid_day.length > 0"
                  class="text-xs flex flex-col">
                  <span
                    v-for="(day, index) in VOUCHER.valid_day"
                    :key="`day-${index}`"
                  >
                    {{ `${day.substring(0,3)}` }}
                  </span>
                </span>
              </div>

              <div class="flex flex-col">
                <span class="text-xs font-bold mb-1">Zeitraum:</span>
                <div
                  v-if="VOUCHER.valid_date && VOUCHER.valid_date.length > 0"
                  class="text-xs flex flex-col">
                  <div
                    v-for="(date, index) in VOUCHER.valid_date"
                    :key="`date-${index}`"
                  >
                  {{ `${formatDate(date.start) || '...'} bis ${formatDate(date.end) || '...'}` }}
                  </div>
                </div>
              </div>

              <div class="flex flex-col" v-if="VOUCHER.expiry_date">
                <span class="text-xs font-bold mb-1">Gültigkeit:</span>
                <div class="text-xs flex flex-col">
                  {{ VOUCHER.expiry_date }} Jahre
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold mb-1">Reservierung:</span>
                <div class="text-xs flex flex-col">
                  {{ VOUCHER.data_json && VOUCHER.data_json.isReserve ? 'Ja' : 'nein'}}
                </div>
              </div>
            </div>

            <!-- <div v-if="!AUTH_USER.isAuth" class="py-2 text-sm">
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
            </div> -->
           <ValidationObserver
              v-slot="{ handleSubmit }"
            >
              <form
                class="flex flex-col w-full mt-4 order__form"
                @submit.prevent="handleSubmit(onSubmit)"
              >
                <section class="flex items-center">
                  <div class="flex flex-col items-end mr-3 md:mr-12">
                    <span class="font-semibold text-lg">
                      {{ $helpers.convertCurrency(form.value * ( (VOUCHER.type != 'quantity') ? 1 : VOUCHER.qty_val )) }}
                    </span>
                    <span class="text-2xs text-gray-500">inkl. MwSt.</span>
                  </div>
                  <div class="order__form-group mr-2">
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
                  <Button
                    class="self-center"
                    label="In den Warenkorb"
                    :icon="`${ isAdded ? 'check' : '' }`"
                    size="w-full py-3 px-2 md:px-4"
                    round="rounded  "
                    :type="`${ isAdded ? 'button' : 'submit' }`"
                    @onClick=" isAdded ? onRemoveCart() : null"
                  />
                </section>
              </form>

              <section class="border flex mt-3 p-4 w-full">
                <i class="fa fa-palette mr-2 mt-1"></i>
                <span class="text-sm">Du kannst den Gutchein nach dem Kauf personalisieren</span>
              </section>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherDisplay/'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'
  import { slider, slideritem } from 'vue-concise-slider'
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      VoucherCard,
      InputField,
      Button,
      slider,
      slideritem
    },
    data() {
      return {
        isShowMore: false,
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
        options: {
          pagination: false,
        },
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
      }
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchVoucher()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      formatDate(date)
      {
        return formatDate(date)
      },
      async onSubmit()
      {
        this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
        try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
              this.form.user_id = this.AUTH_USER.data ? this.AUTH_USER.data.id : null
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
                this.$router.push('/cart')
              }, 1000)
            } catch (err) {
              console.log(err)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              })
            }
        // this.$swal({
        //   title: 'Im Warenkorb hinzufügen',
        //   text: `Bist du sicher, dass du diesen Gutschein zum Warenkorb hinzufügen möchtest?`,
        //   showCancelButton: true,
        //   confirmButtonColor: '#48BB78',
        //   cancelButtonColor: '#FC8181',
        //   confirmButtonText: 'Bestätigen',
        //   cancelButtonText: 'Abbrechen',
        // }).then( async (result) => {
        //   if(result.value){
        //     try {
        //       await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        //       this.form.total_amount = this.form.value * ( (this.VOUCHER.type != 'quantity') ? 1 : this.VOUCHER.qty_val )
        //       this.form.user_id = this.AUTH_USER.data.id
        //       this.form.voucher_id = this.VOUCHER.id
        //       if( this.VOUCHER.type == 'quantity' ) {
        //         this.form.qty = this.form.value
        //         this.form.value = null
        //       } else {
        //         this.form.value = this.form.value
        //       }
        //       const data = await this.$store.dispatch('ADD_WALLET', this.form)
        //       this.form = {
        //         id: null,
        //         voucher_id: null,
        //         user_id: null,
        //         value: null,
        //         qty: null,
        //         value: 0,
        //         total_amount: 0,
        //       }
        //       await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        //       let confirm = this.$swal({
        //         icon: 'success',
        //         title: 'Erfolgreich!',
        //         text: 'Die Gutscheine wurden in den Warenkorb gelegt.',
        //         allowOutsideClick: false,
        //         showConfirmButton: false
        //       })
        //       setTimeout(() => {
        //         confirm.close()
        //         this.$router.push('/cart')
        //       }, 1000)
        //     } catch (err) {
        //       await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        //       this.$swal({
        //         icon: 'warning',
        //         title: 'Achtung! ',
        //         text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.',
        //         confirmButtonColor: '#48BB78',
        //         confirmButtonText: 'Bestätigen'
        //       })
        //     }
        //   }
        // })
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
          }
        })
      },
      async onFetchVoucher()
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHER', {
            id: this.$route.params.id
          })
          this.symbol = (this.VOUCHER.type == 'quantity') ? 'x' : '€'
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
.show-more {
  -webkit-mask-image: -webkit-gradient(linear, center bottom, center top, color-stop(0.00, rgba(0,0,0,0)), color-stop(1.00, rgba(0,0,0,1)));
}
.order__form-number {
  cursor: pointer;
  width: 12px;
  height: 12px;
  text-align: center;
  color: #333;
  font-weight: bold;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.order__form .order__form-number.order-up {
  position: absolute;
  top: 10px;
  right: 4px;
}
.order__form .order__form-number.order-down {
  position: absolute;
  top: 10px;
  left: 20px;
}
.order__form-group {
  width: 80px;
  position: relative;
}
.order__form input[type="number"]::-webkit-inner-spin-button,
.order__form input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.order__form input[type="number"] {
  -moz-appearance: textfield;
  width: 100%;
  padding-right: 5px;
  text-align: center;
  color: #45434a;
  padding-top: 7px;
  padding-bottom: 8px;
  border-radius: 8px;
  border: 2px solid #e3e3e3;
}
.order__form input[type="number"]:focus {
  outline: 0;
}
</style>