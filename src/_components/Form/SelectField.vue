<template>
  <div 
    id="select-field-component" 
    class="w-full mb-5"
  >
    <ValidationProvider 
      :name="id" 
      :rules="rules"
    >
      <template #default="{ errors }">
        <Header5
          v-if="label != ''"
          :label="label"
        />
        <slot name="label_" />
        <span 
          v-if="note != ''"
          class="text-xs font-semibold"
        >
          {{ note }}
        </span>
        <slot name="note_" />
        <vSelect
          :id="id"
          ref="inputField"
          :multiple="multiple"
          :name="id"
          class="mt-2"
          :class="{ 'text-red-500 border-red-500': errors.length > 0 }"
          :options="options" 
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="onUpdateField"
        >
          <template #selected-option="data">
            <slot name="selected_option_" :option="data" />
          </template>
          <template #option="data">
            <slot name="option_" :option="data" />
          </template>
        </vSelect>
        <ErrorMessage :errors="[...errors, ...errorMessages]" />
      </template>
    </ValidationProvider>
  </div>
</template>
<script>
  import ErrorMessage from './FieldErrorMessage';
  import Header5 from '_components/Headers/Header5';
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css';
  
  export default {
    components: {
      vSelect,
      ErrorMessage,
      Header5
    },
    
    props: {
      id: {
        type: [Number, String],
        default: null
      }, label: {
        type: String,
        default: ''
      }, value: {
        type: [Object, Array],
        default() {
          return null
        }
      }, options: {
        type: Array,
        default() {
          return []
        }
      }, rules: {
        type: String,
        default: ''
      }, placeholder: {
        type: String,
        default: ''
      }, note: {
        type: String,
        default: ''
      }, errorMessages: {
        type: Array,
        default() {
          return []
        }
      }, multiple: {
        type: Boolean,
        default: false
      }, disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    watch: {
      value(newVal, oldVal)
      {
        this.$emit('selected', newVal)
        // let selected = null
        // newVal.map( row => {
        //   if( !oldVal.includes( row ) ) {
        //     this.$emit('selected', row)
        //   }
        // })
      },
    },
    mounted() {},
    methods: {
      onUpdateField(data) {
        this.$emit('input', data)
      }
    }
  }
</script>
<style lang='css'>
  .v-select .vs__dropdown-toggle {
    border-radius: 25px;
  }
  .vs__search, .vs__search:focus {
    padding: 0px !important;
  }
  .vs--open .vs__dropdown-toggle {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .v-select .vs__selected-options {
    padding: 4px 14px 4px;
  }
  .v-select .vs__search {
    color: #b7c2ce;
    font-family: Manrope, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
  }
</style>