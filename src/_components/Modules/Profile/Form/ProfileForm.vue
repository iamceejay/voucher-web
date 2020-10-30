<template>
  <div class="flex flex-col w-full">
    <InputField
      v-if="type == 'seller'"
      id="company_name"
      v-model="form.company.name"
      type="text"
      class="m-2"
      rules="required"
      :errorMessages="errorMessages.company && errorMessages.company.name"
      @input="onChange"
    >
      <template #label_>
        <div class="flex flex-row">
          <Header5
            label="Unternehmensname"
          />
          <div class="tooltip ml-1">
            <i class="fas fa-info-circle text-base text-gray-700" />
            <span class="tooltiptext">
              Teile uns hier deinen Firmennamen mit. Dieser Name wird auch auf der Rechnung bei einem Gutscheinverkauf angeführt. 
            </span>
          </div>
        </div>
      </template>
    </InputField>
    <InputField
      id="username"
      v-model="form.username"
      type="text"
      class="m-2"
      :rules="`required|unique:users,username,${form.id}`"
      :errorMessages="errorMessages.username"
      :disabled="form.id ? true : false"
      @input="onChange"
    >
      <template #label_>
        <div class="flex flex-row">
          <Header5
            label="Name auf Gutschein"
            v-if="type == 'seller'"
          />
          <Header5
            label="Benutzername"
            v-if="type == 'user'"
          />
          <div 
            class="tooltip ml-1"
            v-if="type == 'seller'"
          >
            <i class="fas fa-info-circle text-base text-gray-700" />
            <span class="tooltiptext">
              Wähle einen Wunschnamen als Benutzername. Der Benutzername ist auf dem Gutschein ersichtlich und kann im Nachhinein nicht mehr geändert werden. 
            </span>
          </div>
        </div>
      </template>
    </InputField>
    <div class="flex flex-row">
      <InputField
        id="firstName"
        v-model="form.firstName"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Vorname"
        rules="required"
        :errorMessages="errorMessages.firstName"
        @input="onChange"
      />
      <InputField
        id="lastName"
        v-model="form.lastName"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Nachname"
        rules="required"
        :errorMessages="errorMessages.lastName"
        @input="onChange"
      />
    </div>
    <InputField
      id="address"
      v-model="form.address"
      type="text"
      class="m-2"
      label="Adresse"
      :errorMessages="errorMessages.address"
      @input="onChange"
    />
    <div class="flex flex-row">
      <InputField
        id="city"
        v-model="form.city"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Stadt"
        :errorMessages="errorMessages.city"
        @input="onChange"
      />
      <InputField
        id="zip_code"
        v-model="form.zip_code"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Postleitzahl"
        :errorMessages="errorMessages.zip_code"
        @input="onChange"
      />
    </div>
    <InputField
      id="email"
      v-model="form.email"
      type="text"
      class="m-2"
      label="Emailadresse "
      :rules="`required|email|unique:users,email,${form.id}`"
      :errorMessages="errorMessages.email"
      @input="onChange"
    />
    <InputField
      id="phoneNumber"
      v-model="form.phone_number"
      type="number"
      class="w-full sm:w-1/2 m-2"
      label="Telefonnummer"
      :errorMessages="errorMessages.phone_number"
      rules="required"
      @input="onChange"
    />
    <!-- <InputField
      id="password"
      v-model="form.password"
      type="password"
      class="m-2"
      label="Passwort"
      rules="required|min:8|max:16"
      :errorMessages="errorMessages.password"
      @input="onChange"
    />
    <InputField
      id="confirmPassword"
      v-model="form.confirmPassword"
      type="password"
      class="m-2"
      label="Passwort wiederholen"
      rules="required|min:8|max:16|password:@password"
      :errorMessages="errorMessages.confirmPassword"
      @input="onChange"
    /> -->
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';
  import Header5 from '_components/Headers/Header5';

  export default {
    components: {
      InputField,
      Header5,
    },
    props: {
      type: {
        type: String,
        default: 'user'
      },
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
          id: null,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          zip_code: '',
          phone_number: '',
          // password: '',
          // confirmPassword: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region: '',
            vat_number: ''
          }
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
            ...this.data
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>