<template>

    <div class="flex flex-col w-full">
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
        v-if="type == 'seller'"
        id="icon"
        v-model="form.verification_front"
        class="w-full m-2"
        inputContainer="py-1 text-xs w-full md:w-2/5"
        label="Lade jetzt oder später ein Foto von der Vorderseite eines gültigen Ausweises hoch"
        note="(Personalausweis, Führerschein oder Pass. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.)"
        :isMultiple="false"
        accept=".jpeg,.png,.jpg"
        :errorMessages="errorMessages.verification_front"
        @input="(data) => onChangeLogo(data, 'verification_front')"
        />
        <span v-if="type == 'seller'" class="font-bold mb-3 mx-2 text-xs">
          Um die ersten Auszahlungen zu erhalten musst du dich mittels den oben genannten Dokumenten verifizieren.
        </span>

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
        v-if="type == 'seller'"
        id="icon"
        v-model="form.verification_back"
        class="w-full m-2"
        inputContainer="py-1 text-xs w-full md:w-2/5"
        label="Lade jetzt oder spät ein Foto von der Rückseite des gültigen Ausweises hoch "
        note="(Personalausweis, Führerschein oder Pass. Bitte lade eine JPEG oder PNG Datei hoch (keine PDF). Foto sollte im Hochformat und gut lesbar sein.) "
        :isMultiple="false"
        accept=".jpeg,.png,.jpg"
        :errorMessages="errorMessages.verification_back"
        @input="(data) => onChangeLogo(data, 'verification_back')"
        />
        <span v-if="type == 'seller'" class="font-bold mb-3 mx-2 text-xs">
          Um die ersten Auszahlungen zu erhalten musst du dich mittels den oben genannten Dokumenten verifizieren.
        </span>

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
        v-if="type == 'seller'"
        id="icon"
        v-model="form.additional_identity"
        class="w-full m-2"
        inputContainer="py-1 text-xs w-full md:w-2/5"
        label="Lade jetzt oder später ein amtliches Dokument, wo die Adresse deines Unternehmens ersichtlich ist, hoch."
        note="(Firmenbuchauszug oder Gewerbeanmeldung)"
        :isMultiple="false"
        accept=".jpeg,.png,.jpg"
        :errorMessages="errorMessages.additional_identity"
        @input="(data) => onChangeLogo(data, 'additional_identity')"
        />
        <span v-if="type == 'seller'" class="font-bold mb-3 mx-2 text-xs">
          Um die ersten Auszahlungen zu erhalten musst du dich mittels den oben genannten Dokumenten verifizieren.
        </span>
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
