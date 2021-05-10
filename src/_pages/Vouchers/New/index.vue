<template>
  <MainLayout content-style="background: #F2F2F2!important;"  :showBackButton="false">
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8 pb-10">
        <!-- <Header1
          :label="`${($route.params.id) ? 'Gutschein aktualisieren' : 'Neuer Gutschein'}`"
        /> -->
        <VoucherForm
          :data="data"
          ref="voucherForm"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import VoucherForm from '_components/Modules/Voucher/VoucherForm';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      VoucherForm,
      Header1,
    },
    data() {
      return {
        data: null,
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
          await this.onSetVoucher()
          await this.$store.commit('SET_CATEGORIES', [])
          await this.onFetchCategories()
          await this.onFetchUserSetting()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    beforeRouteLeave(to, from, next) {
      if (this.$refs.voucherForm.isSubmitted || !this.$refs.voucherForm.isFormDirty) {
        next(true)
      }

      this.$swal({
        title: 'Möchten Sie Änderungen speichern?',
        text: '',
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'Speichern',
        cancelButtonText: 'Verwerfen',
      }).then(async (result) => {
        if(result.value) {
          this.$refs.voucherForm.isRouteChanged = true
          let response = await this.$refs.voucherForm.onSubmit()
          next(response)
        } else {
          next(true)
        }

      })
    },
    methods: {
      async onFetchCategories()
      {
        try {
          await this.$store.dispatch('FETCH_CATEGORIES')
        } catch (err) {
          console.log('err', err)
        }
      },
      async onFetchUserSetting()
      {
        try {
          const data = await this.$store.dispatch('FETCH_USER_SETTING_BY_USER', {
            user_id: this.AUTH_USER.data.id
          })
        } catch (err) {
          console.log('err', err)
        }
      },
      async onSetVoucher()
      {
        if( this.$route.params.id ) {
          try {
            const { voucher } = await this.$store.dispatch('FETCH_VOUCHER', {
              id: this.$route.params.id
            })
            this.data = voucher
          } catch (err) {
            console.log('err', err)
          }
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>