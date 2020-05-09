<template>
  <Modal 
    :show="onShowModal" 
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center">
        Revoke redemption
      </div>
      <InputField
        id="text"
        v-model="value"
        type="text"
        class="w-full md:w-1/2 m-auto mt-4"
        placeholder="Enter value to put back on voucher"
      />
      <Button
        class="pt-1 mt-2 mx-2 justify-center"
        label="Revoke voucher"
        size="mt-1 w-full md:w-1/2 py-2"
        variant="info"
        round="rounded-full"
        @onClick="onRevoke()"
      />
    </template>
  </Modal>
</template>
<script>
  import Button from '_components/Button/'
  import InputField from "_components/Form/InputField";
  import Modal from '_components/Modals/'

  export default {
    components: {
      InputField,
      Button,
      Modal,
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      onShowModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: ''
      }
    },
    mounted() {
    },
    methods: {
      onRevoke()
      {
        if( this.value != '' ) {
          this.$emit('onClose')
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>