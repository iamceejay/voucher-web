<template>
  <div id="input-field-component" class="mb-5">
    <label class="block text-left text-gray-900 text-sm font-bold mb-0 font-body">
      {{ label }}
    </label>
    <div
      v-for="(row, index) in data"
      :key="`${row}-${index}`"
      class=" flex items-center mx-2"
    >
      <input 
        :id="`${row}-${index}`"
        v-model="checkboxValue"
        :name="name"
        :value="row"
        type="checkbox"
        @change="onUpdateField()"
      />
      <label class="text-xs p-1 font-bold text-gray-900 font-body">
        {{ row.substring(0,3) }}
      </label>
    </div>
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
      }, name: {
        type: String,
        default: ''
      }, type: {
        type: String,
        default: ''
      }, label: {
        type: String,
        default: ''
      }, value: {
        type: String,
        default: ''
      }, data: {
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
      return {
        checkboxValue: []
      }
    },
    mounted() {},
    methods: {
      onUpdateField() {
        this.$emit('onChange', this.checkboxValue);
      }
    }
  }
</script>
<style lang='css' scoped>
</style>