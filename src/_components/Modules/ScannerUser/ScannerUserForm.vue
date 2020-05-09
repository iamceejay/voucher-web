<template>
  <div class="flex flex-col w-full md:w-1/2">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form 
        class="w-full flex flex-col"
        @submit.prevent="handleSubmit(onSubmit(invalid))"
      >
        <InputField
          id="username"
          v-model="userForm.username"
          type="text"
          class="m-2"
          placeholder="Username"
          rules="required"
        />
        <InputField
          id="email"
          v-model="userForm.email"
          type="email"
          class="m-2"
          placeholder="Email address"
          rules="required|email"
        />
        <InputField
          id="password"
          v-model="userForm.password"
          type="password"
          class="m-2"
          placeholder="Password"
          rules="required"
        />
        <p class="text-center px-12 py-4">
          A scan user is only allowed to do scans and redeem vouchers.
          All other seller functions are deactivated.
        </p>
        <Button
          type="submit"
          class="py-2"
          label="Save"
          size="w-full py-1"
          variant="info"
          round="rounded-full"
          fontSize="text-xs"
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
      </form>
    </ValidationObserver>
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
      onSubmit( isValid )
      {
        if( !isValid ) {
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
  }
</script>
<style lang="css" scoped>
</style>