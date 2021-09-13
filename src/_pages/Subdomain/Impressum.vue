<template>
  <MainLayout style="color: var(--text-color, #fff);">
    <template #content>
      <div class="flex flex-col w-full">

        <div class="bg-white flex flex-col items-center px-4 py-20 text-black -mt-5">
          <div class="w-9/12 mx-auto text-center py-5">
            <div class="font-medium mb-2 text-3xl mb-5">Diese Homepage wird zur Verfügung gestellt von Epasnets GmbH</div>
            <a href="https://about.epasnets.com/impressum/" target="_blank" class="company-bg-color px-5 py-3 rounded-md text-sm text-white">zum Impressum</a>
          </div>
        </div>
        <div class="bg-white flex flex-col items-center px-4 py-20 text-black">
          <div class="w-9/12 mx-auto text-center">
            <div class="font-medium mb-2 text-3xl">Verantwortlich für den Inhalt</div>
            <div class="mb-6">{{ USER.company.name }}, {{ USER.detail.address }}, {{ USER.detail.zip_code }}, {{ USER.detail.city }}</div>
            <a v-if="USER.company.link" :href="USER.company.link" target="_blank" class="company-bg-color px-5 py-3 rounded-md text-sm text-white">zum Impressum</a>
          </div>
        </div>
        <div class="content-container flex flex-col md:flex-row w-full gap-6 px-6 mb-10">
          <form action="" class="form bg-white p-6 my-10 relative text-black w-full md:w-1/2" @submit.prevent="onSubmitForm">
                <h3 class="text-2xl company-color font-semibold">Kontaktiere uns.</h3>
                <div class="flex space-x-5 mt-3">
                    <input name="name" type="text" required placeholder="Name" class="border p-2  w-1/2">
                    <input name="tel" type="tel" placeholder="Telefonnummer" class="border p-2 w-1/2">
                </div>
                <input name="email" type="email" required placeholder="Email" class="border p-2 w-full mt-3">
                <textarea name="content" required cols="10" rows="3" placeholder="Tell us about desired property" class="border p-2 mt-3 w-full"></textarea>
                <div class="flex items-baseline space-x-2 mt-2">
                    <input type="checkbox" required class="inline-block">
                    <p class="text-gray-600 text-sm">Ich akzeptiere die Verarbeitung meiner Daten zum Zweck der Kontaktanfrage gemäß Datenschutzerklärung.</p>
                </div>
                <input ref="submit"  type="submit" value="Submit" class="w-full mt-6 company-bg-color px-5 py-3 rounded-md text-sm text-white">
            </form>
            <div class="flex items-center justify-center md:w-1/2 w-full">
              <a class="flex justify-center max-w-xs w-full" :href="appURL">
                <img class="self-center" src="@/_assets/img/header.svg" alt="" />
              </a>
            </div>
          </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts/subdomain';
import VoucherList from '_components/List/Modules/VoucherList/';
import { post } from '_helpers/ApiService'

export default {
  components: {
    MainLayout,
    VoucherList,
  },
  data() {
    return {
      isLoading: true,
      isShowMore: false,
      appURL: '',
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    VOUCHERS() {
      return this.$store.getters.SELLER_VOUCHERS;
    },
    USER() {
      return this.$store.getters.COMPANY;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
  },
  watch: {},
  mounted() {
    (async () => {
      this.appURL = process.env.VUE_APP_WEB_URL
      try {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.$store.commit('SET_SELLER_VOUCHERS', []);
        await this.onFetchVouchers();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onSubmitForm(evt) {
      let formData = new FormData(evt.target)
      this.$refs.submit.value = 'Loading...'
      this.$refs.submit.disabled = true
      await post(`contact`, formData)
      this.$swal({
        title: 'Form Successfully Submited!',
        text: '',
        allowOutsideClick: true,
        confirmButtonColor: '#48BB78',
        timer: 2000,
        timerProgressBar: true,
      })
      this.$refs.submit.value = 'Submit'
      this.$refs.submit.disabled = false
      evt.target.reset()
    }
  },
};
</script>

<style scoped>
 [disabled] {
   @apply opacity-50;
 }
</style>