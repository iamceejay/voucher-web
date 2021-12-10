<template>
  <ValidationObserver ref="observer" tag="form" @submit.prevent="onSubmit()">
    <div
      class="border-b border-gray-400 flex items-center justify-between pb-5"
    >
      <span class="text-xl font-medium">Gutschein erstellen</span>
      <button
        type="submit"
        class="company-bg-color px-5 py-3 rounded-md text-sm text-white"
      >
        Speichern
      </button>
    </div>
    <div
      class="flex flex-col gap-4 md:grid justify-center md:grid-cols-2 pt-12 w-full"
    >
      <div class="flex flex-col">
        <span class="mb-8 py-3 text-xl">Gutschein Vorschau</span>
        <VoucherCard
          :key="`vform-${formIndex}`"
          :voucher="form"
          :isFlippable="false"
        />
      </div>

      <div class="w-full flex flex-col" style="max-width: 368px">

        <div>
          <!-- Gestaltung -->
          <div class="bg-white flex flex-row flex-wrap w-full p-5 mt-10">
            <InputField
              id="Gutscheintitel"
              v-model="form.title"
              type="text"
              label="Gutscheintitel"
              class="w-full"
              rules="required|max:30"
            />

            <TextAreaField
              id="Kurzbeschreibung"
              v-model="form.description"
              class="w-full"
              label="Kurzbeschreibung"
              tip="Füge hier eine kurze und aussagekräftige Beschreibung der Gutscheinleistungen an. Maximal 120 Zeichen."
              rules="required|max:120"
            />

            <TextAreaField
              id="Ausführliche Beschreibung"
              v-model="form.long_description"
              class="w-full"
              label="Ausführliche Beschreibung"
              tip="Hier hast du die Möglichkeit deine im Gutschein angebotene Leistung detailliert zu beschreiben. Dieser Text erscheint als Zusatzinfo zu deinem Gutschein."
              rules="required|max:500"
              rows="5"
            />

            <div class="flex flex-col w-full">
              <div class="text-sm mb-2">
                Hintergrundbild
                <svg
                  v-tippy
                  class="icon h-4 w-4 mr-2 inline"
                  content="Lade ein Bild hoch und klicke darauf um es zu verschieben. Mit dem darunterliegenden Balken hast du die Möglichkeit das Bild zu vergrößern."
                >
                  <use xlink:href="/icons/sprite.svg#info-circle-fill" />
                </svg>
              </div>
              <label
                class="file input-field px-3 py-2 rounded-sm text-xs mb-3"
                style="background-color: #F7F7F7"
              >
                <i class="fa fa-cloud-upload-alt mr-1"></i> Bild hochladen
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  aria-label="File browser"
                  @change="(e) => croppie(e, 'croppieRef')"
                />
                <span class="file-custom"></span>
              </label>
              <section class="hidden">
                <vue-croppie
                  ref="croppieRef"
                  :enableOrientation="true"
                  :enableResize="false"
                  :boundary="{ width: 328, height: 305 }"
                  :viewport="{ width: 328, height: 305, type: 'square' }"
                  @update="update('croppieRef', 'background_image')"
                />
              </section>
              <!-- the result -->
            </div>

            <span class="font-semibold text-sm mb-1">
              Hintergrundfarbe
              <svg
                v-tippy
                class="icon h-4 w-4 mr-2 inline"
                content="Hier hast du die Möglichkeit die Hintergrundfarbe der Kurzbeschreibung & Kopf- und Fußzeile in deiner Wunschfarbe anzupassen. Wir empfehlen die original Farben deiner Webseite zu verwenden zb. HEX Code."
              >
                <use xlink:href="/icons/sprite.svg#info-circle-fill" />
              </svg>
            </span>
            <colorpicker
              v-model="form.background_description_color"
              :color="form.background_description_color"
              :label="'Kurzbeschreibung'"
            />
            <colorpicker
              v-model="form.header_and_footer_background_color"
              :color="form.header_and_footer_background_color"
              :label="'Kopfzeile & Fußzeile'"
            />

            <div class="border-t my-8 block w-full"></div>

            <span class="font-semibold text-sm mb-1">
              Schriftfarbe
              <svg
                v-tippy
                class="icon h-4 w-4 mr-2 inline"
                content="Hier kannst du die Schriftarten in weiß oder schwarz wählen."
              >
                <use xlink:href="/icons/sprite.svg#info-circle-fill" />
              </svg>
            </span>

            <div
              class="grid grid-cols-3 items-end relative w-full mb-1"
            >
              <label class="text-sm col-span-2">Kurzbeschreibung</label>
              <span>
                <toggle-button
                  :color="{
                    checked: '#000',
                    unchecked: '#fff',
                    disabled: '#CCCCCC',
                  }"
                  :switch-color="{
                    checked: '#fff',
                    unchecked: '#000',
                    disabled: '#CCCCCC',
                  }"
                  :value="form.description_color == '#000' ? true : false"
                  @change="
                    (e) => (form.description_color = e.value ? '#000' : '#fff')
                  "
                />
              </span>
            </div>

            <div class="grid grid-cols-3 items-end relative w-full mb-1">
              <label class="text-sm col-span-2">Kopfzeile & Fußzeile</label>
              <span>
                <toggle-button
                  :color="{
                    checked: '#000',
                    unchecked: '#fff',
                    disabled: '#CCCCCC',
                  }"
                  :switch-color="{
                    checked: '#fff',
                    unchecked: '#000',
                    disabled: '#CCCCCC',
                  }"
                  :value="form.header_and_footer_color == '#000' ? true : false"
                  @change="
                    (e) =>
                      (form.header_and_footer_color = e.value ? '#000' : '#fff')
                  "
                />
              </span>
            </div>

            <div class="border-t my-8 block w-full"></div>

            <span class="text-sm mb-1"
              >Weitere Bilder die im PDF Format deines Gutscheins angezeigt
              werden und Kunden weitere Einblicke in dein Unternehmen geben.
              (Format 4 x 4)</span
            >

            <section class="gap-4 grid grid-cols-3 mt-3">
              <div>
                <span class="block mb-1 text-sm">Bild 1</span>
                <label
                  v-if="!form.image_1"
                  class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs"
                  style="background-color: rgb(247, 247, 247);"
                >
                  <i
                    class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"
                  ></i>
                  Bild hochladen
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="File browser example"
                    @change="(e) => croppie(e, 'image_1')"
                  />
                  <span class="file-custom"></span>
                </label>
                <section v-if="form.image_1_update" class="relative">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_1')"
                  ></i>
                  <img :src="form.image_1" width="99" height="99" />
                </section>
                <section class="relative hidden">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_1')"
                  ></i>
                  <vue-croppie
                    ref="image_1"
                    :enableOrientation="true"
                    :enableResize="false"
                    :boundary="{ width: 99, height: 99 }"
                    :viewport="{ width: 99, height: 99, type: 'square' }"
                    @update="update('image_1', 'image_1')"
                  />
                </section>
              </div>

              <div>
                <span class="block mb-1 text-sm">Bild 2</span>
                <label
                  v-if="!form.image_2"
                  class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs"
                  style="background-color: rgb(247, 247, 247);"
                >
                  <i
                    class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"
                  ></i>
                  Bild hochladen
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="File browser example"
                    @change="(e) => croppie(e, 'image_2')"
                  />
                  <span class="file-custom"></span>
                </label>
                <section v-if="form.image_2_update" class="relative">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_2')"
                  ></i>
                  <img :src="form.image_2" width="99" height="99" />
                </section>
                <section class="hidden relative">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_2')"
                  ></i>
                  <vue-croppie
                    ref="image_2"
                    :enableOrientation="true"
                    :enableResize="false"
                    :boundary="{ width: 99, height: 99 }"
                    :viewport="{ width: 99, height: 99, type: 'square' }"
                    @update="update('image_2', 'image_2')"
                  />
                </section>
              </div>

              <div>
                <span class="block mb-1 text-sm">Bild 3</span>
                <label
                  v-if="!form.image_3"
                  class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs"
                  style="background-color: rgb(247, 247, 247);"
                >
                  <i
                    class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"
                  ></i>
                  Bild hochladen
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="File browser example"
                    @change="(e) => croppie(e, 'image_3')"
                  />
                  <span class="file-custom"></span>
                </label>
                <section v-if="form.image_3_update" class="relative">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_3')"
                  ></i>
                  <img :src="form.image_3" width="99" height="99" />
                </section>
                <section class="hidden relative">
                  <i
                    class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                    @click="(e) => removeImage(e, 'image_3')"
                  ></i>
                  <vue-croppie
                    ref="image_3"
                    :enableOrientation="true"
                    :enableResize="false"
                    :boundary="{ width: 99, height: 99 }"
                    :viewport="{ width: 99, height: 99, type: 'square' }"
                    @update="update('image_3', 'image_3')"
                  />
                </section>
              </div>
            </section>
          </div>
          <!-- End of Gestaltung -->
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import VoucherCard from '_components/List/Modules/VoucherList/VoucherBuyer/';
import Header5 from '_components/Headers/Header5';
import InputField from '_components/Form/InputField';
import CheckboxField from '_components/Form/CheckboxField';
import DatePickerField from '_components/Form/DatePickerField';
import Button from '_components/Button';
import TextAreaField from '_components/Form/TextAreaField';
import SelectField from '_components/Form/SelectField';
import Colorpicker from '_components/Colorpicker';
import MultipleCheckboxField from '_components/Form/MultipleCheckboxField';
import { Chrome } from 'vue-color';
import { ToggleButton } from 'vue-js-toggle-button';
import 'vue2-datepicker/index.css';
import { getWeek } from '_helpers/DefaultValues';
import { toFormData } from '_helpers/CustomFunction';
import moment from 'moment';
import Vue from 'vue';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'; // import the croppie css manually
import DatePicker from 'vue2-datepicker';

Vue.use(VueCroppie);

export default {
  components: {
    Header5,
    Button,
    InputField,
    CheckboxField,
    DatePickerField,
    VoucherCard,
    Chrome,
    ToggleButton,
    TextAreaField,
    TextAreaField,
    SelectField,
    MultipleCheckboxField,
    Colorpicker,
    DatePicker,
  },
  props: {
    data: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isRouteChanged: false,
      isSubmitted: false,
      isWithLimit: false,
      subcategories: [],
      temp_valid_day: [],
      temp_valid_date: [],
      temp_months: [],
      unsure: false,
      formIndex: 0,
      hasFile: false,
      material_color: {
        hex: '#FFF',
        rgba: { r: 255, g: 255, b: 255, a: 255 },
      },
      chrome_color: {
        hex: '#FFF',
        rgba: { r: 255, g: 255, b: 255, a: 255 },
      },
      categories: [],
      form: {
        id: null,
        category: '',
        subcategory: '',
        target: '',
        season: '',
        voucher_category_id: null,
        seller_id: null,
        title: '',
        description: '',
        long_description: '',
        background_aid: 'transparent',
        background_color: '#fff',
        background_description_color: '#ff5563',
        background_description_personal_color: '#ff5563',
        header_and_footer_background_color: '#fff',
        description_color: '#fff',
        personal_description_color: '#fff',
        header_and_footer_color: '#000',
        text_color: 'dark',
        background_image: '',
        image_1: '',
        image_2: '',
        image_3: '',
        tax: [],
        valid_day: [],
        valid_date: [],
        type: 'value',
        min: null,
        max: null,
        expiry_date: null,
        qty_val: 0,
        qty_min: 0,
        qty_max: 0,
        val_min: 0,
        val_max: 0,
        remove_bg: false,
        seller: null,
        months: [],
        isReserve: false,
        price_hidden: false,
      },
      week: getWeek,
      background_image: null,
      chunk_voucher_img: [],
      taxes: [],
      expiry: [],
      valid_date_start: null,
      valid_date_end: null,
      valid_date: [],
      target_group: [
        'Paare',
        'Freunde',
        'Kinder',
        'Frauen',
        'Männer',
        'Senioren',
        'Alle',
      ],
      seasons: ['Sommer', 'Winter', 'Schönwetter', 'Schlechtwetter', 'Immer'],
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    CATEGORIES() {
      return this.$store.getters.CATEGORIES;
    },
    SUBCATEGORIES() {
      let selectCategory = this.CATEGORIES.find(
        (category) => category.id == this.form.category
      );
      return selectCategory.subcategories;
    },
    USER_SETTING() {
      return this.$store.getters.USER_SETTING;
    },
    isFormDirty() {
      return Object.keys(this.$refs.observer.fields).some(
        (key) => this.$refs.observer.fields[key].dirty
      );
    },
  },
  watch: {
    data(newVal) {
      console.log('data');
      this.onSetForm();
    },
    isWithLimit(val) {
      if (val) {
        this.form.valid_day = [...this.temp_valid_day];
        this.form.valid_date = [...this.temp_valid_date];
        this.form.months = [...this.temp_months];
      } else {
        this.temp_valid_day = [...this.form.valid_day];
        this.temp_valid_date = [...this.form.valid_date];
        this.temp_months = [...this.form.months];
        this.form.valid_day = [];
        this.form.valid_date = [];
        this.form.months = [];
      }
    },
  },
  beforeMount() {
    this.onSetForm();
    this.categories = this.CATEGORIES.map((row) => {
      return {
        id: row.id,
        label: row.name,
      };
    });
    this.onSetTax();
    this.onSetExpiry();

    document.body.classList.add('voucher-builder-page');
  },
  methods: {
    handleSetSubcategories(id) {
      this.$nextTick(() => {
        console.log('click');
        this.subcategories = [];
        let selectCategory = this.CATEGORIES.find(
          (category) => category.id == id
        );
        this.subcategories = selectCategory.subcategories;
      });
    },
    async onSubmit() {
      try {
        const isValid = await this.$refs.observer.validate();

        if (!isValid) {
          let errors = [];
          for (const [key, value] of Object.entries(
            this.$refs.observer.errors
          )) {
            if (value.length) {
              errors.push(key);
            }
          }

          this.$swal({
            icon: 'warning',
            title: 'Dieses Feld muss ausgefüllt werden!',
            text: errors.toString(),
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          });
          return false;
        }
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });

        this.form.valid_date = [];
        let x;
        for (x = 0; x < this.form.expiry_date; x++) {
          let map = this.form.months.map((date) => {
            return {
              start: moment(date)
                .add(x, 'y')
                .format('YYYY-MM-DD'),
              end: moment(date)
                .add(x, 'y')
                .endOf('month')
                .format('YYYY-MM-DD'),
            };
          });
          this.form.valid_date = [...this.form.valid_date, ...map];
        }

        this.form.seller_id = this.AUTH_USER.data.id;
        this.form.voucher_category_id = this.form.category.id;
        this.form.type = 'buyer'

        const url = this.form.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER';

        const { voucher } = await this.$store.dispatch(url, this.form);

        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });

        if (!this.isRouteChanged) {
          this.isSubmitted = true;
          this.$router.push('/wallet');
        }

        return true;
      } catch (err) {
        console.log('err', err);

        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
        if (err?.response?.data?.message) {
          this.$swal({
            icon: 'warning',
            title: 'Warnung!',
            text: err.response.data.message,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          });
        }
        return false;
      }
    },
    async onUploadVoucherImg(id, random) {
      let tempForm = {
        id,
        attachment: this.chunk_voucher_img[0],
        is_last: this.chunk_voucher_img.length == 1 ? 1 : 0,
        file_name: `${random}-${this.background_image.name}`,
      };
      await this.$store.dispatch('UPLOAD_BG_IMG_VOUCHER', tempForm);
      this.chunk_voucher_img.shift();
    },
    onGetChunk(file) {
      let size = 999950;
      let chunks = Math.ceil(file.size / size);
      let temp_chunk = [];

      for (let i = 0; i < chunks; i++) {
        temp_chunk.push(
          file.slice(i * size, Math.min(i * size + size, file.size), file.type)
        );
      }
      return temp_chunk;
    },
    onUnsure(value) {
      this.unsure = value;
      if (value) {
        this.form.tax = ['unsure'];
      } else {
        this.form.tax = [];
      }
    },
    onChangeTextColor(e) {
      this.form.text_color = e.value ? 'dark' : 'light';
    },
    onChangeType(e) {
      this.form.type = e.value ? 'quantity' : 'value';
    },
    // onChangeTax(data)
    // {
    //   const value = {
    //     id: this.form.tax.length + 1,
    //     ...data[0]
    //   }
    //   this.form.tax = [
    //     ...this.form.tax,
    //     value
    //   ]
    // },
    onPickColor({ rgba, hex }, type) {
      if (type == 'background_aid') {
        this.form.background_aid = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
      } else {
        this.form.background_color = hex;
      }
    },
    onSetTax() {
      this.taxes = [
        {
          tax: '0',
          label: '0%',
          value: null,
        },
        {
          tax: '5',
          label: '5%',
          value: null,
        },
        {
          tax: '10',
          label: '10%',
          value: null,
        },
        {
          tax: '13',
          label: '13%',
          value: null,
        },
        {
          tax: '20',
          label: '20%',
          value: null,
        },
      ];
    },
    onSetExpiry() {
      let expiry = [];
      for (let i = 4; i <= 10; i++) {
        expiry = [...expiry, i];
        this.expiry = expiry;
      }
    },
    onActionTax(action, index = null) {
      if (action === 'add') {
        this.form.tax.push({
          tax: '0',
          label: '0%',
          value: null,
        });
      } else {
        this.form.tax = this.form.tax.filter((row, i) => i != index);
        if (this.form.tax.length == 1) {
          this.form.tax[0].value = null;
        }
      }
    },
    onActionDate(action, index = null) {
      if (action === 'add') {
        this.form.months.push('');
      } else if (action === 'change') {
        this.form.months = [...new Set(this.form.months)].sort();
      } else {
        this.form.months = this.form.months.filter((date, i) => i != index);
      }
      this.$forceUpdate();
    },
    onSetForm() {
      if (this.AUTH_USER.isAuth) {
        this.form.seller = this.AUTH_USER.data;
      }
      if (this.data?.id) {
        if (this.data.valid_day || this.data.valid_date) {
          this.isWithLimit = true;
        }

        if (this.data.data_json != null) {
          this.form = this.data.data_json;
          this.form.image_1_update = this.form.image_1 ? true : false;
          this.form.image_2_update = this.form.image_2 ? true : false;
          this.form.image_3_update = this.form.image_3 ? true : false;
          this.form.valid_date = this.data.valid_date || [];
          this.form.valid_day = this.data.valid_day || [];
          this.form.category = this.data.voucher_category.id;
          this.form.seller = this.data.seller;
          this.subcategories = [];
          let selectCategory = this.CATEGORIES.find(
            (category) => category.id == this.data.voucher_category.id
          );
          this.subcategories = selectCategory.subcategories;
          let filteredMonths = [];
          this.form.months = this.data.valid_date
            ? this.data.valid_date
                .filter((date) => {
                  let month = date.start.split('-')[1];
                  if (filteredMonths.indexOf(month) == -1) {
                    filteredMonths.push(month);
                    return true;
                  }
                  return false;
                })
                .map((date) => parseInt(moment(date.start).format('x')))
            : [];

          this.temp_valid_day = [...this.form.valid_day];
          this.temp_valid_date = [...this.form.valid_date];
          this.temp_months = [...this.form.months];

          this.form.id =
            this.$route.name == 'vouchers-update'
              ? this.$route.params.id
              : null;
        } else {
          this.form = {
            id: this.data.id,
            title: this.data.title,
            description: this.data.description,
            min:
              this.data.type == 'quantity'
                ? this.data.qty_min
                : this.data.val_min,
            max:
              this.data.type == 'quantity'
                ? this.data.qty_max
                : this.data.val_max,
            qty_val: this.data.qty_val,
            valid_date: this.data.valid_date || [],
            valid_day: this.data.valid_day || [],
            tax: this.data.tax || [],
            type: this.data.type,
            category: this.data.voucher_category.id,
            text_color: this.data.text_color,
            background_color: this.data.background_color,
            background_aid: this.data.background_aid,
            background_image: this.data.background_image,
            seller: this.AUTH_USER.data,
            background_description_color: '#ff5563',
            background_description_personal_color: '#ff5563',
            header_and_footer_background_color: '#fff',
            description_color: '#fff',
            personal_description_color: '#fff',
            header_and_footer_color: '#000',
          };
          date = this.data.valid_date ? this.data.valid_date[0].start : null;
          this.valid_date_end = this.data.valid_date
            ? this.data.valid_date[0].end
            : null;
        }
        this.formIndex = this.formIndex + 1;
      }
    },
    onResetForm() {
      this.form = {
        id: null,
        voucher_category_id: null,
        seller_id: null,
        title: '',
        description: '',
        background_color: '#fff',
        background_aid: 'transparent',
        text_color: 'dark',
        background_image: '',
        valid_day: [],
        valid_date: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          },
        ],
        type: 'value',
        min: 0,
        max: 0,
        qty_val: 0,
        qty_min: 0,
        qty_max: 0,
        val_min: 0,
        val_max: 0,
      };
    },
    croppie(e, ref) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      if (files[0].size > 1000000) {
        this.$swal({
            title: 'Achtung: Fotos zu groß!',
            html: 'Damit du deinen Gutschein speichern kannst, musst du die Größe deiner Fotos reduzieren.' +
            '<div class="my-5 text-2xl">Hierzu empfehlen wir <b><a href="https://www.resizepixel.com/de" target="_blank">das Tool</a></b>.</div>'
            + 'Dort kannst du das Foto komprimieren. Maximale Fotogröße ist <b>1 MB.</b>',
            confirmButtonColor: '#EA5666',
            confirmButtonText: 'Okay',
          });

        return;
      }

      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs[ref].$vnode.elm.parentElement.classList.remove('hidden');
        this.$refs[ref].bind({
          url: e.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
    },
    // CALBACK USAGE
    crop(ref, form) {
      // Here we are getting the result via callback function
      // and set the result to this.cropped which is being
      // used to display the result above.
      let size =
        form == 'background_image'
          ? { width: 730, height: 676.34 }
          : { width: 300, height: 300 };
      let options = {
        type: 'base64',
        format: 'jpeg',
        size: size,
        quality: 0.7,
      };
      this.$refs[ref].result(options, (output) => {
        this.form[form] = output;
      });
    },
    update(ref, form) {
      this.crop(ref, form);
    },
    removeImage(e, form) {
      e.target.parentElement.classList.add('hidden');
      this.form[form] = '';
      this.form[form + '_update'] = false;
    },
  },
};
</script>
<style lang="css" scoped>
.vc-material {
  height: unset !important;
  width: 100%;
  border-radius: 8px !important;
}
input[type='file'] {
  display: none;
}
</style>
<style lang="css">
.grid-block-wrapper {
  background: #fff;
}
.vue-file-agent .file-preview-new svg {
  margin: 20px 40px !important;
  height: 50% !important;
}
.vue-file-agent .file-preview-new:before {
  background: #fff !important;
}
div.vue-file-agent.file-input-wrapper {
  border: 0 !important;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.16);
}
.v-switch-core {
  border: 1px solid black;
}
.voucher-builder-page .mx-calendar-header {
  display: none !important;
}
</style>
