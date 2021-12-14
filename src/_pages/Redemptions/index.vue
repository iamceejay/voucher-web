<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Eingelöst"
        />

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
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-peach"
                      >
                        Order Number
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-peach"
                      >
                        Sales Date
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
                        Actual Amount / Qty
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-peach"
                      >
                        Seller
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-semibold text-peach"
                      >
                        Buyer
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
                      <td class="px-6 py-4 whitespace-nowrap flex">
                        <span class="relative text-sm z-10 ml-5 font-bold" v-if="row.order.voucher.type === 'quantity'">
                          {{ `${Math.floor(parseFloat(row.order.qty))} x` }}
                        </span>
                        <span class="relative text-sm z-10 ml-5 font-bold" v-else>
                          {{ `${$helpers.convertCurrency(row.order.value)}` }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm">{{ row.order.voucher.seller.username }}</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm">{{ row.order.user.username }}</span>
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
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Redemtion Number
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Redemption Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-sm font-semibold text-peach"
                        >
                          Amount / Qty
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
  import Button from '_components/Button';
  import MainLayout from '_layouts';
  import RedemptionList from '_components/List/Modules/RedemptionList'
  import Header1 from '_components/Headers/Header1';
  import { formatDate } from '_helpers/CustomFunction';
  import Modal from '_components/Modals/'

  export default {
    components: {
      MainLayout,
      RedemptionList,
      Header1,
      Modal
    },
    props: [],

    data() {
      return {
        modal: false,
        redemption: '',
        submitting: false,
        earnings: [],
        params: {
          page: 1,
          paginate: 9,
          seller_id: null,
          status: 'completed'
        }
      }
    },
    computed: {
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
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
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
<style lang="css" scoped>
</style>