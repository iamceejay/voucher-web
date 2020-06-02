<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full">
        <Header1
          label="Global Settings"
        />
        <PayoutForm
          :data="GLOBAL_SETTING"
          @onSubmit="onSubmit"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import PayoutForm from '_components/Modules/Payout/PayoutForm'

  export default {
    components: {
      MainLayout,
      Header1,
      PayoutForm,
    },
    data() {
      return {
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
      GLOBAL_SETTING()
      {
        return this.$store.getters.GLOBAL_SETTING
      },
    },
    watch: {
      AUTH_USER(newVal) {
      }
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchGlobalSetting()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onSubmit( data )
      {
        try {
          const url = data.id ? 'UPDATE_GLOBAL_SETTING' : 'ADD_GLOBAL_SETTING'
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch(url, data)
          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Saving the settings.',
            confirmButtonColor: '#6C757D',
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchGlobalSetting()
      {
        try {
          const { data } = await this.$store.dispatch('FETCH_GLOBAL_SETTING', 1)
        } catch (err) {
          console.log('err', err)
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>