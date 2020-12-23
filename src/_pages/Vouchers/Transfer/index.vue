<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status " class="content-container w-full flex flex-col px-8">
        <div class="flex flex-col mb-3 hidden">
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
          <div class="mb-5 w-full md:w-1/2 m-auto mt-4">
            <input
              id="link" v-model="form.link"
              name="clipboard" type="text"
              placeholder="" step="any"
              class="input-field mt-2 px-3 rounded-full text-sm font-semibold font-body py-2" readonly
            />
          </div>

          <button
            data-clipboard-target="#link" type="button"
            class="focus:outline-none focus:shadow-none border-1 font-display bg-peach text-white mt-1 w-full md:w-1/2 py-3 rounded-full text-sm clipboard mx-auto"
          >
            Kopiere den Link
          </button>
          <div class="lg:w-1/3 md:1/2 self-center">
            <p class="p-3 pb-0 text-center text-sm">
              Sobald der Gutschein von einem anderen Nutzer über den Link geöffnet wurde, gehört der Gutschein nicht mehr dir.
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
      var clipboard = new ClipboardJS('.clipboard');
      clipboard.on('success', (e) => {
        let processing = this.$swal({
          title: 'Erfolgreich!',
          text: 'Link wurde kopiert',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          processing.close()
        }, 2000)
        e.clearSelection();
      });
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