<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">
        <Header1
          label="Gutschein personalisieren"
        />
        <PersonalizedForm 
          :data="WALLET"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import PersonalizedForm from '_components/Modules/Voucher/VoucherPersonalizedForm';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      PersonalizedForm,
      Header1,
    },
    data() {
      return {
        data: null,
      }
    },
    computed: {
      WALLET()
      {
        return this.$store.getters.WALLET
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchWallet()
        await this.$store.commit('SET_TEMPLATES', [])
        await this.onFetchTemplates()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onFetchWallet()
      {
        if( this.$route.params.id ) {
          try {
            await this.$store.dispatch('FETCH_WALLET', this.$route.params.id)
          } catch (err) {
            console.log('err', err)
          }
        }
      },
      async onFetchTemplates()
      {
        try {
          await this.$store.dispatch('FETCH_TEMPLATES')
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>