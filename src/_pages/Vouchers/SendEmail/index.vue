<template>
  <MainLayout>
    <template #content>
      <div class="content-container w-full h-screen flex flex-col px-8">
        <Header1
          label="Send Voucher"
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
              placeholder="Email address"
              rules="required"
            />
            <InputField
              id="subject"
              v-model="emailForm.subject"
              type="text"
              class="w-full md:w-1/2 m-auto mt-4"
              placeholder="Subject"
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
              label="Send Email"
              size="mt-1 w-full md:w-1/2 py-3"
              round="rounded-full"
              type="submit"
            />
            <p class="p-3 text-center text-sm">
              The voucher will be attached as PDF.
            </p>
          </form>
        </ValidationObserver>
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
            title: 'Successful!',
            text: 'Sending the voucher via email.',
            confirmButtonColor: '#6C757D',
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