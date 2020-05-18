<template>
  <div class="flex flex-col w-full">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="flex flex-col w-full md:w-1/2"
        @submit.prevent="handleSubmit(onSubmit(invalid))"
      >
        <InputField
          id="days"
          v-model="payoutForm.days"
          type="text"
          class="m-2"
          label="Payout schedule (days)"
          rules="required"
        />
        <InputField
          id="commisionPercent"
          v-model="payoutForm.commisionPercent"
          type="text"
          class="m-2"
          label="Sales Commission in %"
          rules="required"
        />
        <InputField
          id="commisionDollar"
          v-model="payoutForm.commisionDollar"
          type="text"
          class="m-2"
          label="Sales Commission in €"
          rules="required"
        />
        <InputField
          id="voucherMin"
          v-model="payoutForm.voucherMin"
          type="text"
          class="m-2"
          label="Minimum Voucher Value in €"
          rules="required"
        />
        <Button
          type="submit"
          class="py-2"
          label="Save"
          size="w-full py-3"
          round="rounded-full"
          fontSize="text-sm"
        />
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button'

  export default {
    components: {
      InputField,
      Button,
    },
    props: {
    },
    data() {
      return {
        payoutForm: {
          days: '',
          commisionPercent: '',
          commisionDollar: '',
          voucherMin: '',
        }
      }
    },
    mounted() {
    },
    methods: {
      onSubmit( invalid )
      {
        if( !invalid ) {
          let processing = this.$swal({
            title: 'Processing Request',
            text: 'Please wait ...',
            allowOutsideClick: false,
            showConfirmButton: false
          })
          setTimeout( () => {
            this.payoutForm = {
              days: '',
              commisionPercent: '',
              commisionDollar: '',
              voucherMin: '',
            }
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Saving the settings.',
              confirmButtonColor: '#6C757D',
            })
          }, 2000)
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>