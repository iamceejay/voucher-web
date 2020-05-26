<template>
  <div class="flex flex-col w-full">
    <InputField
      id="iban"
      v-model="form.iban"
      type="text"
      class="m-2"
      label="IBAN"
      :errorMessages="errorMessages.lastName"
      @input="onChange"
    />
    <InputField
      id="bic"
      v-model="form.bic"
      type="text"
      class="m-2"
      label="BIC"
      :errorMessages="errorMessages.lastName"
      @input="onChange"
    />
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';

  export default {
    components: {
      InputField,
    },
    props: {
      errorMessages: {
        type: Array,
        default() {
          return []
        }
      },
      data: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        form: {
          iban: '',
          bic: ''
        }
      }
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      }
    },
    mounted() {
      this.onSetForm()
    },
    methods: {
      onChange()
      {
        this.$emit('onChange', this.form)
      },
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            iban: this.data.iban,
            bic: this.data.bic
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>