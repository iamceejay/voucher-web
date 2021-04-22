<template>
  <MainLayout>
    <template #content>
      <ValidationObserver
        v-slot="{ handleSubmit }"
        class="content-container flex flex-col w-full h-full items-center"
      >
        <form
          class="container w-full flex flex-col items-center"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <div class="font-bold py-2 text-2xl md:text-4xl font-display mb-1 text-gray-900">
            Registrieren
          </div>

          <RegisterTabs
            type="user"
          />

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
              container="mb-0"
              :rules="{ required: { allowFalse: false } }"
            >
              <template #labelSentence_>
                <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
                  Ich akzeptiere die
                  <a
                    class="text-peach underline"
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
              container="mb-2"
              :rules="{ required: { allowFalse: false } }"
            >
              <template #labelSentence_>
                <label class="text-xs px-1 py-0 mt-0 font-bold text-gray-900 font-body">
                  Ich akzeptiere die
                  <a
                    class="text-peach underline"
                    href="https://verkaufen.epasnets.com/agb"
                    target="_blank"
                  >
                    Nutzungsbedingungen.
                  </a>
                </label>
              </template>
            </CheckboxField>
            <div class="text-sm">
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
          <div class="w-full sm:w-1/2">
            <Button
              class="flex flex-col items-center w-full"
              type="submit"
              label="Kostenios registrieren"
              size="w-full py-3"
              round="rounded"
            />
          </div>
        </form>
      </ValidationObserver>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import RegisterTabs from '_components/Modules/Register/Tabs'
  import ProfileForm from '_components/Modules/Profile/Form/ProfileForm';
  import SettingsForm from '_components/Modules/Profile/Form/SettingsForm';
  import CheckboxField from '_components/Form/CheckboxField';

  export default {
    name: 'Register',
    components: {
      MainLayout,
      ProfileForm,
      SettingsForm,
      Button,
      RegisterTabs,
      CheckboxField
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
          localStorage.setItem('cart', this.$store.getters.COUNT_CART)
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
  @media only screen and (max-width: 599px) {
    .container {
      width: 90% !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .container {
      width: 60%;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .container {
      width: 50%;
    }
  }
</style>