<template>
  <MainLayout>
    <template #content>
      <div v-if="!isLoading" class="flex flex-col w-full">
        <Header1
          label="Payment Method"
        />
        <div class="flex flex-col w-full">
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form 
              class="w-full flex flex-col"
              @submit.prevent="handleSubmit(onSubmit(invalid))"
            >
              <InputField
                id="creditNo"
                v-model="paymentForm.creditNo"
                type="text"
                class="mx-2"
                placeholder="Credit Card Number"
                rules="required"
              />
              <div class="flex flex-row w-full">
                <InputField
                  id="date"
                  v-model="paymentForm.date"
                  type="text"
                  class="mx-2 w-3/5"
                  placeholder="MM / YY"
                  rules="required"
                />
                <InputField
                  id="cvc"
                  v-model="paymentForm.cvc"
                  type="text"
                  class="mx-2 w-2/5"
                  placeholder="CVC"
                  rules="required"
                />
              </div>
              <div class="flex flex-row mx-2">
                <input 
                  id="isSave"
                  v-model="paymentForm.isSave"
                  class="mt-1"
                  type="checkbox"
                />
                <span class="text-xs ml-1"> Save card for later payments </span>
              </div>
              <div class="flex flex-col self-center mt-5 w-full">
                <span class="text-lg font-bold self-center">
                  Price
                </span>
                <span class="text-lg font-bold self-center">
                  €{{ totalPrice }}
                </span>
                <Button
                  type="submit"
                  class="py-2 mx-2"
                  label="Pay Now"
                  size="w-full py-3"
                  round="rounded-full"
                  fontSize="text-sm"
                />
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button'

  export default {
    components: {
      MainLayout,
      Header1,
      InputField,
      Button,
    },
    data() {
      return {
        isLoading: true,
        role: null,
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
      CARTS()
      {
        return this.$store.getters.CARTS
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
      },
    },
    watch: {
      AUTH_USER(newVal) {
        this.onSetRole();
      }
    },
    mounted() {
      (async() => {
        this.isLoading = true
        await this.onSetRole();
        await this.onGetTotalPrice()
        this.isLoading = false
      })()
    },
    methods: {
      onSubmit( invalid )
      {
        if( !invalid ) {
          this.$swal({
            title: 'Payment',
            text: `Are you sure you want to continue this payment?`,
            showCancelButton: true,
            confirmButtonColor: '#6C757D',
            cancelButtonColor: '#AF0000',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if(result.value){
              this.$store.commit('SET_WALLETS', [
                ...this.WALLETS,
                ...this.CARTS,
              ])
              this.$store.commit('SET_CARTS', [])
              this.$swal({
                icon: 'success',
                title: 'Successful!',
                text: 'Paying the vouchers.',
                confirmButtonColor: '#6C757D',
              })
              this.$router.push('/wallet')
            }   
          })
        }
      },
      onGetTotalPrice()
      {
        this.totalPrice = 0
        this.CARTS.map( row => {
          this.totalPrice += this.onGetTotal(row)
        })
      },
      onGetTotal(data)
      {
        let value = parseFloat(data.value)
        let itemValue = parseFloat( data.isQuantityBased ? data.voucher.quantity : data.voucher.value )
        const total = value * itemValue
        return total
      },
      onSetRole() {
        if (this.AUTH_USER?.data?.user_role) {
          this.role = this.AUTH_USER.data.user_role.role.name;
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>