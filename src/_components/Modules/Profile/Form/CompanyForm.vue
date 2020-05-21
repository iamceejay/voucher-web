<template>
  <div class="flex flex-col w-full">
    <InputField
      id="company_name"
      v-model="form.name"
      type="text"
      class="m-2"
      label="Company Name"
      rules="required"
    />
    <TextAreaField
      id="text"
      v-model="form.description"
      class="m-2"
      label="Description"
      rules="max:254"
    />
    <InputField
      id="company_web_site"
      v-model="form.companyWebSite"
      type="text"
      class="m-2"
      label="Company Website"
      rules="required"
    />
    <FileInputField
      id="icon"
      v-model="form.logo"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Company Logo"
      rules="required"
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
    />
    <SelectField
      id="month"
      v-model="form.region"
      :options="REGIONS"
      class="m-2"
      label="Region"
      rules="required"
    />
  </div>
</template>
<script>
  import SelectField from '_components/Form/SelectField';
  import InputField from '_components/Form/InputField';
  import TextAreaField from '_components/Form/TextAreaField';
  import FileInputField from "_components/Form/FileInputField";

  export default {
    components: {
      SelectField,
      InputField,
      TextAreaField,
      FileInputField,
    },
    props: {
    },
    data() {
      return {
        form: {
          name: '',
          description: '',
          companyWebSite: '',
          logo: '',
          region: '',
        }
      }
    },
    computed: {
      REGIONS()
      {
        return this.$store.getters.REGIONS
      }
    },
    mounted() {
    },
    methods: {
      onChangeBgImg(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            // this.voucherForm.bgImage = reader.result
          }
        } else {
          // this.voucherForm.bgImage = ''
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>