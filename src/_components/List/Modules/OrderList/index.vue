<template>
  <div class="flex flex-wrap">
    <div
      v-for="(row, index) in data"
      :key="`stat-${index}`"
      class="w-full sm:w-1/2 md:w-1/4"
    >
      <div class="flex flex-col m-1 py-2 px-3 border rounded">
        <div class="flex flex-row">
          <span class="font-semibold text-xs">{{ row.name }}</span>
          <span class="ml-auto text-xs">{{ `OrderID #${row.orderNo}` }}</span>
        </div>
        <div class="flex flex-row">
          <div class="text-xs">
            <div>User: {{ row.user }}</div>
            <div>{{ row.date }}</div>
          </div>
          <div class="ml-auto text-base font-semibold">
            {{ (row.type == 'quantity') ? `${ row.quantity }x / ` : '' }}
            €{{ row.value }}
          </div>
        </div>
        <Button
          v-if="role == 'seller'"
          class="py-2"
          label="Revoke redemption"
          size="w-full py-1"
          variant="info"
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