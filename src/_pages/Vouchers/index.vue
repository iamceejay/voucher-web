<template>
  <MainLayout>
    <template #content>
      <div class="-mt-10 bg-custom-gray">
        <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
          <Header title="Meine Gutscheine" containerClass="items-center justify-between">
            <router-link
              to="vouchers/new"
            >
              <Button
                class=""
                size="w-10 h-10"
                round="rounded"
                icon="fas fa-plus text-2xl"
                :fullIconClass="true"
              />
            </router-link>
          </Header>
          <VoucherList
            :data="VOUCHERS.data"
            :withPagination="true"
            :currentPage="VOUCHERS.current_page"
            :lastPage="VOUCHERS.last_page"
            @onPaginate="onPaginateVouchers($event)"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import MainLayout from '_layouts';
  import Header from '_components/Headers/Seller/Header';

  export default {
    name: 'Vouchers',
    components: {
      Button,
      MainLayout,
      VoucherList,
      Header
    },
    data() {
      return {
        submitting: false,
        params: {
          keyword: '',
          page: 1,
          paginate: 9,
          isNewest: false,
          isMostPopular: false,
          isLowestPrice: false,
          isPrice: null,
          isLoading: false,
          seed: new Date().getTime()
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          if( this.AUTH_USER?.data?.id ) {
            await this.$store.commit('SET_VOUCHERS', [])
            await this.onFetchVouchers(this.AUTH_USER.data.id)
          }
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onPaginateVouchers(action)
      {
        let params =
        {
          ...this.params,
          page: (action === "prev") ? this.params.page - 1 : this.params.page + 1
        }
        await this.$store.commit('SET_VOUCHERS', [])
        await this.onFetchData(params)
      },
      async onFetchData( data )
      {
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data,
        }
        await this.onFetchVouchers()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchVouchers(id)
      {
        try {
          await this.$store.dispatch('FETCH_SELLER_VOUCHERS', {
            ...this.params,
            seller_id: id
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