<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Mein Warenkorb"
        />
        <CartList
          v-if="WALLETS && WALLETS.length >= 0"
          class="mb-3"
          :role="AUTH_USER.role.name"
          :data="WALLETS"
          @onDelete="onDelete"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import CartList from '_components/List/Modules/CartList/';

  export default {
    components: {
      MainLayout,
      Header1,
      CartList,
    },
    data() {
      return {
        role: null,
        search: ''
      }
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      WALLETS()
      {
        return this.$store.getters.WALLETS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      COUNT_CART()
      {
        return this.$store.getters.COUNT_CART
      },
    },
    watch: {
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_WALLETS', [])
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    methods: {
      async onFetchWallets()
      {
        await this.$store.dispatch('FETCH_WALLETS', {
          user_id: this.AUTH_USER.data.id,
          status: 'pending'
        })
      },
      async onDelete( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        await this.$store.dispatch('DELETE_WALLET', data)
        await this.$store.commit('SET_COUNT_CART', this.COUNT_CART - 1)
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
        this.$swal({
          icon: 'success',
          title: 'Erfolgreich!',
          text: 'Deleting the voucher from the cart.',
          confirmButtonColor: '#6C757D',
        })
      },
    }
  }
</script>
<style lang='css' scoped>
</style>