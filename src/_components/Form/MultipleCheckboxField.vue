<template>
  <div id="input-field-component" class="mb-5">
    <Header5
      v-if="label != ''"
      :label="label"
    />
    <slot name="label_" />
    <div
      v-for="(row, index) in options"
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
        {{ limitLabel > 0 ? row.substring(0,limitLabel) : row }}
      </label>
    </div>
    <ErrorMessage :errors="errors" />
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
      }, limitLabel: {
        type: Number,
        default: 0
      }, data: {
        type: Array,
        default() {
          return []
        }
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
      return {
        checkboxValue: []
      }
    },
    watch: {
      data() {
        this.checkboxValue = this.data
      }
    },
    mounted() {
      this.checkboxValue = this.data
    },
    methods: {
      onUpdateField() {
        this.$emit('onChange', this.checkboxValue);
      }
    }
  }
</script>
<style lang='css' scoped>
</style>