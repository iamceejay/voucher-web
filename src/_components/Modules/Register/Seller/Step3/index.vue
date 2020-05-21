<template>
  <ValidationObserver 
    v-slot="{ handleSubmit, invalid }"
    class="flex w-full h-full"
  >
    <form 
      class="w-full flex flex-col"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <Header2
        label="Payout Information"
      />
      <PayoutForm
        class="w-full md:w-1/2 "
      />
      <Header2
        label="Legal"
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
        container="mx-2 mb-0"
        labelSentence="I accept the Terms of Services."
        :rules="{ required: { allowFalse: false } }"
      />
      <CheckboxField
        id="commision"
        v-model="form.commision"
        type="text"
        container="mx-2 mb-5"
        labelSentence="I accept the standard commission rate of 5% and 1€ per sale."
        :rules="{ required: { allowFalse: false } }"
      />
      <Button
        type="submit"
        label="Complete Registration"
        size="w-full sm:w-1/2 py-4 mx-2"
        round="rounded-full"
      />
    </form>
  </ValidationObserver>
</template>
<script>
  import Button from '_components/Button';
  import PayoutForm from '_components/Modules/Profile/Form/PayoutForm';
  import CheckboxField from '_components/Form/CheckboxField';
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
      PayoutForm,
      CheckboxField,
      Button,
      Header2
    },
    data() {
      return {
        role: null,
        submitting: false,
        form: {
          dataPrivacy: false,
          terms: false,
          commission: false,
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
            title: 'Thank you!',
            text: 'We have recieved your registration application. As soon as you are verified, this message will be removed and you will be able to see your seller dashboard.',
            confirmButtonColor: '#6C757D',
          })
          this.$router.push('/home')
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