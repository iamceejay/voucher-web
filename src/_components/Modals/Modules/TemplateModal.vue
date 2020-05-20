<template>
  <Modal 
    :show="onShowModal" 
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Template
      </div>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form 
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit(invalid))"
        >
          <InputField
            id="name"
            v-model="form.name"
            type="text"
            class="w-full m-auto mt-4"
            label="Template Name"
            placeholder="Entere here"
            rules="required"
          />
          <div v-if="form.photo && form.photo != ''" class="flex w-full">
            <img 
              style="width: 180px; height: 190px;"
              :src="form.photo" 
              alt=""
            />
          </div>
          <FileInputField
            id="icon"
            v-model="form.photo"
            class="w-full m-auto"
            inputContainer="py-2 w-full md:w-2/5"
            label=""
            rules="required"
            :isMultiple="false"
            accept=".jpeg,.png,.jpg"
          />
          <Button
            class="justify-center"
            :label="`${form.id ? 'Update' : 'Save'}`"
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
  import FileInputField from "_components/Form/FileInputField";
  import Modal from '_components/Modals/'

  export default {
    components: {
      InputField,
      FileInputField,
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
        value: '',
        img: '',
        form: {
          id: null,
          name: '',
          photo: null,
        },
      }
    },
    watch: {
      onShowModal()
      {
        this.value = ''
        this.onSetForm()
      },
      'form.photo'(newVal)
      {
        this.onBase64(newVal)
      }
    },
    mounted() {
      this.onSetForm()
    },
    methods: {
      async onSubmit( isValid )
      {
        if( !isValid ) {
          const url = this.form.id ? 'UPDATE_TEMPLATE' : 'ADD_TEMPLATE'
          await this.$store.dispatch(url, this.form)
          this.$emit('onClose')
          this.form = {
            id: null,
            name: '',
            photo: null,
          }
        }
      },
      async onChangeFile(data)
      {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = async () => {
            
          this.form.photo = reader.result
          // console.log('this.form.photo', this.form.photo)
        }
      },
      onBase64(data)
      {
        if( data != '' && data && data.length > 0 ) {
          const file = data[0]
          if( file instanceof File ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
              this.form.photo = reader.result
            }
          }
        }
      },
      onSetForm()
      {
        console.log('this.data', this.data)
        this.form = this.data?.id 
          ? 
            this.data
          :
            {
              id: null,
              name: '',
              photo: '',
            }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>