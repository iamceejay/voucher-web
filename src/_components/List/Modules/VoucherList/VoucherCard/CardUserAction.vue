<template>
  <div 
    v-if="order"
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3 h-full justify-center"
    @click="onFlip()"
  >
    <div v-if="order && qr" class="flex flex-col w-full my-6">
      <QrcodeVue
        class="self-center m-2"
        :value="qr.url" 
        :size="196" 
        level="H" 
      />
      <!-- <img 
        class="card-qr self-center"
        src="@/_assets/img/default-qr-code.png" 
        alt=""
      /> -->
      <div class="text-center text-xs font-semibold">
        Gutschein
      </div>
      <div class="text-center text-xs font-semibold">
        {{ qr.url }}
      </div>
      <div v-if="order && order.voucher.seller.company.url" class="mt-4 text-xs text-center font-bold">
        {{ order.voucher.seller.company.url }}
      </div>
    </div>
    <div class="flex flex-row w-full mt-4 h-12">
      <div
        class="flex flex-row w-full"
      >
        <a
          class="px-2 text-lg text-primary" 
          href="javascript:void(0)"
          @click="onGenerateVoucher(userVoucher.id)"
        >
          <i class="fas fa-download" />
        </a>
        <router-link 
          class="px-2 text-lg text-primary" 
          :to="`/vouchers/send-email/${userVoucher.id}`"
        >
          <i class="fas fa-envelope" />
        </router-link>
        <router-link 
          class="px-2 text-lg text-primary" 
          :to="`/vouchers/transfer/${userVoucher.id}`"
        >
          <i class="fas fa-user-circle" />
        </router-link>
        <router-link 
          class="px-2 text-lg text-primary ml-auto" 
          :to="`/vouchers/personalized/${ userVoucher.id}`"
        >
          <i class="fas fa-pen" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    components: {
      QrcodeVue,
    },
    props: {
      qr: {
        type: Object,
        default: null
      }, order: {
        type: Object,
        default: null
      }, userVoucher: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        isAction: 0,
      }
    },
    mounted() {},
    methods: {
      onFlip()
      {
        this.isAction = ++this.isAction
        if( this.isAction != 2 ) {
          this.$emit('onFlip')
        } else {
          this.isAction = 0
        }
      },
      onAction()
      {
        this.isAction = ++this.isAction
      },
      async onGenerateVoucher(id)
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          this.isAction = ++this.isAction
          await this.$store.dispatch('DOWNLOAD_USER_VOUCHER', id)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$emit('onFlip')
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$swal({
            icon: 'warning',
            title: 'Achtung!',
            text: 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns. ',
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          })
        }
      },
    }
  }
</script>
<style lang="css" scoped>
  .card-header {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
  }
  .card-content {
    padding: 8px 0px;
  }
  .card-qr {
    /* margin-left: auto; */
    /* width: 200px; */
    /* height: 200px; */
  }
  .qr-text {
    margin-top: -10px;
    margin-left: 9px;
    font-size: 9px;
  }
</style>