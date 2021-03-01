<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="flex gap-4 md:grid justify-center md:grid-cols-2 pt-12 w-full"
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

      </div>
      <div class="w-full flex flex-col" style="max-width: 368px">
        <div class="bg-white flex flex-row flex-wrap w-full p-5 ">
          <InputField
              id="title"
              v-model="form.title"
              type="text"
              label="Gutscheintitel"
              class="w-full"
              rules="required|max:30"
            />

          <TextAreaField
            id="description"
            v-model="form.description"
            class="w-full"
            label="Kurzbeschreibung"
            rules="required|max:250"
          />

            <TextAreaField
            id="description"
            v-model="form.long_description"
            class="w-full"
            label="Ausführliche Beschreibung"
            rules="required|max:500"
            rows="5"
          />

          <div class="flex flex-col w-full">
            <div class="text-sm mb-2">Hintergrundbild</div>
            <label class="file input-field px-3 py-2 rounded-sm text-xs mb-3" style="background-color: #F7F7F7">
                <i class="fa fa-cloud-upload-alt mr-1"></i> Bild hochladen
                <input
                  type="file"
                  id="file"
                  accept="'image/*'"
                  aria-label="File browser example"
                  @change="(e) => croppie(e, 'croppieRef')"/>
              <span class="file-custom"></span>
            </label>
            <section class="hidden">
              <vue-croppie
                ref="croppieRef"
                :enableOrientation="true"
                :enableResize="false"
                :boundary="{ width: 328, height: 305 }"
                :viewport="{ width: 328, height: 305, 'type':'square' }"
                @update="update('croppieRef', 'background_image')"
              />
            </section>
            <!-- the result -->
          </div>

          <span class="font-semibold text-sm mb-1">Hintergrundfarbe</span>
          <colorpicker
            v-model="form.background_description_personal_color"
            :color="form.background_description_personal_color"
            :label="'Persönlichen Nachricht'"
          />
          <colorpicker
            v-model="form.header_and_footer_background_color"
            :color="form.header_and_footer_background_color"
            :label="'Kopfzeile & Fußzeile'"
          />
          <div class="border-t my-8 block w-full"></div>

          <span class="font-semibold text-sm mb-1">Schriftfarbe</span>

          <div class="grid grid-cols-3 items-end relative w-full mb-1">
            <label class="text-sm col-span-2">Persönlichen Nachricht</label>
            <span>
              <toggle-button
                :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                :value="(form.personal_description_color == '#000') ? true : false"
                @change="(e) => form.personal_description_color = e.value ? '#000' : '#fff'"
              />
            </span>
          </div>

          <div class="grid grid-cols-3 items-end relative w-full mb-1">
            <label class="text-sm col-span-2">Kopfzeile & Fußzeile</label>
            <span>
              <toggle-button
                :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                :value="(form.header_and_footer_color == '#000') ? true : false"
                @change="(e) => form.header_and_footer_color = e.value ? '#000' : '#fff'"
              />
            </span>
          </div>

          <div class="grid grid-cols-3 items-end relative w-full mb-1">
            <label class="text-sm col-span-2">Zeige den Preis / Verstecke den Preis</label>
            <span>
              <toggle-button
                v-model="form.price_hidden"
                :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
              />
            </span>
          </div>

          <div class="border-t my-8 block w-full"></div>

          <span class="text-sm mb-1">Weitere Bilder die im Gutschein und der Produktseite abgebildet sind. (Format 4 x 4)</span>

          <section class="gap-4 grid grid-cols-3 mt-3">
            <div>
              <span class="block mb-1 text-sm">Bild 1</span>
              <label
                v-if="!form.image_1"
                class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                >
                    <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                    <input
                      type="file"
                      accept="'image/*'"
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
                    :viewport="{ width: 99, height: 99, 'type':'square' }"
                    @update="update('image_1', 'image_1')"
                  />
                </section>
            </div>

            <div>
              <span class="block mb-1 text-sm">Bild 2</span>
              <label
                v-if="!form.image_2"
                class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                >
                    <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                    <input
                      type="file"
                      accept="'image/*'"
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
                    :viewport="{ width: 99, height: 99, 'type':'square' }"
                    @update="update('image_2', 'image_2')"
                  />
                </section>
            </div>

            <div>
              <span class="block mb-1 text-sm">Bild 3</span>
              <label
                v-if="!form.image_3"
                class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                >
                    <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                    <input
                      type="file"
                      accept="'image/*'"
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
                    :viewport="{ width: 99, height: 99, 'type':'square' }"
                    @update="update('image_3', 'image_3')"
                  />
                </section>
            </div>
          </section>
        </div>
        <div class="flex justify-end">
          <button class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-10">
            Gutschein speichern
          </button>
        </div>
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
  import Colorpicker from '_components/Colorpicker'
  import InputField from '_components/Form/InputField'
  import Vue from 'vue';
  import VueCroppie from 'vue-croppie';
  import 'croppie/croppie.css' // import the croppie css manually

  Vue.use(VueCroppie);

  export default {
    components: {
      Button,
      Header2,
      VoucherCard,
      ToggleButton,
      TextAreaField,
      TextAreaField,
      Chrome,
      InputField,
      Colorpicker
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
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
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
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
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
      croppie (e, ref) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;

          var reader = new FileReader();
          reader.onload = e => {
            this.$refs[ref].$vnode.elm.parentElement.classList.remove('hidden')
            this.$refs[ref].bind({
              url: e.target.result
            });
          };

          reader.readAsDataURL(files[0]);
        },
        // CALBACK USAGE
        crop(ref, form) {
          // Here we are getting the result via callback function
          // and set the result to this.cropped which is being
          // used to display the result above.
          let size = form == 'background_image'
            ? { width: 367, height: 341}
            : { width: 200, height: 200};
          let options = {
              type: 'base64',
              format: 'jpeg',
              size,
              quality: 1,
          }
          this.$refs[ref].result(options, (output) => {
            this.form[form] = output
          });
      },
      update(ref, form) {
        this.crop(ref, form)
      },
      removeImage(e, form) {
        e.target.parentElement.classList.add('hidden')
        this.form[form] = ''
        this.form[form + '_update'] = false
      }
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
   input[type="file"] {
    display: none;
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