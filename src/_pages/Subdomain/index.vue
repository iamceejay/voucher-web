<template>
  <MainLayout style="color: var(--text-color, #fff);">
    <template #content>
      <div v-if="!IS_LOADING.status && USER" class="flex flex-col w-full">
        <div class="w-full flex flex-col relative bg-white pb-20 -mt-5">
          <div class="relative w-full flex flex-col mb-14">
            <div class="absolute flex inset-0 items-center justify-center">
              <div
                class="w-10/12 p-4 md:w-auto md:p-12"
                :style="
                  USER.company.is_header_show
                    ? `background-color: var(--company-color-opacity)`
                    : ''
                "
                v-if="USER.company && USER.company.header_1 && USER.company.header_2"
              >
                <div class="text-xl md:text-4xl text-center">
                  {{ USER.company.header_1 }}
                </div>
                <div class="text-center">{{ USER.company.header_2 }}</div>
              </div>
            </div>
            <img
              v-if="USER && USER.company && USER.company.header_logo"
              class="h-64 md:h-96 bg-white mb-6 object-cover"
              :src="onSetImage(USER.company.header_logo)"
              alt=""
            />
            <img
              v-else
              class="h-64 md:h-96 bg-white mb-6 object-cover"
              src="@/_assets/img/subdomain-header.jpg"
              alt=""
            />
          </div>

          <ul
            class="content-container gap-4 grid grid-cols-1 lg:grid-cols-3 px-8 sm:grid-cols-2 w-full mb-14"
          >
            <li
              class="flex flex-col items-center justify-center py-14 relative"
              style="background-color: var(--company-color)"
            >
              <div
                class="-mt-4 absolute bg-white border flex h-10 items-center justify-center rounded-full text-black top-0 w-10"
                style="border-color: var(--company-color)"
              >
                1
              </div>
              <i
                v-if="USER.company && USER.company.icon_1"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_1}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#card-text`" />
              </svg>
              <span>{{ USER.compan && USER.company.text_1  ? USER.company.text_1 : 'Gutschein wählen' }}</span>
            </li>
            <li
              class="flex flex-col items-center justify-center py-14 relative"
              style="background-color: var(--company-color)"
            >
              <div
                class="-mt-4 absolute bg-white border flex h-10 items-center justify-center rounded-full text-black top-0 w-10"
                style="border-color: var(--company-color)"
              >
                2
              </div>
              <i
                v-if="USER.company && USER.company.icon_2"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_2}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#palette`" />
              </svg>
              <span>{{ USER.compan && USER.company.text_2 ? USER.company.text_2 : 'Gutschein personalisieren' }}</span>
            </li>
            <li
              class="flex flex-col items-center justify-center py-14 relative"
              style="background-color: var(--company-color)"
            >
              <div
                class="-mt-4 absolute bg-white border flex h-10 items-center justify-center rounded-full text-black top-0 w-10"
                style="border-color: var(--company-color)"
              >
                3
              </div>
              <i
                v-if="USER.company && USER.company.icon_3"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_3}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#gift`" />
              </svg>
              <span>{{ USER.compan && USER.company.text_3 ? USER.company.text_3 : 'Als Geschenk versenden' }}</span>
            </li>
          </ul>
        </div>

        <div class="content-container px-8 w-full flex flex-col">
          <div
            class="font-medium text-3xl text-center my-12"
            style="color: #1D4F55"
          >
            Unsere Gutscheine
          </div>
          <VoucherList
            v-if="USER && USER.company"
            title=""
            class="mb-3"
            :data="VOUCHERS.data"
            :withQR="false"
          />
          <WalletList
            v-else
            class="mb-3 mt-4"
            :role="'user'"
            :data="USER_VOUCHERS.data"
            :withPagination="true"
            :currentPage="USER_VOUCHERS.current_page"
            :lastPage="USER_VOUCHERS.last_page"
            :isCart="false"
            :withQR="true"
            :withCartDetail="false"
            :asGift="true"
            @onPaginate="onPaginateVouchers($event)"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts/subdomain';
import VoucherList from '_components/List/Modules/VoucherList/';
import WalletList from '_components/List/Modules/WalletList/';
import { post } from '_helpers/ApiService'

export default {
  components: {
    MainLayout,
    VoucherList,
    WalletList
  },
  data() {
    return {
      isLoading: true,
      isShowMore: false,
      appURL: '',
      params: {
        keyword: '',
        page: 1,
        paginate: 9,
        user_id: null,
        status: 'completed',
        asGift: true
      },
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
    USER_VOUCHERS() {
      return this.$store.getters.USER_VOUCHERS;
    },
  },
  watch: {},
  mounted() {
    (async () => {
      this.appURL = process.env.VUE_APP_WEB_URL
      try {
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });

        if(this.USER && this.USER.company) {
          await this.$store.commit('SET_SELLER_VOUCHERS', []);
          await this.onFetchVouchers();
        } else {
          this.params.user_id = this.USER.id;
          await this.onFetchSearchUserVouchers();
        }

        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();
  },
  methods: {
    addHttp(url) {
      if (!url) {
        return '';
      }
      if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'https://' + url;
      }
      return url;
    },
    async onFetchVouchers() {
      try {
        await this.$store.dispatch('FETCH_VOUCHERS', {
          seller_id: this.USER.id,
          isSeller: true,
        });
      } catch (err) {
        console.log('err', err);
      }
    },
    onSetImage(value) {
      return value.search('base64') < 0
        ? `${process.env.VUE_APP_API_BASE_URL}/storage/${value}`
        : value;
    },
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
    },
    async onFetchSearchUserVouchers() {
      try {
        const data = await this.$store.dispatch(
          'FETCH_SEARCH_GIFT_USER_VOUCHERS',
          this.params
        );
        if (data.user_vouchers.next_page_url == null) {
          await this.$store.commit('SET_IS_INFINITE_LOAD', false);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
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
  },
};
</script>

<style scoped>
 [disabled] {
   @apply opacity-50;
 }
</style>