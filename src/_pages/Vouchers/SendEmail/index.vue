<template>
  <MainLayout>
    <template #content>
      <div class="content-container w-full h-screen flex flex-col px-8">
        <Header1
          label="Gutschein via Email Verschicken"
        />
        <ValidationObserver v-slot="{ handleSubmit }">
          <form 
            class="w-full flex flex-col"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <InputField
              id="email"
              v-model="emailForm.email"
              type="email"
              class="w-full md:w-1/2 m-auto mt-4"
              placeholder="Emailadresse"
              rules="required"
            />
            <InputField
              id="subject"
              v-model="emailForm.subject"
              type="text"
              class="w-full md:w-1/2 m-auto mt-4"
              placeholder="Betreff"
              rules="required"
            />
            <TextAreaField
              id="text"
              v-model="emailForm.text"
              class="w-full md:w-1/2 m-auto mt-4"
              placeholder="Text"
              rules="required"
              :max="252"
            />
            <Button
              class="mx-2 justify-center"
              label="Email abschicken"
              size="mt-1 w-full md:w-1/2 py-3"
              round="rounded-full"
              type="submit"
            />
          </form>
        </ValidationObserver>

        <div class="lg:w-1/3 md:1/2 self-center">
          <p class="p-3 pb-0 text-center text-sm">
            In dem Email wird der Gutschein als PDF angehängt. Außerdem befindet sich dort auch ein Link, sodass der Empfänger den Gutschein direkt in seine epasnets Wallet laden kann.
          </p>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Header1 from '_components/Headers/Header1'
  import Button from '_components/Button/'
  import InputField from "_components/Form/InputField"
  import TextAreaField from '_components/Form/TextAreaField'

  export default {
    components: {
      MainLayout,
      Header1,
      InputField,
      TextAreaField,
      Button,
    },
    data() {
      return {
        emailForm: {
          id: null,
          email: '',
          subject: '',
          text: '',
          sent_via: 'email',
        },
      }
    },
    mounted() {
      this.emailForm.id = this.$route.params.id
    },
    methods: {
      async onSubmit()
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch('SEND_WALLET', this.emailForm)
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Gutschein via Email versenden.',
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          });
          this.emailForm = {
            id: null,
            email: '',
            subject: '',
            text: '',
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$router.push('/wallet')
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>