<template>
  <div class="flex flex-col w-full">
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="Company Name"
    />
    <TextAreaField
      id="text"
      class="m-2"
      label="Description"
    />
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="Company Website"
    />
    <InputField
      id="text"
      type="text"
      class="m-2"
      label="VAT Number"
    />
    <SelectField
      id="month"
      class="m-2"
      label="Region"
    />
  </div>
</template>
<script>
  import SelectField from '_components/Form/SelectField';
  import InputField from '_components/Form/InputField';
  import TextAreaField from '_components/Form/TextAreaField';

  export default {
    components: {
      SelectField,
      InputField,
      TextAreaField,
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