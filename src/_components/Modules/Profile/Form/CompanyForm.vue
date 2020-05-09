<template>
  <div class="flex flex-col w-full">
    <InputField
      id="company_name"
      v-model="profileForm.companyName"
      type="text"
      class="m-2"
      label="Company Name"
      rules="required"
    />
    <TextAreaField
      id="text"
      class="m-2"
      label="Description"
    />
    <InputField
      id="company_web_site"
      type="text"
      class="m-2"
      label="Company Website"
    />
    <InputField
      id="vat_no"
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
        profileForm: {
          companyName: '',
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