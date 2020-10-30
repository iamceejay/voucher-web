<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status " class="content-container w-full flex flex-col px-8">
        <div class="flex flex-col mb-3">
          <Header1
            label="Gutschein übertragen"
          />
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form 
              class="w-full flex flex-col"
              @submit.prevent="handleSubmit(onSubmit(invalid))"
            >
              <InputField
                id="email"
                v-model="form.email"
                type="email"
                class="w-full md:w-1/2 m-auto mt-4"
                placeholder="Emailadresse"
                rules="required"
              />
              <Button
                class="mx-2 justify-center"
                label="Email abschicken"
                size="mt-1 w-full md:w-1/2 py-3"
                round="rounded-full"
                type="submit"
              />
              <div class="w-full md:w-1/2 self-center">
                <p class="p-3 pb-0 text-center text-sm">
                  Um den Gutschein in die Wallet zu bekommen, muss der Empfänger bei epasnets registriert sein. Falls der Empfänger
                </p>
                <p class="p-3 pt-0 text-center text-sm">
                  noch keinen Account bei epasnets hat, muss er zuerst einen Account erstellen, um den Gutschein zu erhalten.
                </p>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="flex flex-col">
          <Header1
            label="Link teilen"
          />
          <InputField
            id="clipboard"
            v-model="form.link"
            type="text"
            class="w-full md:w-1/2 m-auto mt-4"
            placeholder=""
            :readonly="true"
          />
          <Button
            class="mx-2 justify-center"
            label="Kopiere den Link"
            size="mt-1 w-full md:w-1/2 py-3"
            round="rounded-full"
            @onClick="onCopyClipboard()"
          />
          <div class="w-full md:w-1/2 self-center">
            <p class="p-3 pb-0 text-center text-sm">
              Um den Gutschein in die Wallet zu bekommen, muss der Empfänger bei epasnets registriert sein. Falls der Empfänger
            </p>
            <p class="p-3 pt-0 text-center text-sm">
              noch keinen Account bei epasnets hat, muss er zuerst einen Account erstellen, um den Gutschein zu erhalten.
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
        form: {
          id: '',
          email: '',
          link: '',
        },
        clipboard: ''
      }
    },
    computed: {
      TRANSFER_URL() 
      {
        return this.$store.getters.TRANSFER_URL
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onAddTransferUrl()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      onConfirmation()
      {
        return this.$swal({
          title: 'Bestätige die Übertragung',
          html: 'Diese Übertragung kann nicht mehr rückgängig gemacht werden. Falls du den Gutschein an die falsche Person schickst, kann der Gutschein verloren gehen.',
          showCancelButton: true,
          confirmButtonColor: '#48BB78',
          cancelButtonColor: '#FC8181',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
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
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('TRANSFER_WALLET', this.form)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$router.push('/wallet')
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            }
            // this.$swal({
            //   icon: 'success',
            //   title: 'Erfolgreich!',
            //   text: 'Gutschein via Email versenden.',
            //   confirmButtonColor: '#48BB78',
            // });
            // this.form = {
            //   email: '',
            // }
            // this.$router.push('/wallet')
          }
        }
      },
      async onCopyClipboard()
      {
        let processing = this.$swal({
          title: 'Erfolgreich!',
          text: 'Link wurde kopiert',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          processing.close()
          let copyText = document.getElementById('clipboard')
          copyText.select()
          copyText.setSelectionRange(0, 99999)
          document.execCommand('copy')
        }, 2000)
      },
      async onAddTransferUrl()
      {
        try {
          const data = await this.$store.dispatch('ADD_TRANSFER_URL', {
            order_id: this.$route.params.id,
          })

          this.form.link = `${process.env.VUE_APP_WEB_URL}/transfer/${ data.transfer_url.url_code }`
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>