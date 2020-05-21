<template>
  <ValidationObserver 
    v-slot="{ handleSubmit, invalid }"
    class="flex w-full h-full"
  >
    <form 
      class="w-full flex flex-col"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <Header1
        label="Welcome!"
      />
      <p>
        Please fill out the registration form to register on our app as seller.
        We will then review your entry, which can take up to 3 days. We will
        contact you as soon as you are approved.
      </p>
      <ProfileForm
        class="w-full md:w-1/2 my-5"
      />
      <Button
        type="submit"
        label="Next Step >"
        size="w-full sm:w-1/2 py-4 mx-2"
        round="rounded-full"
      />
    </form>
  </ValidationObserver>
</template>
<script>
  import Button from '_components/Button';
  import ProfileForm from '_components/Modules/Profile/Form/ProfileForm';
  import PayoutForm from '_components/Modules/Profile/Form/PayoutForm';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      ProfileForm,
      PayoutForm,
      Button,
      Header1
    },
    data() {
      return {
        role: null,
        submitting: false
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      },
    },
    created() {
      this.onSetRole()
    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$emit('onChangeStep', 2)
        }
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>