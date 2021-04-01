<template>
  <div class="flex flex-col w-full">
    <Header2 v-if="title != ''" :label="title" />
    <div class="flex flex-wrap w-full justify-center sm:justify-start">
      <div
        v-for="(row, index) in data"
        :key="`voucher-${index}`"
        class="flex flex-col cart-card-container mr-3 mb-3 border-b-2 pb-8"
      >
        <div class="flex flex-wrap justify-center sm:justify-start h-full">
          <VoucherCard
            :cardId="`voucher-card-${index}`"
            :voucher="getCustomVoucher(row)"
            :order="row.order"
            :qr="row.qr"
            :userVoucher="row"
            :role="role"
            :withQR="withQR"
          />
          <section class="flex flex-col items-center w-full mt-4">
            <span class="font-medium">{{ row.order.voucher.title }}</span>
            <span class="text-sm mb-2">{{
              (row.order.voucher.seller && row.order.voucher.seller.username) ||
                'N/A'
            }}</span>
            <span class="font-medium"
              >{{
                `${
                  row.order.voucher.type == 'quantity'
                    ? `${$helpers.convertCurrency(row.order.voucher.qty_val)}`
                    : `${$helpers
                        .convertCurrency(
                          row.order.voucher.min || row.order.voucher.val_min
                        )
                        .replace('€', '')} - ${$helpers.convertCurrency(
                        row.order.voucher.max || row.order.voucher.val_max
                      )}`
                }`
              }}
            </span>

            <button
              class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-4"
              @click="$router.push(`/vouchers/personalized/${row.id}`)"
            >
              Zum Gutschein
            </button>
          </section>
        </div>
        <div v-if="withCartDetail" class="flex flex-col h-12 self-center">
          <div class="flex flex-row">
            <span class="text-sm font-bold">
              {{
                row.order.voucher.type == 'quantity'
                  ? 'Price per voucher: '
                  : 'Value: '
              }}
            </span>
            <span class="text-sm font-semibold ml-2">
              {{
                `${$helpers.convertCurrency(
                  row.order.voucher.type == 'quantity'
                    ? row.order.voucher.price_filter
                    : row.value
                )}`
              }}
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
        Du hast noch keine Gutscheine in deiner Wallet.
      </div>
    </div>
    <div v-if="withPagination && data.length != 0" class="text-center my-8">
      <button
        class="list-pagination"
        :disabled="currentPage === 1"
        @click="onPaginate('prev')"
      >
        <i class="fas fa-chevron-left" />
      </button>
      <span class="mx-8"> {{ currentPage }} von {{ lastPage }} </span>
      <button
        class="list-pagination"
        :disabled="currentPage === lastPage"
        @click="onPaginate('next')"
      >
        <i class="fas fa-chevron-right" />
      </button>
    </div>
    <div
      v-if="isCart && data.length > 0"
      class="flex flex-col mt-5 w-full sm:w-1/2 md:w-1/4 self-center text-center"
    >
      <span class="text-lg font-bold">
        Preis
      </span>
      <span class="text-lg font-bold">
        {{ $helpers.convertCurrency(totalPrice) }}
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
import VoucherCard from '../VoucherList/VoucherDisplay/';
import Button from '_components/Button';
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
      default: '',
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    withPagination: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 1,
    },
    role: {
      type: String,
      default: 'seller',
    },
    isCart: {
      type: Boolean,
      default: true,
    },
    withQR: {
      type: Boolean,
      default: false,
    },
    withCartDetail: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      listIndex: 0,
      totalPrice: 0,
    };
  },
  watch: {
    async data(newVal) {
      this.totalPrice = 0;
      await this.onGetTotalPrice();
    },
  },
  mounted() {
    this.onGetTotalPrice();
  },
  methods: {
    getCustomVoucher(row) {
      if (!row.order.voucher.data_json) {
        return row.order.voucher;
      }

      row.order.voucher.data_json = row.data_json;
      row.order.voucher.data_json.price_hidden = row.price_hidden
        ? true
        : false;
      row.order.voucher.data_json.seller = row.order.voucher.seller
      console.log(row.order.voucher.data_json)
      return row.order.voucher.data_json;
    },
    onDelete(data) {
      this.$swal({
        title: 'Delete item',
        text: `Are you sure you want to delete this item?`,
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Bestätigen',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.value) {
          this.$emit('onDelete', data);
        }
      });
    },
    onGetTotalPrice() {
      this.totalPrice = 0;
      if (this.data) {
        this.data.map((row) => {
          this.totalPrice += this.onGetTotal(row);
        });
      }
    },
    onGetTotal(data) {
      let value = data.order.voucher.type == 'quantity' ? data.qty : data.value;
      let total = value;

      if (data.order.voucher.type == 'quantity') {
        total = value * data.order.voucher.price_filter;
      }

      return total;
    },
    onPaginate(action) {
      this.$emit('onPaginate', action);
    },
  },
};
</script>
<style lang="css" scoped>
.cart-card-container {
  width: 320px;
}
@media only screen and (max-width: 600px) {
  .cart-card-container {
    width: 100%;
  }
}
</style>
