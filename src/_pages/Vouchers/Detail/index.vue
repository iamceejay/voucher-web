<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && VOUCHER" class="content-container w-full flex flex-col px-8">
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
            <span class="text-sm">Du kannst den Gutchein nach dem Kauf personalisieren</span>
          </section>

          <span class="block md:w-1/2 mx-auto my-6 w-full">
            {{ VOUCHER.description }}
          </span>

          <div v-if="VOUCHER.data_json != null" class="mx-auto md:w-1/2 w-full">
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


            <div v-if="VOUCHER.data_json != null" class="border-b flex md:w-1/2 mx-auto py-6 mb-8 text-xs w-full whitespace-pre">{{ VOUCHER.data_json.long_description }}</div>

          <router-link
            class="self-center w-full md:w-1/2 mx-auto block"
            :to="`/seller/${VOUCHER.seller_id}`"
          >
            <Button
              label="Mehr Infos & Gutscheine von diesem Verkäufer"
              size="w-full py-3"
              round="rounded-md"
            />
          </router-link>
        </ValidationObserver>
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
          currentPage: 0,
          loop: true,
          infinite: 1,
          slidesToScroll: 1,
          pagination: false,
          centeredSlides: false
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
                this.$router.push('/home')
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