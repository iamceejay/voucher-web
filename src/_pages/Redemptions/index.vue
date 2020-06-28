<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Redemptions"
        />
        <RedemptionList 
          :data="REDEMPTIONS.data"
          role="seller"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import MainLayout from '_layouts';
  import RedemptionList from '_components/List/Modules/RedemptionList'
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      RedemptionList,
      Header1,
    },
    props: [],
    
    data() {
      return {
        submitting: false,
        earnings: [],
        params: {
          page: 1,
          paginate: 5,
          seller_id: null,
          status: 'completed'
        }
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      REDEMPTIONS()
      {
        return this.$store.getters.REDEMPTIONS
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      IS_LOAD_MORE()
      {
        return this.$store.getters.IS_LOAD_MORE
      },
    },
    watch: {
      async IS_LOAD_MORE(newVal)
      {
        if( newVal ) {
          await this.onLoadData({
            ...this.params,
            page: this.params.page + 1
          })
          await this.$store.commit('SET_IS_LOAD_MORE', false)
        }
      },
    },
    mounted() {
      (async() => {
        try {
          await this.$store.commit('SET_IS_INFINITE_LOAD', true)
          await this.$store.commit('SET_WALLETS', [])
          await this.$store.commit('SET_REDEMPTIONS', [])
          this.params.seller_id = this.AUTH_USER.data.id
          await this.$store.commit('SET_IS_LOADING', { status: 'open' })
          await this.onFetchWallets()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    beforeDestroy () {
      (async() => {
        await this.$store.commit('SET_IS_INFINITE_LOAD', false)
      })()
    },
    methods: {
      async onLoadData( data )
      {
        await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
        this.params = {
          ...this.params,
          ...data
        }
        await this.onFetchWallets()
        await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
      },
      async onFetchWallets()
      {
        try {
          const data = await this.$store.dispatch('FETCH_REDEMPTIONS', this.params)
          if( data.redemptions.next_page_url == null ) {
            await this.$store.commit('SET_IS_INFINITE_LOAD', false)
          }
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang="css" scoped>
</style>