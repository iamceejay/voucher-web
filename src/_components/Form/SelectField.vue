<template>
  <div 
    id="select-field-component" 
    class="w-full mb-5"
  >
    <label class="block text-left text-gray-900 text-sm font-bold mb-0 font-body">{{ label }}</label>
    <select
      :id="id"
      ref="inputField"
      class="input-field mt-2 py-2 px-3 rounded-full text-sm font-semibold"
      :class="{ 'text-red-500 border-red-500': errors.length > 0 }"
      :name="id"
      :value="(typeof value.value != 'undefined') ? value.value : value "
      @change="onUpdateField()"
    >
      <option 
        value="" 
        selected 
        disabled
      >
        Choose here
      </option>
      <option
        v-for="(option, index) in options"
        :key="`${id}-${index}`"
        :value="(typeof option.value != 'undefined') ? option.value : option"
      >
        {{ option.text || option }}
      </option>
    </select>
    <ErrorMessage :errors="errors" />
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage';

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
      }, value: {
        type: String,
        default: ''
      }, options: {
        type: Array,
        default() {
          return []
        }
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
    watch: {
      value() {}
    },
    mounted() {},
    methods: {
      onUpdateField() {
        let val = this.$refs.inputField.value;
        let inputValue =
          typeof this.value.value != 'undefined'
            ? this.options.filter(option => option.value == val)[0]
            : val;
        this.$emit('input', inputValue);
      }
    }
  }
</script>
<style lang='css' scoped>
</style>