<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="flex flex-col justify-center m-auto max-w-2xl pt-12 w-full"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="w-full flex flex-col m-auto mb-10" style="max-width: 368px">
        <div class="bg-white flex flex-row flex-wrap w-full p-5 ">
          <div class="flex flex-col w-full">
            <div class="text-sm mb-2">Hintergrundbild wählen</div>
            <!-- Using the slider component -->
            <slider ref="slider" :options="options">
                <!-- slideritem wrapped package with the components you need -->
                <slideritem >
                  <label class="border file flex h-full input-field items-center justify-center px-3 py-2 rounded-sm text-xs w-full cursor-pointer flex-col" style="background-color: #F7F7F7">
                      <i class="fa fa-cloud-upload-alt mb-1 text-2xl"></i>
                      <span>Eigenes Bild</span>
                      <input
                        type="file"
                        id="file"
                        accept="'image/*'"
                        aria-label="File browser example"
                        @change="(e) => croppie(e, 'croppieRef')"/>
                    <span class="file-custom"></span>
                  </label>
                </slideritem>
                <slideritem v-for="(tem, index) in TEMPLATES" :key="index">
                  <div
                    class="w-full h-full"
                    :style="{ backgroundImage: 'url(' + api_base_url + '/storage/' + tem.image + ')',
                      backgroundColor: 'white'
                    }"
                    style="background-size: cover"

                  ></div>
                  <span
                    class="absolute bg-white bottom-0 flex h-6 items-center justify-center mb-2 mr-2 right-0 rounded-full text-peach text-xs w-6 cursor-pointer"
                    @click="onSelectTemplate(api_base_url + '/storage/' + tem.image, tem.id)"
                  >
                    <i class="fa fa-check" v-if="selected_template == tem.id"></i>
                  </span>
                </slideritem>
                <!-- Customizable loading -->
            </slider>

            <!-- <label class="file input-field px-3 py-2 rounded-sm text-xs mb-3" style="background-color: #F7F7F7">
                <i class="fa fa-cloud-upload-alt mr-1"></i> Bild hochladen
                <input
                  type="file"
                  id="file"
                  accept="'image/*'"
                  aria-label="File browser example"
                  @change="(e) => croppie(e, 'croppieRef')"/>
              <span class="file-custom"></span>
            </label> -->
            <section class="hidden">
              <vue-croppie
                ref="croppieRef"
                :enableOrientation="true"
                :enableResize="false"
                :boundary="{ width: 328, height: 305 }"
                :viewport="{ width: 328, height: 305, 'type':'square' }"
                @update="update('croppieRef', 'custom_background_image')"
              />
            </section>
            <!-- the result -->
          </div>

          <TextAreaField
            id="description"
            v-model="form.note"
            class="w-full"
            label="Persönlichen Nachricht"
            rules="max:80"
          />

          <span class="font-semibold text-sm mb-1">Preis verstecken</span>
          <div class="mb-1 relative w-full">
            <span class="mr-3">
              <toggle-button
                v-model="form.price_hidden"
                :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
              />
            </span>
            <label class="text-sm col-span-2">nein / ja</label>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-10 flex-1">
            Gutschein speichern
          </button>
        </div>
      </div>
      <div class="flex flex-col w-full items-center mb-6">
        <VoucherCard
          v-if="data && data.order.voucher"
          :key="`vform-${formIndex}`"
          :voucher="form"
          :order="data.order"
          :userVoucher="userVoucher"
          :isFlippable="false"
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
  import Colorpicker from '_components/Colorpicker'
  import InputField from '_components/Form/InputField'
  import Vue from 'vue';
  import VueCroppie from 'vue-croppie';
  import 'croppie/croppie.css' // import the croppie css manually
  import { slider, slideritem } from 'vue-concise-slider'

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
      Colorpicker,
      slider,
      slideritem
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
          background_aid: 'transparent',
          custom_background_image: ''
        },
        chunk_template: [],
        chunk_custom_image: [],
        tempTemplates: [],
        options: {
          currentPage: 0,
          tracking: false,
          infinite: 2,
          slidesToScroll: 2,
        },
        selected_template: null,
        default_background: ''
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

          await this.onUpdateData(tempForm)

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
      async onUpdateData(data)
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('UPDATE_USER_VOUCHER', data)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      onSetForm()
      {
        this.onSetTemplates()

        this.userVoucher = {
          ...this.data
        }

        if(!this.data?.id) {
          return
        }

        if (this.data.data_json != null) {
          this.form.id = this.data.id
          this.form = this.data.data_json
          this.form.image_1_update = true
          this.form.image_2_update = true
          this.form.image_3_update = true
          this.default_background = this.form.background_image
        } else {
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
            category: [this.data.voucher_category.id],
            text_color: this.data.text_color,
            background_color: this.data.background_color,
            background_aid: this.data.background_aid,
            background_image: this.data.background_image,
            seller: this.AUTH_USER.data,
            background_description_color: '#1D4F55',
            background_description_personal_color: '#1D4F55',
            header_and_footer_background_color: '#fff',
            description_color: '#fff',
            personal_description_color: '#fff',
            header_and_footer_color: '#000',
            price_hidden: this.data.price_hidden ? true : false
          }
          console.log('test')
        }
        console.log(this.form)
        // if(this.data?.id) {
        //   this.form.order_id = this.data.order.id
        //   const { text_color, note } = this.data
        //   this.form = {
        //     templates: [
        //       ...this.form.templates
        //     ],
        //     text_color: (text_color != null) ? text_color : this.data.order.voucher.text_color,
        //     note,
        //     background_aid: this.data.background_aid,
        //     custom_image: this.data.custom_image,
        //     price_hidden: this.data.price_hidden ? true : false
        //   }
        //   if( this.userVoucher.template ) {
        //     const template = this.userVoucher.template
        //     this.form.templates = [
        //       ...this.form.templates,
        //       {
        //         id: template.id,
        //         image: template.image,
        //         status: 1,
        //       }
        //     ]
        //   }
        // }
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
      onSelectTemplate(url, id)
      {

        if (this.selected_template == id) {
          this.selected_template = null
          this.form.custom_background_image = ''
          this.$refs.croppieRef.$vnode.elm.parentElement.classList.add('hidden')
          this.formIndex++
          return
        }
        this.selected_template = id
        this.$refs.croppieRef.$vnode.elm.parentElement.classList.remove('hidden')
        this.$refs.croppieRef.bind({
          url: url
        });
        this.formIndex++
      },
      onChangeForm()
      {
        this.userVoucher = {
          ...this.userVoucher,
          ...this.form
        }
        this.formIndex = this.formIndex + 1
      },
      croppie (e, ref) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
          this.selected_template = null
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
        let options = {
            type: 'base64',
            format: 'jpeg',
            size: { width: 367, height: 341},
            quality: 1,
        }

        this.$refs[ref].result(options, (output) => {
          this.form[form] = output
        });

        this.formIndex++
      },
      update(ref, form) {
        this.crop(ref, form)
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
   input[type="file"] {
    display: none;
  }

  .slider-item {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 8px;
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