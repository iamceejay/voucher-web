<template>
  <MainLayout contentStyle="background: #fff;">
    <template #content>
      <div
        v-if="!IS_LOADING.status"
        class="guest-homepage flex flex-col w-full bg-white"
        :style="{
          '--bottomSpacing': '4.5rem',
        }"
      >
        <Header />

        <div>
          <VouchCategory
            title="Love is in the air!"
            description="Was ist das Schönste am verliebt sein? Richtig – man kann alles gemeinsam erleben! Ob aufregende Abenteuer, gemütliche Zweisamkeit, kulinarische Highlights oder spannende Unterhaltung – mit Schmetterlingen im Bauch macht’s gleich noch mehr Spaß!"
            category="Sport & Adventure"
            :ids="section_1"
            :theme="'gray'"
            :showButton="true"
            preTitle="Für unvergessliche Momente zu zweit:"
            titleClass="company-color text-center"
            descriptionClass="!text-black text-center"
          >
          </VouchCategory>

          <VouchCategory
            title="Schlemmen für zwei"
            description="Lieber ein inniger Morgen mit Brunch oder ein romantisches Dinner bei Nacht? Ihr müsst euch nicht entscheiden, ihr könnt einfach beides ausprobieren und dann gemeinsam entscheiden. Hauptsache Essen zu zweit!"
            category="Sport & Adventure"
            :ids="section_2"
            :theme="'white'"
            :showButton="true"
            descriptionClass="company-color"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/Startpage/Fitness&Sport Bildershow/Bild 1.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Fitness&Sport Bildershow/Bild 2.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Fitness&Sport Bildershow/Bild 3.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Fitness&Sport Bildershow/Bild 4.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Fitness&Sport Bildershow/Bild 5.jpg"
                />
              </VueSlickCarousel>
            </div>
          </VouchCategory>

          <VouchCategory
            title="Wellness"
            description="Entspannung pur für Verliebte. Alles rundherum vergessen und einfach die Zweisamkeit genießen. Das funktioniert am besten bei einem gemütlichen SPA-Day oder einem ruhigen Wellness-Wochenende, bei dem man so richtig abschalten kann."
            category="Wellness & Gesundheit"
            :ids="section_3"
            :theme="'peach'"
            :showButton="true"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/Startpage/Wellness Bildershow/Bild 1.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Wellness Bildershow/Bild 2.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Wellness Bildershow/Bild 3.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Wellness Bildershow/Bild 4.jpg"
                />
                <img
                  src="@/_assets/img/Startpage/Wellness Bildershow/Bild 5.jpg"
                />
              </VueSlickCarousel>
            </div>
          </VouchCategory>

          <div class="content-container w-11/12 py-10">
            <div
              class="company-color font-bold md:text-5xl text-3xl text-center"
            >
              So funktioniert epasnets:
            </div>
            <div class="flex flex-col gap-10 items-center md:flex-row">
              <div class="bg-white bg-opacity-25 pt-10 w-full md:w-1/2">
                <div style="padding:90.25% 0 0 0;position:relative;">
                  <iframe
                    src="https://player.vimeo.com/video/622593212?autoplay=1&autopause=0&controls=0&muted=1&loop=1"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div
                class="flex flex-col inline-flex justify-center w-full md:w-1/3"
              >
                <div class="md:text-3xl text-center text-xl">
                  Regionale Geschenke, digital verschicken, vor Ort einlösen
                </div>
                <div class="text-center">
                  <a
                    :href="`/vouchers/search`"
                    class="inline-block mt-6 px-4 py-2 rounded-md more-button"
                  >
                    Mehr entdecken →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-6 grid gap-16 grid-cols-2 lg:grid-cols-4 content-container w-11/12"
          >
            <img
              class="w-full mx-auto"
              src="@/_assets/img/epasnets-heart-light.png"
            />
            <img
              class="w-full mx-auto"
              src="@/_assets/img/epasnets-heart-light.png"
            />
            <img
              class="w-full mx-auto"
              src="@/_assets/img/epasnets-heart-light.png"
            />
            <img
              class="w-full mx-auto"
              src="@/_assets/img/epasnets-heart-light.png"
            />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
import MainLayout from '_layouts';
import VoucherList from '_components/List/Modules/VoucherList/';
import CategoryList from '_components/List/Modules/CategoryList/';
import Header from './Header';
import SellerContent from '_pages/Home/shared/SellerContent';
import GuestFooter from '../Guest/GuestFooter';
import { slider, slideritem } from 'vue-concise-slider';
import { get } from '_helpers/ApiService';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import VouchCategory from '_components/VouchCategory';
import TwoColumnVouch from '_components/TwoColumnVouch';

export default {
  components: {
    Header,
    SellerContent,
    GuestFooter,
    VoucherList,
    CategoryList,
    slider,
    slideritem,
    VueSlickCarousel,
    VouchCategory,
    TwoColumnVouch,
    MainLayout,
  },
  data() {
    return {
      section_1: process.env.VUE_APP_VALENTINE_SECTION_1,
      section_2: process.env.VUE_APP_VALENTINE_SECTION_2,
      section_3: process.env.VUE_APP_VALENTINE_SECTION_3,
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
      sliderOption: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        rows: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: false,
      },
      categoryOption: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        rows: 1,
        autoplay: false,
        arrows: false,
        draggable: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 760,
            settings: {
              arrows: false,
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 640,
            settings: {
              arrows: false,
              slidesToShow: 1,
              centerMode: true,
            },
          },
        ],
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
      companies: [],
      categories: [
        {
          image: '/categories/wellness.webp',
          route: '/vouchers/category/wellness-&-gesundheit',
          name: 'Wellness',
        },
        {
          image: '/categories/adventure.webp',
          route: '/vouchers/category/sport-&-adventure',
          name: 'Adventure',
        },
        {
          image: '/categories/genuss.webp',
          route: '/vouchers/category/kurzurlaub',
          name: 'Genuss',
        },
        {
          image: '/categories/fitness.webp',
          route: '/vouchers/category/sport-&-adventure',
          name: 'Fitness',
        },
        {
          image: '/categories/tiere.webp',
          route: '/vouchers/category/tiere',
          name: 'Tiere',
        },
        {
          image: '/categories/kurse.webp',
          route: '/vouchers/category/kurse',
          name: 'Kurse',
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
    // FEATURED_VOUCHERS() {
    //   return this.$store.getters.FEATURED_VOUCHERS;
    // },
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
        // await this.$store.commit('SET_FEATURED_VOUCHERS', []);
        await this.$store.commit('SET_CATEGORIES', []);
        let { data } = await get('company/all');
        this.companies = data.companies.sort(() => Math.random() - 0.5);
        this.companies = this.companies.filter((company) => {
          return company.logo != null;
        });
        // await this.onFetchNewestVouchers();
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
    // async onFetchFeaturedVouchers() {
    //   try {
    //     await this.$store.dispatch('FETCH_FEATURED_VOUCHERS');
    //   } catch (err) {
    //     console.log('err', err);
    //   }
    // },
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

.category-wrapper {
  width: 100%;
  max-width: 200px;
}
.catgory-image {
  width: 100%;
  max-width: 180px;
}
.vouch-category .slick-slide {
  padding: 0 10px;
}
.vouch-category .slick-prev:before,
.vouch-category .slick-next:before {
  font-family: inherit;
  font-size: 45px;
  color: #ff5563;
}
.vouch-category .slick-prev:before {
  margin-left: -15px;
}
.vouch-category .slick-list {
  padding-bottom: 15px;
}
@media only screen and (max-width: 600px) {
  #guest-voucher-list >>> .voucher-card-container {
    width: 100%;
    max-width: unset;
  }
}
</style>
