<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && WALLET" class="content-container w-full flex flex-col px-8">
        <div class="flex flex-col w-full">
          <div class="relative">
            <div class="absolute inset-0 z-10"></div>
            <VoucherCard
              :cardId="`voucher-card-${$route.params.id}`"
              :voucher="getCustomVoucher(VOUCHER)"
              :order="VOUCHER.order"
              :qr="VOUCHER.qr"
              :userVoucher="VOUCHER"
              :role="'user'"
              :withQR="true"
            />
          </div>
          <span class="block font-medium pb-3 pt-6 text-lg text-center">
            <span>{{ WALLET.voucher.title }}</span>
            <span class="border-r mx-3"></span>
            <span class="font-medium">{{ $helpers.convertCurrency(onGetTotal(WALLET)) }}</span>
          </span>
          <div class="mt-8 gap-4 grid grid-cols-2 max-w-lg mx-auto w-full">
            <router-link
              class="bg-white border flex items-center justify-center text-sm px-3 py-4"
              :to="`/vouchers/personalized/${ $route.params.id}`"
            >
              <svg class="icon h-5 w-5 text-peach mr-2">
                <use :xlink:href="`/icons/sprite.svg#palette`"/>
              </svg>
              <span>Personalisieren</span>
            </router-link>
            <a
              class="bg-white border flex items-center justify-center text-sm px-3 py-4"
              href="javascript:void(0)"
              @click="onGenerateVoucher(VOUCHER.id)"
            >
              <svg class="icon h-5 w-5 text-peach mr-2">
                <use :xlink:href="`/icons/sprite.svg#cloud-arrow-down`"/>
              </svg>
              <span>Herunterladen</span>
            </a>
            <button
              class="border flex items-center justify-center text-sm px-3 py-4"
              type="button"
              :class="currentButton == 'email' ? 'bg-peach text-white' : 'bg-white'"
              @click="currentButton = 'email'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon h-5 w-5 mr-2" viewBox="0 0 16 16" :class="currentButton == 'email' ? ' text-white' : 'text-peach'">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>
              <span>Per E-Mail senden</span>
            </button>
            <button
              class="border flex items-center justify-center text-sm px-3 py-4"
              type="button"
              :class="currentButton == 'link' ? 'bg-peach text-white' : 'bg-white'"
              @click="currentButton = 'link'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon h-5 w-5  mr-2" viewBox="0 0 16 16" :class="currentButton == 'link' ? ' text-white' : 'text-peach'">
                <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
              </svg>
              <span>Als Link teilen</span>
            </button>
          </div>
          <div class="mt-4 max-w-lg mx-auto w-full">
            <button
              class="border flex items-center justify-center text-sm w-full px-3 py-4 bg-peach"
              type="button"
              @click="$emit('onFlip')"
            >
              <span>Gutschein einlösen</span>
            </button>
          </div>
          <div class="flex max-w-lg mt-4 mx-auto relative w-full" v-if="currentButton == 'link'">
            <input
              id="link"
              name="clipboard"
              type="text"
              :value="`${location.origin}/transfer/${ VOUCHER.transfer_url.url_code }`"
              class="input-copy flex-1 px-4 py-2 rounded"
            />
            <button
              data-clipboard-target="#link"
              class="bg-black px-5 py-3 rounded text-sm text-white clipboard"
            >Link kopieren</button>
          </div>

          <div class="flex max-w-lg mt-4 mx-auto relative w-full" v-if="currentButton == 'email'">
            <ValidationObserver v-slot="{ handleSubmit }" class="flex w-full">
              <form
                class="w-full flex flex-col"
                @submit.prevent="handleSubmit(onEmail)"
              >
                <InputField
                  id="email"
                  v-model="emailForm.email"
                  type="email"
                  class="w-full m-auto mt-4"
                  placeholder="Emailadresse"
                  rules="required"
                />
                <InputField
                  id="subject"
                  v-model="emailForm.subject"
                  type="text"
                  class="w-full m-auto mt-4"
                  placeholder="Betreff"
                  rules="required"
                />
                <TextAreaField
                  id="text"
                  v-model="emailForm.text"
                  class="w-full m-auto mt-4"
                  placeholder="Text"
                  rules="required"
                  :max="252"
                />
                <Button
                  class="justify-center"
                  label="Email abschicken"
                  size="mt-1 w-full py-3"
                  round="rounded"
                  type="submit"
                />
              </form>
            </ValidationObserver>
          </div>
        </div>

        <section class="border-t border-b flex flex-col max-w-lg mt-6 mx-auto px-4 py-6 w-full">
          <span class="font-medium">Verkäuferinfo</span>
          <span class="text-xs flex flex-col mt-3">
              <span class="font-medium">{{ WALLET.voucher.seller.company.name }}</span>
              <span>{{WALLET.voucher.seller.detail.address}} </span>
              <span>{{ WALLET.voucher.seller.detail.zip_code }} {{ WALLET.voucher.seller.detail.city }}</span>
              <span>{{ WALLET.voucher.seller.company.region }}</span>
          </span>

          <span class="text-xs flex flex-col mt-3">
              <span>Tel: {{WALLET.voucher.seller.detail.phone_number}} </span>
              <span>E-Mail: {{ WALLET.voucher.seller.email }}</span>
              <span>{{ WALLET.voucher.seller.company.url }}</span>
          </span>
        </section>

        <section class="border-t border-b flex flex-col max-w-lg mt-6 mx-auto px-4 py-6 w-full">
          <span class="font-medium">{{ WALLET.voucher.description }}</span>

          <div v-if="WALLET.voucher.data_json != null" class="mt-6 w-full">
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
        </section>

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
  import TextAreaField from '_components/Form/TextAreaField'

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      VoucherCard,
      InputField,
      TextAreaField,
      Button,
      slider,
      slideritem
    },
    data() {
      return {
        location: window.location,
        currentButton: '',
        form: {
          id: null,
          voucher_id: null,
          user_id: null,
          value: null,
          qty: null,
          total_amount: 0,
        },
        emailForm: {
          id: null,
          email: '',
          subject: '',
          text: '',
          sent_via: 'email',
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
        return this.$store.getters.USER_VOUCHER
      },
      WALLET()
      {
        return this.$store.getters.WALLET
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
          this.emailForm.id = this.$route.params.id
          await this.$store.dispatch('ADD_TRANSFER_URL', {
            order_id: this.$route.params.id,
          })
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchVoucher()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
          var clipboard = new ClipboardJS('.clipboard');
          clipboard.on('success', (e) => {
            let processing = this.$swal({
              title: 'Erfolgreich!',
              text: 'Link wurde kopiert',
              allowOutsideClick: false,
              showConfirmButton: false
            })
            setTimeout( () => {
              processing.close()
            }, 2000)
            e.clearSelection();
          });
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      getCustomVoucher(row) {
        if (!row.order.voucher.data_json) {
          return row.order.voucher;
        }

        row.order.voucher.data_json = row.data_json;
        row.order.voucher.data_json.price_hidden = row.price_hidden
          ? true
          : false;
        row.order.voucher.data_json.seller = row.order.voucher.seller

        return row.order.voucher.data_json;
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
          await this.$store.dispatch('FETCH_USER_VOUCHER', this.$route.params.id)
          await this.$store.dispatch('FETCH_WALLET', this.VOUCHER.order_id)
          // this.symbol = (this.VOUCHER.type == 'quantity') ? 'x' : '€'
        } catch (err) {
          console.log('err', err)
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
      async onEmail()
      {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.dispatch('SEND_WALLET', this.emailForm)
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Gutschein via Email versenden.',
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          });
          this.emailForm = {
            id: null,
            email: '',
            subject: '',
            text: '',
          }
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
          this.$router.push('/wallet')
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      }
    }
  }
</script>
<style lang='css' scoped>
.input-copy {
    color: rgba(0, 0, 0, 0.75);
    -webkit-appearance: none;
    background-color: #F7F7F7;
    border-width: 1px;
    border-color: #00000033;
    border-radius: 0.25rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
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