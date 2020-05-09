<template>
  <div class="flex flex-wrap">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-full sm:w-1/2 md:w-1/4"
    >
      <div class="flex flex-col m-1 p-3 border border-gray-900 rounded mb-3">
        <div class="flex flex-row">
          <span class="font-semibold text-sm text-gray-900 font-display">{{ row.name }}</span>
          <span class="ml-auto text-xs text-gray-900 font-semibold font-body">{{ `OrderID #${row.orderNo}` }}</span>
        </div>
        <div class="flex flex-row">
          <div class="text-xs text-gray-900 font-body">
            <div>User: {{ row.user }}</div>
            <div>{{ row.date }}</div>
          </div>
          <div class="ml-auto text-xl font-bold font-display">
            {{ (row.type == 'quantity') ? `${ row.quantity }x / ` : '' }}
            €{{ row.value }}
          </div>
        </div>
        <Button
          v-if="role == 'seller'"
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
  import RevokeVoucherModal from '_components/Modals/RevokeVoucherModal'

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
      },
      role: {
        type: String,
        default: 'user'
      }
    },
    data() {
      return {
        onShowModal: false
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>