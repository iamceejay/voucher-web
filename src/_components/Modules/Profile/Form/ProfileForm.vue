<template>
  <div class="flex flex-col w-full">
    <InputField
      id="username"
      v-model="profileForm.username"
      type="text"
      class="m-2"
      label="Username"
      rules="required"
    />
    <div class="flex flex-row">
      <InputField
        id="name"
        v-model="profileForm.name"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Name"
        rules="required"
      />
      <InputField
        id="surname"
        v-model="profileForm.surname"
        type="text"
        class="w-full sm:w-1/2 m-2"
        label="Surname"
        rules="required"
      />
    </div>
    <InputField
      id="email"
      v-model="profileForm.email"
      type="text"
      class="m-2"
      label="Email address"
      rules="required|email"
    />
    <InputField
      id="password"
      v-model="profileForm.password"
      type="password"
      class="m-2"
      label="Password"
      rules="required"
    />
    <InputField
      id="confirm_password"
      v-model="profileForm.confirm_password"
      type="password"
      class="m-2"
      label="Repeat Password"
      rules="required"
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
    },
    data() {
      return {
        profileForm: {
          username: '',
          name: '',
          surname: '',
          email: '',
          password: '',
          confirm_password: '',
        }
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
</style>