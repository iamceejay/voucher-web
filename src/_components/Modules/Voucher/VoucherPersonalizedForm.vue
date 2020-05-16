<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          :data="voucherForm"
          :bg="voucherForm.bg.hex"
          :bgImg="voucherForm.bgImage"
          :isFlippable="false"
        />
        <div class="text-center font-bold font-body">
          Live Preview
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="flex flex-row flex-wrap w-full">
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
              Pick a template
            </div>
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
          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button 
              v-model="voucherForm.isDarkText"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">Light / Dark Text</span>
          </div>
          <div class="w-full">
            <TextAreaField
              id="description"
              v-model="voucherForm.description"
              class="px-2 w-full md:w-1/2"
              placeholder="Add custom note to voucher"
              rules="required|max:250"
            />
          </div>
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
              Add another Picture
            </div>
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
  import Button from '_components/Button'
  import TextAreaField from '_components/Form/TextAreaField'
  import { ToggleButton } from 'vue-js-toggle-button'
  import 'vue2-datepicker/index.css'
  import { getWeek } from '_helpers/DefaultValues'

  export default {
    components: {
      Button,
      VoucherCard,
      ToggleButton,
      TextAreaField,
      TextAreaField,
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
    computed: {
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
    mounted() {
      this.onSetForm()
    },
    methods: {
      onSubmit( invalid )
      {
        if( !invalid ) {
          // this.voucherForm.bgColor = this.voucherForm.bg.hex
          // const url = this.voucherForm.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER'
          // this.$store.dispatch(url, this.voucherForm)
          // this.$swal({
          //   icon: 'success',
          //   title: 'Successful!',
          //   text: `${this.voucherForm.id ? 'Updating' : 'Adding'} new voucher.`,
          //   confirmButtonColor: '#6C757D',
          // });
          // this.onResetForm()
          this.$router.push('/wallet')
        }
      },
      onChangeBgColor( { hex } )
      {
        this.voucherForm.bgColor = hex
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
      onActionDate( action, index = null )
      {
        if( action === 'add' ) {
          this.voucherForm.validDates.push({
            start: '',
            end: '',
          })
        } else {
          this.voucherForm.validDates = this.voucherForm.validDates.filter( (date, i) => i != index)
        }
      },
      onSetForm()
      {
        if(this.data?.id) {
          console.log('this.data', this.data)
          this.voucherForm = {
            ...this.voucherForm,
            ...this.data,
          }
        }
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
          category: null,
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