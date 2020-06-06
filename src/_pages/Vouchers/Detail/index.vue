<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status && VOUCHER" class="content-container w-full flex flex-col px-8">
        <div class="flex flex-col w-full">
          <VoucherCard
            class="self-center"
            :data="VOUCHER"
            :isFlippable="false"
            :withQR="false"
          />
          <router-link 
            class="self-center w-full md:w-1/2"
            :to="`/seller/${VOUCHER.seller_id}`"
          >
            <Button
              label="More info on seller"
              size="w-full py-1"
              round="rounded-full"
            />
          </router-link>
        </div>
        <ValidationObserver
          v-if="AUTH_USER.isAuth && AUTH_USER.role.name != 'admin'"
          v-slot="{ handleSubmit }"
        >
          <form 
            class="flex flex-col w-full mt-8"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <InputField
              id="name"
              v-model="form.value"
              type="number"
              class="w-full md:w-1/2 self-center"
              :label="`Enter a ${ (VOUCHER.type == 'quantity') ? `quantity (€${VOUCHER.qty_val}/voucher)` : 'value' }`"
              placeholder="Enter here"
              :rules="`required|numeric|min_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_min : VOUCHER.val_min }|max_value:${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_max : VOUCHER.val_max }`"
              :note="`Enter a value from ${symbol}${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_min : VOUCHER.val_min } to ${symbol}${ (VOUCHER.type == 'quantity') ? VOUCHER.qty_max : VOUCHER.val_max }`"
              :disabled="isAdded ? true : false"
            />
            <div class="flex flex-col mt-3 self-center">
              <span class="text-2xl">Price</span>
              <span class="text-2xl font-bold">
                €{{ form.value * ( (VOUCHER.type != 'quantity') ? 1 : VOUCHER.qty_val ) }}
              </span>
            </div>
            <Button
              class="self-center w-full md:w-1/2 mt-3 "
              :label="`${ isAdded ? 'Added' : 'Add'} to cart`"
              :icon="`${ isAdded ? 'check' : '' }`"
              size="w-full py-3"
              round="rounded-full"
              :type="`${ isAdded ? 'button' : 'submit' }`"
              @onClick=" isAdded ? onRemoveCart() : null"
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
        form: {
          id: null,
          voucher_id: null,
          user_id: null,
          value: null,
          qty: null,
          value: null,
        },
        symbol: '',
        isAdded: false,
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
    watch: {
      CARTS(newVal)
      {
      }
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchVoucher()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onSubmit()
      {
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
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
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
              value: null,
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Adding the voucher to the card.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
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
            const newData = this.CARTS.filter( cart => this.form.id != cart.id )
            console.log('newData', newData)
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
              title: 'Successful!',
              text: 'Removing the voucher.',
              confirmButtonColor: '#6C757D',
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
</style>