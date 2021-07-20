<template>
  <div class="flex flex-col w-11/12 max-w-sm items-center mx-auto">
    <div class="flex flex-col w-full bg-white p-7">
      <div class="flex flex-col mb-5 border-b border-input-border">
        <RadioInputField
          id="stripe_payment_type"
          v-model="payment_type"
          containerClass="mb-5"
          name="payment_type"
          data="stripe"
        >
          <img class="h-7 w-auto mx-3" src="/icon_mastercard.png"/>
          Kreditkarte
        </RadioInputField>
      </div>
      <div class="flex flex-col mb-5 border-b border-input-border">
        <RadioInputField
          id="sofort_payment_type"
          v-model="payment_type"
          containerClass="mb-5"
          name="payment_type"
          data="sofort"
        >
          <img class="h-7 w-auto mx-3" src="/icon_sofort.png"/>
          Sofortüberweisung
        </RadioInputField>
      </div>
      <div class="flex flex-col hidden">
        <RadioInputField
          id="googlepay_payment_type"
          v-model="payment_type"
          containerClass="mb-0"
          name="payment_type"
          data="googlepay"
        >
          <img class="h-7 w-auto ml-3 mr-1" src="/icon_googlepay.png"/>
          <img class="h-7 w-auto mr-3" src="/icon_applepay.png"/>
          Google Pay/Apple Pay
        </RadioInputField>
      </div>
    </div>

    <div class="flex flex-col w-full mt-8" v-show="payment_type == 'stripe'">
      <Button
        v-if="payment_type == 'stripe'"
        variant="info"
        :class="`mb-4 justify-center ${ (USER && USER.stripe && USER.stripe.is_save && paymentForm.is_save) ? '' : 'hidden' }`"
        label="Neue Kreditkarte"
        size="w-full py-3"
        round="rounded"
        fontSize="text-sm"
        @onClick="onNewNumber"
      />
      <!-- <Button
        class="py-2 justify-center"
        label="Jetzt bezahlen"
        size="w-full py-3"
        round="rounded-full"
        fontSize="text-sm"
        @onClick="onSubmit"
      />    -->
      <div
        class="flex flex-col w-full"
        :class="{'hidden': USER && USER.stripe && USER.stripe.is_save && paymentForm.is_save}"
      >
        <form
          id="stripe-form"
          class="w-full flex flex-col"
          :class="{'hidden': payment_type != 'stripe'}"
          @submit.prevent=""
        >
          <div
            id="card-element"
            class="mt-1 mb-2 rounded bg-white border border-input-border p-4"
          />
          <div id="card-errors" class="mb-3 text-red-500 font-semibold font-body text-sm" />
          <div class="flex flex-row mx-2 items-center">
            <input
              id="is_save"
              v-model="paymentForm.is_save"
              type="checkbox"
            />
            <span class="text-xs ml-2"> Speichere die Karte für spätere Bestellungen </span>
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-col w-full mt-8" v-show="payment_type == 'sofort'">
      <SelectField
        id="country"
        v-model="paymentForm.country"
        :options="countries"
        label="Wähle dein Land"
        class="my-2"
        rules="required"
        @input="onChange"
      />
    </div>
    <div
        class="flex flex-col w-full mt-8"
      >
        <form
          id="stripe-google"
          class="w-full flex flex-col"
          :class="{'hidden': payment_type != 'googlepay'}"
          @submit.prevent=""
        >
          <div id="payment-request-button">
            <!-- A Stripe Element will be inserted here. -->
          </div>
          <div id="card-errors" class="mb-3 text-red-500 font-semibold font-body text-sm" />
        </form>
    </div>

    <div class="border-t-2 border-input-border w-full mt-8"></div>
    <div class="bg-white flex flex-col items-start mt-8 mx-auto pb-8 pt-4 px-8 w-full">
      <div class="flex items-baseline justify-center w-full">
          <span class="text-xs mr-3">Summe ({{WALLETS.length}} Artikel):</span>
          <span class="border-b border-black font-medium text-xl">{{ $helpers.convertCurrency(totalPrice) }}</span>
      </div>
      <button
        @click="onPayment()"
        class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-4 w-full"
        :class="{'opacity-50': !WALLETS.length}"
        :disabled="!WALLETS.length"
        >
          Zur Kasse
      </button>
    </div>
  </div>
</template>
<script>
  import RadioInputField from '_components/Form/RadioInputField';
  import Button from '_components/Button'
  import { post, get, del, patch } from '_helpers/ApiService'
  import SelectField from '_components/Form/SelectField'

  export default {
    components: {
      Button,
      RadioInputField,
      SelectField
    },
    data() {
      return {
        payment_type: 'stripe',
        totalPrice: 0,
        is_save: false,
        paymentForm: {
          is_save: false,
          token: null,
          source: null,
          country: {
            label: 'Österreich',
            code: 'AT'
          }
        },
        stripe_style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        },
        stripe: null,
        elements: null,
        card: null,
        countries: [{
          label: 'Österreich',
          code: 'AT'
        }, {
          label: 'Deutschland',
          code: 'DE'
        }, {
          label: 'Italien',
          code: 'IT'
        }, {
          label: 'Niederlanden',
          code: 'NL'
        }, {
          label: 'Belgien',
          code: 'BE'
        }, {
          label: 'Spanien',
          code: 'ES'
        }]
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      USER() {
        return this.$store.getters.USER;
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
      },
    },
    watch: {
      async WALLETS(newVal)
      {
        this.totalPrice = 0
        this.onGetTotalPrice()
      }
    },
    mounted() {
      if( this.USER?.stripe?.is_save ) {
        this.paymentForm.is_save =  true
      }
      this.onGetTotalPrice()
      this.onInitiateStripeForm()
    },
    methods: {
      onSubmit()
      {
        if(this.payment_type == '') {
          this.$swal({
            icon: 'warning',
            title: 'Warnung!',
            text: 'Select a payment method first.',
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
          })
          return true
        }
        this.$swal({
          // title: 'Zahlungsmethoden',
          text: `Bist du sicher, dass du diese Zahlung durchführen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then(async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              const { data } = await this.$store.dispatch('PAYMENT', {
                ...this.paymentForm,
                price: this.totalPrice,
                payment_type: this.payment_type
              })
              if(this.payment_type == 'stripe') {
                await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                this.$swal({
                  icon: 'success',
                  title: 'Danke!',
                  text: 'Die Zahlung wurde erfolgreich durchgeführt.',
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: '#48BB78',
                  confirmButtonText: 'Bestätigen',
                  cancelButtonText: 'Abbrechen',
                }).then(async (result) => {
                  if(result.value){
                    await this.$store.commit('SET_COUNT_CART', 0)
                    this.$router.push('/wallet')
                  }
                })
              } else {
                window.location.replace(data.url)
              }
            } catch (error) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'warning',
                title: 'Achtung!',
                text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns. ',
                confirmButtonColor: '#48BB78',
              })
            }
          }
        })
      },
      onGetTotalPrice()
      {
        this.totalPrice = 0
        this.WALLETS.map( row => {
          this.totalPrice += this.onGetTotal(row)
        })
        this.totalPrice = Math.round(this.totalPrice)
      },
      onGetTotal(data)
      {
        let value = (data.voucher.type == 'quantity') ? data.qty : data.value * data.qty
        let total = value

        if( data.voucher.type == 'quantity' ) {
          total = value * data.voucher.price_filter
        }

        return total
      },
      onInitiateStripeForm()
      {
        try {
          this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUB_KEY)
          this.elements = this.stripe.elements()
          this.card = this.elements.create('card', {
            style: this.stripe_style
          })
          if( document.getElementById("card-element") ) {
            this.card.mount('#card-element')
            this.card.addEventListener('change', (event) => {
              const displayError = document.getElementById('card-errors')

              if(displayError) displayError.textContent = event.error ? event.error.message : '';
            })
          }

          var paymentRequest = this.stripe.paymentRequest({
            country: 'AT',
            currency: 'eur',
            total: {
              label: 'Epasnets Voucher(s)',
              amount: Math.round(this.totalPrice * 100),
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });

          this.elements = this.stripe.elements();
          var prButton = this.elements.create('paymentRequestButton', {
            paymentRequest: paymentRequest,
          });

          // Check the availability of the Payment Request API first.
          paymentRequest.canMakePayment().then(function(result) {
            if (result) {
              prButton.mount('#payment-request-button');
            } else {
              document.getElementById('payment-request-button').style.display = 'none';
            }
          });

          paymentRequest.on('paymentmethod', async (ev) => {
            const { data } = await post(`order/payment/paymentintent`, {
              amount: this.totalPrice * 100,
            })

            // Confirm the PaymentIntent without handling potential next actions (yet).
            this.stripe.confirmCardPayment(
              data.client_secret,
              {payment_method: ev.paymentMethod.id},
              {handleActions: false}
            ).then( async (confirmResult) => {
              console.log(confirmResult)
              if (confirmResult.error) {
                // Report to the browser that the payment failed, prompting it to
                // re-show the payment interface, or show an error message and close
                // the payment interface.
                ev.complete('fail');
              } else {
                // Report to the browser that the confirmation was successful, prompting
                // it to close the browser payment method collection interface.
                ev.complete('success');
                // Check if the PaymentIntent requires any actions and if so let Stripe.js
                // handle the flow. If using an API version older than "2019-02-11" instead
                // instead check for: `paymentIntent.status === "requires_source_action"`.
                if (confirmResult.paymentIntent.status === "requires_action") {
                  // Let Stripe.js handle the rest of the payment flow.
                  this.stripe.confirmCardPayment(data.client_secret).then( async(result) => {
                    if (result.error) {
                      // The payment failed -- ask your customer for a new payment method.
                    } else {
                      // The payment has succeeded.
                      const { data } = await this.$store.dispatch('PAYMENT', {
                        ...this.paymentForm,
                        price: this.totalPrice,
                        payment_type: this.payment_type,
                        payment_id: confirmResult.id
                      })
                      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                      this.$swal({
                        icon: 'success',
                        title: 'Danke!',
                        text: 'Die Zahlung wurde erfolgreich durchgeführt.',
                        showCancelButton: false,
                        allowOutsideClick: false,
                        confirmButtonColor: '#48BB78',
                        confirmButtonText: 'Bestätigen',
                        cancelButtonText: 'Abbrechen',
                      }).then(async (result) => {
                        if(result.value){
                          await this.$store.commit('SET_COUNT_CART', 0)
                          this.$router.push('/wallet')
                        }
                      })
                    }
                  });
                } else {
                  // The payment has succeeded.
                  const { data } = await this.$store.dispatch('PAYMENT', {
                      ...this.paymentForm,
                      price: Math.round(this.totalPrice),
                      payment_type: this.payment_type,
                      payment_id: confirmResult.id
                    })
                    await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                    this.$swal({
                      icon: 'success',
                      title: 'Danke!',
                      text: 'Die Zahlung wurde erfolgreich durchgeführt.',
                      showCancelButton: false,
                      allowOutsideClick: false,
                      confirmButtonColor: '#48BB78',
                      confirmButtonText: 'Bestätigen',
                      cancelButtonText: 'Abbrechen',
                    }).then(async (result) => {
                      if(result.value){
                        await this.$store.commit('SET_COUNT_CART', 0)
                        this.$router.push('/wallet')
                      }
                    })
                }
              }
            });
          });
        } catch (err) {
          console.log('err', err)
        }
      },
      async onPayment()
      {
        if( this.payment_type == 'stripe' ) {
          if( this.paymentForm.is_save && this.USER?.stripe?.is_save ) {
            this.onSubmit()
          } else {
            this.onStripePayment()
          }
        } else {
          this.onSubmit()
        }
      },
      async onStripePayment()
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          const cust_info = {
            owner: {
              name: `${this.AUTH_USER.data.detail.firstName} ${this.AUTH_USER.data.detail.lastName}`,
              email: this.AUTH_USER.data.email
            },
          }
          let source_id = ''
          if( this.paymentForm.is_save || !this.isPay ) {
            const { source } = await this.stripe.createSource(this.card, cust_info)
            source_id = source ? source.id : ''
          }
          const { token, error } = await this.stripe.createToken(this.card, cust_info)
          if (error) {
            // Inform the user if there was an error
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            const errorElement = document.getElementById('card-errors');
            if(errorElement) errorElement.textContent = error.message;
          } else {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.paymentForm.token = token.id
            this.paymentForm.source = source_id
            this.onSubmit()
            // self.$emit('onSubmit', {
            //   is_save: this.paymentForm.is_save,
            //   token: token.id,
            //   source: source_id
            // })
          }
        } catch (error) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          console.log(error)
        }
      },
      async onNewNumber()
      {
        this.paymentForm.is_save = false
        if( this.USER?.stripe?.is_save ) {
          await this.$store.commit('SET_USER', {
            ...this.USER,
            stripe: {
              ...this.USER.stripe,
              is_save: !this.USER.stripe.is_save
            }
          })
        }
      },
      onChange()
      {
        this.$emit('onChange', this.paymentForm)
      },
    }
  }
</script>
<style lang='css' scoped>
  .StripeElement {
    color: rgba(0, 0, 0, 0.75);
    font-size: 0.875rem;
    font-weight: 600;
    font-family: Nunito, sans-serif;
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
	.disable-form {
		background: rgba(0,0,0,0.1);
    pointer-events: none;
	}
</style>