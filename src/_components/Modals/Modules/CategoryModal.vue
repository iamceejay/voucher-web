<template>
  <Modal
    :show="onShowModal"
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Category
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <InputField
            id="name"
            v-model="form.name"
            type="text"
            class="w-full m-auto mt-4"
            label="Category Name"
            placeholder="Entere here"
            rules="required"
          />
          <div>
            <span class="block mb-1 text-sm">Image</span>
            <label
              class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs text-center cursor-pointer" style="background-color: rgb(247, 247, 247);"
              >
                  <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-3xl text-center"></i> (Ideales Maß ist 400px x 300px)
                  <input
                    type="file"
                    accept="'image/*'"
                    aria-label="File browser example"
                    @change="(e) => croppie(e, 'logo')"
                    />
                  <span class="file-custom"></span>
              </label>
              <section v-if="form.id && !form.logo" class="relative border" style="width: 200px; height: 150px;">
                <img :src="onSetLogo('set', form.icon)" style="width: auto; height: 100%;"/>
              </section>
              <section class="relative hidden">
                <!-- <i
                  class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                  @click="(e) => removeImage(e, 'logo')"
                ></i> -->
                <vue-croppie
                  ref="logo"
                  :enableOrientation="true"
                  :enableResize="false"
                  :boundary="{ width: 200, height: 150 }"
                  :viewport="{ width: 200, height: 150, 'type':'square' }"
                  @update="update('logo', 'logo')"
                />
              </section>
          </div>
          <Button
            class="justify-center"
            :label="`${form.id ? 'Update' : 'Speichern'}`"
            size="mt-1 w-full py-3"
            round="rounded-full"
            type="submit"
          />
        </form>
      </ValidationObserver>
    </template>
  </Modal>
</template>
<script>
  import Button from '_components/Button/'
  import InputField from "_components/Form/InputField";
  import Modal from '_components/Modals/'

  export default {
    components: {
      InputField,
      Button,
      Modal,
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        }
      },
      onShowModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        example: '<i class="fas fa-book"></i>',
        value: '',
        form: {
          id: null,
          name: '',
          logo: '',
        },
      }
    },
    watch: {
      onShowModal()
      {
        this.value = ''
        this.onSetForm()
      }
    },
    mounted() {
      this.onSetForm()
    },
    methods: {
      async onSubmit()
      {
        try {
          const url = this.form.id ? 'UPDATE_CATEGORY' : 'ADD_CATEGORY'
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch(url, this.form)
          this.$emit('onClose')
          this.form = {
            id: null,
            name: '',
            logo: '',
            icon: ''
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
      onSetForm()
      {
        this.form = this.data?.id
          ?
            {...this.form, ...this.data}
          :
            {
              id: null,
              name: '',
              logo: '',
              icon: ''
            }
        console.log(this.form)
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
          let size = { width: 400, height: 300};
          let options = {
              type: 'base64',
              format: 'jpeg',
              size,
              quality: 1,
          }
          this.$refs[ref].result(options, (output) => {
            this.form.logo = output
          });
      },
      update(ref, form) {
        this.crop(ref, form)
      },
      onSetLogo(action, value)
      {
        if( action == 'set' ) {
          return (value.search('base64') < 0) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        } else {
          this.form.company.logo = ''
          this.logo = ''
        }
      },
    }
  }
</script>
<style lang="css" scoped>
input[type="file"] {
  display: none;
}
</style>