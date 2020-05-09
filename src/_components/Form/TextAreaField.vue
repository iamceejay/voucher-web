<template>
  <div id="text-area-field-component">
    <label 
      v-if="label != ''"
      class="block text-left text-gray-900 text-sm font-bold mb-0 font-body"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      ref="inputField"
      :rows="rows"
      :name="id"
      class="input-field mt-2 py-2 px-3 rounded-lg text-sm font-semibold font-body"
      :class="{ 'text-red-500 border-red-500': errors && errors.length > 0 }"
      :value="value"
      :maxlength="max"
      :placeholder="placeholder"
      @input="onUpdateField()"
    />
    <ErrorMessage :errors="errors" />
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
      }, max: {
        type: Number,
        default: null
      }, label: {
        type: String,
        default: ''
      }, placeholder: {
        type: String,
        default: ''
      }, value: {
        type: String,
        default: ''
      }, rows: {
        type: String,
        default: '3'
      }, errors: {
        type: Array,
        default() {
          return []
        }
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