<template>
  <div 
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3"
    @click="onFlip()"
  >
    <Button
      class="py-2 justify-center"
      label="Edit voucher"
      size="w-64 py-2"
      variant="info"
      round="rounded-full"
      @onClick="onAction()"
    />
    <Button
      class="py-2 justify-center"
      label="View statistics"
      size="w-64 py-2"
      variant="info"
      round="rounded-full"
      @onClick="onAction()"
    />
    <Button
      class="py-2 justify-center"
      label="Deactivate voucher"
      size="w-64 py-2"
      variant="info"
      round="rounded-full"
      @onClick="onAction()"
    />
    <Button
      class="py-2 justify-center"
      label="Delete voucer"
      size="w-64 py-2"
      variant="info"
      round="rounded-full"
      @onClick="onAction()"
    />
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button
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
</style>