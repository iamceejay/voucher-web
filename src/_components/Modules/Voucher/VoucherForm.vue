<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          :key="`vform-${formIndex}`"
          :voucher="form"
          :isFlippable="false"
        />
        <div class="text-center font-bold font-body">
          Live Vorschau
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
          Wähle eine Hintergrundfarbe oder lade ein Foto im Hochformat hoch
        </div>
        <div class="flex flex-row flex-wrap w-full">
          <!-- <div class="w-full md:w-1/2 mb-5">
            <span class="font-semibold text-sm font-display text-gray-700 mx-2">
              Hintergrundfarbe
            </span>
            <div class="w-full sm:w-1/2 md:mx-2 mt-2">
              <Material
                v-model="material_color"
                @input="onPickColor($event, 'background_color')"
              />
            </div>
          </div> -->
          <div class="w-full sm:w-1/2 md:px-2 mt-2 mb-5">
            <div class="flex flex-row">
              <Header5
                label="Lesehilfe"
              />
              <div class="tooltip ml-1">
                <i class="fas fa-info-circle text-base text-gray-700" content="Hier kannst du eine Farbe über deinen Gutschein legen und die Transparenz auswählen, dass dein Gutschein richtig gut aussieht und einfacher zu lesen ist. " v-tippy/>
                <!-- <span class="tooltiptext">
                  Hier kannst du eine Farbe über deinen Gutschein legen und die Transparenz auswählen, dass dein Gutschein richtig gut aussieht und einfacher zu lesen ist.
                </span> -->
              </div>
            </div>
            <div class="w-full sm:w-1/2 md:mx-2 mt-2">
              <Chrome
                v-model="chrome_color"
                @input="onPickColor($event, 'background_aid')"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 mb-5">
            <span class="font-semibold text-sm font-display text-gray-700 mx-2">
              Hintergrundbild
            </span>
            <div class="font-semibold text-xs font-display text-gray-700 mx-2">
              Foto darf nicht größer als <span class="text-red-600">10mb</span> sein
            </div>
            <Button
              v-if="form && form.id && form.background_image != ''"
              class="mt-2 mx-2"
              label="Ändern / Entfernen"
              fontSize="text-xs"
              size="w-32 py-1"
              round="rounded-full"
              @onClick="onRemoveBg"
            />
            <VueFileAgent
              v-else
              ref="vueFileAgent"
              class="mt-2 mx-2"
              :theme="'grid'"
              :multiple="false"
              :deletable="true"
              :meta="true"
              :accept="'image/*'"
              :maxSize="'10MB'"
              :helpText="' '"
              :errorText="{
                type: 'Invalid file type. Only images or zip Allowed',
                size: 'Files should not exceed 10MB in size',
              }"
              @select="onChangeBgImg($event)"
              @delete="onChangeBgImg($event)"
            />
          </div>

          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button
              :value="(form.text_color == 'dark') ? true : false"
              @change="onChangeTextColor"
            />
            <span class="ml-2 font-semibold text-sm font-display text-gray-700">Heller / Dunkler Text</span>
          </div>
          <div class="w-full">
            <InputField
              id="title"
              v-model="form.title"
              type="text"
              class="px-2 w-full md:w-1/2"
              placeholder="Titel des Gutscheins"
              rules="required|max:30"
            />
            <TextAreaField
              id="description"
              v-model="form.description"
              class="px-2 w-full md:w-1/2"
              placeholder="Beschreibung des Gutscheins"
              rules="required|max:250"
            />
            <div class="flex flex-col w-full">
              <SelectField
                id="taxes"
                v-model="form.tax"
                class="px-2 py-1 w-full md:w-1/2"
                placeholder="Steuersatz auswählen"
                :options="taxes"
                :multiple="true"
                :containerClass="(form.id) ? '' : 'mb-5'"
                :disabled="unsure ? true : false"
                :isHideInput="(unsure || form.id) ? true : false"
                :rules="(unsure || form.id) ? '' : 'required'"
              >
                <template #label_>
                  <div class="flex flex-row">
                    <Header5
                      label="Anfallende MwSt."
                    />
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base text-gray-700" content=' Wähle einen oder mehrere Steuersätze, welche für die im Gutschein enthaltenen Leistungen anfallen. Falls der Steuersatz für die im Gutschein inkludierte Leistung noch nicht festgestellt werden kann, markiere bitte das Kästchen "Steuersatz kann noch nicht festgestellt werden".' v-tippy/>
                      <!-- <span class="tooltiptext">
                        Wähle einen oder mehrere Steuersätze, welche für die im Gutschein enthaltenen Leistungen anfallen. Falls der Steuersatz für die im Gutschein inkludierte Leistung noch nicht festgestellt werden kann, markiere bitte das Kästchen "Steuersatz kann noch nicht festgestellt werden".
                      </span> -->
                    </div>
                  </div>
                </template>
                <template #note_>
                  <CheckboxField
                    :checked="form.tax && ((form.tax.length <= 0 && form.id) || (form.tax.length > 0 && form.tax[0] == 'unsure'))"
                    :disabled="form.id"
                    container="mb-0"
                    labelSentence="Steuersatz kann noch nicht festgestellt werden"
                    @input="onUnsure"
                  />
                </template>
              </SelectField>
              <div v-if="form.tax && form.tax.length > 0 && form.tax[0] != 'unsure'" class="flex flex-col w-full">
                <div class="px-2 font-semibold text-xs font-display text-gray-700 flex flex-row w-full md:w-1/2">
                  Ausgewählter Steuersatz
                </div>
                <div
                  v-for="(row, index) in form.tax"
                  :key="`tax-${index}`"
                  class="flex flex-row w-full md:w-1/2"
                >
                  <InputField
                    :id="`t-label-${index}`"
                    :value="form.tax[index].label"
                    type="text"
                    class="px-2 w-1/3"
                    inputContainer="py-1"
                    placeholder="Steuer kann nicht festgestellt werden"
                    :disabled="true"
                  />
                  <InputField
                    :id="`t-value-${index}`"
                    v-model="form.tax[index].value"
                    type="number"
                    class="px-2 w-7/12"
                    inputContainer="py-1"
                    placeholder="Betrag der Steuer in €"
                    :rules="`${ (form.tax.length <= 1) ? '' : 'required' }`"
                    :disabled="(form.tax.length > 1 && !form.id) ? false : true"
                  />
                  <a
                    v-if="!form.id"
                    href="javascript:void(0)"
                    class="flex mt-4 w-1/12 justify-center"
                    @click="onActionTax('delete', index)"
                  >
                    <i class="fas fa-trash text-red-900 text-base" />
                  </a>
                </div>
              </div>
            </div>
            <SelectField
              id="category"
              v-model="form.category"
              class="px-2 py-1 w-full md:w-1/2"
              label="Kategorie"
              :options="categories"
              rules="required"
            />
            <div class="flex flex-col w-full px-2">
              <CheckboxField
                v-model="isWithLimit"
                label="Ist der Gutschein nur zu bestimmten Zeiten oder an gewissen Tagen gültig?"
                container="mb-0"
                labelSentence="Wenn ja, dann klicke hier."
              />
            </div>
            <div v-if="isWithLimit" class="flex flex-col w-full px-2">
              <MultipleCheckboxField
                class="mx-2"
                name="valid_day"
                :options="week"
                :data="form.valid_day"
                @onChange="form.valid_day = $event"
              >
                <template #label_>
                  <div class="flex flex-row">
                    <Header5
                      label="Nur gültig an diesen Tagen"
                    />
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base text-gray-700" content="Bitte nur bestimmte Tage auswählen, wenn der Gutschein nicht an allen Tagen gültig sein soll."  v-tippy/>
                      <!-- <span class="tooltiptext">
                        Bitte nur bestimmte Tage auswählen, wenn der Gutschein nicht an allen Tagen gültig sein soll.
                      </span> -->
                    </div>
                  </div>
                </template>
              </MultipleCheckboxField>
              <div class="w-full md:w-1/2 mb-5 mx-2">
                <div class="flex flex-row">
                  <label class="font-semibold text-sm font-display text-gray-700">
                    Nur gültig im Zeitraum von … bis …
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base" content="Bitte nur bestimmte Zeiträume auswählen, wenn der Gutschein nicht durchgehend gültig sein soll. Achtung: die Gültigkeitsperioden müssen bis zum Verfallsdatum wiederkehrend (jährlich) bestehen." v-tippy/>
                      <!-- <span class="tooltiptext">
                        Bitte nur bestimmte Zeiträume auswählen, wenn der Gutschein nicht durchgehend gültig sein soll. Achtung: die Gültigkeitsperioden müssen bis zum Verfallsdatum wiederkehrend (jährlich) bestehen.
                      </span> -->
                    </div>
                    <a
                      v-if="form.valid_date.length < 4"
                      href="javascript:void(0)"
                      class="ml-2"
                      @click="onActionDate('add')"
                    >
                      <i class="fas fa-plus-circle text-base text-black" />
                    </a>
                  </label>
                </div>
                <div
                  v-for="(date, index) in form.valid_date"
                  :key="`date-${index}`"
                  class="flex flex-col"
                >
                  <div class="flex flex-row">
                    <div class="flex flex-row w-11/12">
                      <DatePickerField
                        v-model="form.valid_date[index].start"
                        class="m-1 w-1/2"
                        container=""
                        rules="required"
                        placeholder="Startdatum"
                        @input="onActionDate('change', index)"
                      />
                      <DatePickerField
                        v-model="form.valid_date[index].end"
                        class="m-1 w-1/2"
                        container=""
                        rules="required"
                        placeholder="Enddatum"
                        :errorMessages="[form.valid_date[index].error]"
                        @input="onActionDate('change', index)"
                      />
                    </div>
                    <a
                      href="javascript:void(0)"
                      class="flex mt-6 w-1/12 justify-center"
                      @click="onActionDate('delete', index)"
                    >
                      <i class="fas fa-trash text-red-900 text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <SelectField
              v-if="!form.id"
              id="expiry_date"
              v-model="form.expiry_date"
              class="px-2 py-1 w-full md:w-1/2"
              label="Gültigkeitsdauer (4 - 10 Jahre)"
              :options="expiry"
              rules="required"
            />
            <div class="m-1 w-full flex flex-col mb-5">
              <label class="font-semibold text-sm font-display text-gray-700">
                Gutscheinart
              </label>
              <div class="mx-2 mt-2 w-full flex flex-row">
                <toggle-button
                  :value="(form.type == 'quantity') ? true : false"
                  @change="onChangeType"
                />
                <span class="ml-2 font-semibold text-sm font-display text-gray-700">Wertgutschein / Produktgutschein</span>
              </div>
            </div>
            <InputField
              v-if="form.type == 'quantity'"
              id="type"
              v-model="form.qty_val"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Gutscheinwert"
              :rules="`required|min_value:${USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
            />
            <InputField
              id="min"
              v-model="form.min"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              :label="(form.type == 'quantity') ? 'Mindestbestellmenge' : 'Mindestgutscheinwert'"
              :placeholder="(form.type == 'quantity') ? 'Mindestmenge' : 'Mindestwert'"
              :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${ (form.type == 'quantity') ? 1 : USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
            />
            <InputField
              id="max"
              v-model="form.max"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              :label="(form.type == 'quantity') ? 'Maximalbestellmenge' : 'Maximalgutscheinwert'"
              :placeholder="(form.type == 'quantity') ? 'Maximalmenge' : 'Maximalwert'"
              :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${form.min ? form.min : 0.001}`"
            />
          </div>
        </div>
        <Button
          :label="`${ data && data.id ? 'Gutschein aktualisieren' : 'Gutschein speichern' }`"
          size="w-full md:w-1/2 py-3"
          round="rounded-full"
          type="submit"
        />
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/'
  import Header5 from '_components/Headers/Header5';
  import InputField from '_components/Form/InputField'
  import CheckboxField from '_components/Form/CheckboxField'
  import DatePickerField from '_components/Form/DatePickerField'
  import Button from '_components/Button'
  import TextAreaField from '_components/Form/TextAreaField'
  import SelectField from '_components/Form/SelectField'
  import MultipleCheckboxField from '_components/Form/MultipleCheckboxField'
  import { Chrome } from 'vue-color'
  import { ToggleButton } from 'vue-js-toggle-button'
  import 'vue2-datepicker/index.css'
  import { getWeek } from '_helpers/DefaultValues'
  import { toFormData } from '_helpers/CustomFunction'
  import moment from 'moment'

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
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        },
      },
    },
    data() {
      return {
        isWithLimit: false,
        unsure: false,
        formIndex: 0,
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
          category: null,
          voucher_category_id: null,
          seller_id: null,
          title: '',
          description: '',
          background_aid: 'transparent',
          background_color: '#fff',
          text_color: 'dark',
          background_image: '',
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
          seller: null
        },
        week: getWeek,
        background_image: null,
        chunk_voucher_img: [],
        taxes: [],
        expiry: [],
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
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
    },
    mounted() {
      this.onSetForm()
      this.categories = this.CATEGORIES.map( row => {
        return {
          id: row.id,
          label: row.name,
        }
      })
      this.onSetTax()
      this.onSetExpiry()
    },
    methods: {
      async onSubmit()
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          this.form.seller_id = this.AUTH_USER.data.id
          this.form.voucher_category_id = this.form.category.id
          if( this.form.type == 'value' ) {
            this.form.val_min = this.form.min
            this.form.val_max = this.form.max
          } else {
            this.form.qty_min = this.form.min
            this.form.qty_max = this.form.max
          }

          // this.form.background_image = this.background_image

          const url = this.form.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER'

          // await this.$store.dispatch(url, this.form)
          // this.$swal({
          //   icon: 'success',
          //   title: 'Erfolgreich!',
          //   text: `${this.form.id ? 'Updating' : 'Adding'} new voucher.`,
          //   allowOutsideClick: false,
          //   confirmButtonColor: '#48BB78',
          //   confirmButtonText: 'Bestätigen'
          // });
          // this.onResetForm()
          // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

          const { voucher } = await this.$store.dispatch(url, this.form)
          // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if(this.background_image) {

            // await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            this.chunk_voucher_img = this.onGetChunk(this.background_image)
            const random_string = this.$helpers.randomString(10)
            while (this.chunk_voucher_img.length > 0) {
              await this.onUploadVoucherImg(voucher.id, random_string)
            }
            // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
          // this.$swal({
          //   icon: 'success',
          //   title: 'Successful!',
          //   text: `${this.form.id ? 'Updating' : 'Adding'} new voucher.`,
          //   allowOutsideClick: false,
          //   confirmButtonColor: '#48BB78',
          // });
          // this.onResetForm()

          this.$router.push('/vouchers')
        } catch (err) {

          console.log('err',err)

          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if( err?.response?.data?.message ) {
            this.$swal({
              icon: 'warning',
              title: 'Warnung!',
              text: err.response.data.message,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
        }
      },
      async onUploadVoucherImg(id, random)
      {
        let tempForm = {
          id,
          attachment: this.chunk_voucher_img[0],
          is_last: this.chunk_voucher_img.length == 1 ? 1 : 0,
          file_name: `${random}-${this.background_image.name}`
        }
        await this.$store.dispatch('UPLOAD_BG_IMG_VOUCHER', tempForm)
        this.chunk_voucher_img.shift()
      },
      onGetChunk(file)
      {
        let size = 999950
        let chunks = Math.ceil(file.size / size)
        let temp_chunk = []

        for (let i = 0; i < chunks; i++) {
          temp_chunk.push(file.slice(
            i * size, Math.min(i * size + size, file.size), file.type
          ))
        }
        return temp_chunk
      },
      onUnsure(value)
      {
        this.unsure = value
        if( value ) {
          this.form.tax = ['unsure']
        } else {
          this.form.tax = []
        }
      },
      onChangeTextColor(e)
      {
        this.form.text_color = e.value ? 'dark' : 'light'
      },
      onChangeType(e)
      {
        this.form.type = e.value ? 'quantity' : 'value'
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
      onPickColor( { rgba, hex }, type )
      {
        if (type == 'background_aid') {
          this.form.background_aid = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        } else {
          this.form.background_color = hex
        }
      },
      onSetTax()
      {
        this.taxes = [
          {
            tax: '0',
            label: '0%',
            value: null,
          }, {
            tax: '5',
            label: '5%',
            value: null,
          }, {
            tax: '10',
            label: '10%',
            value: null,
          }, {
            tax: '13',
            label: '13%',
            value: null,
          }, {
            tax: '20',
            label: '20%',
            value: null,
          },
        ]
      },
      onSetExpiry()
      {
        let expiry = []
        for (let i = 4; i <= 10; i++) {
          expiry = [
            ...expiry,
            i
          ]
          this.expiry = expiry
        }
      },
      onChangeBgImg(data)
      {
        if(data.length > 0) {
          this.background_image = data[0].file
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            this.form.background_image = reader.result
            this.formIndex = this.formIndex + 1
          }
        } else {
          this.form.background_image = ''
          this.background_image = null
        }
      },
      onRemoveBg()
      {
        this.form.background_image = ''
        this.form.remove_bg = true
        this.formIndex = this.formIndex + 1
      },
      onActionTax( action, index = null )
      {
        if( action === 'add' ) {
          this.form.tax.push({
            tax: '0',
            label: '0%',
            value: null,
          })
        } else {
          this.form.tax = this.form.tax.filter( (row, i) => i != index)
          if( this.form.tax.length == 1 ) {
            this.form.tax[0].value = null
          }
        }
      },
      onActionDate( action, index = null )
      {
        if( action === 'add' ) {
          this.form.valid_date.push({
            start: '',
            end: '',
          })
        } else if( action === 'change' ) {
          const {  start, end } = this.form.valid_date[index]

          this.form.valid_date = this.form.valid_date.map((row, i) => {
            row.error = ''
            if(moment(end).isBefore(start, 'day') && index == i) {
              row.error = 'Bitte gib ein gültiges Datum ein'
            }
            return row
          })
        } else {
          this.form.valid_date = this.form.valid_date.filter( (date, i) => i != index)
        }
      },
      onSetForm()
      {
        if( this.AUTH_USER.isAuth ) {
          this.form.seller = this.AUTH_USER.data
        }
        if(this.data?.id) {
          if(this.data.valid_day || this.data.valid_date) {
            this.isWithLimit = true
          }
          this.form = {
            id: this.data.id,
            title: this.data.title,
            description: this.data.description,
            min: (this.data.type == 'quantity') ? this.data.qty_min : this.data.val_min,
            max: (this.data.type == 'quantity') ? this.data.qty_max : this.data.val_max,
            qty_val: this.data.qty_val,
            valid_date: this.data.valid_date || [],
            valid_day: this.data.valid_day || [],
            tax: this.data.tax || [],
            type: this.data.type,
            category: {
              id: this.data.voucher_category.id,
              label: this.data.voucher_category.name
            },
            text_color: this.data.text_color,
            background_color: this.data.background_color,
            background_aid: this.data.background_aid,
            background_image: this.data.background_image,
            seller: this.AUTH_USER.data
          }
          this.formIndex = this.formIndex + 1
        }
      },
      onResetForm()
      {
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
            }
          ],
          type: 'value',
          min: 0,
          max: 0,
          qty_val: 0,
          qty_min: 0,
          qty_max: 0,
          val_min: 0,
          val_max: 0,
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .vc-material {
    height: unset !important;
    width: 100%;
    border-radius: 8px !important;
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
    box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  }
</style>