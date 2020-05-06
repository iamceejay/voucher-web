<template>
  <div 
    class="flex border rounded card-container m-2"
    :class="{'flip': isFlip}"
  >
    <CardInfo
      v-if="!isAction"
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
      }
    },
    data() {
      return {
        isAction: false,
        isFlip: false,
      };
    },
    mounted() {},
    methods: {
      onFlip()
      {
        this.isFlip = !this.isFlip
        this.isAction = !this.isAction
      },
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
    transition: transform 0.8s linear;
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
  @media only screen and (max-width: 640px) {
    .card-container {
      width: 100%;
    }
  }
</style>