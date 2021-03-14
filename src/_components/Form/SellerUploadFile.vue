<template>
  <div
    id="input-field-component"
    :key="`file-input-${fileIndex}`"
    class="mb-5 text-sm"
  >
    <ValidationProvider
      ref="provider"
      :name="id"
      :rules="rules"
    >
      <template #default="{ validate, errors }">
        <span
          v-if="note != ''"
          class="text-xs font-semibold"
        >
          {{ note }}
        </span>
        <label
          class="file-select flex flex-col p-6 w-full mt-2 justify-center items-center rounded-sm border text-center"
        >
          <i class="fa fa-cloud-upload-alt mb-4 text-xl"></i>
          <span v-if="!isMultiple">
            {{ value ? 'Change selected' : label }}
          </span>
          <span v-else>
            {{ value ? 'Choose another' : label }}
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
        type: [Array, Object, String, FileList, File],
        default() {
          return null
        }
      }, data: {
        type: [Array, Object, String],
        default() {
          return null
        }
      }, round: {
        type: String,
        default: 'rounded-full'
      },
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
    background-color: #F7F7F7;
    height: 120px;
  }
  .file-select input[type="file"] {
      display: none;
  }
</style>