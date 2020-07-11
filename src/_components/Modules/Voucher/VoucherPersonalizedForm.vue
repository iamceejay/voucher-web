<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          v-if="data && data.voucher"
          :key="`vform-${formIndex}`"
          :data="data.voucher"
          :otherData="otherData"
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
                v-for="(tem, index) in form.templates"
                :key="`tem-${index}`"
                :class="`template-image m-1 relative ${ tem.status ? 'active' : '' }`"
              >
                <a
                  v-if="!tem.id"
                  class="template-icon" 
                  href="javascript:void(0)"
                  @click="onDeleteTemplate(index)"
                >
                  <i class="fas fa-times text-red-900" />
                </a>
                <img
                  class="cursor-pointer"
                  :src="(tem.id) ? `${api_base_url}/storage/${tem.image}` : tem.image" 
                  alt=""
                  @click="onSelectTemplate(index)"
                />
              </div>
            </div>
          </div>
          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button 
              v-model="form.price_hidden"
              @input="onChangeForm"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">
              Show Price / Hide Price
            </span>
          </div>
          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button 
              :value="(form.text_color == 'dark') ? true : false"
              @change="onChangeTextColor"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">Light / Dark Text</span>
          </div>
          <div class="w-full">
            <TextAreaField
              id="description"
              v-model="form.note"
              class="px-2 w-full md:w-1/2"
              placeholder="Add custom note to voucher"
              rules="max:65"
              @input="onChangeForm"
            />
          </div>
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
              {{ `${ form.custom_image ? 'Update' : 'Add another' } Picture` }}
              <div class="text-xs font-semibold">
                (Note: Based fit is 250px x 100px)
              </div>
            </div>
            <div v-if="form.custom_image" class="flex flex-col px-2">
              <img 
                style="width: 120px; height: 48px;"
                :src="onSetCustomImage('set', form.custom_image)" 
                alt=""
              />
              <Button
                label="Change / Remove"
                fontSize="text-xs"
                size="w-32 py-0 mt-1"
                round="rounded-full"
                @onClick="onSetCustomImage('delete', form.custom_image)"
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
        api_base_url: '',
        otherData: null,
        template_id: null,
        formIndex: 0,
        custom_image: null,
        form: {
          id: null,
          order_id: null,
          templates: [],
          price_hidden: true,
          text_color: true,
          is_custom_remove: false,
          note: '',
          custom_image: ''
        },
      }
    },
    computed: {
      TEMPLATES()
      {
        return this.$store.getters.TEMPLATES
      },
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      },
    },
    created() {
      this.api_base_url = process.env.VUE_APP_API_BASE_URL
      this.onSetForm()
    },
    methods: {
      async onSubmit()
      {
        try {
          let tempForm = {
            ...this.form
          }

          tempForm.id = this.otherData.user_voucher.id
          tempForm.order_id = this.data.id
          
          const templates = tempForm.templates.filter( row => {
            if( !row.id ) {
              return {
                attachment: row.attachment,
                status: row.status,
              }
            }
            if( row.id && row.status ) {
              tempForm.template_id = row.id
            }
          })

          delete tempForm.custom_image
          delete tempForm.templates

          await this.onUpdateData(tempForm)

          if(this.custom_image) {
            await this.onUploadCustomImage(this.custom_image)
          }

          if(templates?.length > 0) {
            await this.onUploadTemplates(templates)
          }

          this.$router.push('/wallet')
        } catch (error) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

          this.$swal({
            icon: 'warning',
            title: 'Warning!',
            text: 'Something went wrong. Please reload!',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#6C757D',
            confirmButtonText: 'Confirm',
          }).then(async (result) => {
            if(result.value){
              location.reload();
            }
          })
        }
      },
      async onUpdateData(data)
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('UPDATE_USER_VOUCHER', data)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onUploadCustomImage(data)
      {
        let tempForm = {
          id: this.otherData.user_voucher.id,
          custom_image: data
        }
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('UPLOAD_CUSTOM_IMAGE_USER_VOUCHER', tempForm)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onUploadTemplates(data)
      {
        let tempForm = {
          id: this.otherData.user_voucher.id,
          templates: data
        }
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('UPLOAD_TEMPLATES_USER_VOUCHER', tempForm)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      onSetForm()
      {
        this.otherData = this.data
        if( this.TEMPLATES ) {
          this.form.templates = []
          let templates = []
          this.TEMPLATES.map( row => {
            if( !this.otherData || this.otherData?.user_voucher?.template?.id != row.id ) {
              templates = [
                ...templates,
                {
                  id: row.id,
                  image: row.image,
                  status: 0,
                }
              ]
            }
          })
          this.form.templates = templates
        }
        if(this.data?.id) {
          if( !this.otherData.user_voucher ) {
            this.form.text_color = this.data.voucher.text_color
          } else {
            this.form.order_id = this.data.id
            const { text_color, note } = this.otherData.user_voucher
            this.form = {
              templates: [
                ...this.form.templates
              ],
              text_color: (text_color != null) ? text_color : this.data.voucher.text_color,
              note,
              custom_image: this.otherData.user_voucher.custom_image,
              price_hidden: this.otherData.user_voucher.price_hidden ? true : false
            }
            if( this.otherData.user_voucher.template ) {
              const template = this.otherData.user_voucher.template
              this.form.templates = [
                ...this.form.templates,
                {
                  id: template.id,
                  image: template.image,
                  status: 1,
                }
              ]
            }
          }
        }
        this.formIndex = this.formIndex + 1
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
            this.form.templates = this.form.templates.filter( (row,i) => i != index)
          }   
        })
      },
      onSetCustomImage(action, value)
      {
        if( action == 'set' ) {
          if(value != '') {
            return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
          }
        } else {
          this.form.custom_image = ''
          this.form.is_custom_remove = true
          this.otherData.user_voucher.custom_image = ''
          this.formIndex = this.formIndex + 1
        }
      },
      onChangeTextColor(e)
      {
        this.form.text_color = e.value ? 'dark' : 'light'
        this.onChangeForm()
      },
      onAddPicture(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            this.form.custom_image = reader.result
            this.custom_image = data[0].file
            this.onChangeForm()
          }
        } else {
          this.form.custom_image = ''
          this.custom_image = null
        }
      },
      onSelectTemplate(index)
      {
        let selected = null
        this.form.templates = this.form.templates.map( (row, i) => {
          row.status = 0
          if(i == index) {
            row.status = 1
            selected = row
          }
          return row
        })
        this.otherData.user_voucher.template = selected
        this.formIndex = this.formIndex + 1
      },
      onChangeForm()
      {
        this.otherData = {
          ...this.otherData,
          user_voucher: {
            ...this.otherData.user_voucher,
            ...this.form
          }
        }
        this.formIndex = this.formIndex + 1
      },
      onChangeBgImg(data)
      {
        if(data.length > 0) {
          let reader = new FileReader();
          reader.readAsDataURL(data[0].file);
          reader.onload = () => {
            const oldTemp = this.form.templates.map( temp => ({
              ...temp,
              status: 0
            }))
            const selected = {
              attachment: data[0].file,
              image: reader.result,
              status: 1
            }
            this.form.templates = [
              ...oldTemp,
              selected
            ]
            this.otherData.user_voucher.template = selected
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