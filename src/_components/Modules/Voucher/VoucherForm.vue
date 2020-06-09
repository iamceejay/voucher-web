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
          <div class="w-full md:w-1/2 mb-5">
            <span class="font-semibold text-sm font-display text-gray-700 mx-2">
              Background color
            </span>
            <div class="w-full sm:w-1/2 md:mx-2 mt-2">
              <Material
                v-model="material_color"
                @input="onPickColor"
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
            <SelectField
              id="tax"
              v-model="form.tax"
              class="px-2 py-1 w-full md:w-1/2"
              :options="taxes"
              :multiple="true"
              @selected="onChangeTax"
            >
              <template #option_="{ option }">
                <span class="capitalize">{{ `${option.label} ${(option.label != 'not sure' ? '%' : '')}` }}</span>
              </template>
              <template #selected_option_="{ option }">
                <span class="capitalize">{{ `${option.label} ${(option.label != 'not sure' ? '%' : '')}` }}</span>
              </template>
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
            </SelectField>
            <SelectField
              id="category"
              v-model="form.category"
              class="px-2 py-1 w-full md:w-1/2"
              label="Category"
              :options="categories"
              rules="required"
            />
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
                class="flex flex-row"
              >
                <div class="flex flex-row w-11/12">
                  <DatePickerField
                    v-model="form.valid_date[index].start"
                    class="m-1 w-1/2"
                    rules="required"
                    placeholder="Start date"
                  />
                  <DatePickerField
                    v-model="form.valid_date[index].end"
                    class="m-1 w-1/2"
                    rules="required"
                    placeholder="End date"
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
            <InputField
              v-if="!form.id"
              id="expiry_date"
              v-model="form.expiry_date"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Years of Expiry (4-10 years)"
              placeholder=""
              rules="required|min_value:4|max_value:10"
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
              type="text"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Value"
              rules="required"
            />
            <InputField
              id="min"
              v-model="form.min"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Minimum Value / Quantity"
              placeholder="Min Value"
              rules="required|min_value:0.001"
            />
            <InputField
              id="max"
              v-model="form.max"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Maximum Value / Quantity"
              placeholder="Max Value"
              rules="required|min_value:0.001"
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
  import DatePickerField from '_components/Form/DatePickerField'
  import Button from '_components/Button'
  import TextAreaField from '_components/Form/TextAreaField'
  import SelectField from '_components/Form/SelectField'
  import MultipleCheckboxField from '_components/Form/MultipleCheckboxField'
  import { Material } from 'vue-color'
  import { ToggleButton } from 'vue-js-toggle-button'
  import 'vue2-datepicker/index.css'
  import { getWeek } from '_helpers/DefaultValues'
  import { toFormData } from '_helpers/CustomFunction'

  export default {
    components: {
      Header5,
      Button,
      InputField,
      DatePickerField,
      VoucherCard,
      Material,
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
        formIndex: 0,
        material_color: { 
          hex: '#FFF',
          rgba: { r: 255, g: 255, b: 255, a: 255 },
        },
        categories: [],
        form: {
          id: null,
          voucher_category_id: null,
          seller_id: null,
          title: '',
          description: '',
          background_color: '#fff',
          text_color: 'dark',
          background_image: '',
          tax: [],
          valid_day: [],
          valid_date: [],
          type: 'value',
          min: 0,
          max: 0,
          expiry_date: 0,
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
      }
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      }
    },
    created() {
      this.categories = this.CATEGORIES.map( row => {
        return {
          id: row.id,
          label: row.name,
        }
      })
      this.onSetForm()
      this.onSetTax()
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
            confirmButtonColor: '#6C757D',
          });
          this.onResetForm()
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$router.push('/vouchers')
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
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
      onChangeTax(value)
      {
        if( this.form.tax.includes('not sure') && value !== 'not sure' ) {
          this.$swal({
            icon: 'warning',
            title: 'Warning!',
            text: "Remove 'not sure' option first to select different option.",
            confirmButtonColor: '#6C757D',
          })
          this.form.tax = ['not sure']
        } else if( value === 'not sure') {
          this.form.tax = ['not sure']
        }
      },
      onPickColor( { hex } )
      {
        this.form.background_color = hex
      },
      onSetTax()
      {
        this.taxes = [ 0, 10, 13, 20, 'not sure' ]
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
      onActionDate( action, index = null )
      {
        if( action === 'add' ) {
          this.form.valid_date.push({
            start: '',
            end: '',
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