<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form 
            class="flex flex-col w-full md:w-1/2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <Header2 label="Einstellungen" />
            <div class="flex flex-col w-full">
              <InputField
                id="current_password"
                v-model="form.current_password"
                type="password"
                class="m-2"
                label="Passwort bestätigen"
                rules="required|min:8|max:16"
                :errorMessages="errorMessages.current_password"
              />
              <InputField
                id="new_password"
                v-model="form.new_password"
                type="password"
                class="m-2"
                label="Neues Passwort"
                rules="required|min:8|max:16"
                :errorMessages="errorMessages.new_password"
              />
              <InputField
                id="repeat_password"
                v-model="form.repeat_password"
                type="password"
                class="m-2"
                label="Passwort wiederholen"
                rules="required|min:8|max:16|password:@new_password"
                :errorMessages="errorMessages.repeat_password"
              />
            </div>
            <Button
              type="submit"
              label="Speichern"
              size="w-full py-3 mx-2 mt-2"
              round="rounded-full"
            />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import InputField from '_components/Form/InputField';
  import Header2 from '_components/Headers/Header2';

  export default {
    name: 'Profile',
    components: {
      MainLayout,
      InputField,
      Button,
      Header2
    },
    data() {
      return {
        errorMessages: [],
        form: {
          id: null,
          current_password: '',
          new_password: '',
          repeat_password: '',
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
      this.form.id =  this.AUTH_USER.data.id
    },
    methods: {
      async onSubmit()
      {
        try {
          this.errorMessages = []
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          const data = await this.$store.dispatch('CHANGE_PASSWORD', this.form)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.form = {
            id: null,
            current_password: '',
            new_password: '',
            repeat_password: '',
          }
          let confirm = this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Updating the password.',
            allowOutsideClick: false,
            showConfirmButton: false
          })
          setTimeout(() => {
            confirm.close()
            this.$router.push('/home')
          }, 1000)
        } catch (err) {
          if( err?.response?.status == 422 ) {
            this.errorMessages = err.response.data.errors
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>