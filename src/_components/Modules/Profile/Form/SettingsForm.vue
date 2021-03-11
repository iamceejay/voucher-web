<template>
  <div class="flex flex-col w-full">
    <InputField
      id="password"
      class="mb-4"
      v-model="form.password"
      type="password"
      label="Passwort"
      rules="required|min:8|max:16"
      :errorMessages="errorMessages.password"
      @input="onChange"
    />
    <InputField
      id="confirmPassword"
      class="mb-4"
      v-model="form.confirmPassword"
      type="password"
      label="Passwort wiederholen"
      rules="required|min:8|max:16|password:@password"
      :errorMessages="errorMessages.confirmPassword"
      @input="onChange"
    />
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';

  export default {
    components: {
      InputField,
    },
    props: {
      errorMessages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        form: {
          password: '',
          confirmPassword: '',
        }
      }
    },
    mounted() {
    },
    methods: {
      onChange()
      {
        this.$emit('onChange', this.form)
      }
    }
  }
</script>
<style lang="css" scoped>
</style>