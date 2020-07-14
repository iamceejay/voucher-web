<template>
  <div
    :id="`${listId}-${cardId}`"
    class="flex shadow-custom rounded voucher-card-container bg-color mb-3 flex-shrink-0 sm:mr-3 mt-3"
    :class="{'flip': isFlip}"
    :style="{ '--bgColor': !isFlip ? voucher.background_color : '' }"
  >
    <div
      class="flex flex-col w-full bg-aid rounded"
      :style="{ '--bgAid': !isFlip ? voucher.background_aid : '' }"
    >
      <CardInfo
        v-if="!isAction"
        :class="[ onGetTextColor() ]"
        :voucher="voucher"
        :order="order"
        :qr="qr"
        :userVoucher="userVoucher"
        :isFlippable="isFlippable"
        :withQR="withQR"
        @onFlip="onFlip()"
      />
      <CardAction
        v-if="isAction && role === 'seller'"
        :voucher="voucher"
        @onFlip="onFlip()"
      />
      <CardUserAction
        v-if="isAction && role === 'user'"
        :qr="qr"
        :userVoucher="userVoucher"
        :order="order"
        @onFlip="onFlip()"
      />
    </div>
  </div>
</template>
<script>
  import CardInfo from './CardInfo'
  import CardAction from './CardAction'
  import CardUserAction from './CardUserAction'

  export default {
    components: {
      CardInfo,
      CardAction,
      CardUserAction
    },
    props: {
      cardId: {
        type: String,
        default: 'voucher-card'
      }, 
      listId: {
        type: String,
        default: 'voucher-list'
      }, 
      
      voucher: {
        type: Object,
        default: null
      }, order: {
        type: Object,
        default: null
      }, qr: {
        type: Object,
        default: null
      }, userVoucher: {
        type: Object,
        default: null
      },
      
      bg: {
        type: String,
        default: '#fff'
      }, role: {
        type: String,
        default: 'seller'
      }, bgImg: {
        type: String,
        default: ''
      }, isFlippable: {
        type: Boolean,
        default: true
      }, withQR: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isAction: false,
        isFlip: false,
        vIndex: 0,
      };
    },
    watch: {
      'voucher.background_image'(newVal, oldVal)
      {
        if( newVal & newVal != '') {
          this.onSetBgImage(newVal)
        }
      },
      'userVoucher.template'(newVal, oldVal)
      {
        if( newVal && newVal.length > 0 ) {
          const tem = newVal.filter( row => row.status )
          if( tem.length > 0 ) {
            this.onSetBgImage( tem[0].path )
          }
        }
      },
      'userVoucher.text_color'(newVal, oldVal)
      {
        this.onGetTextColor()
      },
    },
    mounted() {
      this.onSetBgImage( this.onGetBg() )
    },
    methods: {
      onFlip()
      {
        if(this.isFlippable) {
          this.isFlip = !this.isFlip
          this.isAction = !this.isAction
          this.onSetBgImage( this.isFlip ? '' : this.onGetBg() )
        }
      },
      onGetTextColor()
      {
        let color = ''
        if( this.userVoucher?.text_color != null  ) {
          color = (this.userVoucher.text_color == 'dark') ? 'text-black' : 'text-white'
        } else {
          color = (this.voucher.text_color == 'dark') ? 'text-black' : 'text-white'
        }
        return color
      },
      onGetBg() {
        let bg = '';
        if( this.userVoucher?.template ) {
          const template = this.userVoucher.template
          bg = template.image
        } else if(this.voucher?.background_image) {
          bg = this.voucher.background_image
        }
        return bg
      },
      onSetBgImage(value)
      {
        const card = document.getElementById(`${this.listId}-${this.cardId}`)
        if(card) {
          const bg = (this.voucher && this.voucher.id && (value.search('base64') < 0)) 
            ? (value != '') ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : ''
            : value
          card.style.backgroundImage = `url('${bg}')`
          card.style.backgroundSize = `cover`
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .voucher-card-container {
    width: 320px;
    min-height: 330px;
    /* min-height: 480px; */
    border-radius: 6px;
    transform: rotateY(0deg);
    transition: transform 0.5s linear;
    background-repeat: no-repeat;
    background-position: center;
  }
  .voucher-card-container.flip {
    transform: rotateY(360deg);
    transition: transform 0.5s linear;
  }
  .card-header {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
  }
  .card-content {
    padding: 8px 0px;
  }
  .card-logo {
    width: 65px;
    height: 30px;
    margin-left: auto;
  }
  .card-qr {
    width: 70px;
    height: 70px;
    margin-left: auto;
  }
  .qr-text {
    margin-top: -10px;
    margin-left: 9px;
    font-size: 9px;
  }
  .bg-color {
    background-color: var(--bgColor);
  }
  .bg-aid {
    background-color: var(--bgAid);
  }
  @media only screen and (max-width: 600px) {
    .voucher-card-container {
      width: 99%;
      max-width: 330px;
    }
  }
</style>