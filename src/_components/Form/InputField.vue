<template>
  <div id="input-field-component" class="mb-5">
    <ValidationProvider 
      :name="id" 
      :rules="rules"
    >
      <template #default="{ errors }">
        <Header5
          v-if="label != ''"
          :label="label"
        />
        <input
          :id="id"
          ref="inputField"
          :name="id"
          :type="type"
          class="input-field mt-2 px-3 rounded-full text-sm font-semibold font-body"
          :class="[ inputContainer, { 'text-red-500 border-red-500': errors && errors.length > 0 }]"
          :value="value"
          min="0"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="onUpdateField()"
        />
        <ErrorMessage :errors="[...errors, ...errorMessages]" />
      </template>
    </ValidationProvider>
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage'
  import Header5 from '_components/Headers/Header5';

  export default {
    components: {
      ErrorMessage,
      Header5
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
        type: [Number, String],
        default: null
      }, rules: {
        type: String,
        default: ''
      }, errorMessages: {
        type: Array,
        default() {
          return []
        }
      }, inputContainer: {
        type: String,
        default: 'py-2'
      }, disabled: {
        type: Boolean,
        default: false
      }, readonly: {
        type: Boolean,
        default: false
      }
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