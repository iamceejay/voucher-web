<template>
  <div
    :id="`voucher-card-${ (data && data.id) ? data.id : 0 }`"
    class="flex border border-gray-900 rounded card-container bg-color mb-3 flex-shrink-0 mr-3 mt-3"
    :class="{'flip': isFlip}"
    :style="{ '--bgColor': data.background_color }"
  >
    <CardInfo
      v-if="!isAction"
      :class="[ onGetTextColor() ]"
      :data="data"
      :isFlippable="isFlippable"
      :withQR="withQR"
      :otherData="otherData"
      @onFlip="onFlip()"
    />
    <CardAction
      v-if="isAction && role === 'seller'"
      :data="data"
      @onFlip="onFlip()"
    />
    <CardUserAction
      v-if="isAction && role === 'user'"
      :data="data"
      :otherData="otherData"
      @onFlip="onFlip()"
    />
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
      data: {
        type: Object,
        default: null
      }, otherData: {
        type: Object,
        default: null
      }, bg: {
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
      };
    },
    watch: {
      'data.background_image'(newVal, oldVal)
      {
        if( newVal & newVal != '') {
          this.onSetBgImage(newVal)
        }
      },
      'otherData.user_voucher.template'(newVal, oldVal)
      {
        if( newVal && newVal.length > 0 ) {
          const tem = newVal.filter( row => row.status )
          if( tem.length > 0 ) {
            this.onSetBgImage( tem[0].path )
          }
        }
      },
      'otherData.user_voucher.text_color'(newVal, oldVal)
      {
        console.log('teest')
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
        if( this.otherData?.user_voucher?.text_color != null  ) {
          color = (this.otherData.user_voucher.text_color == 'dark') ? 'text-black' : 'text-white'
        } else {
          color = (this.data.text_color == 'dark') ? 'text-black' : 'text-white'
        }
        return color
      },
      onGetBg() {
        let bg = '';
        if( this.otherData?.user_voucher?.template ) {
          const template = this.otherData.user_voucher.template
          bg = template.image
        } else if(this.data?.background_image) {
          bg = this.data.background_image
        }
        return bg
      },
      onSetBgImage(value)
      {
        const card = document.getElementById(`voucher-card-${ (this.data && this.data.id) ? this.data.id : 0 }`)
        const bg = (this.data && this.data.id && (value.search('base64') < 0)) ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}` : value
        card.style.backgroundImage = `url('${bg}')`
        card.style.backgroundSize = `cover`
      }
    }
  }
</script>
<style lang="css" scoped>
  .card-container {
    width: 320px;
    min-height: 330px;
    border-radius: 6px;
    transform: rotateY(0deg);
    transition: transform 0.5s linear;
    background-repeat: no-repeat;
    background-position: center;
  }
  .card-container.flip {
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
  @media only screen and (max-width: 600px) {
    .card-container {
      width: 100%;
    }
  }
</style>