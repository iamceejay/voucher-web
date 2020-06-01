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
          label="Payout schedule (days)"
          rules="required"
        />
        <InputField
          id="sales_commission_percentage"
          v-model="form.sales_commission_percentage"
          type="text"
          class="m-2"
          label="Sales Commission in %"
          rules="required"
        />
        <InputField
          id="sales_commission_euro"
          v-model="form.sales_commission_euro"
          type="text"
          class="m-2"
          label="Sales Commission in €"
          rules="required"
        />
        <InputField
          id="minimum_voucher_value"
          v-model="form.minimum_voucher_value"
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
        try {
          const url = this.form.id ? 'UPDATE_GLOBAL_SETTING' : 'ADD_GLOBAL_SETTING'
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch(url, this.form)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Saving the settings.',
            confirmButtonColor: '#6C757D',
          })
        } catch (err) {
          
        }
      },
      onSetData()
      {
        console.log('this.data', this.data)
        if( this.data ) {
          this.form = this.data
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>