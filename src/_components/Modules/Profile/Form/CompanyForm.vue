<template>
  <div class="flex flex-col w-full">
    <InputField
      id="username"
      v-model="form.username"
      type="text"
      class="m-2"
<<<<<<< Updated upstream
      label="Benutzername"
=======
>>>>>>> Stashed changes
      :rules="`required|unique:users,username,${form.id}`"
      :errorMessages="errorMessages.username"
      :disabled="form.id ? true : false"
      @input="onChange"
    >
      <template #label_>
        <div class="flex flex-row">
          <Header5
            label="Username"
          />
          <div class="tooltip ml-1">
            <i class="fas fa-info-circle text-base text-gray-700" />
            <span class="tooltiptext">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>
        </div>
      </template>
    </InputField>
    <!-- <InputField
      id="company_name"
      v-model="form.name"
      type="text"
      class="m-2"
      label="Company Name"
      rules="required"
      :errorMessages="errorMessages.name"
      @input="onChange"
    /> -->
    <TextAreaField
      id="text"
      v-model="form.company.description"
      class="m-2"
      label="Beschreibung"
      rules="max:800"
      :errorMessages="errorMessages.description"
      @input="onChange"
    />
    <InputField
      id="company_web_site"
      v-model="form.company.url"
      type="text"
      class="m-2"
<<<<<<< Updated upstream
      label="Webseite"
      rules="required"
=======
      label="Company Website"
>>>>>>> Stashed changes
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
      v-model="form.company.logo"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Logo"
      note="(Ideales Maß ist 250px x 100px)"
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
      @input="onChangeLogo"
    />
    <InputField
      id="vat_number"
      v-model="form.company.vat_number"
      type="text"
      class="m-2"
      label="UID Nummer"
      :errorMessages="errorMessages.vat_number"
      @input="onChange"
    />
    <SelectField
      id="month"
      v-model="form.company.region_id"
      :options="REGIONS"
      class="my-2 px-2"
      label="Region"
      rules="required"
      :errorMessages="errorMessages.region_id"
      @input="onChange"
    />
    <div v-if="GLOBAL_SETTING" class="mt-2 mb-4 text-sm text-center">
      {{
        `Deine Kommission ist ${ settings ? settings.sales_commission_percentage : '5' }% und ${ settings ? $helpers.convertCurrency(settings.sales_commission_euro) : '5,00 €' } pro Verkauf`
      }}
    </div>
  </div>
</template>
<script>
  import SelectField from '_components/Form/SelectField';
  import InputField from '_components/Form/InputField';
  import TextAreaField from '_components/Form/TextAreaField';
  import FileInputField from "_components/Form/FileInputField";
  import Header5 from '_components/Headers/Header5';

  export default {
    components: {
      SelectField,
      InputField,
      TextAreaField,
      FileInputField,
      Header5,
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
        // form: {
        //   username: '',
        //   name: '',
        //   description: '',
        //   url: '',
        //   logo: '',
        //   region: '',
        //   vat_number: ''
        // },
        form: {
          id: null,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          zip_code: '',
          password: '',
          confirmPassword: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region: '',
            vat_number: ''
          }
        },
        settings: null
      }
    },
    computed: {
      REGIONS()
      {
        return this.$store.getters.REGIONS
      },
      GLOBAL_SETTING()
      {
        return this.$store.getters.GLOBAL_SETTING
      },
      USER_SETTING()
      {
        return this.$store.getters.USER_SETTING
      },
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      },
      GLOBAL_SETTING()
      {
        this.onSetSettings()
      },
      USER_SETTING()
      {
        this.onSetSettings()
      },
    },
    mounted() {
      this.onSetForm()
      this.onSetSettings()
    },
    methods: {
      onSetSettings()
      {
        this.settings = this.GLOBAL_SETTING
        if( this.USER_SETTING ) {
          this.settings = this.USER_SETTING
        }
      },
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
            this.form.company.logo = data[0]
            this.logo = reader.result
            this.onChange()
          }
        } else {
          this.logo = ''
          this.form.company.logo = ''
          this.onChange()
        }
      },
      onSetImage(action, value)
      {
        if( action == 'set' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        } else {
          this.form.company.logo = ''
          this.logo = ''
        }
      },
      onSetForm()
      {
        if( this.data?.company ) {
          if( typeof this.data?.company?.logo == 'string'  ) {
            this.logo = this.data.company.logo
          }
          this.form = {
            ...this.form,
            ...this.data,
            company: {
              ...this.form.company,
              ...this.data.company,
            }
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