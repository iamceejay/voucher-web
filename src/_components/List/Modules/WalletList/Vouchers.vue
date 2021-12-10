<template>
  <div class="flex flex-col w-full">
    <Header2 v-if="title != ''" :label="title" />
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(row, index) in data"
        :key="`voucher-${index}`"
        class="flex flex-col mr-3 mb-3 pb-8"
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
  </div>
</template>
<script>
import Header2 from '_components/Headers/Header2';
import VoucherCard from '../VoucherList/VoucherBuyer/';
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
    };
  },

  methods: {
    getCustomVoucher(row) {
      return row.data_json;
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
