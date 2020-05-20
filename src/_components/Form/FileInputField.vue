<template>
  <div 
    id="input-field-component" 
    :key="`file-input-${fileIndex}`" 
    class="mb-5"
  >
    <ValidationProvider 
      ref="provider"
      :name="id" 
      :rules="rules"
    >
      <template #default="{ validate, errors }">
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
        <label 
          class="file-select flex w-full mt-2 px-3 rounded-full text-sm font-semibold font-body justify-center"
          :class="[ inputContainer, { 'text-red-500 border-red-500': errors && errors.length > 0 }]"
        >
          <span v-if="!isMultiple">
            {{ value ? 'Change selected' : 'Select a file' }}
          </span>
          <span v-else>
            {{ value ? 'Choose another' : 'Select a file(s)' }}
          </span>
          <input 
            :id="id"
            ref="inputField"
            class="w-full"
            :name="id"
            type="file"
            :accept="accept" 
            :multiple="isMultiple ? 'multiple' : false"
            @change="handleFileChange"
          />
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
      }, label: {
        type: String,
        default: ''
      }, note: {
        type: String,
        default: ''
      }, isMultiple: {
        type: Boolean,
        default: false
      }, accept: {
        type: String,
        default: ''
      }, rules: {
        type: String,
        default: ''
      }, size: {
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
      }, disabled: {
        type: Boolean,
        default: false
      }, readonly: {
        type: Boolean,
        default: false
      }, value: {
        type: [Array, Object, String, FileList],
        default() {
          return null
        }
      }, data: {
        type: [Array, Object, String],
        default() {
          return null
        }
      }
    },
    data() {
      return {
        attachment: null,
        fileIndex: 0,
      }
    },
    watch: {
      data(newVal)
      {
        console.log('nag change newVal', newVal)
      }
    },
    mounted() {},
    methods: {
      async handleFileChange(e) {
        const { valid } = await this.$refs.provider.validate(e);
        if (valid) {
          let { files }  = e.target;
          this.$emit('input', files);
        }
      },
      async onConvertFile(e) {
        let { files }  = e.target;
        if (!files.length) return;
        
        const data = this.isMultiple ? files : files[0]

        await this.$emit('onChange', data);
        this.fileIndex = this.fileIndex + 1
      },
    }
  }
</script>
<style lang='css' scoped>
  .file-select {
    cursor: pointer;
    color: white;
    background-color: #1a202c;
  }
  .file-select input[type="file"] {
      display: none;
  }
</style>