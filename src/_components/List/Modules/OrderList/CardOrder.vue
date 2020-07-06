<template>
  <div class="flex flex-col m-1 p-3 border border-gray-900 rounded mb-3">
    <div class="flex flex-row">
      <span class="font-semibold text-sm text-gray-900 font-display">{{ data.voucher.title }}</span>
      <span class="ml-auto text-xs text-gray-900 font-semibold font-body">
        {{ `${ !isRedemption ? `OrderID #${ data.order_no ? data.order_no : ''}` : `RevokeID #${ otherData.redemption_no ? otherData.redemption_no : ''}` }` }}
      </span>
    </div>
    <div class="flex flex-row">
      <div class="text-xs text-gray-900 font-body">
        <div v-if="role != 'user'">
          Benutzer: {{ `${data.user.detail.firstName} ${data.user.detail.lastName}` }}
        </div>
        <div>{{ formatDate(data.created_at) }}</div>
        <div class="flex flex-row">
          <div v-if="role == 'user' || isInvoice">
            <a 
              id="link" 
              href="file.txt" 
              download hidden 
            />
            <a 
              href="javascript:void(0)"
              @click="onGenerateInvoice(data)"
            >
              <i class="fas fa-file-invoice text-black text-lg" />
            </a>
          </div>
        </div>
      </div>
      <div class="ml-auto text-xl font-bold font-display">
        {{ `${$helpers.convertCurrency(data.total_amount)}` }}
      </div>
    </div>
    <div class="h-5 w-full flex justify-center">
      <div v-if="data.reversed" class="bg-peach text-white text-xs rounded-full w-32 text-center self-center">
        Order Reversed
      </div>
    </div>
    <Button
      v-if="role == 'seller' && !isInvoice && (!otherData || !otherData.is_revoked)"
      class="py-2 mt-3"
      label="Einlösung rückgängig machen"
      size="w-full py-3"
      round="rounded-full"
      fontSize="text-xs"
      @onClick="onShowModal = true"
    />
    <div v-if="otherData && otherData.is_revoked" class="w-full text-center mt-5 mb-2">
      <div class="text-xs font-bold font-body border border-gray-500 rounded-full py-3">
        Einlösung widerrufen
      </div>
    </div>
    <RevokeVoucherModal
      v-if="otherData"
      :id="otherData.id"
      :onShowModal="onShowModal"
      @onClose="onShowModal = false"
    />
  </div>
</template>
<script>
  import Button from '_components/Button/'
  import RevokeVoucherModal from '_components/Modals/Modules/RevokeVoucherModal'
  import { formatDate } from '_helpers/CustomFunction'

  export default {
    components: {
      Button,
      RevokeVoucherModal,
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        }
      }, otherData: {
        type: Object,
        default() {
          return null
        }
      }, role: {
        type: String,
        default: 'seller'
      }, isInvoice: {
        type: Boolean,
        default: false
      }, isRedemption: {
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