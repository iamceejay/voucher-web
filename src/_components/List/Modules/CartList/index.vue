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
        <div v-if="withCartDetail" class="flex flex-col h-12 self-center">
          <div class="flex flex-row">
            <span class="text-sm font-bold">
              {{ 
                (row.voucher.type == 'quantity') 
                  ? 'Price per gutschein: ' 
                  : 'Value: '
              }}
            </span>
            <span class="text-sm font-semibold ml-2">
              {{ `${ $helpers.convertCurrency((row.voucher.type == 'quantity') ? row.voucher.price_filter : row.value)}` }}
            </span>
          </div>
          <div v-if="isCart" class="flex flex-row justify-center">
            <span class="text-sm font-semibold ml-2">
              {{ `= ${$helpers.convertCurrency(onGetTotal(row))}` }}
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
    <div v-if="isCart && data.length > 0" class="flex flex-col mt-5 w-full sm:w-1/2 md:w-1/4 self-center text-center">
      <span class="text-lg font-bold">
        Price
      </span>
      <span class="text-lg font-bold">
        {{ $helpers.convertCurrency(totalPrice) }}
      </span>
      <Button
        type="submit"
        class="py-2"
        label="Kauf abschließen"
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
      }, withCartDetail: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        listIndex: 0,
        totalPrice: 0,
      }
    },
    watch: {
      async data(newVal)
      {
        this.totalPrice = 0
        await this.onGetTotalPrice()
      }
    },
    mounted() {
      this.onGetTotalPrice()
    },
    methods: {
      onDelete( data )
      {
        this.$swal({
          title: 'Aus dem Warenkorb entfernen',
          text: `Bist du sicher, dass du diesen Gutschein aus dem Warenkorb entfernen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then((result) => {
          if(result.value){
            this.$emit('onDelete', data)
          }   
        })
      },
      onGetTotalPrice()
      {
        this.totalPrice = 0
        if( this.data ) {
          this.data.map( row => {
            this.totalPrice += this.onGetTotal(row)
          })
        }
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