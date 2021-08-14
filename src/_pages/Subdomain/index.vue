<template>
  <MainLayout style="color: var(--text-color, #fff);">
    <template #content>
      <div v-if="!IS_LOADING.status && USER" class="flex flex-col w-full">
        <div class="w-full flex flex-col relative bg-white pb-20 -mt-5">
					<div class="relative w-full flex flex-col mb-14">
						<div class="absolute flex inset-0 items-center justify-center">
							<div class="p-12" style="background-color: var(--company-color-opacity)">
								<div class="text-4xl text-center"> {{  USER.company.header_1 || 'Entdecke unsere Gutscheine' }}</div>
								<div class="text-center">{{  USER.company.header_1 || 'Zum personalisiere, verschenken und erleben' }}</div>
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

					<ul class="content-container gap-4 grid grid-cols-1 lg:grid-cols-3 px-8 sm:grid-cols-2 w-full mb-14">
						<li
							v-for="(step, key) in steps"
							:key="key"
							class="flex flex-col items-center justify-center py-14 relative"
							style="background-color: var(--company-color)"
						>
              <div
                 class="-mt-4 absolute bg-white border flex h-10 items-center justify-center rounded-full text-black top-0 w-10"
                style="border-color: var(--company-color)"
              >{{ key + 1}}</div>
							<svg
                class="h-8 icon mb-4">
                <use :xlink:href="`/icons/sprite.svg#${step.icon}`"/>
              </svg>
							<span>{{ step.title }}</span>
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
			steps: [
				{
					icon: 'card-text',
					title: 'Gutschein wählen'
				},
				{
					icon: 'palette',
					title: 'Gutschein personalisieren'
				},
				{
					icon: 'gift',
					title: 'Als Geschenk versenden'
				},
			]
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
        url = 'http://' + url;
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
