<template>
  <MainLayout>
    <template #content>
      <div v-if="!isLoading" class="w-full flex flex-col">
        <Header1
          label="Personalized Voucher"
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
        isLoading: true,
        data: null,
      }
    },
    computed: {
      WALLET()
      {
        return this.$store.getters.WALLET
      }
    },
    mounted() {
      (async() => {
        this.isLoading = true
        await this.FETCH_WALLET()
        this.isLoading = false
      })()
    },
    methods: {
      async FETCH_WALLET()
      {
        if( this.$route.params.id ) {
          await this.$store.dispatch('FETCH_WALLET', this.$route.params.id)
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>