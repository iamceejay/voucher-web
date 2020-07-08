<template>
  <div
    id="datepicker-field-component"
    :class="[ container ]"
  >
    <ValidationProvider 
      :ref="id"
      :vid="id"
      :rules="rules"
    >
      <template #default="{ errors }">
        <Header5
          v-if="label != ''"
          :label="label"
        />
        <DatePicker
          v-model="date"
          :inputAttr="{name: id, id}"
          class=" w-full"
          inputClass="input-field mt-2 py-2 px-3 rounded-full text-sm font-semibold"
          :format="format"
          type="date"
          :placeholder="placeholder"
          valueType="format"
          @input="onUpdateField"
        />
        <ErrorMessage :errors="[...errors, ...errorMessages]" />
      </template>
    </ValidationProvider>
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage'
  import DatePicker from 'vue2-datepicker'
  import Header5 from '_components/Headers/Header5';

  export default {
    components: {
      ErrorMessage,
      DatePicker,
      Header5
    },
    props: {
      id: {
        type: [Number, String],
        default: null
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
      }, container: {
        type: String,
        default: 'mb-5'
      }, errorMessages: {
        type: Array,
        default() {
          return []
        }
      }, format: {
        type: String,
        default: 'YYYY-MM-DD'
      },
    },
    data() {
      return {
        date: ''
      }
    },
    watch: {
      value()
      {
        this.date = this.value
      }
    },
    mounted() {
      this.date = this.value
    },
    methods: {
      onUpdateField() {
        this.$emit('input', this.date);
      }
    }
  }
</script>
<style lang='css' scoped>
  .mx-datepicker {
    width: 100%;
  }
</style>