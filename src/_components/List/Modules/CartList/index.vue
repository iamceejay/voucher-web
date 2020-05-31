<template>
  <div class="flex flex-col w-full">
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <div class="flex flex-wrap w-full">
      <div
        v-for="(row, index) in data"
        :key="`voucher-${index}`"
        class="flex flex-col card-container mr-3 mb-3"
      >
        <VoucherCard
          :data="row.voucher"
          :otherData="row"
          :role="role"
          :withQR="withQR"
        />
        <div class="flex flex-col h-12 self-center">
          <div class="flex flex-row">
            <span class="text-sm font-bold">
              {{ 
                (row.voucher.type == 'quantity') 
                  ? 'Price per voucher: ' 
                  : 'Quantity: '
              }}
            </span>
            <span class="text-sm font-semibold ml-2">
              {{ `${onGetSymbol(row.voucher.type)} ${ (row.voucher.type == 'quantity') ? row.qty : row.value}` }}
            </span>
          </div>
          <div v-if="isCart" class="flex flex-row justify-center">
            <span class="text-sm font-semibold ml-2">
              {{ `= €${onGetTotal(row)}` }}
            </span>
            <a 
              href="javascript:void(0)"
              class="text-red-900 ml-2"
              @click="onDelete(row)"
            >
              <i class="fas fa-trash text-sm" />
            </a>
          </div>
        </div>
      </div>
      <div v-if="data.length <= 0" class="py-2 text-lg">
        No data found.
      </div>
    </div>
    <div v-if="isCart && data.length > 0" class="flex flex-col mt-5 w-full sm:w-1/2 md:w-1/4 self-center">
      <span class="text-lg font-bold text-center">
        Price
      </span>
      <span class="text-lg font-bold text-center">
        €{{ totalPrice }}
      </span>
      <Button
        type="submit"
        class="py-2"
        label="Go to checkout"
        size="w-full py-3"
        round="rounded-full"
        fontSize="text-sm"
        :isDisabled="data.length <= 0"
        @onClick="$router.push('/payment')"
      />
    </div>
  </div>
</template>
<script>
  import Header2 from '_components/Headers/Header2';
  import VoucherCard from '../VoucherList/VoucherCard/'
  import Button from '_components/Button'
  import moment from 'moment';

  export default {
    components: {
      Header2,
      VoucherCard,
      Button,
    },
    props: {
      title: {
        type: String,
        default: ''
      }, data: {
        type: Array,
        default() {
          return []
        }
      }, role: {
        type: String,
        default: 'seller'
      }, isCart: {
        type: Boolean,
        default: true
      }, withQR: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        listIndex: 0,
        totalPrice: 0,
      }
    },
    watch: {
    },
    mounted() {
      this.onGetTotalPrice()
    },
    methods: {
      onDelete( data )
      {
        this.$swal({
          title: 'Delete item',
          text: `Are you sure you want to delete this item?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if(result.value){
            this.$emit('onDelete', data)
          }   
        })
      },
      onGetTotalPrice()
      {
        this.totalPrice = 0
        this.data.map( row => {
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
      onGetSymbol(type)
      {
        return type == 'quantity' ? '€' : 'x'
      }
    }
  }
</script>
<style lang="css" scoped>
  .card-container {
    width: 320px;
  }
  @media only screen and (max-width: 600px) {
    .card-container {
      width: 100%;
    }
  }
</style>