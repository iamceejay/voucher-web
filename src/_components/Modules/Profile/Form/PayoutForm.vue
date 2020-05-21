<template>
  <div class="flex flex-col w-full">
    <InputField
      id="iban"
      v-model="form.iban"
      type="text"
      class="m-2"
      label="IBAN"
      rules="required"
    />
    <InputField
      id="bic"
      v-model="form.bic"
      type="text"
      class="m-2"
      label="BIC"
      rules="required"
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
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>