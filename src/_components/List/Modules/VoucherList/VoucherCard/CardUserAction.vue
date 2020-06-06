<template>
  <div 
    v-if="otherData"
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3 h-full"
    @click="onFlip()"
  >
    <div v-if="otherData && otherData.qr" class="flex flex-col w-full my-6">
      <QrcodeVue
        class="self-center m-2"
        :value="otherData.qr.url" 
        :size="184" 
        level="H" 
      />
      <!-- <img 
        class="card-qr self-center"
        src="@/_assets/img/default-qr-code.png" 
        alt=""
      /> -->
      <div class="text-center text-xs font-semibold">
        Voucher No.
      </div>
      <div class="text-center text-xs font-semibold">
        {{ otherData.qr.url }}
      </div>
    </div>
    <div class="flex flex-row w-full mt-12">
      <a 
        id="link" 
        href="file.txt" 
        download hidden 
      />
      <a
        class="p-2 text-lg text-primary" 
        href="javascript:void(0)"
        @click="onGenerateVoucher(otherData.id)"
      >
        <i class="fas fa-download" />
      </a>
      <router-link 
        class="p-2 text-lg text-primary" 
        :to="`/vouchers/send-email/${otherData.id}`"
      >
        <i class="fas fa-envelope" />
      </router-link>
      <router-link 
        class="p-2 text-lg text-primary" 
        :to="`/vouchers/transfer/${otherData.id}`"
      >
        <i class="fas fa-user-circle" />
      </router-link>
      <router-link 
        class="p-2 text-lg text-primary ml-auto" 
        :to="`/vouchers/personalized/${ otherData.id}`"
      >
        <i class="fas fa-pen" />
      </router-link>
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
      data: {
        type: Object,
        default: null
      }, otherData: {
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
      async onGenerateVoucher( order_id )
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          this.isAction = ++this.isAction
          await this.$store.dispatch('DOWNLOAD_WALLET', order_id)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$swal({
            icon: 'warning',
            title: 'Warning!',
            text: 'Something went wrong.',
            confirmButtonColor: '#6C757D',
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