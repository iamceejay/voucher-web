<template>
  <MainLayout title="Gutschein personalisieren">
    <template #header-title>
      <h3 class="font-medium text-xl">Gutschein personalisieren</h3>
    </template>
    <template #content>
      <div v-if="!IS_LOADING.status" class="content-container flex flex-col w-full px-8">

        <PersonalizedForm
          :data="USER_VOUCHER"
          ref="form"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import PersonalizedForm from '_components/Modules/Voucher/VoucherPersonalizedForm'
  import MainLayout from '_layouts'
  import Header1 from '_components/Headers/Header1'

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
      USER_VOUCHER()
      {
        return this.$store.getters.USER_VOUCHER
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
          await this.onFetchUserVoucher()
          await this.$store.commit('SET_TEMPLATES', [])
          await this.onFetchTemplates()
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        } catch (err) {
          await this.$store.commit('SET_IS_LOADING', { status: 'close' })
        }
      })()
    },
    beforeRouteLeave(to, from, next) {
      if (this.$refs.form.isSubmitted) {
        next(true)
      }
      this.$swal({
        title: 'Möchten Sie Änderungen speichern?',
        text: '',
        showCancelButton: true,
        confirmButtonColor: '#48BB78',
        cancelButtonColor: '#FC8181',
        confirmButtonText: 'speichern',
        cancelButtonText: 'Verwerfen',
      }).then(async (result) => {
        if(result.value) {
          this.$refs.form.isRouteChanged = true
          await this.$refs.form.onSubmit()
          next(true)
        } else {
          next(true)
        }

      })
    },
    methods: {
      async onFetchUserVoucher()
      {
        if( this.$route.params.id ) {
          try {
            await this.$store.dispatch('FETCH_USER_VOUCHER', this.$route.params.id)
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