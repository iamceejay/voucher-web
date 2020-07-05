<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col w-full md:w-1/2 mx-4 mb-5">
      <RadioInputField
        id="stripe_payment_type"
        v-model="payment_type"
        containerClass="mb-2"
        name="payment_type"
        data="stripe"
        description="Credit Card"
      />
      <div class="flex flex-col">
        <Button
          v-if="payment_type == 'stripe'"
          variant="info"
          :class="`py-2 justify-center ${ (USER && USER.stripe && USER.stripe.is_save && paymentForm.is_save) ? '' : 'hidden' }`"
          label="Neue Kreditkarte"
          size="w-full py-3"
          round="rounded-full"
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
      </div>
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
            class="mt-1 mb-2"
          />
          <div id="card-errors" class="mb-3 text-red-500 font-semibold font-body text-sm" />
          <div class="flex flex-row mx-2">
            <input 
              id="is_save"
              v-model="paymentForm.is_save"
              class="mt-1"
              type="checkbox"
            />
            <span class="text-xs ml-1 mt-1"> Save card for later payments </span>
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-col w-full md:w-1/2 mx-4">
      <RadioInputField
        id="sofort_payment_type"
        v-model="payment_type"
        name="payment_type"
        data="sofort"
        description="Sofortüberweisung"
      />
    </div>
    <div class="flex flex-col md:flex-row justify-between mt-5 w-full px-4 bg-dirty px-5 py-8">
      <div>
        <div class="text-lg font-bold text-left h-10">
          Total
        </div>
        <div class="h-12">
          <BackBtn :show="true" />
        </div>
      </div>
      <div>
        <div class="text-lg font-bold md:text-right h-10">
          {{ $helpers.convertCurrency(totalPrice) }}
        </div>
        <div class="h-12">
          <Button
            fontWeight="font-normal"
            size="w-32 py-1 px-2"
            fontSize="text-2xs"
            round="rounded-full"
            label="Jetzt bezahlen"
            @onClick="onPayment()"
          />   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RadioInputField from '_components/Form/RadioInputField';
  import Button from '_components/Button'

  export default {
    components: {
      Button,
      RadioInputField,
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
            confirmButtonColor: '#6C757D',
          })
          return true
        }
        this.$swal({
          title: 'Zahlungsmethoden',
          text: `Bist du sicher, dass du diese Zahlung durchführen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
          cancelButtonText: 'Cancel',
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
                  confirmButtonColor: '#6C757D',
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
                confirmButtonColor: '#6C757D',
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
	.disable-form {
		background: rgba(0,0,0,0.1);
    pointer-events: none;
	}
</style>