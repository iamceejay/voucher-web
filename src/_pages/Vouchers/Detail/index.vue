<template>
  <MainLayout>
    <template #content>
      <div 
        v-if="voucher"
        class="w-full flex flex-col"
      >
        <div class="flex flex-col w-full">
          <VoucherCard
            class="self-center"
            :data="voucher"
            :isFlippable="false"
            :withQR="false"
          />
          <router-link 
            class="self-center w-full md:w-1/2"
            :to="`/seller/${voucher.seller_id}`"
          >
            <Button
              label="More info on seller"
              size="w-full py-1"
              round="rounded-full"
            />
          </router-link>
        </div>
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form 
            class="flex flex-col w-full mt-8"
            @submit.prevent="handleSubmit(onSubmit(invalid))"
          >
            <InputField
              id="name"
              v-model="voucherForm.value"
              type="number"
              class="w-full md:w-1/2 self-center"
              :label="`Enter a ${ voucher.isQuantityBased ? `quantity (€${voucher.value}/voucher)` : 'value' }`"
              placeholder="Enter here"
              :rules="`required|numeric|min_value:${voucher.minVal}|max_value:${voucher.maxVal}`"
              :note="`Enter a value from ${symbol}${voucher.minVal} to ${symbol}${voucher.maxVal}`"
              :disabled="isAdded ? true : false"
            />
            <div class="flex flex-col mt-3 self-center">
              <span class="text-2xl">Price</span>
              <span class="text-2xl font-bold">
                €{{ voucherForm.value * ( !voucher.isQuantityBased ? 1 : voucher.value ) }}
              </span>
            </div>
            <Button
              class="self-center w-full md:w-1/2 mt-3 "
              :label="`${ isAdded ? 'Added' : 'Add'} to cart`"
              :icon="`${ isAdded ? 'check' : '' }`"
              size="w-full py-3"
              round="rounded-full"
              :type="`${ isAdded ? 'button' : 'submit' }`"
              @onClick="onRemoveCart()"
            />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'

  export default {
    name: 'Vouchers',
    components: {
      MainLayout,
      VoucherCard,
      InputField,
      Button,
    },
    data() {
      return {
        voucher: null,
        voucherForm: {
          id: null,
          user_id: null,
          value: null,
          type: '',
          voucher: null
        },
        symbol: '',
        isAdded: false,
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      CARTS()
      {
        return this.$store.getters.CARTS
      },
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      CARTS(newVal)
      {
        console.log('CARTS', newVal)
      }
    },
    mounted() {
      this.onFetchVoucher()
    },
    methods: {
      async onSubmit( invalid )
      {
        if( !invalid ) {
          
          this.$swal({
            title: 'Add to cart',
            text: `Are you sure you want to add this to the cart?`,
            showCancelButton: true,
            confirmButtonColor: '#6C757D',
            cancelButtonColor: '#AF0000',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
          }).then( async (result) => {
            if(result.value){
              this.voucherForm.voucher = this.voucher
              this.voucherForm.user_id = this.AUTH_USER.data.id
              const data = await this.$store.dispatch('ADD_CART', this.voucherForm)
              this.voucherForm = data
              this.isAdded = true
              this.$swal({
                icon: 'success',
                title: 'Successful!',
                text: 'Adding the voucher.',
                confirmButtonColor: '#6C757D',
              })
            }   
          })
        }
      },
      async onRemoveCart()
      {
        this.$swal({
          title: 'Remove from cart',
          text: `Are you sure you want to remove this from the cart?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            const newData = this.CARTS.filter( cart => this.voucherForm.id != cart.id )
            console.log('newData', newData)
            await this.$store.commit('SET_CARTS', newData)
            this.isAdded = false
            this.voucherForm = {
              id: null,
              user_id: null,
              value: null,
              type: '',
              voucher: null
            }
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Removing the voucher.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      onFetchVoucher()
      {
        this.voucher = this.VOUCHERS.filter( vouch => vouch.id == this.$route.params.id )[0]
        this.symbol = this.voucher.isQuantityBased ? 'x' : '€'
      }
    }
  }
</script>
<style lang='css' scoped>
</style>