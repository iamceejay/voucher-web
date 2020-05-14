<template>
  <div 
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3 h-full"
    @click="onFlip()"
  >
    <div class="flex flex-col w-full">
      <img 
        class="card-qr self-center"
        src="@/_assets/img/default-qr-code.png" 
        alt=""
      />
      <span class="text-center text-xs font-semibold">Voucher No.</span>
    </div>
    <div class="flex flex-row w-full">
      <a 
        id="link" 
        href="file.txt" 
        download hidden 
      />
      <a
        class="p-2 text-lg text-primary" 
        href="javascript:void(0)"
        @click="onGenerateVoucher()"
      >
        <i class="fas fa-download" />
      </a>
      <router-link 
        class="p-2 text-lg text-primary" 
        :to="`/vouchers/send-email/${data.id}`"
      >
        <i class="fas fa-envelope" />
      </router-link>
      <router-link 
        class="p-2 text-lg text-primary" 
        :to="`/vouchers/transfer/${data.id}`"
      >
        <i class="fas fa-user-circle" />
      </router-link>
      <a
        class="p-2 text-lg text-primary ml-auto" 
        href="javascript:void(0)"
        @click="onAction()"
      >
        <i class="fas fa-pen" />
      </a>
    </div>
  </div>
</template>
<script>

  export default {
    components: {
    },
    props: {
      data: {
        type: Object,
        default: null
      }
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
      onGenerateVoucher()
      {
        this.isAction = ++this.isAction
        let processing = this.$swal({
          title: 'Processing Request',
          text: 'Please wait ...',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          document.getElementById('link').click()
          processing.close()
        }, 2000)
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
    width: 200px;
    height: 200px;
  }
  .qr-text {
    margin-top: -10px;
    margin-left: 9px;
    font-size: 9px;
  }
</style>