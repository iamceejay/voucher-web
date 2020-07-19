<template>
  <MainLayout>
    <template #content>
      <ValidationObserver 
        v-slot="{ handleSubmit }"
        class="content-container flex flex-col w-full h-full px-8"
      >
        <form 
          class="w-full flex flex-col"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <Header1
            label="Willkommen!"
          />
          <p>
            Wir freuen uns, dass du dich für unsere Plattform registrieren willst! <br />
            Fülle einfach das kurze Formular aus und schon bist du für epasnets registriert. 
          </p>
          <div class="flex flex-col w-full md:w-1/2 my-5">
            <ProfileForm
              type="user"
              :errorMessages="errorMessages"
              @onChange="onChange"
            />
            <SettingsForm
              :errorMessages="errorMessages"
              @onChange="onChange"
            />
            <CheckboxField
              id="dataPrivacy"
              v-model="form.dataPrivacy"
              container="mx-2 mb-0"
              :rules="{ required: { allowFalse: false } }"
            >
              <template #labelSentence_>
                <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
                  Ich akzeptiere die
                  <a 
                    class="text-blue-700" 
                    href="https://verkaufen.epasnets.com/datenschutz" 
                    target="_blank"
                  >
                    Datenschutzerklärung.
                  </a>
                </label>
              </template>
            </CheckboxField>
            <CheckboxField
              id="terms"
              v-model="form.terms"
              type="text"
              container="mx-2 mb-2"
              :rules="{ required: { allowFalse: false } }"
            >
              <template #labelSentence_>
                <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
                  Ich akzeptiere die
                  <a 
                    class="text-blue-700" 
                    href="https://verkaufen.epasnets.com/agb" 
                    target="_blank"
                  >
                    Nutzungsbedingungen.
                  </a>
                </label>
              </template>
            </CheckboxField>
            <div class="mx-2 text-sm px-2">
              <p>
                Du willst lieber Gutscheine verkaufen? 
                <a
                  class="text-peach font-bold"
                  href="http://verkaufen.epasnets.com/"
                  target="_blank"
                >
                  Registiere dich
                </a>
                als Verkäufer.
              </p>
            </div>
          </div>
          <Button
            type="submit"
            label="Registrierung abschließen"
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
  import SettingsForm from '_components/Modules/Profile/Form/SettingsForm';
  import Header1 from '_components/Headers/Header1';
  import CheckboxField from '_components/Form/CheckboxField';

  export default {
    name: 'Register',
    components: {
      MainLayout,
      ProfileForm,
      SettingsForm,
      Button,
      CheckboxField,
      Header1
    },
    data() {
      return {
        submitting: false,
        errorMessages: [],
        form: {
          role_id: 3,
          region_id: null,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          zip_code: '',
          phone_number: '',
          password: '',
          confirmPassword: '',
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
    },
    created() {
    },
    methods: {
      async onSubmit()
      {
        try {
          this.errorMessages = []
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          const data = await this.$store.dispatch('ADD_USER', this.form)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: data.message,
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          }).then(async (result) => {
            if(result.value){
              this.$router.push('/login')
            }
          })
          // this.$swal({
          //   icon: 'success',
          //   title: 'Erfolgreich!',
          //   text: 'Creating an account.',
          //   confirmButtonColor: '#48BB78',
          // })
        } catch (err) {
          if( err?.response?.status == 422 ) {
            this.errorMessages = err.response.data.errors
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
      onChange( data )
      {
        this.form = {
          ...this.form,
          ...data
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>