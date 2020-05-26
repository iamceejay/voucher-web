<template>
  <div class="flex flex-wrap">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-full sm:w-1/2 md:w-1/4 order-container"
    >
      <div class="flex flex-col m-1 p-3 border border-gray-900 rounded mb-3">
        <div class="flex flex-row">
          <span class="font-semibold text-sm text-gray-900 font-display">{{ row.voucher.title }}</span>
          <span class="ml-auto text-xs text-gray-900 font-semibold font-body">{{ `OrderID #${ row.qr ? row.qr.url : ''}` }}</span>
        </div>
        <div class="flex flex-row">
          <div class="text-xs text-gray-900 font-body">
            <div v-if="role != 'user'">
              User: {{ `${row.user.detail.firstName} ${row.user.detail.lastName}` }}
            </div>
            <div>{{ formatDate(row.created_at) }}</div>
            <div v-if="role == 'user' || isInvoice">
              <a 
                id="link" 
                href="file.txt" 
                download hidden 
              />
              <a 
                href="javascript:void(0)"
                @click="onGenerateInvoice()"
              >
                <i class="fas fa-file-invoice text-black text-lg" />
              </a>
            </div>
          </div>
          <div class="ml-auto text-xl font-bold font-display">
            {{ (row.voucher.type == 'quantity') ? `${ row.qty }x / €${row.voucher.price_filter}` : `€${row.value}` }}
          </div>
        </div>
        <Button
          v-if="role == 'seller' && !isInvoice"
          class="py-2 mt-3"
          label="Revoke redemption"
          size="w-full py-3"
          round="rounded-full"
          fontSize="text-xs"
          @onClick="onShowModal = true"
        />
        <RevokeVoucherModal
          :onShowModal="onShowModal"
          @onClose="onShowModal = false"
        />
      </div>
    </div>
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
        type: Array,
        default() {
          return []
        }
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
      onGenerateInvoice()
      {
        let processing = this.$swal({
          title: 'Processing Request',
          text: 'Please wait ...',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          document.getElementById('link').click()
          processing.close()
        }, 2000)
      }
    }
  }
</script>
<style lang="css" scoped>
  .order-container {
    min-width: 300px;
  }
</style>