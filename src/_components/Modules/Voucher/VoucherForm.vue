<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          :key="`vform-${formIndex}`"
          :data="form"
          :isFlippable="false"
        />
        <div class="text-center font-bold font-body">
          Live Preview
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
          Pick a background color or upload photo
        </div>
        <div class="flex flex-row flex-wrap w-full">
          <!-- <div class="w-full md:w-1/2 mb-5">
            <span class="font-semibold text-sm font-display text-gray-700 mx-2">
              Background color
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
                label="Reading Aid"
              />
              <div class="tooltip ml-1">
                <i class="fas fa-info-circle text-base text-gray-700" />
                <span class="tooltiptext">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
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
              Background image
            </span>
            <Button
              v-if="form && form.id && form.background_image != ''"
              class="mt-2 mx-2"
              label="Change/Remove"
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
            <span class="ml-2 font-semibold text-sm font-display text-gray-700">Light / Dark Text</span>
          </div>
          <div class="w-full">
            <InputField
              id="title"
              v-model="form.title"
              type="text"
              class="px-2 w-full md:w-1/2"
              placeholder="Voucher Title"
              rules="required|max:30"
            />
            <TextAreaField
              id="description"
              v-model="form.description"
              class="px-2 w-full md:w-1/2"
              placeholder="Voucher Description"
              rules="required|max:250"
            />
            <div v-if="!form.id" class="flex flex-col w-full">
              <SelectField
                id="taxes"
                v-model="form.tax"
                class="px-2 py-1 w-full md:w-1/2"
                :options="taxes"
                :multiple="true"
                :disabled="unsure ? true : false"
                :isHideInput="unsure"
                rules="required"
              >
                <template #label_>
                  <div class="flex flex-row">
                    <Header5
                      label="Tax"
                    />
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base text-gray-700" />
                      <span class="tooltiptext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </span>
                    </div>
                  </div>
                </template>
                <template #note_>
                  <CheckboxField
                    container="mb-0"
                    labelSentence="Check if not sure about the tax."
                    @input="onUnsure"
                  />
                </template>
              </SelectField>
              <div v-if="!unsure && form.tax && form.tax.length > 0" class="flex flex-col w-full">
                <div class="px-2 font-semibold text-xs font-display text-gray-700 flex flex-row w-full md:w-1/2">
                  Selected Tax:
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
                    placeholder="Tax Label"
                    :disabled="true"
                  />
                  <InputField
                    :id="`t-value-${index}`"
                    v-model="form.tax[index].value"
                    type="number"
                    class="px-2 w-7/12"
                    inputContainer="py-1"
                    placeholder="Tax Value"
                    :rules="`${ (form.tax.length <= 1) ? '' : 'required' }`"
                    :disabled="(form.tax.length > 1) ? false : true"
                  />
                  <a 
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
              label="Category"
              :options="categories"
              rules="required"
            />
            <div class="flex flex-col w-full px-2">
              <CheckboxField
                v-model="isWithLimit"
                label="Are there any other limitations?"
                container="mb-0"
                labelSentence="Check if yes."
              />
            </div>
            <div v-if="isWithLimit" class="flex flex-col w-full px-2">
              <MultipleCheckboxField
                class="mx-2"
                name="valid_day"
                :options="week"
                :data="form.valid_day"
                :limitLabel="3"
                @onChange="form.valid_day = $event"
              >
                <template #label_>
                  <div class="flex flex-row">
                    <Header5
                      label="Valid on following days"
                    />
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base text-gray-700" />
                      <span class="tooltiptext">
                        This will give a restriction to redeem the voucher depending to the day given.
                      </span>
                    </div>
                  </div>
                </template>
              </MultipleCheckboxField>
              <div class="w-full md:w-1/2 mb-5 mx-2">
                <div class="flex flex-row">
                  <label class="font-semibold text-sm font-display text-gray-700">
                    Valid from ... to ...
                    <div class="tooltip ml-1">
                      <i class="fas fa-info-circle text-base" />
                      <span class="tooltiptext">
                        This will give a restriction to redeem the voucher depending to the date given.
                      </span>
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
                        placeholder="Start date"
                        @input="onActionDate('change', index)"
                      />
                      <DatePickerField
                        v-model="form.valid_date[index].end"
                        class="m-1 w-1/2"
                        container=""
                        rules="required"
                        placeholder="End date"
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
              label="Years of Expiry (4-10 years)"
              :options="expiry"
              rules="required"
            />
            <div class="m-1 w-full flex flex-col mb-5">
              <label class="font-semibold text-sm font-display text-gray-700">
                Voucher Type
              </label>
              <div class="mx-2 mt-2 w-full flex flex-row">
                <toggle-button
                  :value="(form.type == 'quantity') ? true : false"
                  @change="onChangeType"
                />
                <span class="ml-2 font-semibold text-sm font-display text-gray-700">Value based / Quantity based</span>
              </div>
            </div>
            <InputField
              v-if="form.type == 'quantity'"
              id="type"
              v-model="form.qty_val"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Value"
              :rules="`required|min_value:${USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
            />
            <InputField
              id="min"
              v-model="form.min"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Minimum Value / Quantity"
              placeholder="Min Value"
              :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${ (form.type == 'quantity') ? 1 : USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
            />
            <InputField
              id="max"
              v-model="form.max"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Maximum Value / Quantity"
              placeholder="Max Value"
              :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${form.min ? form.min : 0.001}`"
            />
          </div>
        </div>
        <Button
          :label="`${ data && data.id ? 'Update' : 'Save' } voucher`"
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
  import { Material, Chrome } from 'vue-color'
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
      Material,
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
          this.form.background_image = this.background_image
          const url = this.form.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER'
          await this.$store.dispatch(url, this.form)
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: `${this.form.id ? 'Updating' : 'Adding'} new voucher.`,
            allowOutsideClick: false,
            confirmButtonColor: '#6C757D',
          });
          this.onResetForm()
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$router.push('/vouchers')
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if( err?.response?.data?.message ) {
            this.$swal({
              icon: 'warning',
              title: 'Warning!',
              text: err.response.data.message,
              confirmButtonColor: '#6C757D',
            })
          }
        }
      },
      onUnsure(value)
      {
        this.unsure = value
        if( value ) {
          this.form.tax = ['unsure']
        } else {
          this.form.tax = this.form.tax.filter(row => row != 'unsure')
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
              row.error = 'Please input a valid date.'
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