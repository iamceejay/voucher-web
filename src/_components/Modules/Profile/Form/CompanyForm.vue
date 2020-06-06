<template>
  <div class="flex flex-col w-full">
    <InputField
      id="company_name"
      v-model="form.name"
      type="text"
      class="m-2"
      label="Company Name"
      rules="required"
      :errorMessages="errorMessages.name"
      @input="onChange"
    />
    <TextAreaField
      id="text"
      v-model="form.description"
      class="m-2"
      label="Description"
      rules="max:800"
      :errorMessages="errorMessages.description"
      @input="onChange"
    />
    <InputField
      id="company_web_site"
      v-model="form.url"
      type="text"
      class="m-2"
      label="Company Website"
      rules="required"
      :errorMessages="errorMessages.url"
      @input="onChange"
    />
    <div 
      v-if="logo && logo != ''" 
      class="flex w-full mx-2 company-logo"
    >
      <img 
        style="width: 100%; height: auto;"
        :src="onSetImage('set', logo)" 
        alt=""
      />
    </div>
    <FileInputField
      id="icon"
      v-model="form.logo"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Company Logo"
      note="(Note: Based fit is 250px x 100px)"
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
      @input="onChangeLogo"
    />
    <SelectField
      id="month"
      v-model="form.region_id"
      :options="REGIONS"
      class="m-2"
      label="Region"
      rules="required"
      :errorMessages="errorMessages.region_id"
      @input="onChange"
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
        logo: '',
        form: {
          name: '',
          description: '',
          url: '',
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
      onChangeLogo(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0]);
          reader.onload = () => {
            this.form.logo = data[0]
            this.logo = reader.result
            this.onChange()
          }
        } else {
          this.logo = ''
          this.form.logo = ''
          this.onChange()
        }
      },
      onSetImage(action, value)
      {
        if( action == 'set' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        } else {
          this.form.logo = ''
          this.logo = ''
        }
      },
      onSetForm()
      {
        if( this.data?.company ) {
          if( typeof this.data?.company?.logo == 'string' ) {
            this.logo = this.data.company.logo
          }
          this.form = {
            ...this.form,
            ...this.data.company
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .company-logo {
    width: 250px;
    height: 100px;
    border: 1px solid #ccc;
  }
</style>