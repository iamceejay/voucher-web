<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form 
      class="flex flex-col w-full"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          v-if="data && data.order.voucher"
          :key="`vform-${formIndex}`"
          :voucher="data.order.voucher"
          :order="data.order"
          :userVoucher="userVoucher"
          :isFlippable="false"
        />
        <div class="text-center font-bold font-body">
          Live Vorschau
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="flex flex-row flex-wrap w-full">
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 font-display">
              Wähle eine Designvorlage oder lade selbst ein Hintergrundbild hoch
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
              :key="`price-${form.price_hidden}`"
              v-model="form.price_hidden"
              @input="onChangeForm"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">
              Zeige den Preis / Verstecke den Preis
            </span>
          </div>
          <div class="mx-2 mb-5 w-full flex flex-row">
            <toggle-button 
              :key="`text-${(form.text_color == 'dark') ? true : false}`"
              :value="(form.text_color == 'dark') ? true : false"
              @change="onChangeTextColor"
            />
            <span class="ml-2 text-sm font-bold text-gray-900 font-body capitalize">Heller / Dunkler Text</span>
          </div>
          <div class="w-full">
            <TextAreaField
              id="description"
              v-model="form.note"
              class="px-2 w-full md:w-1/2"
              placeholder="Füge eine persönliche Nachricht hinzu"
              rules="max:65"
              @input="onChangeForm"
            />
          </div>
          <div class="w-full md:w-1/2 mb-5">
            <div class="font-semibold text-xl text-gray-700 mb-3 font-display">
              {{ `${ form.custom_image ? 'Aktualisieren' : 'Füge ein weitere Bild hinzu' }` }}
              <div class="text-xs font-semibold">
                Ideale Größe ist 250px x 100px
              </div>
            </div>
            <div v-if="form.custom_image" class="flex flex-col px-2">
              <img 
                style="width: 120px; height: 48px;"
                :src="onSetCustomImage('set', form.custom_image)" 
                alt=""
              />
              <Button
                label="Ändern/Löschen"
                fontSize="text-xs"
                size="w-32 py-0 mt-1"
                round="rounded-full"
                @onClick="onSetCustomImage('delete', form.custom_image)"
              />
            </div>
            <VueFileAgent
              v-else
              ref="vueFileAgent1"
              class="mx-2"
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
          <div class="w-full mt-2 mb-5">
            <div class="flex flex-row">
              <div class="font-semibold text-xl text-gray-700 font-display">
                Reading Aid
              </div>
              <div class="tooltip ml-1 pt-1">
                <i class="fas fa-info-circle text-base text-gray-700" />
                <span class="tooltiptext">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </div>
            </div>
            <div class="w-full sm:w-1/2 md:mx-2 mt-2 mx-2">
              <Chrome
                v-model="chrome_color"
                @input="onPickColor($event, 'background_aid')"
              />
            </div>
          </div>
        </div>
        <Button
          label="Gutschein speichern"
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
  import Header2 from '_components/Headers/Header2';
  import TextAreaField from '_components/Form/TextAreaField'
  import { ToggleButton } from 'vue-js-toggle-button'
  import 'vue2-datepicker/index.css'
  import { Chrome } from 'vue-color'

  export default {
    components: {
      Button,
      Header2,
      VoucherCard,
      ToggleButton,
      TextAreaField,
      TextAreaField,
      Chrome,
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
        chrome_color: { 
          hex: '#FFF',
          rgba: { r: 255, g: 255, b: 255, a: 255 },
        },
        userVoucher: null,
        api_base_url: '',
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
          custom_image: '',
          background_aid: 'transparent'
        },
        chunk_template: [],
        chunk_custom_image: [],
        tempTemplates: []
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
    mounted() {
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

          tempForm.id = this.data.id
          tempForm.order_id = this.data.order.id
          
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
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            this.chunk_custom_image = this.onGetChunk(this.custom_image)
            const random_string = this.$helpers.randomString(10)

            while (this.chunk_custom_image.length > 0) {
              await this.onUploadCustomImage(random_string)
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }

          if(templates?.length > 0) {
            this.tempTemplates = templates
            this.chunk_template = this.onGetChunk(templates[0].attachment)
            const random_string = this.$helpers.randomString(10)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })

            while (this.chunk_template.length > 0) {
              await this.onUploadTemplates(random_string)
            }
            
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }

          this.$router.push('/wallet')
        } catch (error) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

          this.$swal({
            icon: 'warning',
            title: 'Achtung!',
            text: 'Etwas ist schief gelaufen. Bitte lade die Seite erneut!',
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
      onPickColor( { rgba, hex }, type )
      {
        if (type == 'background_aid') {
          this.form.background_aid = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          this.onChangeForm()
        }
      },
      async onUpdateData(data)
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('UPDATE_USER_VOUCHER', data)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onUploadCustomImage(random)
      {
        let tempForm = {
          id: this.data.id,
          custom_image: this.chunk_custom_image[0],
          is_last: this.chunk_custom_image.length == 1 ? 1 : 0,
          file_name: `${random}-${this.custom_image.name}`
        }
        await this.$store.dispatch('UPLOAD_CUSTOM_IMAGE_USER_VOUCHER', tempForm)
        this.chunk_custom_image.shift()
      },
      async onUploadTemplates(random)
      {
        let tempForm = {
          id: this.data.id,
          template: {
            status: this.tempTemplates[0].status,
            attachment: this.chunk_template[0],
            is_last: this.chunk_template.length == 1 ? 1 : 0
          },
          file_name: `${random}-${this.tempTemplates[0]['attachment'].name}`
        }
        
        await this.$store.dispatch('UPLOAD_TEMPLATES_USER_VOUCHER', tempForm)

        this.chunk_template.shift()

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
      onSetForm()
      {
        this.onSetTemplates()

        this.userVoucher = {
          ...this.data
        }
        if(this.data?.id) {
          this.form.order_id = this.data.order.id
          const { text_color, note } = this.data
          this.form = {
            templates: [
              ...this.form.templates
            ],
            text_color: (text_color != null) ? text_color : this.data.order.voucher.text_color,
            note,
            background_aid: this.data.background_aid,
            custom_image: this.data.custom_image,
            price_hidden: this.data.price_hidden ? true : false
          }
          if( this.userVoucher.template ) {
            const template = this.userVoucher.template
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
        this.formIndex = this.formIndex + 1
      },
      onSetTemplates()
      {
        if( this.TEMPLATES ) {
          this.form.templates = []
          let templates = []
          this.TEMPLATES.map( row => {
            if( !this.data || this.data?.template?.id != row.id ) {
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
      },
      onDeleteTemplate( index )
      {
        this.$swal({
          title: 'Vorlage löschen',
          text: `Bist du sicher dass du dieses Bild löschen möchtest?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
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
          this.data.custom_image = ''
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
        this.userVoucher.template = selected
        this.formIndex = this.formIndex + 1
      },
      onChangeForm()
      {
        this.userVoucher = {
          ...this.userVoucher,
          ...this.form
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
            this.userVoucher.template = selected
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