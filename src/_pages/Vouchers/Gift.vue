<template>
  <MainLayout>
    <template #content>
      <div class="-mt-10 bg-custom-gray">
        <div
          v-if="!IS_LOADING.status"
          class="content-container flex flex-col w-full px-8"
        >
          <Header
            title="Direkt Verkauf"
            containerClass="items-center justify-between"
          >
          </Header>
          <VoucherList
            :data="VOUCHERS.data"
            :withPagination="true"
            :currentPage="VOUCHERS.current_page"
            :lastPage="VOUCHERS.last_page"
            :openNewTab="true"
            @onPaginate="onPaginateVouchers($event)"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import Button from '_components/Button';
import VoucherList from '_components/List/Modules/VoucherList/';
import MainLayout from '_layouts';
import Header from '_components/Headers/Seller/Header';

export default {
  name: 'Vouchers',
  components: {
    Button,
    MainLayout,
    VoucherList,
    Header,
  },
  data() {
    return {
      submitting: false,
      params: {
        keyword: '',
        page: 1,
        paginate: 9,
        isNewest: false,
        isMostPopular: false,
        isLowestPrice: false,
        isPrice: null,
        isLoading: false,
        seed: new Date().getTime(),
      },
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    VOUCHERS() {
      return this.$store.getters.VOUCHERS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
  },
  mounted() {
    (async () => {
      try {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        if (this.AUTH_USER?.data?.id) {
          await this.$store.commit('SET_VOUCHERS', []);
          await this.onFetchVouchers(this.AUTH_USER.data.id);
        }

        await this.onFetchGiftStatus();
        
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    async onPaginateVouchers(action) {
      let params = {
        ...this.params,
        page: action === 'prev' ? this.params.page - 1 : this.params.page + 1,
      };
      await this.$store.commit('SET_VOUCHERS', []);
      await this.onFetchData(params);
    },
    async onFetchData(data) {
      // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
      await this.$store.commit('SET_IS_PROCESSING', { status: 'open' });
      this.params = {
        ...this.params,
        ...data,
      };
      await this.onFetchVouchers();
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
    },
    async onFetchVouchers(id) {
      try {
        const { user } = await this.$store.dispatch('FETCH_USER', {
          id: this.AUTH_USER.data.id,
        });
        let isScanner = false;
        let scannerSellerId = null;

        if(user.user_role.role_id === 4) {
          isScanner = true;
          scannerSellerId = user.scanner_user.seller_id; 
        }

        await this.$store.dispatch('FETCH_SELLER_VOUCHERS', {
          ...this.params,
          seller_id: isScanner ? scannerSellerId : id,
          seller_gift: true
        });
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchGiftStatus() {
      try {
        const { user } = await this.$store.dispatch('FETCH_USER', {
          id: this.AUTH_USER.data.id,
        });
        let giftLocked = true;

        if(user.scanner_user) {
          giftLocked = user.scanner_user.seller.gift_locked;
        }

        if(user.gift_locked && giftLocked) {
          this.$swal({
            title: 'Verkaufe deine Gutscheine direkt vor Ort',
            text: 'Direkt an der Rezeption, Kassa oder in deinem Geschäft Gutscheine provisionsfrei verkaufen und ausstellen.',
            allowOutsideClick: true,
            confirmButtonColor: '#ff5563',
            confirmButtonText: 'Jetzt mehr erfahren',
            showCancelButton: true,
            cancelButtonText: 'Später',
            cancelButtonColor: '#cccccc',
            allowEscapeKey: false,
            allowEnterKey: false,
            preConfirm: () => {
              window.open('https://verkaufen.epasnets.com/kontakt/', '_blank').focus()
              return false
            }
          }).then((result) => {
            if(result.isConfirmed) {

            } else {
              window.location.href = 'https://epasnets.com/home'
            }
          })
        }
      } catch(e) {
        console.log('err', e)
      }
    }
  },
};
</script>
<style lang="css" scoped></style>
