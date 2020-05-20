<template>
  <Modal 
    :show="onShowModal" 
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Category
      </div>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form 
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit(invalid))"
        >
          <InputField
            id="label"
            v-model="form.label"
            type="text"
            class="w-full m-auto mt-4"
            label="Category Name"
            placeholder="Entere here"
            rules="required"
          />
          <InputField
            id="icon"
            v-model="form.icon"
            type="text"
            class="w-full m-auto mt-4"
            label="Icon"
            note="(Note: Please refer on https://fontawesome.com/icons)"
            placeholder="Ex. fa-building"
            rules="required"
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
        value: '',
        form: {
          id: null,
          label: '',
          icon: '',
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
      async onSubmit( isValid )
      {
        if( !isValid ) {
          const url = this.form.id ? 'UPDATE_CATEGORY' : 'ADD_CATEGORY'
          await this.$store.dispatch(url, this.form)
          this.$emit('onClose')
          this.form = {
            id: null,
            label: '',
            icon: '',
          }
        }
      },
      onSetForm()
      {
        this.form = this.data?.id 
          ? 
            this.data
          :
            {
              id: null,
              label: '',
              icon: '',
            }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>