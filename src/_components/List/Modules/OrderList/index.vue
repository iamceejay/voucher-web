<template>
  <div>
    <div class="flex flex-wrap">
      <div class="max-w-xl mx-auto w-full" id="cart-container">
      <div
          v-for="(row, index) in data"
          :key="`voucher-${index}`"
          class="border-b-2 gap-3 grid mb-8 pb-8"
          style="grid-template-columns: 1fr minmax(0,190px);"
        >
          <div class="relative">
            <div class="absolute inset-0 z-10"></div>
            <VoucherCard
              :cardId="`voucher-card-${index}`"
              :voucher="row.voucher"
              :order="row"
              :role="role"
            />
          </div>
          <div class="order__form flex flex-col w-full ">
            <span class="text-xs my-8">
              Kaufdatum: {{ formatDate(row.created_at) }}
            </span>
            <span class="font-medium mb-2">
              {{ row.voucher.title }}
            </span>
            <span class="font-medium mb-2">
              {{
                `${
                  row.voucher.type == 'quantity'
                    ? `${row.total_qty} x ${$helpers.convertCurrency(row.voucher.qty_val) }`
                    : $route.name == 'wallet'
                      ? $helpers.convertCurrency(row.value)
                      : `${row.total_qty || 1} x ${$helpers.convertCurrency(parseFloat(row.total_value)) }`}`
              }}
            </span>
            <router-link
              :to="`/vouchers/${row.voucher_id}`"
              class="bg-peach px-5 py-3 rounded-md text-sm text-white w-full mt-6 mb-8 text-center">
              Nochmal kaufen
              </router-link>
            <button
              class="flex hover:text-peach items-center relative text-sm z-10"
              @click="onGenerateInvoice(row)">
              <i class="fa fa-file-download mr-4 text-peach text-xl"></i>
              Rechnung
            </button>

            <span class="text-xs mt-6" v-if="row.reversed">storniert</span>
          </div>
        </div>
        <!-- <div v-if="data.length <= 0" class="py-2 text-lg">
          <span v-if="isCart">Der Warenkorb ist leer </span>
          <span v-else>Keine Daten verfügbar.</span>
        </div> -->
      </div>
      <!-- <div
        v-for="(row, index) in data"
        :key="`stat-${index}`"
        class="w-full sm:w-1/2 md:w-1/4 order-container"
      >
        <CardOrder
          :isInvoice="isInvoice"
          :role="role"
          :data="row"
        />
      </div> -->
      <div v-if="data.length <= 0" class="py-2 text-lg">
        Noch keine Daten vorhanden.
      </div>
    </div>
    <div v-if="withPagination && data.length != 0"
      class="text-center my-8">
      <button
        class="list-pagination"
        :disabled="currentPage === 1"
        @click="onPaginate('prev')">
        <i class="fas fa-chevron-left" />
      </button>
      <span class="mx-8"> {{currentPage}} von {{lastPage}} </span>
      <button
        class="list-pagination"
        :disabled="currentPage === lastPage"
        @click="onPaginate('next')">
        <i class="fas fa-chevron-right" />
      </button>
    </div>
  </div>
</template>
<script>
  import CardOrder from './CardOrder'
  import VoucherCard from '../VoucherList/VoucherDisplay/'
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    components: {
      CardOrder,
      VoucherCard
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }, withPagination: {
        type: Boolean,
        default: false
      }, currentPage: {
        type: Number,
        default: 1
      }, lastPage: {
        type: Number,
        default: 1
      }, role: {
        type: String,
        default: 'seller'
      }, isInvoice: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        onShowModal: false
      }
    },
    mounted() {
    },
    methods: {
      formatDate(date)
      {
        return formatDate(date)
      },
      onPaginate(action)
      {
        this.$emit('onPaginate', action)
      },
      async onGenerateInvoice( data )
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch('DOWNLOAD_INVOICE', {
            order_id: data.id,
            invoice_no: data.customer_invoice.invoice_no
          })
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .order-container {
    min-width: 300px;
  }
</style>