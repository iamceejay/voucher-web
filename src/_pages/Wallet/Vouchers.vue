<template>
  <MainLayout>
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="content-container flex flex-col w-full px-8"
      >
        <div class="flex justify-between">
          <div>
              <div data-v-6d1a851d="" class="font-medium mb-1 text-2xl">
              Meine Wallet
            </div>

            <span class="pb-6 text-sm">
              Übersicht deiner Gutscheine
            </span>
          </div>
          <div class="flex items-center">
            <button
              class="company-bg-color px-5 py-3 rounded-full text-sm text-white flex items-center"
              @click="$router.push('/wallet/vouchers/new')"
            >
              Gutschein erstellen
            </button>
            <button
              class="company-bg-color px-5 py-3 rounded-full text-sm text-white ml-4 flex items-center"
              @click="$router.push('/vouchers/search')"
            >
              <svg class="icon h-4 w-4 mr-2">
                <use xlink:href="/icons/sprite.svg#search" />
              </svg>
              Gutschein entdecken
            </button>
          </div>
        </div>

        <div class="flex items-center mt-6">
            <span
            class="px-3 py-1 rounded-md text-xs border border-black text-black mr-2 mb-2"

              @click="$router.push('/wallet')"
            >
              Gutschein von Unternehmen
            </span>
            <button
               class="px-3 py-1 rounded-md text-xs border border-black mr-2 mb-2 router-link-exact-active bg-black text-white"
            >
              Selbstgemachte Gutscheine
            </button>
          </div>

        <VouchersWalletList
          class="mb-3 mt-4"
          :role="AUTH_USER.role.name"
          :data="USER_VOUCHERS.data"
          :withPagination="true"
          :currentPage="USER_VOUCHERS.current_page"
          :lastPage="USER_VOUCHERS.last_page"
          :isCart="false"
          :withQR="true"
          :withCartDetail="false"
          @onPaginate="onPaginateVouchers($event)"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts';
import Header1 from '_components/Headers/Header1';
import SearchInputField from '_components/Form/SearchInputField';
import VouchersWalletList from '_components/List/Modules/WalletList/Vouchers';

export default {
  components: {
    MainLayout,
    SearchInputField,
    VouchersWalletList,
  },
  data() {
    return {
      search: '',
      params: {
        keyword: '',
        page: 1,
        paginate: 9,
        user_id: null,
        status: 'completed',
        type: 'buyer'
      },
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    USER_VOUCHERS() {
      return this.$store.getters.VOUCHERS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_VOUCHERS', []);
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        this.params.user_id = this.AUTH_USER.data.id;
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.onFetchSearchUserVouchers();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  beforeDestroy() {
    (async () => {
      await this.$store.commit('SET_IS_INFINITE_LOAD', false);
    })();
  },
  methods: {
    async onPaginateVouchers(action) {
      let params = {
        ...this.params,
        page: action === 'prev' ? this.params.page - 1 : this.params.page + 1,
      };
      await this.$store.commit('SET_VOUCHERS', []);
      await this.onLoadData(params);
    },
    async onLoadData(data, fromSearch = false) {
      await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
      this.params = {
        ...this.params,
        ...data,
        page: this.params.keyword != '' ? 1 : data.page,
      };
      if (fromSearch) {
        await this.$store.commit('SET_VOUCHERS', []);
      }
      await this.onFetchSearchUserVouchers();
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
    },
    async onFetchSearchUserVouchers() {
      try {
        const data = await this.$store.dispatch(
          'FETCH_BUYER_VOUCHERS',
          this.params
        );
        if (data.vouchers.next_page_url == null) {
          await this.$store.commit('SET_IS_INFINITE_LOAD', false);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
