<template>
  <div id="input-field-component">
    <ValidationProvider 
      :name="id" 
      :rules="rules"
    >
      <template #default="{ errors }">
        <label 
          v-if="label != ''"
          class="block text-left text-gray-700 text-sm font-bold mb-0"
        >
          {{ label }}
        </label>
        <input
          :id="id"
          ref="inputField"
          :name="id"
          :type="type"
          class="input-field"
          :class="{ 'text-red-500 border-red-500': errors && errors.length > 0 }"
          :value="value"
          :placeholder="placeholder"
          @input="onUpdateField()"
        />
        <ErrorMessage :errors="errors" />
      </template>
    </ValidationProvider>
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage'

  export default {
    components: {
      ErrorMessage
    },
    props: {
      id: {
        type: [Number, String],
        default: null
      }, type: {
        type: String,
        default: ''
      }, label: {
        type: String,
        default: ''
      }, placeholder: {
        type: String,
        default: ''
      }, value: {
        type: String,
        default: ''
      }, 
      rules: {
        type: String,
        default: ''
      },
    },
    data() {
      return {};
    },
    mounted() {},
    methods: {
      onUpdateField() {
        this.$emit('input', this.$refs.inputField.value);
      }
    }
  }
</script>
<style lang='css' scoped>
</style>