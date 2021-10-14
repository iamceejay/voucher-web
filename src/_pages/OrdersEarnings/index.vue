<template>
  <MainLayout>
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="content-container flex flex-col w-full px-8"
      >
        <!-- <div class="w-full flex flex-col mb-5">
          <Header1
            label="Umsatz"
          />
          <StatisticList
            :data="earnings"
          />
        </div> -->
        <div class="w-full flex flex-col mb-5">
          <div class="border-b-2 font-medium mb-8 pb-2 text-2xl w-full">
            Bestellungen
          </div>
          <span class="text-sm font-semibold mb-8"
            >Rechnungen aus einem bestimmten Zeitraum herunterladen</span
          >
          <div class="flex space-x-4 mb-8">
            <DatePicker
              class=""
              id="date_csv_from"
              inputClass="input-field  pl-8 py-2 rounded-sm text-sm"
              format="DD-MM-YYYY"
              type="date"
              placeholder="von: TT.MM.JJJ"
              valueType="format"
              v-model="date1"
            />
            <DatePicker
              class=""
              id="date_csv_to"
              inputClass="input-field  pl-8 py-2 rounded-sm text-sm"
              format="DD-MM-YYYY"
              type="date"
              placeholder="bis: TT.MM.JJJ"
              valueType="format"
              v-model="date2"
            />
            <button
              class="company-bg-color px-5 py-2 rounded-md text-sm text-white"
              v-bind:disabled="!date1 || !date2"
              @click="downloadInvoicesZip()"
            >
              PDF herunterladen
            </button>
          </div>
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
              >
                <div class="overflow-hidden border">
                  <table class="min-w-full divide-y">
                    <thead class="bg-white">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Kanal
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Bestellnummer
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Datum
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Summe
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Rechnung
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(row, index) in WALLETS.data" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span v-if="row.channel == 'subdomain'" class="text-sm">epasnets Website</span>
                          <span v-else class="text-sm">epasnets Marktplatz</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ row.voucher.title }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ row.order_no }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{
                            formatDate(row.created_at)
                          }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{
                            row.reversed
                              ? 'storniert'
                              : $helpers.convertCurrency(
                                  parseFloat(row.total_amount)
                                )
                          }}</span>
                          <!-- <span class="text-sm">{{ $helpers.convertCurrency(onGetTotal(row)) }}</span> -->
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap flex">
                          <button
                            class=" hover:text-peach relative text-sm z-10 ml-5"
                            @click="onGenerateInvoice(row)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="w-6 h-6 mx-auto text-peach"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"
                              />
                              <path
                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <!-- More items... -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div v-if="WALLETS.data != 0" class="text-center my-8">
            <button
              class="list-pagination"
              :disabled="WALLETS.current_page === 1"
              @click="onPaginate('prev')"
            >
              <i class="fas fa-chevron-left" />
            </button>
            <span class="mx-8">
              {{ WALLETS.current_page }} von {{ WALLETS.last_page }}
            </span>
            <button
              class="list-pagination"
              :disabled="WALLETS.current_page === WALLETS.last_page"
              @click="onPaginate('next')"
            >
              <i class="fas fa-chevron-right" />
            </button>
          </div>
          <!-- <OrderList
            :isInvoice="true"
            :data="WALLETS.data"
            :withPagination="true"
            :currentPage="WALLETS.current_page"
            :lastPage="WALLETS.last_page"
            @onPaginate="onPaginate($event)"
          /> -->
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts';
import OrderList from '_components/List/Modules/OrderList/';
import StatisticList from '_components/List/Modules/StatisticList/';
import Header1 from '_components/Headers/Header1';
import Orders from '_components/Modules/OrdersEarnings/Orders';
import { formatDate } from '_helpers/CustomFunction';
import DatePicker from 'vue2-datepicker';

export default {
  name: 'Dashboard',
  components: {
    MainLayout,
    OrderList,
    StatisticList,
    Header1,
    DatePicker,
  },
  data() {
    return {
      submitting: false,
      earnings: [],
      date1: null,
      date2: null,
      params: {
        page: 1,
        paginate: 9,
        seller_id: null,
        status: 'completed',
      },
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
    // IS_LOAD_MORE()
    // {
    //   return this.$store.getters.IS_LOAD_MORE
    // },
  },
  // watch: {
  //   async IS_LOAD_MORE(newVal)
  //   {
  //     if( newVal ) {
  //       await this.onLoadData({
  //         ...this.params,
  //         page: this.params.page + 1
  //       })
  //       await this.$store.commit('SET_IS_LOAD_MORE', false)
  //     }
  //   },
  // },
  beforeMount() {
    document.body.classList.remove('voucher-builder-page');
  },
  mounted() {
    (async () => {
      try {
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_WALLETS', []);
        this.params.seller_id = this.AUTH_USER.data.id;
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchWallets();
        await this.onFetchWalletStat();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  beforeDestroy() {
    (async () => {
      await this.$store.commit('SET_IS_INFINITE_LOAD', false);
    })();
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    onGetTotal(data) {
      let value = data.voucher.type == 'quantity' ? data.qty : data.value;
      let total = value;

      if (data.voucher.type == 'quantity') {
        total = value * data.voucher.price_filter;
      }

      return total;
    },
    async onGenerateInvoice(data) {
      try {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
        await this.$store.dispatch('DOWNLOAD_INVOICE', {
          order_id: data.id,
          invoice_no: data.customer_invoice.invoice_no,
        });
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
      }
    },
    async onPaginate(action) {
      let params = {
        ...this.params,
        page: action === 'prev' ? this.params.page - 1 : this.params.page + 1,
      };
      await this.$store.commit('SET_WALLETS', []);
      await this.onLoadData(params);
    },
    onSetEarnings({
      voucher_total,
      total_earnings,
      total_earnings_with_commission,
      waiting_for_payout,
      days_until_next_payout,
      payout_every,
      total_seller_earnings,
    }) {
      this.earnings = [
        {
          type: 'Gutscheine',
          title: 'gesamt verkauft',
          value: voucher_total,
        },
        {
          type: 'Auszahlung',
          title: 'gesamt',
          value: `${this.$helpers.convertCurrency(total_seller_earnings)}`,
          extra: {
            title: 'Kommission:',
            value: `${this.$helpers.convertCurrency(
              total_earnings_with_commission
            )}`,
            help_text: 'inklusive 20% MwSt.',
          },
        },
        {
          type: 'Auszahlung',
          title: 'Wartend',
          value: `${this.$helpers.convertCurrency(waiting_for_payout)}`,
        },
        {
          type: 'Tage',
          title: 'bis zur nächsten Auszahlung',
          value: days_until_next_payout,
          extra: {
            title: 'Auszahlung:',
            value: `alle ${payout_every} Tage`,
          },
        },
      ];
    },
    async onLoadData(data) {
      await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
      this.params = {
        ...this.params,
        ...data,
      };
      await this.onFetchWallets();
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
    },
    async onFetchWallets() {
      try {
        const data = await this.$store.dispatch('FETCH_WALLETS', this.params);
        if (data.orders.next_page_url == null) {
          await this.$store.commit('SET_IS_INFINITE_LOAD', false);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchWalletStat() {
      try {
        const data = await this.$store.dispatch('FETCH_WALLET_STAT', {
          seller_id: this.AUTH_USER.data.id,
          with_stat: true,
          status: 'completed',
        });
        await this.onSetEarnings(data);
      } catch (err) {
        console.log('err', err);
      }
    },
    async downloadInvoicesZip() {
      try {
        const payload = {
          from: this.date1,
          to: this.date2,
          download: 'zip',
          seller_id: this.AUTH_USER.data.id
        };

        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });

        await this.$store.dispatch('DOWNLOAD_BUYER_INVOICES_PDF', payload);

        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });

        this.$swal({
          icon: 'success',
          title: 'Erfolgreich',
          text: 'Downloading all the invoices.',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'Bestätigen',
        });
      } catch (err) {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        console.log('err', err);
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
