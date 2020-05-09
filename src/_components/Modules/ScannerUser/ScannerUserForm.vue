<template>
  <div class="flex flex-col w-full md:w-1/2">
    <InputField
      id="text"
      v-model="userForm.username"
      type="text"
      class="m-2"
      placeholder="Username"
    />
    <InputField
      id="text"
      v-model="userForm.email"
      type="text"
      class="m-2"
      placeholder="Email address"
    />
    <InputField
      id="text"
      v-model="userForm.password"
      type="text"
      class="m-2"
      placeholder="Password"
    />
    <p class="text-center px-12 py-4">
      A scan user is only allowed to do scans and redeem vouchers.
      All other seller functions are deactivated.
    </p>
    <Button
      class="py-2"
      label="Save"
      size="w-full py-1"
      variant="info"
      round="rounded-full"
      fontSize="text-xs"
      @onClick="onSubmit()"
    />
    <router-link to="/scanner-users">
      <Button
        class="py-2"
        label="Cancel"
        size="w-full py-1"
        variant="info"
        round="rounded-full"
        fontSize="text-xs"
      />
    </router-link>
  </div>
</template>
<script>
  import InputField from '_components/Form/InputField';
  import Button from '_components/Button'

  export default {
    components: {
      InputField,
      Button,
    },
    props: {
    },
    data() {
      return {
        userForm: {
          id: null,
          username: '',
          password: '',
          email: '',
        }
      }
    },
    mounted() {
    },
    methods: {
      onSubmit()
      {
        this.$store.dispatch('ADD_SCANNER_USER', this.userForm)
        this.userForm = {
          id: null,
          username: '',
          password: '',
          email: '',
        }
        this.$swal({
          icon: 'success',
          title: 'Successful!',
          text: 'Adding new user.',
          confirmButtonColor: '#6C757D',
        });
        this.$router.push('/scanner-users')
      }
    }
  }
</script>
<style lang="css" scoped>
</style>