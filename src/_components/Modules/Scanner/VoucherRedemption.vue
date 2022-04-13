<template>
  <div class="flex flex-col self-center w-full">
    <h2 class="font-semibold text-peach mb-4">
      Gutschein einlösen
    </h2>

    <span class="mt-3 text-md">Details des Gutscheins</span>
    <span class="font-semibold text-peach text-2xl">
      {{ QR_CODE.voucher.title }}
    </span>
    <span
      v-if="QR_CODE.voucher.type == 'quantity'"
      class="mb-6 font-semibold"
    >
      1x {{ $helpers.convertCurrency(QR_CODE.user_voucher.order.total_amount / QR_CODE.user_voucher.order.total_qty) }}
    </span>
    <span
      v-else
      class="mb-6 font-semibold"
    >
    {{ $helpers.convertCurrency(QR_CODE.user_voucher.order.value) }}
    </span>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <!-- :placeholder="`Enter the ${(QR_CODE.user_voucher.voucher.type != 'quantity') ? 'value' : 'quantity' } of redemption`" -->
        <InputField
          id="value"
          v-model="form.value"
          type="number"
          class="w-full mb-5"
          :label="QR_CODE.voucher.type != 'quantity' ? 'Gib den einzulösenden Wert an' : 'Gib die einzulösende Menge an'"
          rules="required|min_value:1"
        />
        <div class="flex flex-wrap">
          <Button
            class="mr-4"
            label="Bestätigen"
            fontWeight="font-normal"
            size="py-4 px-8"
            round="rounded"
            type="submit"
          />
          <Button
            label="Abbrechen"
            fontWeight="font-normal"
            size="py-4 px-8"
            round="rounded"
            @onClick="$store.commit('SET_QR_CODE', null)"
          />
        </div>
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
        form: {
          value: null
        }
      };
    },
    computed: {
      QR_CODE()
      {
        return this.$store.getters.QR_CODE
      },
    },
    mounted() {},
    methods: {
      async onSubmit() {
        //  text: `${(this.QR_CODE.user_voucher.voucher.type != 'quantity') ? `Value: ${this.$helpers.convertCurrency(this.form.value)}` : `Quantity: x${this.form.value}` }`,
        this.$swal({
          title: 'Bestätige die Einlösung des Gutscheins.',
          text: `${(this.QR_CODE.voucher.type != 'quantity') ? `Wert: ${this.$helpers.convertCurrency(this.form.value)}` : `Menge: ${this.form.value}x` }`,
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              //  order_id: this.QR_CODE.order_id,
              await this.$store.dispatch('ADD_REDEMPTION', {
                order_id: this.QR_CODE.user_voucher_id,
                value: this.form.value,
              })
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Der Gutschein wurde eingelöst',
                confirmButtonColor: '#48BB78',
                confirmButtonText: 'Bestätigen'
              });
              await this.$store.commit('SET_QR_CODE', null)
            } catch (err) {
              if( err?.response?.status == 422 ) {
                this.$swal({
                  icon: 'warning',
                  title: 'Warnung!',
                  text: err.response.data.message,
                  confirmButtonColor: '#48BB78',
                  confirmButtonText: 'Bestätigen'
                })
              }
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            }
          }
        })
      }
    }
  }
</script>
<style lang="css" scoped>
</style>