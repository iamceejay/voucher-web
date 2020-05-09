<template>
  <div class="flex flex-col self-center w-full">
    <div class="w-full md:w-1/2 m-auto">
      <QrcodeStream 
        @decode="$emit('onSetVoucher', $event)" 
        @init="onInit" 
      />
    </div>
    
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onDecode(invalid))"
      >
        <InputField
          id="text"
          v-model="voucherForm.qr"
          type="text"
          class="w-full md:w-1/2 m-auto mt-4"
          placeholder="Enter voucher code manually..."
          rules="required"
        />
        <Button
          class="py-1 mt-2 justify-center"
          label="Enter voucher code"
          size="w-full md:w-1/2 py-2"
          variant="info"
          round="rounded-full"
          type="submit"
        />
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
  import Button from '_components/Button';
  import InputField from '_components/Form/InputField'
  import { QrcodeStream } from 'vue-qrcode-reader'

  export default {
    components: {
      Button,
      InputField,
      QrcodeStream,
    },
    props: [],
    data() {
      return {
        voucherForm: {
          qr: ''
        }
      };
    },
    mounted() {
    },
    methods: {
      onDecode ( isValid ) {
        if( !isValid ) {
          this.$emit('onSetVoucher', this.voucherForm.qr)
        }
      },
      async onInit (promise) {
        try {
          await promise
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permisson"
          } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
          } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
          } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
          } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
          }
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>