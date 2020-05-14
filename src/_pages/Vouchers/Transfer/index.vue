<template>
  <MainLayout>
    <template #content>
      <div class="w-full h-screen flex flex-col">
        <div class="flex flex-col">
          <Header1
            label="Transfer Voucher"
          />
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form 
              class="w-full flex flex-col"
              @submit.prevent="handleSubmit(onSubmit(invalid))"
            >
              <InputField
                id="email"
                v-model="emailForm.email"
                type="email"
                class="w-full md:w-1/2 m-auto mt-4"
                placeholder="Email address"
                rules="required"
              />
              <Button
                class="mx-2 justify-center"
                label="Send Email"
                size="mt-1 w-full md:w-1/2 py-3"
                round="rounded-full"
                type="submit"
              />
              <div class="w-full md:w-1/2 self-center">
                <p class="p-3 pb-0 text-center text-sm">
                  The voucher will show in the wallet of the user and will
                  be removed from your wallet after you have sent it. 
                  This cannot be undone.
                </p>
                <p class="p-3 pt-0 text-center text-sm">
                  The user must be registered on the wallet app for this function
                  to work.
                </p>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="flex flex-col">
          <Header1
            label="Share link"
          />
          <InputField
            id="clipboard"
            v-model="clipboard"
            type="text"
            class="w-full md:w-1/2 m-auto mt-4"
            placeholder=""
            :readonly="true"
          />
          <Button
            class="mx-2 justify-center"
            label="Copy link clipboard"
            size="mt-1 w-full md:w-1/2 py-3"
            round="rounded-full"
            @onClick="onCopyClipboard()"
          />
          <div class="w-full md:w-1/2 self-center">
            <p class="p-3 pb-0 text-center text-sm">
              The user needs to be registered on this website.
            </p>
            <p class="p-3 pt-0 text-center text-sm">
              If he or she is not registered, he will get forwarded to
              the account creation page.
            </p>
          </div>
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

  export default {
    components: {
      MainLayout,
      Header1,
      InputField,
      Button,
    },
    data() {
      return {
        emailForm: {
          id: '',
          email: '',
        },
        clipboard: ''
      }
    },
    mounted() {
      this.clipboard = `http://staging.paypeople.de/api/voucher/transfer/${ this.$route.params.id }`
    },
    methods: {
      onConfirmation()
      {
        return this.$swal({
          title: 'Confirm transfer',
          html: '<p>This cannot be undone.</p><p>You accept the risks.</p>',
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if(result.value){
            return true
          }   
          return false
        });
      },
      async onSubmit( isValid )
      {
        if( !isValid ) {
          if( await this.onConfirmation() ) {
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Sending the voucher via email.',
              confirmButtonColor: '#6C757D',
            });
            this.emailForm = {
              email: '',
            }
            this.$router.push('/wallet')
          }
        }
      },
      async onCopyClipboard()
      {
        if( await this.onConfirmation() ) {
          let copyText = document.getElementById('clipboard');
          copyText.select();
          copyText.setSelectionRange(0, 99999);
          document.execCommand('copy');
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Sending the voucher via email.',
            confirmButtonColor: '#6C757D',
          });
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>