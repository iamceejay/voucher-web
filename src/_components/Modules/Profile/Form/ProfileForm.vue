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
          <Header5 label="Unternehmensname" />
          <div class="tooltip ml-1">
            <i
              v-tippy
              class="fas fa-info-circle text-base text-gray-700"
              content="Teile uns hier deinen Firmennamen mit. Dieser Name wird auch auf der Rechnung bei einem Gutscheinverkauf angeführt."
            />
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
          <Header5 v-if="type == 'seller'" label="Name auf Gutschein" />
          <Header5 v-if="type == 'user'" label="Benutzername" />
          <div v-if="type == 'seller'" class="tooltip ml-1">
            <i
              v-tippy
              class="fas fa-info-circle text-base text-gray-700"
              content="Wähle einen Wunschnamen als Benutzername. Der Benutzername ist auf dem Gutschein ersichtlich und kann im Nachhinein nicht mehr geändert werden."
            />
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
    <span v-if="type == 'seller'" class="mb-3 mx-2 text-sm">
      Bitte gib den Namen vom Inhaber oder Geschäftsführer des Unternehmens an.
    </span>
    <DatePicker
      v-if="type == 'seller'"
      id="data"
      v-model="form.bday"
      label="Geburtsdatum vom Inhaber oder Geschäftsführer des Unternehmens"
      class="m-2"
      :errorMessages="errorMessages.phone_number"
      @input="onChange"
    />
    <InputField
      v-if="type == 'seller'"
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
      v-if="type == 'seller'"
      id="phoneNumber"
      v-model="form.phone_number"
      type="number"
      class="w-full sm:w-1/2 m-2"
      label="Telefonnummer"
      :errorMessages="errorMessages.phone_number"
      rules="required"
      @input="onChange"
    />
    <div
      v-if="verification_front && verification_front != ''"
      class="company-logo flex max-w-xs mx-2 w-full"
    >
      <img
        style="width: 100%; height: auto;"
        :src="onSetImage('set', verification_front)"
        alt=""
      />
    </div>
    <FileInputField
      v-if="type == 'seller' && AUTH_USER.isAuth"
      id="icon"
      v-model="form.verification_front"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Lade jetzt oder später ein Foto von der Vorderseite eines gültigen Ausweises hoch"
      note="(Personalausweis, Führerschein oder Pass. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.)"
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
      rules="required"
      :errorMessages="errorMessages.verification_front"
      @input="(data) => onChangeLogo(data, 'verification_front')"
    />

    <div
      v-if="verification_back && verification_back != ''"
      class="company-logo flex max-w-xs mx-2 w-full"
    >
      <img
        style="width: 100%; height: auto;"
        :src="onSetImage('set', verification_back)"
        alt=""
      />
    </div>
    <FileInputField
      v-if="type == 'seller' && AUTH_USER.isAuth"
      id="icon"
      v-model="form.verification_back"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Lade jetzt oder spät ein Foto von der Rückseite des gültigen Ausweises hoch "
      note="(Personalausweis, Führerschein oder Pass. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.) "
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
      rules="required"
      :errorMessages="errorMessages.verification_back"
      @input="(data) => onChangeLogo(data, 'verification_back')"
    />

    <div
      v-if="additional_identity && additional_identity != ''"
      class="company-logo flex max-w-xs mx-2 w-full"
    >
      <img
        style="width: 100%; height: auto;"
        :src="onSetImage('set', additional_identity)"
        alt=""
      />
    </div>
    <FileInputField
      v-if="type == 'seller' && AUTH_USER.isAuth"
      id="icon"
      v-model="form.additional_identity"
      class="w-full m-2"
      inputContainer="py-1 text-xs w-full md:w-2/5"
      label="Lade jetzt oder später ein amtliches Dokument, wo die Adresse deines Unternehmens ersichtlich ist, hoch."
      note="(Firmenbuchauszug oder Gewerbeanmeldung)"
      :isMultiple="false"
      accept=".jpeg,.png,.jpg"
      rules="required"
      :errorMessages="errorMessages.additional_identity"
      @input="(data) => onChangeLogo(data, 'additional_identity')"
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
import DatePicker from '_components/Form/DatePickerField';
import FileInputField from '_components/Form/FileInputField';

export default {
  components: {
    InputField,
    Header5,
    DatePicker,
    FileInputField,
  },
  props: {
    type: {
      type: String,
      default: 'user',
    },
    errorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  computed: {
    AUTH_USER()
    {
      return this.$store.getters.AUTH_USER
    },
  },
  data() {
    return {
      verification_front: '',
      verification_back: '',
      additional_identity: '',
      form: {
        id: null,
        username: '',
        firstName: '',
        lastName: '',
        bday: '',
        email: '',
        address: '',
        city: '',
        zip_code: '',
        phone_number: '',
        verification_front: '',
        verification_back: '',
        additional_identity: '',
        // password: '',
        // confirmPassword: '',
        company: {
          name: '',
          description: '',
          url: '',
          logo: '',
          region: '',
          vat_number: '',
        },
      },
    };
  },
  watch: {
    data(newVal) {
      this.onSetForm();
    },
  },
  mounted() {
    this.onSetForm();
    this.verification_front = this.form.verification_front
    this.verification_back = this.form.verification_back
    this.additional_identity = this.form.additional_identity
  },
  methods: {
    onChange() {
      this.$emit('onChange', this.form);
    },
    onSetForm() {
      if (this.data) {
        this.form = {
          ...this.form,
          ...this.data,
        };
      }
    },
    onChangeLogo(data, field) {
      console.log(field);
      if (data.length > 0) {
        let reader = new FileReader();
        reader.readAsDataURL(data[0]);
        reader.onload = () => {
          this.form[field] = data[0];
          this[field] = reader.result;
          this.onChange();
        };
      } else {
        this[field] = '';
        this.onChange();
      }
    },
    onSetImage(action, value) {
      if (action == 'set') {
        return value.search('base64') < 0
          ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
          : value;
      } else {
        this.form.verification_front = '';
        this.logo = '';
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
