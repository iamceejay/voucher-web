<template>
  <div class="flex flex-col w-full">
    <InputField
      id="iban"
      type="text"
      class="m-2"
      label="IBAN"
    />
    <InputField
      id="bic"
      type="text"
      class="m-2"
      label="BIC"
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
      };
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>