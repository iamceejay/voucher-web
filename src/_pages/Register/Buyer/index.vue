<template>
  <MainLayout>
    <template #content>
      <ValidationObserver 
        v-slot="{ handleSubmit, invalid }"
        class="content-container flex flex-col w-full h-full px-8"
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
          <div class="flex flex-col w-full md:w-1/2 my-5">
            <ProfileForm
              :errorMessages="errorMessages"
              @onChange="onChange"
            />
            <SettingsForm
              :errorMessages="errorMessages"
              @onChange="onChange"
            />
          </div>
          <CheckboxField
            id="dataPrivacy"
            v-model="form.dataPrivacy"
            container="mx-2 mb-0"
            :rules="{ required: { allowFalse: false } }"
          >
            <template #labelSentence_>
              <label class="text-xs p-1 mt-1 font-bold text-gray-900 font-body">
                I accept the 
                <a 
                  class="text-blue-700" 
                  href="https://verkaufen.epasnets.com/datenschutz" 
                  target="_blank"
                >
                  Data Privacy guidelines.
                </a>
              </label>
            </template>
          </CheckboxField>
          <CheckboxField
            id="terms"
            v-model="form.terms"
            type="text"
            container="mx-2 mb-5"
            :rules="{ required: { allowFalse: false } }"
          >
            <template #labelSentence_>
              <label class="text-xs p-1 mt-1 font-bold text-gray-900 font-body">
                I accept the 
                <a 
                  class="text-blue-700" 
                  href="https://verkaufen.epasnets.com/agb" 
                  target="_blank"
                >
                  Terms of Services.
                </a>
              </label>
            </template>
          </CheckboxField>
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
      async onSubmit( isValid )
      {
        if( !isValid ) {
          try {
            this.errorMessages = []
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            const data = await this.$store.dispatch('ADD_USER', this.form)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Creating an account.',
              confirmButtonColor: '#6C757D',
            })
            this.$router.push('/login')
          } catch (err) {
            if( err?.response?.status == 422 ) {
              this.errorMessages = err.response.data.errors
            }
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          }
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