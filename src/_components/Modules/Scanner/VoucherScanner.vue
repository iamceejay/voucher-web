<template>
  <div class="flex flex-col self-center">
    <QrcodeStream 
      class="w-full"
      @decode="onDecode" 
      @init="onInit" 
    />
    <InputField
      id="text"
      v-model="voucherForm.qr"
      type="text"
      class="w-full md:w-1/2 m-auto mt-4"
      placeholder="Enter voucher code manually..."
    />
    <Button
      class="py-1 mx-2 justify-center"
      label="Enter voucher code"
      size="m-2 w-full md:w-1/2 py-2"
      variant="info"
      round="rounded-full"
      @onClick="onDecode(voucherForm.qr)"
    />
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
      onDecode (result) {
        console.log('result', result)
        this.voucherForm.qr = result
        this.$emit('onSetVoucher', result)
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