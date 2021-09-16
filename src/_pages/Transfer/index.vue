<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <div
          class="bg-white border-2 border-dashed border-peach flex flex-col max-w-sm mx-auto my-20 p-8 rounded-md w-full"
        >
          <div class="font-medium text-center text-peach">{{ message }}</div>
          <div class="mt-8">
            <VoucherCard
              v-if="voucher"
              :cardId="`voucher-card-${voucher.id}`"
              :voucher="voucher.order.voucher"
              :order="voucher.order"
              :userVoucher="voucher"
              role="user"
            />
          </div>

          <section class="flex flex-col w-full mt-4">
            <span v-if="voucher" class="font-medium mb-1">{{
              voucher.order.voucher.title
            }}</span>
            <span v-if="voucher" class="font-medium">1 x 50 €</span>

            <button
              class="company-bg-color px-5 py-3 rounded-md text-sm text-white mt-6"
              @click="$router.push(`/wallet`)"
            >
              Weiter zu meiner Wallet
            </button>
          </section>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherDisplay/'

export default {
  components: {
    MainLayout,
    VoucherCard,
  },
  data() {
    return {
      voucher: '',
      message: '',
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
  },
  mounted() {
    (async () => {
      if (!this.AUTH_USER.isAuth) {
        this.$swal({
          icon: 'warning',
          title: 'Anmelden und Geschenk erhalten!',
          text:
            'Erstell dir einfach einen Account bei epasnets oder logge dich ein, um den Gutschein zu erhalten.',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'Bestätigen',
        }).then(async (result) => {
          if (result.value) {
            this.$router.push('/login');
          }
        });
      } else {
        await this.onTransferringWallet();
      }
    })();
  },
  methods: {
    async onTransferringWallet() {
      try {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
        let data = await this.$store.dispatch('TRANSFERRING_WALLET', {
          id: this.$route.params.id,
        });

        this.voucher = data.voucher;
        this.message = data.message;

        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      } catch (err) {
        this.message = err.response.data.message;
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      }
    },
    getCustomVoucher(row) {
      console.log(row);
      if (!row.order.voucher.data_json) {
        return row.order.voucher;
      }

        row.order.voucher.data_json = row.data_json;
        // row.order.voucher.data_json.price_hidden = row.price_hidden ? true : false
        return row.order.voucher
      },
    }
  }
</script>
<style lang="css" scoped></style>
