<template>
  <div 
    class="w-full flex flex-col cursor-pointer self-center px-4 py-3 h-full justify-center"
    @click="onFlip()"
  >
    <router-link :to="`/vouchers/update/${data.id}`">
      <Button
        class="py-2 justify-center"
        label="Edit voucher"
        size="w-64 py-2"
        round="rounded-full"
      />
    </router-link>
    <router-link :to="`/vouchers/statistic/${data.id}`">
      <Button
        class="py-2 justify-center"
        label="View statistics"
        size="w-64 py-2"
        round="rounded-full"
      />
    </router-link>
    <Button
      class="py-2 justify-center"
      :label="`${ data.is_active ? 'Deactivate' : 'Activate' } voucher`"
      size="w-64 py-2"
      round="rounded-full"
      @onClick="onDeact(data)"
    />
    <Button
      class="py-2 justify-center"
      label="Delete voucher"
      size="w-64 py-2"
      round="rounded-full"
      @onClick="onDelete(data)"
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
      onDelete(data)
      {
        this.isAction = ++this.isAction
        this.$swal({
          title: 'Delete Voucher',
          text: `Are you sure you want to delete this voucher?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('DELETE_VOUCHER', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Deleting the voucher.',
              confirmButtonColor: '#6C757D',
            });
            this.$emit('onFlip')
          }
        })
      },
      async onDeact(data)
      {
        this.isAction = ++this.isAction
        this.$swal({
          title: `${ data.is_active ? 'Deactivate' : 'Activate' } Voucher`,
          text: `Are you sure you want to ${ data.is_active ? 'deactivate' : 'activate' } this voucher?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('STATUS_UPDATE_VOUCHER', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: `${ data.is_active ? 'Deactivating' : 'Activating' } the voucher.`,
              confirmButtonColor: '#6C757D',
            })
            this.$emit('onFlip')
          }
        })
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