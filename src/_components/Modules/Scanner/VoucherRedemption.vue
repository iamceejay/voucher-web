<template>
  <div class="flex flex-col self-center w-full">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <InputField
          id="value"
          v-model="form.value"
          type="number"
          class="w-full md:w-1/2 m-auto mt-4"
          :placeholder="`Gib den einzulösenden ${(QR_CODE.order.voucher.type != 'quantity') ? 'Wert' : 'Menge' } an`"
          rules="required|min_value:1"
        />
        <Button
          class="py-1 justify-center"
          label="Gutschein einlösen"
          size="w-full md:w-1/2 py-2"
          round="rounded-full"
          type="submit"
        />
        <Button
          class="py-1 mt-1 justify-center"
          label="Abbrechen"
          size="w-full md:w-1/2 py-2"
          round="rounded-full"
          @onClick="$store.commit('SET_QR_CODE', null)"
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
        this.$swal({
          title: 'Bestätige die Einlösung der Gutscheine.',
          text: `${(this.QR_CODE.order.voucher.type != 'quantity') ? `Wert: ${this.$helpers.convertCurrency(this.form.value)}` : `Menge: x${this.form.value}` }`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('ADD_REDEMPTION', {
                order_id: this.QR_CODE.order_id,
                value: this.form.value,
              })
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Der Gutschein wurde eingelöst',
                confirmButtonColor: '#6C757D',
              });
              await this.$store.commit('SET_QR_CODE', null)
            } catch (err) {
              if( err?.response?.status == 422 ) {
                this.$swal({
                  icon: 'warning',
                  title: 'Warning!',
                  text: err.response.data.message,
                  confirmButtonColor: '#6C757D',
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