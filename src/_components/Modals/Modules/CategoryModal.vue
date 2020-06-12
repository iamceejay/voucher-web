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
          <InputField
            id="icon"
            v-model="form.icon"
            type="text"
            class="w-full m-auto mt-4"
            label="Icon"
            placeholder="Ex. fas fa-building"
            rules="required"
          >
            <template #note_>
              <div class="text-xs font-semibold">
                <p>
                  (Note: Please refer on https://fontawesome.com/icons)
                </p>
                <p>
                  Please copy the text inside the quote (fas fas fa-book) and only the free icons will work.
                </p>
                <p>
                  Ex. in Fontawesome page: {{ example }}
                </p>
              </div>
            </template>
          </InputField>
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
        example: '<i class="fas fas fa-book"></i>',
        value: '',
        form: {
          id: null,
          name: '',
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
            icon: '',
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