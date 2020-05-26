<template>
  <div class="flex flex-col w-full">
    <InputField
      id="iban"
      v-model="form.iban"
      type="text"
      class="m-2"
      label="IBAN"
      rules="required"
      :errorMessages="errorMessages.lastName"
      @input="onChange"
    />
    <InputField
      id="bic"
      v-model="form.bic"
      type="text"
      class="m-2"
      label="BIC"
      rules="required"
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
    mounted() {
    },
    methods: {
      onChange()
      {
        this.$emit('onChange', this.form)
      }
    }
  }
</script>
<style lang="css" scoped>
</style>