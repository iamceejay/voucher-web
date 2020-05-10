<template>
  <div id="input-field-component" class="mb-5">
    <ValidationProvider 
      :name="id" 
      :rules="rules"
    >
      <template #default="{ errors }">
        <label 
          v-if="label != ''"
          class="block text-left text-gray-900 text-sm font-bold mb-0 font-body"
        >
          {{ label }}
        </label>
        <div class="w-full flex flex-row relative">
          <input
            :id="id"
            ref="inputField"
            :name="id"
            :type="type"
            class="input-field mt-2 py-2 px-3 rounded-full text-sm font-semibold font-body"
            :class="{ 'text-red-500 border-red-500': errors && errors.length > 0 }"
            :value="value"
            :placeholder="placeholder"
            @input="onUpdateField()"
          />
          <span class="search-icon">
            <i class="fas fa-search" />
          </span>
        </div>
        <ErrorMessage :errors="[...errors, ...errorMessages]" />
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
  .search-icon {
    position: absolute;
    right: 0;
    padding: 15px;
  }
</style>