<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          v-if="voucher"
          :data="voucher"
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
            <div
              class="scroll-horizontal scroll flex"
            >
              <VueFileAgent
                ref="vueFileAgent"
                v-model="fileRecords"
                class="template-container m-1 relative"
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
              <div 
                v-for="(tem, index) in personalizedForm.template"
                :key="`tem-${index}`"
                :class="`template-image m-1 relative ${ tem.status ? 'active' : '' }`"
              >
                <a 
                  class="template-icon" 
                  href="javascript:void(0)"
                  @click="onDeleteTemplate(index)"
                >
                  <i class="fas fa-times text-red-900" />
                </a>
                <img 
                  :src="tem.path" 
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button 
              v-model="personalizedForm.isDarkText"
              @change="onChangeForm"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">Light / Dark Text</span>
          </div>
          <div class="w-full">
            <TextAreaField
              id="description"
              v-model="personalizedForm.note"
              class="px-2 w-full md:w-1/2"
              placeholder="Add custom note to voucher"
              rules="required|max:65"
              @input="onChangeForm"
            />
          </div>
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
              {{ `${ personalizedForm.picture ? 'Update' : 'Add another' } Picture` }}
            </div>
            <div v-if="personalizedForm.picture" class="flex flex-col">
              <img 
                style="width: 120px; height: 80px;"
                :src="personalizedForm.picture" 
                alt=""
              />
              <Button
                label="Change"
                fontSize="text-xs"
                size="w-16 py-0"
                round="rounded-full"
                @onClick="personalizedForm.picture = ''"
              />
            </div>
            <VueFileAgent
              v-else
              ref="vueFileAgent1"
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
              @select="onAddPicture($event)"
              @delete="onAddPicture($event)"
            />
          </div>
        </div>
        <Button
          label="Save voucher"
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
        voucher: null,
        fileRecords: [],
        settings: {
          focusOnSelect: true,
          infinite: true,
          slidesToShow: 1,
          speed: 500,
          slidesPerRow: 1,
          edgeFriction: 0.35,
          slidesToScroll: 1,
          touchThreshold: 5
        },
        personalizedForm: {
          template: [],
          isDarkText: true,
          note: '',
          picture: ''
        },
      }
    },
    computed: {
      
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      },
    },
    mounted() {
      this.onSetForm()
    },
    methods: {
      onSubmit( invalid )
      {
        if( !invalid ) {
          this.$store.dispatch('UPDATE_WALLET', {
            ...this.data,
            voucher: {
              ...this.data.voucher,
              personalized: this.personalizedForm
            }
          })
          this.$router.push('/wallet')
        }
      },
      onSetForm()
      {
        if(this.data?.id) {
          this.voucher = this.data.voucher
          if( !this.data.voucher.personalized ) {
            this.personalizedForm.isDarkText = this.data.voucher.isDarkText
          } else {
            this.personalizedForm = this.data.voucher.personalized
          }
        }
      },
      onDeleteTemplate( index )
      {
        this.$swal({
          title: 'Delete template',
          text: `Are you sure you want to delete this template?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if(result.value){
            this.personalizedForm.template = this.personalizedForm.template.filter( (row,i) => i != index)
          }   
        })
      },
      onAddPicture(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            this.personalizedForm.picture = reader.result
            this.onChangeForm()
          }
        } else {
          this.personalizedForm.picture = ''
        }
      },
      onChangeForm()
      {
        this.voucher = {
          ...this.voucher,
          personalized: this.personalizedForm
        }
      },
      onChangeBgImg(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            this.fileRecords = []
            const oldTemp = this.personalizedForm.template.map( temp => ({
              path: temp.path,
              status: 0
            }))
            this.personalizedForm.template = [
              ...oldTemp,
              {
                path: reader.result,
                status: 1
              }
            ]
            this.onChangeForm()
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .template-image {
    display: inline-block;
    width: 145px;
    height: 145px;
    border: 1px solid #aaa;
    border-radius: 8px;
    padding: 5px;
  }
  .template-image img {
    border-radius: 8px;
    width: 134px;
    height: 134px;
    max-width: unset;
  }
  .template-image.active{
    border: 1px solid #0000FF;
  }
  .template-icon {
    position: absolute;
    top: -12px;
    right: -5px;
  }
</style>
<style lang="css">
  .grid-block-wrapper {
    background: #fff;
  }
  .template-container {
    display: inline-block;
    width: 150px !important;
    height: 150px;
  }
  .template-container .grid-block-wrapper .grid-block {
    min-width: unset;
    width: 140px;
    height: 140px;
  }
  .template-container .vue-file-agent .file-preview-new svg {
    margin: 0 auto !important;
    height: 100% !important;
    width: 80px;
  }
  .template-container .vue-file-agent .file-preview-new:before {
    background: #fff !important;
  }
  .template-container .vue-file-agent.file-input-wrapper {
    border: 1px solid #aaa !important;
    border-radius: 8px;
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