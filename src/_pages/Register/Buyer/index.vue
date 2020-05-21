<template>
  <MainLayout>
    <template #content>
      <ValidationObserver 
        v-slot="{ handleSubmit, invalid }"
        class="flex flex-col w-full h-full"
      >
        <form 
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit(invalid))"
        >
          <Header1
            label="Welcome!"
          />
          <p>
            We are happy to have you on our platform! <br />
            Please fill out the registration form below to
            register for the app.
          </p>
          <ProfileForm
            class="w-full md:w-1/2 my-5"
          />
          <CheckboxField
            id="dataPrivacy"
            v-model="form.dataPrivacy"
            type="text"
            container="mx-2 mb-0"
            labelSentence="I accept the Data Privacy guidelines."
            :rules="{ required: { allowFalse: false } }"
          />
          <CheckboxField
            id="terms"
            v-model="form.terms"
            type="text"
            container="mx-2 mb-5"
            labelSentence="I accept the Terms of Services."
            :rules="{ required: { allowFalse: false } }"
          />
          <Button
            type="submit"
            label="Complete Registration"
            size="w-full sm:w-1/2 py-3"
            round="rounded-full"
          />
        </form>
      </ValidationObserver>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import ProfileForm from '_components/Modules/Profile/Form/ProfileForm';
  import Header1 from '_components/Headers/Header1';
  import CheckboxField from '_components/Form/CheckboxField';

  export default {
    name: 'Register',
    components: {
      MainLayout,
      ProfileForm,
      Button,
      CheckboxField,
      Header1
    },
    data() {
      return {
        role: null,
        submitting: false,
        form: {
          dataPrivacy: false,
          terms: false,
        }
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
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Creating an account.',
            confirmButtonColor: '#6C757D',
          })
          this.$router.push('/login')
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