<template>
  <div id="input-field-component" class="mb-2">
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
        <span class="relative">
          <input
            :id="id"
            ref="inputField"
            :name="id"
            :type="type === 'password' && isPasswordShown ? 'text': type"
            class="input-field mt-2 px-3 text-sm"
            :class="[ inputContainer, { 'text-red-500 border-red-500': errors && errors.length > 0 }]"
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :step="step"
            @input="onUpdateField()"
          />
          <i v-if="passwordToggle"
            class="password-toggle"
            :class="isPasswordShown ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click="onToggleShowPassword()"></i>
        </span>
        <ErrorMessage class="mt-1" :errors="[...errors, ...errorMessages]" />
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
      }, note: {
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
      }, step: {
        type: [String, Number],
        default: 'any'
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
      },
      passwordToggle: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isPasswordShown: false
      };
    },
    mounted() {},
    methods: {
      onUpdateField() {
        this.$emit('input', this.$refs.inputField.value);
      },
      onToggleShowPassword() {
        this.isPasswordShown = !this.isPasswordShown;
      }
    }
  }
</script>
<style lang='css' scoped>
input {
  background-color: #F7F7F7;
  border-color: #00000033;
}

.password-toggle {
  top: 50%;
  right: .8rem;
  transform: translateY(-50%);
  @apply cursor-pointer absolute text-sm;
}
</style>