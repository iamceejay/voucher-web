<template>
  <MainLayout>
    <template #content>
      <div v-if="!IS_LOADING.status" class="flex flex-col w-full px-8">
        <Header1
          label="Payout Settings"
        />
        <div class="font-semibold text-lg px-2">
          {{ USER.username || 'USERNAME' }} | {{ USER.company.name || 'COMPANY NAME' }}
        </div>
        <PayoutForm
          :data="USER_SETTING"
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
      USER() {
        return this.$store.getters.USER;
      },
      IS_LOADING()
      {
        return this.$store.getters.IS_LOADING
      },
      USER_SETTING()
      {
        return this.$store.getters.USER_SETTING
      },
    },
    mounted() {
      (async() => {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' })
        await this.onFetchUser()
        await this.onFetchUserSetting()
        await this.$store.commit('SET_IS_LOADING', { status: 'close' })
      })()
    },
    methods: {
      async onSubmit( data )
      {
        try {
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          await this.$store.dispatch('ADD_USER_SETTING', {
            ...data,
            user_id: this.$route.params.id
          })
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
      async onFetchUser()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER', {
            id: this.$route.params.id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchUserSetting()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER_SETTING_BY_USER', {
            user_id: this.$route.params.id
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