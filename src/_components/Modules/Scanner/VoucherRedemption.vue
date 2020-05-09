<template>
  <div class="flex flex-col self-center w-full">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit(invalid))"
      >
        <InputField
          id="text"
          v-model="voucherForm.value"
          type="text"
          class="w-full md:w-1/2 m-auto mt-4"
          placeholder="Enter value of redemption."
          rules="required"
        />
        <Button
          class="py-1 justify-center"
          label="Redeem voucher"
          size="w-full md:w-1/2 py-2"
          round="rounded-full"
          type="submit"
        />
        <Button
          class="py-1 mt-1 justify-center"
          label="Cancel"
          size="w-full md:w-1/2 py-2"
          round="rounded-full"
          @onClick="$emit('onSetVoucher', null)"
        />
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
  import Button from "_components/Button";
  import InputField from "_components/Form/InputField";

  export default {
    components: {
      Button,
      InputField
    },
    props: [],
    data() {
      return {
        voucherForm: {
          value: ""
        }
      };
    },
    mounted() {},
    methods: {
      onSubmit(invalid) {
        if( !invalid ) {
          this.$swal({
            title: 'Confirm the redemption of the voucher.',
            text: `Value: ${this.voucherForm.value}€`,
            showCancelButton: true,
            confirmButtonColor: '#6C757D',
            cancelButtonColor: '#AF0000',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if(result.value){
              this.$swal({
                icon: 'success',
                title: 'The voucher was redeemed!',
                confirmButtonColor: '#6C757D',
              });
              this.$emit('onSetVoucher', '')
            }   
          });
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>