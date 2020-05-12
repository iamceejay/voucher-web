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
        <vSelect
          :id="id"
          ref="inputField"
          :name="id"
          class="mt-2"
          :class="{ 'text-red-500 border-red-500': errors.length > 0 }"
          :options="options" 
          :value="value"
          @input="onUpdateField"
        />
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
        type: Object,
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
    watch: {
    },
    mounted() {},
    methods: {
      onUpdateField(data) {
        this.$emit('input', data);
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
    padding: 2px 14px 2px;
  }
</style>