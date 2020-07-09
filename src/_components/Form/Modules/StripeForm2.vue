<template>
  <div class="flex flex-col w-full">
    <form 
      id="stripe-form"
      class="w-full flex flex-col"
      @submit.prevent=""
    >
      <div id="card-element" class="mt-1 mb-2" />
      <div id="card-errors" class="mb-3 text-red-500 font-semibold font-body text-sm" />
      <div v-if="isPay" class="flex flex-row mx-2">
        <input 
          id="is_save"
          v-model="paymentForm.is_save"
          class="mt-1"
          type="checkbox"
        />
        <span class="text-xs ml-1 mt-1"> Speichere die Karte für spätere Bestellungen </span>
      </div>
      <Button
        v-if="isWithBtn"
        class="py-2 justify-center"
        :label="`${ isPay ? 'Jetzt bezahlen' : 'Save' }`"
        size="w-full py-3"
        round="rounded-full"
        fontSize="text-sm"
        @onClick="onSubmit()"
      />   
    </form>
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button
    },
    props: {
      isPay: {
        type: Boolean,
        default: true
      },
      isWithBtn: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
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
    },
    mounted() {
      this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUB_KEY)
      this.elements = this.stripe.elements()
      this.card = this.elements.create('card', {
        style: this.stripe_style
      })
      this.card.mount('#card-element')
      this.card.addEventListener('change', (event) => {
        const displayError = document.getElementById('card-errors')

        if(displayError) displayError.textContent = event.error ? event.error.message : '';
      })
    },
    methods: {
      async onSubmit()
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
      },
    },
  }
</script>
<style lang="css" scoped>
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