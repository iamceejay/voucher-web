<template>

    <div class="flex flex-col w-full">
      <span class="block font-semibold text-sm mb-4">Bitte gib den Namen und das Geburtsdatum vom Inhaber oder Geschäftsführer des Unternehmens an.</span>
      <InputField
        id="firstName"
        v-model="form.firstName"
        type="text"
        class="w-full mb-4"
        label="Vorname"
        rules="required"
        :errorMessages="errorMessages.firstName"
        @input="onChange"
      />
      <InputField
        id="lastName"
        v-model="form.lastName"
        type="text"
        class="w-full mb-4"
        label="Nachname"
        rules="required"
        :errorMessages="errorMessages.lastName"
        @input="onChange"
      />
      <DatePicker
        v-if="type == 'seller'"
        id="data"
        class="mb-4"
        v-model="form.bday"
        label="Geburtsdatum"
        :errorMessages="errorMessages.phone_number"
        rules="required"
        @input="onChange"
      />
      <span class="block font-semibold text-sm mb-4">Um die ersten Auszahlungen zu erhalten musst du dich mittels den genannten Dokumenten verifizieren.</span>
               <span class="block text-sm mb-4">(Personalausweis, Führerschein oder Pass. Und ein amtliches Dokument mit der Adresse des Unternehmens zb. Firmenbuchauszug oder Anmeldung. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.)</span>
      <div class="gap-4 md:grid grid-cols-3">
        <div class="mb-4">
          <div
            v-if="verification_front && verification_front != ''"
            class="flex max-w-xs mx-2 w-full"
          >
            <img
              style="width: 100%; height: auto;"
              :src="onSetImage('set', verification_front)"
              alt=""
            />
          </div>
          <div
            v-if="!verification_front"
            class="flex mx-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image mx-auto" viewBox="0 0 16 16" style="width: 150px; height: 150px;">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
            </svg>
          </div>
          <SellerUploadFile
            v-if="type == 'seller'"
            id="icon"
            v-model="form.verification_front"
            class="w-full m-2"
            inputContainer="py-1 text-xs w-full"
            label="Vorderseite eines gültigen Ausweise"
            note=""
            :isMultiple="false"
            accept=".jpeg,.png,.jpg"
            rules="required"
            :errorMessages="errorMessages.verification_front"
            @input="(data) => onChangeLogo(data, 'verification_front')"
          />
        </div>
        <div class="mb-4">
          <div
            v-if="verification_back && verification_back != ''"
            class="flex max-w-xs mx-2 w-full"
          >
            <img
              style="width: 100%; height: auto;"
              :src="onSetImage('set', verification_back)"
              alt=""
            />
          </div>
          <div
            v-if="!verification_back"
            class="flex mx-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image mx-auto" viewBox="0 0 16 16" style="width: 150px; height: 150px;">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
            </svg>
          </div>
          <SellerUploadFile
            v-if="type == 'seller'"
            id="icon"
            v-model="form.verification_back"
            class="w-full m-2"
            inputContainer="py-1 text-xs w-full"
            label="Rückseite des gültigen Ausweises"
            note=""
            :isMultiple="false"
            accept=".jpeg,.png,.jpg"
            rules="required"
            :errorMessages="errorMessages.verification_back"
            @input="(data) => onChangeLogo(data, 'verification_back')"
          />
        </div>
        <div class="mb-4">
          <div
            v-if="additional_identity && additional_identity != ''"
            class="flex max-w-xs mx-2 w-full"
          >
            <img
              style="width: 100%; height: auto;"
              :src="onSetImage('set', additional_identity)"
              alt=""
            />
          </div>
          <div
            v-if="!additional_identity"
            class="flex mx-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image mx-auto" viewBox="0 0 16 16" style="width: 150px; height: 150px;">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
            </svg>
          </div>
          <SellerUploadFile
            v-if="type == 'seller'"
            id="icon"
            v-model="form.additional_identity"
            class="w-full m-2"
            inputContainer="py-1 text-xs w-full"
            label="Amtliches Dokument mit Adresse deines Unternehmens"
            note=""
            :isMultiple="false"
            accept=".jpeg,.png,.jpg"
            rules="required"
            :errorMessages="errorMessages.additional_identity"
            @input="(data) => onChangeLogo(data, 'additional_identity')"
          />
        </div>
      </div>
    </div>
</template>
<script>
import InputField from '_components/Form/InputField';
import Header5 from '_components/Headers/Header5';
import DatePicker from '_components/Form/DatePickerField';
import FileInputField from '_components/Form/FileInputField';
import SellerUploadFile from '_components/Form/SellerUploadFile';

export default {
  components: {
    InputField,
    Header5,
    DatePicker,
    FileInputField,
    SellerUploadFile
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
  data() {
    return {
      verification_front: '',
      verification_back: '',
      additional_identity: '',
      form: {
        verification_front: '',
        verification_back: '',
        additional_identity: '',
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
