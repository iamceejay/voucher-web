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
      <div class="flex flex-col w-full md:w-1/2 my-5">
        <ProfileForm
          type="seller"
          :data="form"
          :errorMessages="errorMessages"
          @onChange="onChange"
        />
        <SettingsForm
          :errorMessages="errorMessages"
          @onChange="onChange"
        />
      </div>
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
  import SettingsForm from '_components/Modules/Profile/Form/SettingsForm';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      ProfileForm,
      SettingsForm,
      Button,
      Header1
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        }
      },
      errorMessages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        submitting: false,
        form: {
          username: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          zip_code: '',
          email: '',
          password: '',
          confirmPassword: '',
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
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    created() {
      this.onSetForm()
    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$emit('onChangeStep', {
            step: 2,
            form: this.form
          })
        }
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data
        }
      },
      onSetForm()
      {
        if( this.data ) {
          this.form = {
            ...this.form,
            ...this.data
          }
          console.log('this.data', this.data)
        }
      }, 
    }
  }
</script>
<style lang='css' scoped>
</style>