<template>
  <MainLayout>
    <template #content>
      <div class="bg-custom-gray">
        <div
          v-if="!IS_LOADING.status && VOUCHER"
          class="content-container flex flex-col w-full px-4 pt-10"
        >
          <h1 class="font-medium text-xl mx-auto mb-6">
            Warenkorb
          </h1>
          <div
            class="bg-white max-w-3xl mb-12 md:mx-auto px-4 md:px-12 py-12 w-full"
          >
            <div class="flex flex-col w-full">
              <div id="cart-container" class="mx-auto w-full">
                <div
                  class="border-b-2 gap-3 flex flex-col md:grid mb-8 pb-8"
                  style="grid-template-columns: 1fr minmax(0, 1fr);"
                >
                  <div class="relative">
                    <VoucherCard
                      :voucher="VOUCHER"
                      :isFlippable="false"
                      :withQR="false"
                    />
                  </div>
                  <div
                    class="order__form flex flex-col w-full max-w-xs mx-auto"
                  >
                    <div class="flex flex-1 flex-col justify-center">
                      <span class="font-medium mb-2">
                        {{ VOUCHER.title }}
                      </span>
                      <div class="flex flex-col items-baseline mb-2 gap-3">
                        <div class="flex items-center">
                          <input
                            id="email"
                            class="form-radio radio-input"
                            name="gift_type"
                            type="radio"
                            value="email"
                            v-model="type"
                          />
                          <label class="ml-2" for="email">Email</label>
                        </div>
                        <input
                          v-if="type == 'email'"
                          type="text"
                          class="input-field py-1 text-sm"
                        />
                        <div class="flex items-center">
                          <input
                            id="wallet"
                            class="form-radio radio-input"
                            name="gift_type"
                            type="radio"
                            value="wallet"
                            v-model="type"
                          />
                          <label class="ml-2" for="wallet">Wallet</label>
                        </div>
                        <input
                          v-if="type == 'wallet'"
                          type="text"
                          class="input-field py-1 text-sm my-3"
                        />
                        <div class="flex items-center">
                          <input
                            id="pdf"
                            class="form-radio radio-input"
                            name="gift_type"
                            type="radio"
                            value="pdf"
                            v-model="type"
                          />
                          <label class="ml-2" for="pdf">Ausgedruckt</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex items-start justify-end max-w-xl mx-auto">
              <button
                class="px-5 py-3 rounded-md text-sm text-white"
                style="background-color: var(--company-color, #ff5563);"
              >
                Bestellung abgeben
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts';
import VoucherCard from '_components/List/Modules/VoucherList/VoucherDisplay/';

export default {
  components: {
    MainLayout,
    VoucherCard,
  },
  data() {
    return {
      type: null,
    };
  },
  computed: {
    VOUCHER() {
      return this.$store.getters.VOUCHER;
    },
    CARTS() {
      return this.$store.getters.CARTS;
    },
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    months() {
      let filteredMonths = [];
      return this.VOUCHER && this.VOUCHER.valid_date
        ? this.VOUCHER.valid_date
            .filter((date) => {
              let month = date.start.split('-')[1];
              if (filteredMonths.indexOf(month) == -1) {
                filteredMonths.push(month);
                return true;
              }
              return false;
            })
            .map((date) => parseInt(moment(date.start).format('x')))
        : [];
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchVoucher();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onFetchVoucher() {
      try {
        await this.$store.dispatch('FETCH_VOUCHER', {
          id: this.$route.params.id,
        });
        this.symbol = this.VOUCHER.type == 'quantity' ? 'x' : '€';
        if (this.VOUCHER.type == 'quantity') {
          this.form.value = 1;
        }
      } catch (err) {
        console.log('err', err);
      }
    },
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
