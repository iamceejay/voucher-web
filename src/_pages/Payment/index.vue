<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          label="Payment Method"
        />
        <div class="flex flex-col w-full md:w-1/2">
          <div class="flex flex-col mt-5 w-full">
            <span class="text-lg font-bold text-center">
              Price
            </span>
            <span class="text-lg font-bold text-center">
              €{{ totalPrice }}
            </span>
          </div>
          <StripeForm 
            @onSubmit="onSubmit"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import InputField from '_components/Form/InputField';
  import StripeForm from '_components/Form/Modules/StripeForm';
  import Button from '_components/Button'

  export default {
    components: {
      MainLayout,
      Header1,
      InputField,
      StripeForm,
      Button,
    },
    data() {
      return {
        totalPrice: 0,
        paymentForm: {
          creditNo: '',
          date: '',
          cvc: '',
          isSave: false
        }
      };
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
    },
    watch: {
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchWallets()
        await this.onGetTotalPrice()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
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
              ...data,
              price: this.totalPrice
            })
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Paying the vouchers.',
              confirmButtonColor: '#6C757D',
            })
            await this.$store.commit('SET_COUNT_CART', 0)
            this.$router.push('/wallet')
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
        let itemValue = data.voucher.price_filter
        const total = value * itemValue
        return total
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

</style>