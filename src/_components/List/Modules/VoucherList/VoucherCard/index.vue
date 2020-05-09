<template>
  <div
    :id="`voucher-card-${ (data && data.id) ? data.id : 0 }`"
    class="flex border rounded card-container bg-color"
    :class="{'flip': isFlip}"
    :style="{ '--bgColor': data.bgColor || bg }"
  >
    <CardInfo
      v-if="!isAction"
      :class="`${ data.isDarkText ? 'text-black' : 'text-white' }`"
      :data="data"
      @onFlip="onFlip()"
    />
    <CardAction
      v-else
      :data="data"
      @onFlip="onFlip()"
    />
  </div>
</template>
<script>
  import CardInfo from './CardInfo'
  import CardAction from './CardAction'

  export default {
    components: {
      CardInfo,
      CardAction
    },
    props: {
      data: {
        type: Object,
        default: null
      },
      bg: {
        type: String,
        default: '#fff'
      },
      bgImg: {
        type: String,
        default: ''
      }, isFlippable: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        isAction: false,
        isFlip: false,
      };
    },
    watch: {
      'data.bgImage'(newVal, oldVal)
      {
        this.onSetBgImage(newVal)
      }
    },
    mounted() {
      if(this.data?.bgImage) {
        this.onSetBgImage(this.data.bgImage)
      }
    },
    methods: {
      onFlip()
      {
        if(this.isFlippable) {
          this.isFlip = !this.isFlip
          this.isAction = !this.isAction
        }
      },
      onSetBgImage(value)
      {
        const card = document.getElementById(`voucher-card-${ (this.data && this.data.id) ? this.data.id : 0 }`)
        card.style.backgroundImage = `url('${value}')`
        card.style.backgroundSize = `320px 260px`
      }
    }
  }
</script>
<style lang="css" scoped>
  .card-container {
    width: 320px;
    height: 260px;
    border-radius: 6px;
    transform: rotateY(0deg);
    transition: transform 0.8s linear;
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
  @media only screen and (max-width: 640px) {
    .card-container {
      width: 100%;
    }
  }
</style>