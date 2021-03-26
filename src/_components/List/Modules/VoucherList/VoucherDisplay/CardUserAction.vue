<template>
  <div
    v-if="order"
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3 h-full justify-center"
    @click="onFlip()"
  >
    <div v-if="order && qr" class="flex flex-1 flex-col justify-center my-6 w-full">
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
        class="flex flex-row w-full justify-between"
      >
        <router-link
          class="px-2 text-3xl text-primary"
          :to="`/vouchers/personalized/${ userVoucher.id}`"
        >
          <i class="fas fa-pen" />
        </router-link>

        <dropdown placement="right">
          <!-- Button content -->
          <template #button>
            <span class="py-1 inline-flex items-center text-sm" @click.prevent>
              <span class="mr-2"><i class="fas fa-share-alt text-3xl" /></span>
            </span>
          </template>

          <!-- Opened dropdown content -->
          <template #content>
            <a
              class="flex w-full text-primary px-2 py-1 my-1"
              href="javascript:void(0)"
              @click="onGenerateVoucher(userVoucher.id)"
            >
              <i class="text-lg mr-3 fas fa-download" /> Herunterladen
            </a>
            <router-link
              class="flex w-full text-primary px-2 py-1 my-1"
              :to="`/vouchers/send-email/${userVoucher.id}`"
            >
              <i class="text-lg mr-3 fas fa-envelope" /> per Email verschicken
            </router-link>
            <router-link
              class="flex w-full text-primary px-2 py-1 my-1"
              :to="`/vouchers/transfer/${userVoucher.id}`"
            >
              <i class="text-lg mr-3 fas fa-user-circle" /> als Link teilen
            </router-link>
          </template>
        </dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import Dropdown from '_components/Dropdown'

  export default {
    components: {
      QrcodeVue,
      Dropdown
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