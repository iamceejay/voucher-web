<template>
  <MainLayout>
    <template #content>
      <div class="-mt-10 bg-custom-gray">
        <div class="content-container flex flex-col w-full px-8">
          <Header title="Gutscheine scannen" />
          <div class="flex flex-wrap justify-between">
            <div class="w-full sm:w-1/2 sm:pr-4 mb-8">
              <div class="bg-white w-full p-6">
                <VoucherScanner
                  v-if="!QR_CODE"
                  :key="`s-${sIndex}`"
                  @onSetVoucher="onSetVoucher"
                />
                <VoucherRedemption
                  v-if="QR_CODE"
                  @onSetVoucher="onSetVoucher"
                />
              </div>
            </div>
            <div class="w-full sm:w-1/2 sm:pl-4 mb-8">
              <div class="bg-white w-full p-6">
                <ScannerUsers v-if="!newUser" @onButtonClick="scannerUserViewToggle" />
                <ScannerUserNew v-if="newUser" @onButtonClick="scannerUserViewToggle" />
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden border">
                  <table class="min-w-full divide-y">
                    <thead class="bg-white">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Gutschein
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
                          Verkaufsdatum
                        </th>
                        <!-- <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Redemption Date
                        </th> -->
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Atuelle Menge/Wert
                        </th>
                        <!-- <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Download
                        </th> -->
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(row, index) in REDEMPTIONS.data" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ row.order.voucher.title }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <button @click="fetchOrderHistory(row)">
                            <span class="text-sm font-bold">{{ row.order.order_no }}</span>
                          </button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ formatDate(row.order.created_at) }}</span>
                        </td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ formatDate(row.created_at) }}</span>
                        </td> -->
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm font-bold" v-if="row.order.voucher.type === 'quantity'">
                            {{ `${Math.floor(parseFloat(row.order.qty))} x` }}
                          </span>
                          <span class="text-sm font-bold" v-else>
                            {{ `${$helpers.convertCurrency(row.order.value)}` }}
                          </span>
                        </td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap flex">
                          <button
                            class="hover:text-peach relative text-sm z-10 ml-5"
                            @click="onDownloadPDF(row)"
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
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div v-if="REDEMPTIONS.data != 0" class="text-center my-8">
            <button
              class="list-pagination"
              :disabled="REDEMPTIONS.current_page === 1"
              @click="onPaginate('prev')"
            >
              <i class="fas fa-chevron-left" />
            </button>
            <span class="mx-8">
              {{ REDEMPTIONS.current_page }} von {{ REDEMPTIONS.last_page }}
            </span>
            <button
              class="list-pagination"
              :disabled="REDEMPTIONS.current_page === REDEMPTIONS.last_page"
              @click="onPaginate('next')"
            >
              <i class="fas fa-chevron-right" />
            </button>
          </div>

        </div>
      </div>

      <Modal :show="modal" @close="modal = false">
        <template>
            <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden border">
                  <table class="min-w-full divide-y">
                    <thead class="bg-white">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Gutschein
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Redemtion #
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Eingelöst am
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Menge/Wert
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" v-if="redemption">
                      <tr v-for="(row, index) in redemption.order.redemptions" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ redemption.order.voucher.title }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-bold">{{ row.redemption_no }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm">{{ formatDate(row.created_at) }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="text-sm font-bold" v-if="redemption.order.voucher.type === 'quantity'">
                            {{ `${Math.floor(parseFloat(row.value))} x` }}
                          </span>
                          <span class="text-sm font-bold" v-else>
                            {{ `${$helpers.convertCurrency(row.value)}` }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap flex">
                          <button
                            class="hover:text-peach relative text-sm z-10 ml-5"
                            @click="onDownloadPDF(redemption)"
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Modal>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherScanner from '_components/Modules/Scanner/VoucherScanner'
  import VoucherRedemption from '_components/Modules/Scanner/VoucherRedemption'
  import Header from '_components/Headers/Seller/Header'
  import ScannerUsers from '_pages/ScannerUsers/'
  import ScannerUserNew from '_pages/ScannerUsers/New/'
  import { formatDate } from '_helpers/CustomFunction'
  import Modal from '_components/Modals/'

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      VoucherScanner,
      VoucherRedemption,
      Header,
      ScannerUsers,
      ScannerUserNew,
      Modal
    },
    data() {
      return {
        modal: false,
        redemption: '',
        sIndex: 0,
        qr: null,
        newUser: false,
        params: {
          page: 1,
          paginate: 9,
          seller_id: null,
          status: 'completed'
        }
      }
    },
    computed: {
      QR_CODE()
      {
        return this.$store.getters.QR_CODE
      },

      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      REDEMPTIONS()
      {
        return this.$store.getters.REDEMPTIONS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_QR_CODE', null)

        try {
          await this.$store.commit('SET_REDEMPTIONS', [])
          this.params.seller_id = this.AUTH_USER.data.id
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onSetVoucher(data)
      {
        try {
          if( data && data !='' ) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('SCAN_QR', {
              url: data
            })
            this.qr = data
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.sIndex = this.sIndex + 1
          }
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if( err?.response?.status == 422 ) {
            this.$swal({
              icon: 'warning',
              title: 'Warnung!',
              text: err.response.data.message,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
          this.sIndex = this.sIndex + 1
        }
      },
      scannerUserViewToggle()
      {
        this.newUser = !this.newUser
      },

      formatDate(date) {
        return formatDate(date);
      },
      async onDownloadPDF(data) {
        console.log(data)
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
          await this.$store.dispatch('DOWNLOAD_REDEMPTION_PDF', {
            redemption: data
          })
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        } catch(err) {
          console.log(err)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        }
      },
      async onPaginate(action)
      {
        let params =
        {
          ...this.params,
          page: (action === "prev") ? this.params.page - 1 : this.params.page + 1
        }
        await this.$store.commit('SET_REDEMPTIONS', [])
        await this.onLoadData(params)
      },
      async onLoadData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data
        }
        await this.onFetchWallets()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_REDEMPTIONS', this.params)

          console.log(data)

          if( data.redemptions.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
      async fetchOrderHistory(redemption) {
        try {
          this.redemption = redemption
          console.log(this.redemption)
          this.modal = true
          // const { data } = await get(`order/${id}`)
        } catch (error) {
          console.log('error', error)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>