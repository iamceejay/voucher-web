<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          label="Payout Management"
        />
        <Table
          class="mt-3"
          :fields="fields"
          :data="SELLER_INVOICES"
        >
          <template #customActions="props">
            <div class="flex flex-col">
              <a 
                :class="`text-xs text-center ${ props.data.isCompleted ? 'pointer-events-none cursor-default text-gray-700' : 'text-indigo-500 underline' }`" 
                href="javascript:void(0)"
                @click="onMarkComplete(props.data)"
              >
                {{ props.data.isCompleted ? 'Completed' : 'Mark as complete' }}
              </a>
              <a 
                class="text-xs text-indigo-500 underline text-center" 
                href="javascript:void(0)"
                @click="onSendInvoice(props.data)"
              >
                Send Invoice
              </a>
            </div>
          </template>
        </Table>
        <div class="flex flex-col w-full mt-5">
          <Button
            class="mx-2 justify-center"
            label="Download all invoices (PDF)"
            size="mt-2 w-full md:w-1/2 py-3"
            round="rounded-full"
            @onClick="onDownloadInvoices()"
          />
          <Button
            class="mx-2 justify-center"
            label="Download all payouts (CSV)"
            size="mt-2 w-full md:w-1/2 py-3"
            round="rounded-full"
            @onClick="onDownloadPayouts()"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import Table from '_components/Table';
  import Button from '_components/Button/'

  export default {
    components: {
      MainLayout,
      Header1,
      Table,
      Button,
    },
    data() {
      return {
        data: [
          {
            id: 1,
            companyName: 'Jasper Poly',
            payout: 385949,
            bank: 'AT12 1234 1234 1234',
            isCompleted: true,
          }, {
            id: 2,
            companyName: 'Ivan Dukic',
            payout: 293490,
            bank: 'AT12 1234 1234 1234',
            isCompleted: false,
          }, {
            id: 3,
            companyName: 'Jeremias Fuchs',
            payout: 482354,
            bank: 'AT12 1234 1234 1234',
            isCompleted: false,
          }, {
            id: 4,
            companyName: 'The Dude',
            payout: 23909,
            bank: 'AT12 1234 1234 1234',
            isCompleted: false,
          }, 
        ],
        fields: [
          {
            name: 'company.name',
            title: 'Company Name',
          }, {
            name: 'commission',
            title: 'Payout(€)',
            dataClass: 'text-right'
          }, {
            name: 'company.seller.detail.iban',
            title: 'Bank Data(IBAN)',
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
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      SELLER_INVOICES()
      {
        return this.$store.getters.SELLER_INVOICES
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_WALLETS', [])
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchSellerInvoices()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      onDownloadInvoices(  )
      {
        let processing = this.$swal({
          title: 'Processing Request',
          text: 'Please wait ...',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Downloading all the invoices.',
            confirmButtonColor: '#6C757D',
          })
        }, 2000)
      },
      onDownloadPayouts(  )
      {
        let processing = this.$swal({
          title: 'Processing Request',
          text: 'Please wait ...',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        setTimeout( () => {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Downloading all the payouts.',
            confirmButtonColor: '#6C757D',
          })
        }, 2000)
      },
      async onMarkComplete(data)
      {
        this.$swal({
          title: 'Mark Complete',
          text: `Are you sure you want to mark this payment complete?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            this.data = this.data.map( row => {
              if(row.id == data.id) {
                row.isCompleted = true
              }
              return row
            })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Marking the payment complete.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      async onSendInvoice(data)
      {
        this.$swal({
          title: 'Send an Invoice',
          text: `Are you sure you want to send an invoice?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then( async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('SEND_SELLER_INVOICE', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Successful!',
              text: 'Sending an invoice.',
              confirmButtonColor: '#6C757D',
            });
          }   
        })
      },
      async onFetchSellerInvoices()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SELLER_INVOICES')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>