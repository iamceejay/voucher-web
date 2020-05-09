<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <div class="flex flex-col w-full items-center">
        <VoucherCard
          :data="voucherForm"
          :bg="voucherForm.bg.hex"
          :bgImg="voucherForm.bgImage"
          :isFlippable="false"
        />
        <div class="text-center italic">
          Live Preview
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="font-semibold">
          Pick a background color or upload photo
        </div>
        <div class="flex flex-row flex-wrap w-full">
          <div class="w-full md:w-1/2">
            <span class="text-sm m-2">
              Background color
            </span>
            <div class="w-full sm:w-1/2 md:mx-2">
              <Material
                v-model="voucherForm.bg"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 mt-2">
            <VueFileAgent
              ref="vueFileAgent"
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
          <div class="mx-2 mt-2 w-full flex flex-row mb-1">
            <toggle-button 
              v-model="voucherForm.isDarkText"
            />
            <span class="ml-2 text-sm">Light / Dark Text</span>
          </div>
          <div class="w-full">
            <InputField
              id="name"
              v-model="voucherForm.name"
              type="text"
              class="px-2 py-1 w-full md:w-1/2"
              placeholder="Voucher Title"
              rules="required"
            />
            <TextAreaField
              id="description"
              v-model="voucherForm.description"
              class="px-2 py-1 w-full md:w-1/2"
              placeholder="Voucher Description"
              :max="128"
              rules="required"
            />
            <SelectField
              id="month"
              class="px-2 py-1 w-full md:w-1/2"
              label="Category"
            />
            <CheckboxField
              label="Valid on following days"
              class="mx-2"
              name="'validDay'"
              :data="week"
              @onChange="voucherForm.validDay = $event"
            />
            <div>
              <div class="flex flex-row">
                <label class="block text-left text-gray-700 text-sm font-bold mb-0">
                  Valid from ... to ...
                </label>
                <a 
                  href="javascript:void(0)"
                  class="ml-2"
                  @click="onAddValidDate()"
                >
                  <i class="fas fa-plus-circle text-base" />
                </a>
              </div>
              <div
                v-for="(date, index) in voucherForm.validDates"
                :key="`date-${index}`"
                class="flex flex-row"
              >
                <DatePicker
                  v-model="voucherForm.validDates[index].start"
                  inputClass="input-field"
                  class="m-1"
                  format="YYYY-MM-DD"
                  type="date"
                  placeholder="Start date"
                  valueType="format"
                />
                <DatePicker
                  v-model="voucherForm.validDates[index].end"
                  inputClass="input-field"
                  class="m-1"
                  format="YYYY-MM-DD"
                  type="date"
                  placeholder="End date"
                  valueType="format"
                />
              </div>
            </div>
            <div class="m-1 w-full flex flex-col">
              <label class="block text-left text-gray-700 text-sm font-bold mb-0">
                Voucher Type
              </label>
              <div class="mx-2 mt-2 w-full flex flex-row">
                <toggle-button 
                  v-model="voucherForm.isQuantityBased"
                />
                <span class="ml-2 text-sm">Value based / Quantity based</span>
              </div>
            </div>
            <InputField
              v-if="voucherForm.isQuantityBased"
              id="isQuantityBased"
              v-model="voucherForm.value"
              type="text"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Value"
              rules="required"
            />
            <InputField
              id="min"
              v-model="voucherForm.minQuantity"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Minimum Value / Quantity"
              placeholder="Min Value"
              rules="required"
            />
            <InputField
              id="max"
              v-model="voucherForm.maxQuantity"
              type="number"
              class="px-2 py-1 w-full md:w-1/2"
              label="Voucher Maximum Value / Quantity"
              placeholder="Max Value"
              rules="required"
            />
          </div>
        </div>
        <Button
          class="p-2"
          label="Save voucher"
          size="w-full md:w-1/2 py-2"
          variant="info"
          round="rounded-full"
          type="submit"
        />
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/'
  import InputField from '_components/Form/InputField'
  import Button from '_components/Button'
  import TextAreaField from '_components/Form/TextAreaField'
  import SelectField from '_components/Form/SelectField'
  import CheckboxField from '_components/Form/CheckboxField'
  import { Material } from 'vue-color'
  import { ToggleButton } from 'vue-js-toggle-button'
  import DatePicker from 'vue2-datepicker'
  import 'vue2-datepicker/index.css'
  import { getWeek } from '_helpers/DefaultValues'

  export default {
    components: {
      Button,
      InputField,
      VoucherCard,
      Material,
      ToggleButton,
      TextAreaField,
      TextAreaField,
      SelectField,
      CheckboxField,
      DatePicker
    },
    props: {
    },
    data() {
      return {
        voucherForm: {
          name: '',
          companyName: 'Company Name',
          description: '',
          bg: {
            hex: '#fff',
            rgb: { 
              r: 255, 
              g: 255, 
              b: 255 
            }
          },
          bgColor: '',
          bgImage: '',
          isDarkText: true,
          validDay: [],
          validDates: [
            {
              start: '2020-05-09',
              end: '2020-05-09',
            }
          ],
          customNote: '',
          expiryDate: '12.04.2023',
          isQuantityBased: false,
          value: 0,
          minQuantity: 0,
          maxQuantity: 0,
          status: true,
        },
        week: getWeek,
      }
    },
    mounted() {
    },
    methods: {
      onSubmit( invalid )
      {
        if( !invalid ) {
          this.voucherForm.bgColor = this.voucherForm.bg.hex
          this.$store.dispatch('ADD_VOUCHER', this.voucherForm)
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Adding new voucher.',
            confirmButtonColor: '#6C757D',
          });
          this.onResetForm()
          this.$router.push('/vouchers')
        }
      },
      onChangeBgImg(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            this.voucherForm.bgImage = reader.result
          }
        } else {
          this.voucherForm.bgImage = ''
        }
      },
      onAddValidDate()
      {
        this.voucherForm.validDates.push({
          start: '',
          end: '',
        })
      },
      onResetForm()
      {
        this.voucherForm = {
          name: '',
          companyName: 'Company Name',
          description: '',
          bg: {
            hex: '#fff',
            rgb: { 
              r: 255, 
              g: 255, 
              b: 255 
            }
          },
          bgImage: '',
          isDarkText: true,
          validDay: [],
          validDates: [
            {
              start: '2020-05-09',
              end: '2020-05-09',
            }
          ],
          customNote: '',
          expiryDate: '12.04.2023',
          isQuantityBased: false,
          value: 15000,
          quantity: 0
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
  .vue-file-agent.file-input-wrapper {
    border: 1px solid #aaa !important;
    border-radius: 8px;
  }
</style>