<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Order Management"
        />
        <div class="flex flex-col w-full p-2">
          <SearchInputField
            id="search-order"
            v-model="params.keyword"
            :value="params.keyword"
            class="m-2"
            placeholder="Search for orders..."
            @input="onLoadData"
          />
          <Table
            class="mt-3 mx-2"
            :fields="fields"
            :data="WALLETS"
          >
            <template #customActions="props">
              <div class="flex flex-col">
                <a 
                  v-if="!props.data.reversed"
                  class="text-xs text-indigo-500 underline text-center" 
                  href="javascript:void(0)"
                  @click="onReverse(props.data)"
                >
                  Reverse
                </a>
              </div>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import SearchInputField from '_components/Form/SearchInputField';
  import Table from '_components/Table';
  import { setToken } from '_helpers/ApiService'

  export default {
    components: {
      MainLayout,
      Header1,
      SearchInputField,
      Table,
    },
    data() {
      return {
        tableIndex: 0,
        params: {
          keyword: '',
          status: 'completed'
        },
        fields: [
          {
            name: 'created_date_',
            title: 'Order Date',
            dataClass: 'text-center',
          }, {
            name: 'order_no',
            title: 'Order No.',
            dataClass: 'text-center',
          }, {
            name: 'order_reverse_',
            title: 'Status',
            dataClass: 'text-center',
          }, {
            name: 'actions',
            title: 'Actions',
          }
        ],
        search: ''
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      WALLETS() {
        return this.$store.getters.WALLETS;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.$store.commit('SET_WALLETS', [])
          await this.onFetchWallets()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onReverse(data)
      {
        this.$swal({
          title: 'Bestellung stornieren',
          text: `Bist du sicher dass du diese Bestellung zurückerstatten willst?`,
          showCancelButton: true,
          confirmButtonColor: '#6C757D',
          cancelButtonColor: '#AF0000',
          confirmButtonText: 'Bestätigen',
          cancelButtonText: 'Abbrechen',
        }).then( async (result) => {
          if(result.value){
            try {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
              await this.$store.dispatch('REVERSE_WALLET', {
                id: data.id,
                reverse: true
              })
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              this.$swal({
                icon: 'success',
                title: 'Erfolgreich!',
                text: 'Reversing the order.',
                confirmButtonColor: '#6C757D',
              })
            } catch (err) {
              await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
              let text = 'Etwas ist schief gelaufen. Versuche es nochmal oder kontaktiere uns.'

              if(err?.response?.status == 422) {
                text = err.response.data.message
              }

              this.$swal({
                icon: 'warning',
                title: 'Achtung! ',
                text,
                confirmButtonColor: '#6C757D',
              })
            }
          }   
        })
      },
      async onLoadData()
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.onFetchWallets()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_SEARCH_WALLETS', this.params)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
  .btn-switch {
    margin: 0 auto;
  }
  .btn-switch .btn {
    padding: 5px 10px;
    width: 100%;
    border: 1px solid #1a202c;
    text-align: center;
  }
  .btn-switch .btn.active {
    background-color: #1a202c;
    color: #fff;
  }
  .btn-switch .btn.btn-left {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .btn-switch .btn.btn-right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>