<template>
  <div
    v-if="!IS_LOADING.status"
    class="guest-homepage flex flex-col w-full bg-white"
    :style="{
      '--bottomSpacing': '4.5rem',
    }"
  >
    <GuestHeader />
    <div class="flex items-center justify-center max-w-2xl mx-auto w-11/12">
      <div class="grid grid-cols-4 md:gap-4 lg:gap-7">
        <div class="pl-4 sm:px-0">
          <img src="/images/partners/epasnets_aplusb.jpg" class="mb-2" />
        </div>

        <div class="pl-4 sm:px-0">
          <img src="/images/partners/epasnets_aws.jpg" class="mb-2" />
        </div>

        <div class="pl-4 sm:px-0">
          <img src="/images/partners/epasnets_land_tirol.jpg" class="mb-2" />
        </div>

        <div class="pl-4 sm:px-0">
          <img src="/images/partners/epasnets_tirol.jpg" class="mb-2" />
        </div>
      </div>
    </div>

    <div>
      <div class="max-w-2xl mx-auto w-11/12">
        <h2 class="font-medium mb-4">
          Kategorien
        </h2>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="(category, index) in CATEGORIES"
            :key="`item-${index}`"
            :to="`/vouchers/category/${$helpers.toSlug(category.name)}`"
            class="border border-black flex items-center px-3 py-1"
          >
            <p class="text-sm">{{ category.name }}</p>
          </router-link>
        </div>
      </div>

      <VouchCategory
        title="Ab in die Berge"
        description="Wer liebt nicht auch die frische Luft, die Aussicht und das Erlebnis?"
        category="Sport & Adventure"
      />

      <VouchCategory
        title="Wellness"
        description="Wohlfühlen, Genuss, Erholung, Ruhe, Auszeit und Entspannung-gönn dir!"
        category="Wellness & Gesundheit"
        :theme="'peach'"
      />

      <VouchCategory
        title="Fitness & Sport"
        description="Was heute wehtut, macht dich morgen stärker!"
        category="Sport & Adventure"
        :theme="'gray'"
      />

      <div class="content-container w-11/12 py-10">
        <div class="company-color font-bold md:text-5xl text-3xl text-center">
          So funktioniert epasnets:
        </div>
        <div class="flex flex-col gap-10 items-center md:flex-row">
          <div class="bg-black bg-opacity-25 h-80 w-full md:w-1/2"></div>
          <div class="flex flex-col inline-flex justify-center w-full md:w-1/3">
            <div class="md:text-3xl text-center text-xl">
              Regionale Geschenke, digital verschicken, vor Ort einlösen
            </div>
            <div class="text-center">
              <router-link
                :to="`/vouchers/search`"
                class="inline-block mt-6 px-4 py-2 rounded-md more-button"
              >
                Mehr entdecken →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <VouchCategory
        title="Essen & Trinken"
        description="Genieße den perfekten Start in den Tag mit deinen Liebsten!"
        category="Essen & Trinken"
        :theme="'peach'"
      />

      <div class="content-container w-11/12 py-10 px-6">
        <div
          class="company-color font-bold lg:text-6xl md:text-5xl text-3xl text-center"
        >
          Werde epasnets Partner!
        </div>
        <div class="text-center md:text-2xl">
          Du willst als Unternehmen bei uns Gutscheine selber gestalten und
          anbieten? Nichts leichter als das!
        </div>
        <div class="text-center md:text-2xl">
          Erfahre mehr über deine Vorteile als Tiroler Gutschein Anbieter.
        </div>
        <div class="text-center">
          <a
            href="https://verkaufen.epasnets.com/"
            class="inline-block mt-6 px-4 py-2 rounded-md more-button"
          >
            Jetzt loslegen! →
          </a>
        </div>
      </div>

      <div class="content-container w-11/12 mx-auto mb-10">
        <h2 class="text-center text-3xl mb-10 font-medium">
          Unternehmen die bereits dabei sind
        </h2>
        <VueSlickCarousel v-bind="companyOptions" v-if="companies.length">
          <div v-for="(company, index) in companies" :key="`company-${index}`">
            <div
              class="flex flex-col p-3 slider-item-custom text-center mb-6"
              v-if="company.logo"
            >
              <img
                class="h-10 mx-auto"
                :src="onSetImage(company.logo)"
                :alt="company.name"
              />
              <p class="text-xs mt-1">{{ company.name }}</p>
            </div>
            <div v-else class="hidden"></div>
          </div>
        </VueSlickCarousel>

        <div class="border-separator" />
      </div>

      <VouchCategory
        title="Kurse"
        description="Etwas LERNEN und mit der Zeit darin immer geübter werden, ist das nicht auch eine FREUDE!?"
        category="Kurse"
        :theme="'gray'"
      />

      <VouchCategory
        title="Adventure"
        description="Jedes Abenteuer ist nur eine Entscheidung von dir entfernt!"
        category="Sport & Adventure"
        :theme="'peach'"
      />

      <VouchCategory
        title="Kulinarik"
        description="Essen ist eine Kunst, Genießen ein Glück, Zusammensein ein Geschenk!"
        category="Essen & Trinken"
      />

      <VouchCategory
        title="Tiere"
        description="Für unsere vierbeinigen Freunde ist natürlich auch gedacht!"
        category="Tiere"
        :theme="'gray'"
      />

      <TwoColumnVouch
        title="Etwas kniffliges für die Ganze Familie"
        description=""
        category="Kurzurlaub"
        :firstVouch="211"
        :firstVouchTitle="'Du willst Spaß, Rätseln und im Team arbeiten?'"
        :firstVouchDescription="
          'Dann ist das spektakuläre Escape Room Erlebnis in Innsbruck-Kufstein genau das richtige für dich! Erlebe mit der ganzen Familie ein spannendes Abenteuer mit kniffligen Aufgaben, verzaubernde Räume oder für die Horror liebhabenden schrecklich schöne Überraschungen.'
        "
        :secondVouch="75"
        :secondVouchTitle="
          'Schaffst Du es ein rätselhaftes Abenteuer in nur 60 Minuten zu lösen?'
        "
        :secondVouchDescription="
          'Escape Room PerrplexxX bietet dir und deiner Familie, Freunden und Bekannten ein unvergessliches Erlebnis voller Spaß, Zusammenarbeit und kniffligen Aufgaben. Es ist für jeden was dabei, für Jung und Alt bis zu Horror Liebhaber und „Langfinger“ die schon immer mal ein Gemälde stehlen wollten.'
        "
      />

      <!-- <div class="voucher-list__container content-container w-11/12 mt-2">
        <h2 class="text-center text-3xl mb-10 font-medium">Unsere Lieblinge</h2>
        <VoucherList
          title=""
          :data="VOUCHERS.data"
          :withPagination="true"
          :currentPage="VOUCHERS.current_page"
          :lastPage="VOUCHERS.last_page"
          :withQR="false"
          listId="guest-voucher-list"
          @onChange="onFetchData"
          @onPaginate="onPaginateVouchers($event)"
        />

        <div class="border-separator" />
      </div> -->
    </div>

    <!-- <CategoryList
      id="categories"
      class="content-container mb-3 py-6 px-8"
      title="Kategorien"
      :data="CATEGORIES"
    /> -->
    <SellerContent v-if="AUTH_USER.role.name === null" />
    <!-- <VoucherList
      class="content-container mb-3 pb-6 px-8 py-12"
      title=""
      :data="VOUCHERS.data"
      :withPagination="true"
      :currentPage="VOUCHERS.current_page"
      :lastPage="VOUCHERS.last_page"
      sortLabel="Sortieren nach:"
      :withSort="true"
      filterLabel="Filtern nach:"
      :withFilter="true"
      :withQR="false"
      listId="search-voucher-list"
      @onChange="onFetchData"
      @onFilter="onSearchData($event, 'filter')"
      @onSort="onSearchData($event, 'sort')"
      @onPaginate="onPaginateVouchers($event)"
    /> -->
    <!-- <GuestFooter /> -->

    <div
      v-if="showAnnouncement"
      class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
      :class="showAnnouncement ? 'modal-active' : ''"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        @click="showAnnouncement = false"
      />
      <div
        class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="modal-content py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-xl font-bold">
              Schön dich bei epasnets zusehen!
            </p>
            <div
              class="modal-close cursor-pointer z-50"
              @click="showAnnouncement = false"
            >
              <svg
                class="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>
          <p>
            Unsere Seite befindet sich derzeit in der ersten Testphase und wird
            laufend weiterentwickelt. Hol dir als Erster einen kostenlosen
            Zugang zum epasnets Onlineshop und profitiere von unseren Early-Bird
            Konditionen. Du kannst schon jetzt alle Funktionen nutzen und
            Gutscheine aus Tirol kaufen, personalisieren und verschenken oder
            einlösen.
          </p>
          <div class="flex justify-end pt-2">
            <a
              href="https://www.epasnets.com/register/buyer"
              class="px-4 bg-transparent p-3 rounded-lg text-peach mr-2 text-xs"
              >Jetzt als Käufer registrieren</a
            >
            <a
              href="https://verkaufen.epasnets.com"
              class="px-4 company-bg-color p-3 rounded-lg text-white text-xs"
              >Jetzt als Verkäufer registrieren</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VoucherList from '_components/List/Modules/VoucherList/';
import CategoryList from '_components/List/Modules/CategoryList/';
import GuestHeader from './GuestHeader';
import GuestContent from './GuestContent';
import SellerContent from '_pages/Home/shared/SellerContent';
import GuestFooter from './GuestFooter';
import { slider, slideritem } from 'vue-concise-slider';
import { get } from '_helpers/ApiService';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import VouchCategory from '_components/VouchCategory';
import TwoColumnVouch from '_components/TwoColumnVouch';

export default {
  components: {
    GuestHeader,
    GuestContent,
    SellerContent,
    GuestFooter,
    VoucherList,
    CategoryList,
    slider,
    slideritem,
    VueSlickCarousel,
    VouchCategory,
    TwoColumnVouch,
  },
  data() {
    return {
      params: {
        keyword: '',
        page: 1,
        paginate: 9,
        isNewest: false,
        isMostPopular: false,
        isLowestPrice: false,
        isPrice: null,
        isLoading: false,
        featured: true,
        seed: new Date().getTime(),
      },
      showAnnouncement: false,
      options: {
        currentPage: 0,
        loop: true,
        slidesToScroll: 1,
        pagination: false,
        centeredSlides: false,
      },
      companyOptions: {
        dots: false,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        rows: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      },
      voucherCategoriesOptions: {
        dots: false,
        speed: 500,
        rows: 2,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick',
          },
          {
            breakpoint: 767,
            settings: {
              initialSlide: 1,
              centerMode: true,
              slidesToShow: 2,
            },
          },
        ],
      },
      giftOptions: {
        dots: false,
        speed: 500,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick',
          },
          {
            breakpoint: 767,
            settings: {
              initialSlide: 1,
              centerMode: true,
              slidesToShow: 2,
            },
          },
        ],
      },
      regionOptions: {
        dots: false,
        speed: 500,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick',
          },
          {
            breakpoint: 767,
            settings: {
              initialSlide: 1,
              centerMode: true,
              slidesToShow: 2,
            },
          },
        ],
      },
      companies: [],
      gifts: [
        {
          label: 'Paare',
          img: '/images/Paare.jpeg',
        },
        {
          label: 'Freunde',
          img: '/images/Jugendliche.jpg',
        },
        {
          label: 'Kinder',
          img: '/images/Kinder.jpeg',
        },
        {
          label: 'Frauen',
          img: '/images/Frauen.jpeg',
        },
        {
          label: 'Männer',
          img: '/images/Manner.jpeg',
        },
        {
          label: 'Senioren',
          img: '/images/Senioren.jpg',
        },
      ],
    };
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    CATEGORIES() {
      return this.$store.getters.CATEGORIES;
    },
    FEATURED_VOUCHERS() {
      return this.$store.getters.FEATURED_VOUCHERS;
    },
    VOUCHERS() {
      return this.$store.getters.VOUCHERS;
    },
    IS_LOADING() {
      return this.$store.getters.IS_LOADING;
    },
    REGIONS() {
      return this.$store.getters.REGIONS;
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
  //       await this.onFetchData({
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
        // await this.$store.commit('SET_IS_INFINITE_LOAD', true)
        await this.$store.commit('SET_IS_LOADING', { status: 'open' });
        await this.$store.commit('SET_VOUCHERS', []);
        await this.$store.commit('SET_FEATURED_VOUCHERS', []);
        await this.$store.commit('SET_CATEGORIES', []);
        let { data } = await get('company/all');
        this.companies = data.companies.sort(() => Math.random() - 0.5);
        this.companies = this.companies.filter((company) => {
          return company.logo != null;
        });
        await this.onFetchNewestVouchers();
        // await this.onFetchFeaturedVouchers()
        await this.onFetchCategories();
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      } catch (err) {
        await this.$store.commit('SET_IS_LOADING', { status: 'close' });
      }
    })();

    setTimeout(() => {
      this.showAnnouncement = false;
      if (location.hash == '#categories') {
        var elmnt = document.getElementById('categories');
        elmnt.scrollIntoView();
      }
    }, 3000);
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
      await this.onFetchData(params);
      document.querySelector('.voucher-list__container').scrollIntoView();
    },
    async onSearchData(data = null, action) {
      if (action == 'sort') {
        this.params.keyword = '';
      }
      let params =
        action == 'sort' || action == 'filter'
          ? {
              ...this.params,
              ...data,
              page: 1,
            }
          : {
              ...this.params,
              page: 1,
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
      await this.onFetchNewestVouchers();
      await this.$store.commit('SET_IS_PROCESSING', { status: 'close' });
    },
    async onFetchNewestVouchers() {
      try {
        const data = await this.$store.dispatch(
          'FETCH_SEARCH_VOUCHERS',
          this.params
        );
        if (data.vouchers.next_page_url == null) {
          await this.$store.commit('SET_IS_INFINITE_LOAD', false);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchCategories() {
      try {
        await this.$store.dispatch('FETCH_CATEGORIES');
      } catch (err) {
        console.log('err', err);
      }
    },
    async onFetchFeaturedVouchers() {
      try {
        await this.$store.dispatch('FETCH_FEATURED_VOUCHERS');
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
<style lang="css" scoped>
.border-separator {
  @apply border-b border-input-border my-16;
}
.guest-homepage >>> .slick-list[style] {
  padding: 0 20% 0 0 !important;
}
@media only screen and (max-width: 600px) {
  #guest-voucher-list >>> .voucher-card-container {
    width: 100%;
    max-width: unset;
  }
}
</style>
