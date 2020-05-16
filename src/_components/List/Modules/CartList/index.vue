<template>
  <div  class="flex flex-col w-full">
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <div
      v-for="(row, index) in data"
      :key="`voucher-${index}`"
      class="flex flex-col w-full"
    >
      <VoucherCard
        :data="row.voucher"
        :role="role"
        :withQR="withQR"
        class="m-2"
      />
      <div class="flex flex-col self-center h-12">
        <div class="flex flex-row">
          <span class="text-sm font-bold self-center">
            {{ 
              row.voucher.isQuantityBased 
                ? 'Price per voucher: ' 
                : 'Quantity: '
            }}
          </span>
          <span class="text-sm font-semibold ml-2 self-center">
            {{ `${onGetSymbol(row.voucher.isQuantityBased)} ${row.value}` }}
          </span>
        </div>
        <div v-if="isCart" class="flex flex-row">
          <span class="text-sm font-semibold ml-2 self-center">
            {{ `= €${onGetTotal(row)}` }}
          </span>
          <a 
            href="javascript:void(0)"
            class="text-red-900 ml-2 self-center"
            @click="onDelete(row)"
          >
            <i class="fas fa-trash text-sm" />
          </a>
        </div>
      </div>
    </div>
    <div v-if="isCart && data.length > 0" class="flex flex-col self-center mt-5 w-full">
      <span class="text-lg font-bold self-center">
        Price
      </span>
      <span class="text-lg font-bold self-center">
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
        let value = parseFloat(data.value)
        let itemValue = parseFloat( data.isQuantityBased ? data.voucher.quantity : data.voucher.value )
        const total = value * itemValue
        return total
      },
      onGetSymbol(isQuantityBased)
      {
        return isQuantityBased ? '€' : 'x'
      }
    }
  }
</script>
<style lang="css" scoped>
</style>