<template>
  <div class="flex flex-col w-full">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form 
        class="flex flex-col w-full md:w-1/2"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <InputField
          id="payout_schedule"
          v-model="form.payout_schedule"
          type="text"
          class="m-2"
          label="Auszahlungsrythmus (tage)"
          rules="required"
        />
        <InputField
          id="sales_commission_percentage"
          v-model="form.sales_commission_percentage"
          type="text"
          class="m-2"
          label="Kommission in %"
          rules="required"
        />
        <InputField
          id="sales_commission_euro"
          v-model="form.sales_commission_euro"
          type="text"
          class="m-2"
          label="Kommission in €"
          rules="required"
        />
        <InputField
          id="minimum_voucher_value"
          v-model="form.minimum_voucher_value"
          type="text"
          class="m-2"
          label="Mindestgutscheinwert in €"
          rules="required"
        />
        <Button
          type="submit"
          class="py-2"
          label="Speichern"
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
      data: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        form: {
          payout_schedule: '',
          sales_commission_percentage: '',
          sales_commission_euro: '',
          minimum_voucher_value: '',
        }
      }
    },
    watch: {
      data()
      {
        this.onSetData()
      }
    },
    mounted() {
      this.onSetData()
    },
    methods: {
      async onSubmit()
      {
        await this.$emit('onSubmit', this.form)
      },
      onSetData()
      {
        if( this.data ) {
          this.form = this.data
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>