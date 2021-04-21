<template>
  <div class="flex flex-col self-center w-full">
    <div class="mb-8">
      <h2>Gutscheincode manuell eingeben</h2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form 
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onDecode)"
        >
          <InputField
            id="text"
            v-model="voucherForm.qr"
            type="text"
            class="w-full mb-5"
            rules="required"
            label="Code"
          />
          <Button
            label="Code bestätigen"
            fontWeight="font-normal"
            size="py-4 px-8"
            round="rounded"
            type="submit"
            :useDefaultFont="false"
          />
        </form>
      </ValidationObserver>
    </div>

    <div>
      <h2>Gutscheincode manuell scannen</h2>
      <div v-if="isShowQR" class="w-full">
        <QrcodeStream 
          :track="true"
          @decode="$emit('onSetVoucher', $event)" 
          @init="onInit"
        />
      </div>
      <Button
        label="Kamera öffnen"
        fontWeight="font-normal"
        size="py-4 px-8"
        round="rounded"
        type="submit"
        :useDefaultFont="false"
        @onClick="() => isShowQR = !isShowQR"
      />
    </div>
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
        isShowQR: false,
        voucherForm: {
          qr: ''
        }
      };
    },
    mounted() {
    },
    methods: {
      onDecode () {
        this.$emit('onSetVoucher', this.voucherForm.qr)
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
  h2 {
    @apply font-semibold text-peach mb-4;
  }
</style>