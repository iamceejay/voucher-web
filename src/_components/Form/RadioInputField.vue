<template>
  <div
    id="input-field-component"
    :class="[ containerClass ]"
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
        <span 
          v-if="note != ''"
          class="text-xs font-semibold"
        >
          {{ note }}
        </span>
        <slot name="note_" />
        <input
          :id="id"
          ref="inputField"
          :name="name"
          type="radio"
          class="hidden radio-input"
          :class="[ inputContainer, { 'text-red-500 border-red-500': errors && errors.length > 0 }]"
          :value="data"
          :checked="(data == val || value == data)"
          @change="onUpdateField()"
        />
        <label :for="id" class="flex items-center cursor-pointer text-base font-bold">
          <span class="w-8 h-8 inline-block mr-2 rounded-full border border-gray-500 flex-no-shrink flex justify-center">
            <i v-if="(data == val || value == data)" class="radio-icon fas fa-check self-center text-white" />
          </span>
          {{ description }}
        </label>
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
      }, name: {
        type: String,
        default: ''
      }, label: {
        type: String,
        default: ''
      }, description: {
        type: String,
        default: ''
      }, note: {
        type: String,
        default: ''
      }, data: {
        type: [Number, String],
        default: null
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
      }, containerClass: {
        type: String,
        default: 'mb-5'
      }, 
    },
    data() {
      return {
        val: ''
      }
    },
    watch: {
      value(newVal){
        // console.log('newVal', newVal)
      },
    },
    mounted() {
    },
    methods: {
      onUpdateField() {
        let value = this.$refs.inputField.value
        this.val = value
        this.$emit('input', value);
      }
    }
  }
</script>
<style lang='css' scoped>
	.radio-input + label span {
		transition: background .2s,	transform .2s;
	}
	.radio-input + label span:hover,
	.radio-input + label:hover span{
		transform: scale(1.2);
	}

	.radio-input:checked + label span {
		background-color: #ff5563;
  }

	.radio-input:checked + label .radio-icon {
    display: block;
	}

	.radio-input:checked + label{
    color: #ff5563;
	}

</style>