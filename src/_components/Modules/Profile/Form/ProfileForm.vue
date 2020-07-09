<template>
  <div class="flex flex-col w-full">
    <InputField
      id="company_name"
      v-model="form.company.name"
      type="text"
      class="m-2"
      label="Company Name"
      rules="required"
      :errorMessages="errorMessages.company && errorMessages.company.name"
      @input="onChange"
    />
    <InputField
      id="username"
      v-model="form.username"
      type="text"
      class="m-2"
      label="Username"
      :rules="`required|unique:users,username,${form.id}`"
      :errorMessages="errorMessages.username"
      :disabled="form.id ? true : false"
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
    <InputField
      id="address"
      v-model="form.address"
      type="text"
      class="m-2"
      label="Address"
      :errorMessages="errorMessages.address"
      @input="onChange"
    />
    <div class="flex flex-row">
      <InputField
        id="city"
        v-model="form.city"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="City"
        :errorMessages="errorMessages.city"
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
    <InputField
      id="phoneNumber"
      v-model="form.phone_number"
      type="number"
      class="w-full sm:w-1/2 m-2"
      label="Phone No."
      :errorMessages="errorMessages.phone_number"
      rules="required"
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
      type: {
        type: String,
        default: 'user'
      },
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
          city: '',
          zip_code: '',
          phone_number: '',
          // password: '',
          // confirmPassword: '',
          company: {
            name: '',
            description: '',
            url: '',
            logo: '',
            region: '',
            vat_number: ''
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
      onChange()
      {
        this.$emit('onChange', this.form)
      },
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            ...this.data
          }
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>