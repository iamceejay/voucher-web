<template>
  <div 
    id="input-checkbox-component"
    :class="[ container ]"
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
        <div class=" flex items-center mx-2">
          <input
            :id="id"
            :name="id"
            :value="value"
            type="checkbox"
            :checked="value"
            @change="onUpdateField"
          />
          <label v-if="labelSentence != ''" class="text-xs p-1 mt-0 font-bold text-gray-900 font-body">
            {{ limitLabel > 0 ? labelSentence.substring(0,limitLabel) : labelSentence }}
          </label>
          <slot name="labelSentence_" />
        </div>
        <ErrorMessage 
          class="mx-2" 
          :errors="[...errors, ...errorMessages]"
        />
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
      }, name: {
        type: String,
        default: ''
      }, label: {
        type: String,
        default: ''
      }, labelSentence: {
        type: String,
        default: ''
      }, value: {
        type: Boolean,
        default: false
      }, limitLabel: {
        type: Number,
        default: 0
      }, container: {
        type: String,
        default: 'mb-5'
      }, rules: {
        type: [String, Object],
        default: null
      }, errorMessages: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        checkboxValue: false
      }
    },
    watch: {
      data() {
        // this.checkboxValue = this.value
      }
    },
    mounted() {
      // this.checkboxValue = this.value
    },
    methods: {
      onUpdateField( e ) {
        this.$emit('input', e.target.checked );
        // this.$emit('onChange', this.checkboxValue);
      }
    }
  }
</script>
<style lang='css' scoped>
</style>