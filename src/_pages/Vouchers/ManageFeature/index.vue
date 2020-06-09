<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Featured Vouchers"
        />
        <Table
          class="mt-3"
          :fields="fields"
          :perPage="10"
          :data="VOUCHERS"
        >
          <template #customActions="props">
            <div class="flex flex-row justify-center">
              <a 
                class="text-lg text-red-900 underline text-center mx-2" 
                href="javascript:void(0)"
                @click="onChange(props.data)"
              >
                <i :class="`${ props.data.is_featured ? 'fas' : 'far' } fa-check-circle`" />
              </a>
            </div>
          </template>
        </Table>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import Table from '_components/Table';

  export default {
    components: {
      MainLayout,
      Header1,
      Table,
    },
    data() {
      return {
        voucher: null,
        onShowModal: false,
        search: '',
        tableIndex: 0,
        fields: [
          {
            name: 'sequence_',
            title: '',
            dataClass: 'text-center'
          }, {
            name: 'voucher_',
            title: 'Voucher Name',
          }, {
            name: 'voucher_feature_',
            title: 'Status',
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      VOUCHERS() {
        return this.$store.getters.VOUCHERS;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
      VOUCHERS() {
        this.tableIndex = this.tableIndex + 1
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.$store.commit('SET_VOUCHERS', [])
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onEdit( data )
      {
        // this.onShowModal = !this.onShowModal
        // this.voucher = data
      },
      async onChange(data)
      {
        this.$swal({
          title: `${ data.is_featured ? 'Removing' : 'Adding' } Featured Voucher`,
          text: `Are you sure you want to ${ data.is_featured ? 'remove' : 'add' } this to featured vouchers?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            try {
              console.log('test naio')
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('FEATURE_UPDATE_VOUCHER', data)
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Successful!',
                text: `${ !data.is_featured ? 'Removing' : 'Adding' } from the featured voucher.`,
                confirmButtonColor: '#6C757D',
              })
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            }
          }   
        })
      },
      async onFetchVouchers()
      {
        try {
          await this.$store.dispatch('FETCH_VOUCHERS', {
            noParams: true
          })
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>