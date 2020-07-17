<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <Header1
          label=""
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      Header1,
    },
    data() {
      return {
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
    },
    mounted() {
      (async() => {
        if( !this.AUTH_USER.isAuth ) {
          this.$swal({
            icon: 'warning',
            title: 'Warnung!',
            text: 'Bitte logge dich zuerst ein und öffne dann den Link erneut. Danke!',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          }).then(async (result) => {
            if(result.value){
              this.$router.push('/login')
            }
          })
        } else {
          await this.onTransferringWallet()
        }
      })()
    },
    methods: {
      async onTransferringWallet()
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch('TRANSFERRING_WALLET', {
            id: this.$route.params.id
          })
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Der Gutschein wurde erfolgreich übertragen!',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen',
          }).then(async (result) => {
            if(result.value){
              this.$router.push('/home')
            }
          })
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        } catch (err) {
          if( err?.response?.status == 422 ) {
            this.$swal({
              icon: 'warning',
              title: 'Warnung!',
              text: err.response.data.message,
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen',
            }).then(async (result) => {
              if(result.value){
                this.$router.push('/home')
              }
            })
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>