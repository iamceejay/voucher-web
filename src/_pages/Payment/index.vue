<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <div class="w-full h-24 sm:h-32 lg:h-48 bg-peach flex justify-center items-center mb-5">
          <Header1
            label="Checkout"
            color="text-white"
          />
        </div>
        <div class="flex flex-col w-full md:w-1/2 mx-4 mb-5">
          <RadioInputField
            id="stripe_payment_method"
            v-model="payment_method"
            containerClass="mb-2"
            name="payment_method"
            data="stripe"
            description="Credit Card"
          />
          <div v-if="is_save" class="flex flex-col">
            <Button
              variant="info"
              class="py-2 justify-center"
              label="New Card Number"
              size="w-full py-3"
              round="rounded-full"
              fontSize="text-sm"
              @onClick="is_save = false"
            /> 
            <Button
              class="py-2 justify-center"
              label="Pay Now"
              size="w-full py-3"
              round="rounded-full"
              fontSize="text-sm"
              @onClick="onSubmit"
            />   
          </div>
          <div v-else class="flex flex-col w-full">
            <form 
              id="stripe-form"
              class="w-full flex flex-col"
              @submit.prevent=""
            >
              <div id="card-element" class="mt-1 mb-2 w" />
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
            id="sofort_payment_method"
            v-model="payment_method"
            name="payment_method"
            data="sofort"
            description="Sofortüberweisung"
          />
        </div>
        <div class="flex flex-col mt-5 w-full">
          <span class="text-lg font-bold text-center">
            Price
          </span>
          <span class="text-lg font-bold text-center">
            {{ $helpers.convertCurrency(totalPrice) }}
          </span>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import RadioInputField from '_components/Form/RadioInputField';
  import Button from '_components/Button'

  export default {
    components: {
      MainLayout,
      Header1,
      Button,
      RadioInputField,
    },
    data() {
      return {
        payment_method: 'stripe',
        totalPrice: 0,
        is_save: false,
        paymentForm: {
          is_save: false
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
        }
      };
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
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
      async WALLETS(newVal)
      {
        this.totalPrice = 0
        await this.onGetTotalPrice()
      }
    },
    mounted() {
      this.onInitiateStripeForm()
        (async() => {
          try {
            await this.$store.commit('SET_IS_LOADING', { status: 'open' })
            await this.$store.commit('SET_WALLETS', [])
            await this.onFetchWallets()
            await this.onFetchUser()
            if( this.USER?.stripe?.is_save ) {
              this.is_save =  true
            }
            await this.onGetTotalPrice()
            await this.$store.commit('SET_IS_LOADING', { status: 'close' })
          } catch (error) {
            await this.$store.commit('SET_IS_LOADING', { status: 'close' })
          }
        })()
    },
    methods: {
      onSubmit( data )
      {
        this.$swal({
          title: 'Payment',
          text: `Are you sure you want to continue this payment?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('PAYMENT', {
              is_save: this.is_save,
              ...data,
              price: this.totalPrice
            })
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Paying the vouchers.',
              showCancelButton: false,
              confirmButtonColor: '#6C757D',
              confirmButtonText: 'Confirm',
            }).then(async (result) => {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              if(result.value){
                await this.$store.commit('SET_COUNT_CART', 0)
                this.$router.push('/wallet')
              }
            })
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
        // Create a Stripe client.
        const stripe = Stripe(process.env.VUE_APP_STRIPE_PUB_KEY)
        // Create an instance of Elements.
        const elements = stripe.elements()
        // Create an instance of the card Element.
        let card = elements.create('card', {
          style: this.stripe_style
        })
        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element')
        console.log('card', card)
        console.log('stripe_style', this.stripe_style)
        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', (event) => {
          const displayError = document.getElementById('card-errors')

          if(displayError) displayError.textContent = event.error ? event.error.message : '';
        })
        // Handle form submission.
        const form = document.getElementById('stripe-form')
        let self = this;
        if(form){
          const cust_info = {
            owner: {
              name: `${this.AUTH_USER.data.detail.firstName} ${this.AUTH_USER.data.detail.lastName}`,
              email: this.AUTH_USER.data.email
            },
          }
          form.addEventListener('submit', async (event) => {
            event.preventDefault()

            if(event.type == "submit") {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            }

            try {
              let source_id = ''
              if( this.paymentForm.is_save || !this.isPay ) {
                const { source } = await stripe.createSource(card, cust_info)
                source_id = source.id
              }
              const { token, error } = await stripe.createToken(card, cust_info)
              if (error) {
                // Inform the user if there was an error
                await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                const errorElement = document.getElementById('card-errors');
                if(errorElement) errorElement.textContent = error.message;
              } else {
                await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
                self.$emit('onSubmit', {
                  is_save: this.paymentForm.is_save,
                  token: token.id,
                  source: source_id
                })
              }
            } catch (error) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              console.log(error)
            }
          })
        }
      },
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