<template>
  <div class="flex flex-col w-full">
    <div class="max-w-xl mx-auto w-full" id="cart-container">
      <div
        v-for="(row, index) in data"
        :key="`voucher-${index}`"
        class="border-b-2 gap-3 flex flex-col md:grid mb-8 pb-8"
        style="grid-template-columns: 1fr minmax(0, 190px);"
      >
        <div class="relative">
          <!-- <div class="absolute inset-0 z-10"></div> -->
          <VoucherCard
            :cardId="`voucher-card-${index}`"
            :order="row"
            :voucher="row.voucher"
            :isFlippable="false"
            :withQR="false"
          />
        </div>
        <div v-if="withCartDetail" class="order__form flex flex-col w-full ">
          <div class="flex flex-1 flex-col justify-center">
            <span class="font-medium mb-2">
              {{ row.voucher.title }}
            </span>
            <div class="flex items-center mb-3">
              <form ref="inputForm" class="order__form-group mr-3">
                <input
                  class="bg-white"
                  type="number"
                  :min="
                    row.voucher.type == 'quantity'
                      ? row.voucher.qty_min
                      : row.voucher.val_min
                  "
                  :max="
                    row.voucher.type == 'quantity'
                      ? row.voucher.qty_max
                      : row.voucher.val_max
                  "
                  :value="row.total_qty || row.total_amount"
                  disabled
                  @input="orderUpdate(row, $event.target.value)"
                  required
                />
                <div
                  class="order__form-number order-up"
                  @click="
                    orderUpdate(
                      row,
                      row[row.total_qty ? 'total_qty' : 'total_amount'] + 1
                    )
                  "
                >
                  +
                </div>
                <div
                  class="order__form-number order-down"
                  @click="
                    orderUpdate(
                      row,
                      row[row.total_qty ? 'total_qty' : 'total_amount'] - 1
                    )
                  "
                >
                  -
                </div>
              </form>
              <div class="text-xs">
                {{ row.voucher.type == 'quantity' ? 'Stück' : 'Stück' }}
              </div>
            </div>
            <span class="font-medium">{{
              $helpers.convertCurrency(onGetTotal(row))
            }}</span>
            <div class="flex flex-col items-baseline mb-2 gap-3 mt-5">
              <div class="flex items-center">
                <input
                  id="email"
                  v-model="giftType"
                  :disabled="giftType.includes('wallet')"
                  class="form-checkbox checkbox-input"
                  type="checkbox"
                  value="email"
                />
                <label class="ml-2" for="email">Email</label>
              </div>
              <input
                v-if="giftType.includes('email')"
                type="text"
                class="input-field px-3 py-1 text-sm"
                v-model="email"
              />
              <div class="flex items-center">
                <input
                  id="wallet"
                  v-model="giftType"
                  :disabled="
                    giftType.includes('email') || giftType.includes('pdf')
                  "
                  class="form-checkbox checkbox-input"
                  type="checkbox"
                  value="wallet"
                />
                <label class="ml-2" for="wallet">Wallet</label>
              </div>
              <v-select
                v-if="giftType.includes('wallet')"
                class="w-full"
                label="name"
                :filterable="false"
                :options="options"
                @search="onSearch"
                v-model="selected"
              >
                <template v-slot:no-optoins>
                  type to search users..
                </template>
                <template v-slot:option="option">
                  <div class="d-center">
                    {{ option.detail.fullname }}
                  </div>
                </template>
                <template v-slot:selected-option="option">
                  <div class="selected d-center">
                    {{ option.detail.fullname }}
                  </div>
                </template>
              </v-select>
              <div class="flex items-center">
                <input
                  :disabled="giftType.includes('wallet')"
                  id="pdf"
                  v-model="giftType"
                  class="form-checkbox checkbox-input"
                  type="checkbox"
                  value="pdf"
                />
                <label class="ml-2" for="pdf">Ausgedruckt</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header2 from '_components/Headers/Header2';
import VoucherCard from '_components/List/Modules/VoucherList/VoucherDisplay/';
import Button from '_components/Button';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    Header2,
    VoucherCard,
    Button,
    vSelect,
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
      email: '',
      giftType: [],
      options: [],
      selected: null,
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
    };
  },
  watch: {
    async data(newVal) {
      this.totalPrice = 0;
      await this.onGetTotalPrice();
    },
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    AUTH_USER_VOUCHER_WISHLIST() {
      return this.$store.getters.AUTH_USER_VOUCHER_WISHLIST;
    },
  },
  mounted() {
    this.onGetTotalPrice();
  },
  methods: {
    onGetTotalPrice() {
      this.totalPrice = 0;
      if (this.data) {
        this.data.map((row) => {
          this.totalPrice += this.onGetTotal(row);
        });
      }
    },
    onGetTotal(data) {
      let value = data.voucher.type == 'quantity' ? data.qty : data.value;
      let total = value;

      if (data.voucher.type == 'quantity') {
        total = value * data.voucher.price_filter;
      }

      return total;
    },
    async orderUpdate(row, value) {
      // let min= row.voucher.type == 'quantity' ? row.voucher.qty_min : row.voucher.val_min
      // let max= row.voucher.type == 'quantity' ? row.voucher.qty_max : row.voucher.val_max
      // if (value < min || value > max) {
      //   return
      // }
      row[row.total_qty ? 'total_qty' : 'total_amount'] = value;

      row.qty = value;
      row.total_qty = value;
      row.total_amount =
        value *
        (row.voucher.type == 'quantity' ? row.voucher.price_filter : row.value);

      this.totalPrice = 0;
      let form = {
        id: row.id,
        user_id: row.user_id,
        voucher_id: row.voucher_id,
        qty: row.qty,
        value: row.value,
        total_qty: row.total_qty,
        total_value: row.total_value,
        total_amount: row.total_amount,
      };

      const data = await this.$store.dispatch('UPDATE_WALLET', form);
    },
    onSearch(search, loading) {
      if (search.length) {
        loading(true);
        this.search(loading, search, this);
      }
    },
    search: _.debounce((loading, search, vm) => {
      vm.$store
        .dispatch('FETCH_USER_FILTER', {
          role: 'user',
          keyword: search,
        })
        .then((res) => {
          vm.options = res.users;
          loading(false);
        });
    }, 350),
  },
};
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
.order__form input[type='number']::-webkit-inner-spin-button,
.order__form input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.order__form input[type='number'] {
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
.order__form input[type='number']:focus {
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
  font-size: clamp(4px, 2.36vw, 16px) !important;
}
</style>
