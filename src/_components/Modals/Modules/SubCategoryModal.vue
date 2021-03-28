<template>
  <Modal
    :show="onShowModal"
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Sub Category
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <ValidationProvider rules="required" v-slot="{ errors }">
            <vSelect label="name" :options="CATEGORIES"  v-model="form.category" />
            <span class="text-xs text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <InputField
            id="name"
            v-model="form.name"
            type="text"
            class="w-full m-auto mt-4"
            label="Category Name"
            placeholder="Entere here"
            rules="required"
          />
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
  import SelectField from '_components/Form/SelectField'
  import vSelect from 'vue-select'

  export default {
    components: {
      InputField,
      Button,
      Modal,
      vSelect
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
          category: '',
          name: '',
          icon: '',
        },
      }
    },
    computed: {
      CATEGORIES() {
        return this.$store.getters.CATEGORIES;
      },
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

          const url = this.form.id ? 'UPDATE_SUBCATEGORY' : 'ADD_SUBCATEGORY'
          let form = {
            id: this.form.id,
            category: this.form.category.id,
            name: this.form.name
          }

          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch(url, form)

          this.$emit('onCloseModal')
          this.form = {
            id: null,
            category: '',
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        } catch (err) {
          console.log(err)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
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
              name: '',
              icon: '',
            }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>