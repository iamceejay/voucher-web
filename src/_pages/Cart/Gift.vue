<template>
  <MainLayout title="Weiter shoppen">
    <template #content>
      <div class="bg-custom-gray">
        <div
          v-if="!IS_LOADING.status"
          class="content-container flex flex-col w-full px-4 pt-10"
        >
          <h1 class="font-medium text-xl mx-auto mb-6">Warenkorb</h1>
          <div
            class="bg-white max-w-2xl mb-12 md:mx-auto px-4 md:px-12 py-12 w-full"
          >
            <CartGiftList
              v-if="WALLETS && WALLETS.length >= 0"
              class="mb-3"
              :role="AUTH_USER.role.name"
              :data="WALLETS"
              @onDelete="onDelete"
              ref="gift"
            />
            <div
              class="bg-white flex items-start justify-between max-w-xl mx-auto"
            >
              <div class="flex flex-col items-baseline justify-center">
                <span class="text-sm ">Gesamt</span>
                <span class="font-medium text-4xl">{{
                  $helpers.convertCurrency(totalAmount)
                }}</span>
              </div>
              <button
                @click="handleSubmit()"
                class="px-5 py-3 rounded-md text-sm text-white"
                style="background-color: var(--company-color, #ff5563);"
                :class="{ 'opacity-50': !WALLETS.length }"
                :disabled="!WALLETS.length"
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
import Header1 from '_components/Headers/Header1';
import CartGiftList from '_components/List/Modules/CartList/Gift';

export default {
  components: {
    MainLayout,
    Header1,
    CartGiftList,
  },
  data() {
    return {
      role: null,
      search: '',
      totalPrice: 0,
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    WALLETS() {
      return this.$store.getters.WALLETS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    COUNT_CART() {
      return this.$store.getters.COUNT_CART;
    },
    totalAmount() {
      let total = 0;
      if (this.WALLETS) {
        this.WALLETS.map((data) => {
          let value =
            data.voucher.type == 'quantity' ? data.qty : data.value * data.qty;
          let vouchTotal = value;

          if (data.voucher.type == 'quantity') {
            vouchTotal = value * data.voucher.price_filter;
          }

          total = total + vouchTotal;
        });
      }

      return total;
    },
  },
  watch: {
    watch: {
      async WALLETS(newVal) {
        this.totalPrice = 0;
        await this.onGetTotalPrice();
      },
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_WALLETS', []);
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchWallets();
        await this.onGetTotalPrice();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
        if (this.$route.query?.status == 'failed') {
          this.$swal({
            icon: 'warning',
            // title: 'Erfolgreich!',
            text: `Zahlung wurde abgebrochen. Bitte versuche es erneut oder wähle eine andere Zahlungsmethode.`,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          });
        }
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onFetchWallets() {
      await this.$store.dispatch('FETCH_WALLETS', {
        user_id: this.AUTH_USER.data ? this.AUTH_USER.data.id : null,
        status: 'pending',
        order_id: this.$route.params.id,
      });
    },
    async onDelete(data) {
      await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
      await this.$store.dispatch('DELETE_WALLET', data);
      await this.$store.commit('SET_COUNT_CART', this.COUNT_CART - 1);
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      this.$swal({
        icon: 'success',
        title: 'Aus dem Warenkorb entfernt!',
        text: 'Der Gutschein wurde soeben entfernt.',
        confirmButtonColor: '#48BB78',
        confirmButtonText: 'Bestätigen',
      });
    },
    onGetTotalPrice() {
      if (this.WALLETS) {
        this.WALLETS.map((row) => {
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
    handleSubmit() {
      console.log(this.$refs.gift);
    },
  },
};
</script>
<style lang="css" scoped></style>
