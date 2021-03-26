<template>
  <MainLayout>
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="content-container flex flex-col w-full px-8"
      >
        <div data-v-6d1a851d="" class="font-medium mb-1 text-2xl text-center">
          Meine Wallet
        </div>

        <span class="border-b-2 pb-6 text-center text-sm">
          Übersicht deiner Gutscheine
        </span>

        <SearchInputField
          id="search-here"
          v-model="params.keyword"
          class="my-2"
          placeholder="Suche nach Gutscheinen"
          @input="onLoadData($event, true)"
        />
        <WalletList
          class="mb-3"
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
import WalletList from '_components/List/Modules/WalletList/';

export default {
  components: {
    MainLayout,
    SearchInputField,
    WalletList,
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
      },
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    USER_VOUCHERS() {
      return this.$store.getters.USER_VOUCHERS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    // IS_LOAD_MORE()
    // {
    //   return this.$store.getters.IS_LOAD_MORE
    // },
  },
  // watch: {
  //   async IS_LOAD_MORE(newVal)
  //   {
  //     if( newVal ) {
  //       await this.onLoadData({
  //         ...this.params,
  //         page: this.params.page + 1
  //       })
  //       await this.$store.commit('SET_IS_LOAD_MORE', false)
  //     }
  //   },
  // },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_USER_VOUCHERS', []);
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
      await this.$store.commit('SET_USER_VOUCHERS', []);
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
        await this.$store.commit('SET_USER_VOUCHERS', []);
      }
      await this.onFetchSearchUserVouchers();
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
    },
    async onFetchSearchUserVouchers() {
      try {
        const data = await this.$store.dispatch(
          'FETCH_SEARCH_USER_VOUCHERS',
          this.params
        );
        if (data.user_vouchers.next_page_url == null) {
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
