<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Payout Management"
        />
        <SearchInputField
          id="search-payout"
          v-model="params.keyword"
          :value="params.keyword"
          class="m-2"
          placeholder="Search for payout..."
          @input="onSearch()"
        />
        <Table
          class="mt-3 mx-2"
          :fields="fields"
          :data="SELLER_INVOICES"
        >
          <template #customActions="props">
            <div class="flex flex-col">
              <!-- <a 
                :class="`text-xs text-center ${ props.data.isCompleted ? 'pointer-events-none cursor-default text-gray-700' : 'text-indigo-500 underline' }`" 
                href="javascript:void(0)"
                @click="onMarkComplete(props.data)"
              >
                {{ props.data.isCompleted ? 'Completed' : 'Mark as complete' }}
              </a> -->
              <div v-if="props.data.email_sent" class="text-xs text-center text-gray-700">
                Completed
              </div>
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
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form 
            class="flex flex-col w-full mt-5"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="flex flex-row w-full md:w-1/2 py-3 self-center">
              <DatePickerField
                id="date_from"
                v-model="form.from"
                class="m-1 w-1/2"
                container=""
                rules="required"
                placeholder="Start date"
                @input="onActionDate()"
              />
              <DatePickerField
                id="date_to"
                v-model="form.to"
                class="m-1 w-1/2"
                container=""
                rules="required"
                placeholder="End date"
                :errorMessages="errorMessages.to"
                @input="onActionDate()"
              />
            </div>
            <Button
              class="mx-2 justify-center"
              label="Download all invoices (PDF)"
              size="mt-2 w-full md:w-1/2 py-3"
              round="rounded-full"
              @onClick="onSubmit('pdf')"
            />
            <Button
              class="mx-2 justify-center"
              label="Download all payouts (CSV)"
              size="mt-2 w-full md:w-1/2 py-3"
              round="rounded-full"
              @onClick="onSubmit('csv')"
            />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Header1 from '_components/Headers/Header1'
  import Table from '_components/Table'
  import Button from '_components/Button/'
  import SearchInputField from '_components/Form/SearchInputField'
  import DatePickerField from '_components/Form/DatePickerField'
  import moment from 'moment'

  export default {
    components: {
      MainLayout,
      Header1,
      Table,
      Button,
      SearchInputField,
      DatePickerField,
    },
    data() {
      return {
        params: {
          keyword: '',
        },
        form: {
          from: '',
          to: '',
        },
        errorMessages: [],
        fields: [
          {
            name: 'company.name',
            title: 'Unternehmensname',
          }, {
            name: 'payout',
            title: 'Auszahlung(€)',
            dataClass: 'text-right'
          }, {
            name: 'company.seller.detail.iban',
            title: 'Bank Data(IBAN)',
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER
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
        try {
          await this.$store.commit('SET_WALLETS', [])
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchSellerInvoices()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onSubmit(action)
      {
        const valid = await this.$refs.form.validate()
        console.log('valid', valid)
        if(valid) {
          try {          
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })

            const url = (action == 'pdf') 
              ? 'DOWNLOAD_SELLER_INVOICES_PDF' 
              : 'DOWNLOAD_SELLER_INVOICES_CSV'
            await this.$store.dispatch(url, this.form)

            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

            const text = (action == 'pdf')
              ? 'Downloading all the invoices.'
              : 'Downloading all the payouts.'

            this.$swal({
              icon: 'success',
              title: 'Erfolgreich',
              text,
              confirmButtonColor: '#6C757D',
            })

          } catch (err) {
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            let text = 'Something went wrong.'

            if(err?.response?.status == 422) {
              text = 'No Records found.'
            }

            this.$swal({
              icon: 'warning',
              title: 'Warning!',
              text,
              confirmButtonColor: '#6C757D',
            })
          }
        }
      },
      async onActionDate()
      {
        const { from, to } = this.form
        if(moment(to).isBefore(from, 'day')) {
          await this.$refs.form.validate()
          this.$refs.form.flags.invalid = true
          await this.$refs.form.setErrors({
            date_to: ['Bitte gib ein gültiges Datum ein']
          })
        }
      },
      // onDownloadInvoices()
      // {
      //   let processing = this.$swal({
      //     title: 'Processing Request',
      //     text: 'Please wait ...',
      //     allowOutsideClick: false,
      //     showConfirmButton: false
      //   })
      //   setTimeout( () => {
      //     this.$swal({
      //       icon: 'success',
      //       title: 'Erfolgreich',
      //       text: 'Downloading all the invoices.',
      //       confirmButtonColor: '#6C757D',
      //     })
      //   }, 2000)
      // },
      // onDownloadPayouts()
      // {
      //   let processing = this.$swal({
      //     title: 'Processing Request',
      //     text: 'Please wait ...',
      //     allowOutsideClick: false,
      //     showConfirmButton: false
      //   })
      //   setTimeout( () => {
      //     this.$swal({
      //       icon: 'success',
      //       title: 'Erfolgreich',
      //       text: 'Downloading all the payouts.',
      //       confirmButtonColor: '#6C757D',
      //     })
      //   }, 2000)
      // },
      async onMarkComplete(data)
      {
        this.$swal({
          title: 'Mark Complete',
          text: `Are you sure you want to mark this payment complete?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
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
              title: 'Erfolgreich!',
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
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
            await this.$store.dispatch('SEND_SELLER_INVOICE', data)
            await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
            this.$swal({
              icon: 'success',
              title: 'Erfolgreich!',
              text: 'Sending an invoice.',
              confirmButtonColor: '#6C757D',
            })
          }   
        })
      },
      async onSearch( data, fromSearch = false )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.onFetchSellerInvoices()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchSellerInvoices()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SELLER_INVOICES', this.params)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>