<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
    class="flex flex-col w-full h-full items-center"
  >
    <form
      class="w-full flex flex-col items-center"
      @submit.prevent="handleSubmit(onSubmit(invalid))"
    >
      <Header1
        label="Willkommen!"
      />
      <p class="w-full md:w-1/2">
        Wir freuen uns, dass du dich für unsere Plattform registrieren willst!
        Fülle einfach das kurze Formular aus und schon ist dein Unternehmen für epasnets registriert.
        Wir werden im Anschluss dein Profil überprüfen und uns innerhalb von 24 Stunden bei dir melden, sobald dein Profil verifiziert ist.
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
      <div class="w-full sm:w-1/2 flex">
        <Button
          class="flex flex-col items-center ml-auto"
          type="submit"
          label="nächster Schritt >"
          size="px-5 py-4"
          round="rounded"
        />
      </div>
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
          phone_number: '',
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
      async onSubmit( isValid )
      {
        const valid = await this.$refs.observer.validate();
        if (!valid) {
          let errors = [];
          for (const [key, value] of Object.entries(this.$refs.observer.errors)){
            if (value.length) {
              errors.push(key);
            }
          }

          this.$swal({
            icon: 'warning',
            title: 'Dieses Feld muss ausgefüllt werden!',
            text: errors.toString(),
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          })
          return false
        }

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
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>