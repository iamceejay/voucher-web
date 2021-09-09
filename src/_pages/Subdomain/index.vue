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
                v-if="USER.company.header_1 && USER.company.header_2"
              >
                <div class="text-xl md:text-4xl text-center">
                  {{ USER.company.header_1 }}
                </div>
                <div class="text-center">{{ USER.company.header_2 }}</div>
              </div>
            </div>
            <img
              v-if="USER && USER.company.header_logo"
              class="h-64 md:h-96 bg-white mb-6 object-cover"
              :src="onSetImage(USER.company.header_logo)"
              alt=""
            />
            <img
              v-else
              class="h-64 md:h-96 bg-white mb-6 object-cover"
              src="@/_assets/img/placeholder-1080.jpg"
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
                v-if="USER.company.icon_1"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_1}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#card-text`" />
              </svg>
              <span>{{ USER.company.text_1 || 'Gutschein wählen' }}</span>
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
                v-if="USER.company.icon_2"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_1}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#palette`" />
              </svg>
              <span>{{
                USER.company.text_2 || 'Gutschein personalisieren'
              }}</span>
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
                v-if="USER.company.icon_3"
                class="text-3xl mb-4 bi-"
                :class="`bi-${USER.company.icon_1}`"
              ></i>
              <svg class="h-8 icon mb-4" v-else>
                <use :xlink:href="`/icons/sprite.svg#gift`" />
              </svg>
              <span>{{ USER.company.text_3 || 'Als Geschenk versenden' }}</span>
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
            title=""
            class="mb-3"
            :data="VOUCHERS.data"
            :withQR="false"
          />
        </div>

        <div class="bg-white flex flex-col items-center px-4 py-10 text-black mt-5">
          <div class="w-9/12 mx-auto text-center py-5">
            <div class="font-medium mb-2 text-3xl mb-5">Diese Homepage wird zur Verfügung gestellt von Epasnets GmbH</div>
            <a href="https://epasnets.com" target="_blank" class="company-bg-color px-5 py-3 rounded-md text-sm text-white">zum Impressum</a>
          </div>
        </div>
        <div class="flex flex-col items-center px-4 py-10 text-black">
          <div class="w-9/12 mx-auto text-center">
            <div class="font-medium mb-2 text-3xl">Verantwortlich für den Inhalt</div>
            <div class="mb-6">{{ USER.company.name }}, {{ USER.detail.address }}, {{ USER.detail.zip_code }}, {{ USER.detail.city }}</div>
            <a v-if="USER.company.link" :href="USER.company.link" target="_blank" class="company-bg-color px-5 py-3 rounded-md text-sm text-white">zum Impressum</a>
          </div>
        </div>
        <div class="content-container flex flex-col md:flex-row w-full gap-6 px-6 mb-10">
          <form action="" class="form bg-white p-6 my-10 relative text-black w-full md:w-1/2">
                <h3 class="text-2xl company-color font-semibold">Kontaktiere uns.</h3>
                <div class="flex space-x-5 mt-3">
                    <input type="text" required placeholder="Name" class="border p-2  w-1/2">
                    <input type="tel" placeholder="Telefonnummer" class="border p-2 w-1/2">
                </div>
                <input type="email" required placeholder="Email" class="border p-2 w-full mt-3">
                <textarea required cols="10" rows="3" placeholder="Tell us about desired property" class="border p-2 mt-3 w-full"></textarea>
                <div class="flex items-baseline space-x-2 mt-2">
                    <input type="checkbox" required class="inline-block">
                    <p class="text-gray-600 text-sm">Ich akzeptiere die Verarbeitung meiner Daten zum Zweck der Kontaktanfrage gemäß Datenschutzerklärung.</p>
                </div>
                <input type="submit" value="Submit" class="w-full mt-6 company-bg-color px-5 py-3 rounded-md text-sm text-white">
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
  },
};
</script>
