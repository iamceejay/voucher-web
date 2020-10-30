<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full px-8">
        <Header1 label="Gutscheine scannen" />
        <VoucherScanner 
          v-if="!QR_CODE"
          :key="`s-${sIndex}`"
          @onSetVoucher="onSetVoucher"
        />
        <VoucherRedemption 
          v-if="QR_CODE"
          @onSetVoucher="onSetVoucher"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import VoucherScanner from '_components/Modules/Scanner/VoucherScanner'
  import VoucherRedemption from '_components/Modules/Scanner/VoucherRedemption'
  import Header1 from '_components/Headers/Header1'
  
  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      VoucherScanner,
      VoucherRedemption,
      Header1
    },
    data() {
      return {
        sIndex: 0,
        qr: null
      }
    },
    computed: {
      QR_CODE()
      {
        return this.$store.getters.QR_CODE
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_QR_CODE', null)
      })()
    },
    methods: {
      async onSetVoucher(data)
      {
        try {
          if( data && data !='' ) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('SCAN_QR', {
              url: data
            })
            this.qr = data
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.sIndex = this.sIndex + 1
          }
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if( err?.response?.status == 422 ) {
            this.$swal({
              icon: 'warning',
              title: 'Warnung!',
              text: err.response.data.message,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
          this.sIndex = this.sIndex + 1
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>