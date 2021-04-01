<template>
  <div class="flex flex-col w-full">
    <Header2
      v-if="title != ''"
      :label="title"
    />
    <div class="max-w-xl mx-auto w-full" id="cart-container">
      <div
        v-for="(row, index) in data"
        :key="`voucher-${index}`"
        class="border-b-2 gap-3 grid mb-8 pb-8"
        style="grid-template-columns: 1fr 190px;"
      >
        <div class="relative">
          <div class="absolute inset-0 z-10"></div>
          <VoucherCard
            :cardId="`voucher-card-${index}`"
            :voucher="row.voucher"
            :order="row"
            :role="role"
            :withQR="withQR"
          />
        </div>
        <div v-if="withCartDetail" class="order__form flex flex-col w-full ">
          <!-- <router-link
            class="text-xs underline my-8"
            to="/vouchers/category/"
          >
            Weitere Gutscheine wie diese
          </router-link> -->
          <div class="flex flex-1 flex-col justify-center">
            <span class="font-medium mb-2">
              {{ row.voucher.title }}
            </span>
            <div class="flex items-center mb-2">
              <form  ref="inputForm" class="order__form-group mr-3" >
                <input
                  type="number"
                  :min="(row.voucher.type == 'quantity') ? row.voucher.qty_min : row.voucher.val_min"
                  :max="(row.voucher.type == 'quantity') ? row.voucher.qty_max : row.voucher.val_max"
                  :value="row.total_qty || row.total_amount"
                  @input="orderUpdate(row, $event.target.value)"
                  required
                />
                <div
                  class="order__form-number order-up"
                  @click="orderUpdate(row, row[row.total_qty ? 'total_qty' : 'total_amount'] + 1)"
                >+</div>
                <div
                  class="order__form-number order-down"
                  @click="orderUpdate(row, row[row.total_qty ? 'total_qty' : 'total_amount'] - 1)"
                >-</div>
              </form>
              <div class="text-xs">Stück</div>
            </div>
            <!-- <span class="font-medium">{{ `${ $helpers.convertCurrency((row.voucher.type == 'quantity') ? row.voucher.price_filter : row.value)}` }}</span> -->
            <span class="font-medium">{{ $helpers.convertCurrency(onGetTotal(row)) }}</span>
          </div>
          <div v-if="isCart" class="flex flex-row mt-16">
            <a
              href="javascript:void(0)"
              class="flex items-center opacity-75 text-2xs"
              @click="onDelete(row)"
            >
              <svg class="h-3 icon mr-1 opacity-75 w-3">
                <use :xlink:href="`/icons/sprite.svg#x-circle`"/>
              </svg>
              Entfernen
            </a>
            <span class="border-l-2 h-4 mx-2"></span>
            <a
              href="javascript:void(0)"
              class="flex items-center opacity-75 text-2xs"
            >
              <svg class="h-3 icon mr-1 opacity-75 w-3">
                <use :xlink:href="`/icons/sprite.svg#heart`"/>
              </svg>
              Auf die Wunschliste
            </a>
          </div>
        </div>
      </div>
      <!-- <div v-if="data.length <= 0" class="py-2 text-lg">
        <span v-if="isCart">Der Warenkorb ist leer </span>
        <span v-else>Keine Daten verfügbar.</span>
      </div> -->
    </div>
    <!-- <div v-if="isCart && data.length > 0" class="flex flex-col mt-5 w-full sm:w-1/2 md:w-1/4 self-center text-center">
      <span class="text-lg font-bold">
        Preis
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
    </div> -->
  </div>
</template>
<script>
  import Header2 from '_components/Headers/Header2';
  import VoucherCard from '../VoucherList/VoucherDisplay/'
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
        form: {
          id: null,
          voucher_id: null,
          user_id: null,
          value: null,
          qty: null,
          total_amount: 0,
        },
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
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
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
      async orderUpdate(row, value) {
        let min= row.voucher.type == 'quantity' ? row.voucher.qty_min : row.voucher.val_min
        let max= row.voucher.type == 'quantity' ? row.voucher.qty_max : row.voucher.val_max
        if (value < min || value > max) {
          return
        }
        row[row.total_qty ? 'total_qty' : 'total_amount'] = value
        if( row.voucher.type == 'quantity' ) {
          row.qty = value
          row.total_qty = value
          row.total_amount = value * row.voucher.price_filter
        } else {
          row.total_value = value
          row.total_amount = value
          row.value = value
        }
        this.totalPrice = 0
        console.log(row)
        let form = {
          id: row.id,
          user_id: row.user_id,
          voucher_id: row.voucher_id,
          qty: row.qty,
          value: row.value,
          total_qty: row.total_qty,
          total_value: row.total_value,
          total_amount: row.total_amount
        }

        const data = await this.$store.dispatch('UPDATE_WALLET', form)

        console.log(row, value)
      }
    }
  }
</script>
<style lang="css" scoped>
.order__form-number {
  cursor: pointer;
  width: 12px;
  height: 12px;
  text-align: center;
  color: #333;
  font-weight: bold;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.order__form .order__form-number.order-up {
  position: absolute;
  top: 10px;
  right: 4px;
}
.order__form .order__form-number.order-down {
  position: absolute;
  top: 10px;
  left: 20px;
}
.order__form-group {
  width: 80px;
  position: relative;
}
.order__form input[type="number"]::-webkit-inner-spin-button,
.order__form input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.order__form input[type="number"] {
  -moz-appearance: textfield;
  width: 100%;
  padding-right: 5px;
  text-align: center;
  color: #45434a;
  padding-top: 7px;
  padding-bottom: 8px;
  border-radius: 8px;
  border: 2px solid #e3e3e3;
}
.order__form input[type="number"]:focus {
  outline: 0;
}
  .cart-card-container {
    width: 320px;
  }
  @media only screen and (max-width: 600px) {
    .cart-card-container {
      width: 100%;
    }
  }
</style>
<style>

#cart-container .voucher-card-container {
    width: 100%;
    min-width: 50px !important;
    font-size: clamp(4px, 2.36vw, 16px)!important;
}
</style>