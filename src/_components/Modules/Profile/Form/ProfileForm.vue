<template>
  <div class="flex flex-col w-full">
    <InputField
      id="username"
      v-model="form.username"
      type="text"
      class="m-2"
      label="Username"
      :rules="`required|unique:users,username,${form.id}`"
      :errorMessages="errorMessages.username"
      @input="onChange"
    />
    <div class="flex flex-row">
      <InputField
        id="firstName"
        v-model="form.firstName"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Name"
        rules="required"
        :errorMessages="errorMessages.firstName"
        @input="onChange"
      />
      <InputField
        id="lastName"
        v-model="form.lastName"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Surname"
        rules="required"
        :errorMessages="errorMessages.lastName"
        @input="onChange"
      />
    </div>
    <div class="flex flex-row">
      <InputField
        id="address"
        v-model="form.address"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Address"
        :errorMessages="errorMessages.address"
        @input="onChange"
      />
      <InputField
        id="zip_code"
        v-model="form.zip_code"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Zip Code"
        :errorMessages="errorMessages.zip_code"
        @input="onChange"
      />
    </div>
    <InputField
      id="email"
      v-model="form.email"
      type="text"
      class="m-2"
      label="Email address"
      :rules="`required|email|unique:users,email,${form.id}`"
      :errorMessages="errorMessages.email"
      @input="onChange"
    />
    <!-- <InputField
      id="password"
      v-model="form.password"
      type="password"
      class="m-2"
      label="Password"
      rules="required|min:8|max:16"
      :errorMessages="errorMessages.password"
      @input="onChange"
    />
    <InputField
      id="confirmPassword"
      v-model="form.confirmPassword"
      type="password"
      class="m-2"
      label="Repeat Password"
      rules="required|min:8|max:16|password:@password"
      :errorMessages="errorMessages.confirmPassword"
      @input="onChange"
    /> -->
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
      },
      data: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        form: {
          id: null,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          zip_code: '',
          // password: '',
          // confirmPassword: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region_id: '',
          }
        }
      }
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      }
    },
    mounted() {
      this.onSetForm()
    },
    methods: {
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            ...this.data
          }
        }
      },
      onChange()
      {
        this.$emit('onChange', this.form)
      }
    }
  }
</script>
<style lang="css" scoped>
</style>