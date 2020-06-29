<template>
  <Modal 
    :show="onShowModal" 
    @close="$emit('onClose')"
  >
    <template>
      <div class="font-bold text-lg py-2 text-center text-gray-900 text-3xl">
        Einlösung rückgängig machen
      </div>
      <!-- <ValidationObserver v-slot="{ handleSubmit, invalid }"> -->
      <form 
        class="w-full flex flex-col"
      >
        <!-- <InputField
          id="text"
          v-model="value"
          type="text"
          class="w-full md:w-1/2 m-auto mt-4"
          placeholder="Enter value to put back on voucher"
          rules="required"
        /> -->
        <Button
          class="mx-2 justify-center"
          label="Einlösung rückgängig machen"
          size="mt-1 w-full md:w-1/2 py-3"
          round="rounded-full"
          @onClick="onSubmit"
        />
      </form>
      <!-- </ValidationObserver> -->
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
        type: Array,
        default() {
          return []
        }
      },
      onShowModal: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        value: ''
      }
    },
    watch: {
      onShowModal()
      {
        this.value = ''
      }
    },
    mounted() {
    },
    methods: {
      async onSubmit( isValid )
      {
        if( !isValid ) {
          try {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('REVOKE_REDEMPTION', {
              id: this.id
            })
            this.$emit('onClose')
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          } catch (err) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
          // this.value = ''
        }
      }
    }
  }
</script>
<style lang="css" scoped>
</style>