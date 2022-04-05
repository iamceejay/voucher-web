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
            title="Goggelen oder epasnets schenken?"
            description="Ostern ist ein allseits beliebtes Familienfest, aber nur Goggelen suchen, kann auch nichts. Mit unseren epasnets-Gutscheinen schenkst du zum Osterfest abenteuerliche Erlebnisse für die ganze Familie."
            category="Sport & Adventure"
            :ids="section_1"
            :theme="'gray'"
            :showButton="false"
            preTitle="Erlebnisreiche Momente für Familien & Kinder schenken:"
            titleClass="company-color text-center"
            descriptionClass="!text-black text-center"
          >
          </VouchCategory>

          <VouchCategory
            title="Abenteuer zu zweit"
            description="Ostern ist ein perfekter Anlass, um wieder einmal Zweisamkeit zu schenken! Bring mit unseren epasnets-Gutscheinen unvergessliche Momente in den Alltag und mach deinem Schatz eine zusätzliche Freude beim Suchen der Goggelen."
            category="Sport & Adventure"
            :ids="section_2"
            :theme="'white'"
            :showButton="false"
            preTitle="Abenteuerliche Momente für Paare schenken:"
            descriptionClass="company-color"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/easter/section_1/1.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_1/2.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_1/3.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_1/4.jpg"
                />
              </VueSlickCarousel>
            </div>
          </VouchCategory>

          <VouchCategory
            title="Erlebnisse am Wasser gebaut"
            description="Der Frühling ist da und damit auch die wärmeren Temperaturen – Zeit für einen Sprung ins kühle Nass! Beschere jemanden eine Abkühlung mit einem Wassererlebnis zu Ostern von epasnets."
            :ids="section_3"
            :theme="'gray'"
            :showButton="false"
            preTitle="Aufregende Momente am Wasser schenken:"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/easter/section_2/1.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_2/2.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_2/3.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_2/4.jpg"
                />
              </VueSlickCarousel>
            </div>
          </VouchCategory>

          <VouchCategory
            title="Erinnerungen aus der Luft gegriffen"
            description="Wer möchte nicht auch mal hoch hinaus? Mit unseren epasnets-Gutscheinen kannst du einzigartige Erinnerungen in der Luft bescheren. Wie wär’s mit einer Ballonfahrt zwischen den Goggelen?"
            category="Sport & Adventure"
            :ids="section_4"
            :theme="'white'"
            :showButton="false"
            preTitle="Einzigartige Momente in der Luft schenken:"
            descriptionClass="company-color"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/easter/section_3/1.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_3/2.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_3/3.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_3/4.jpg"
                />
              </VueSlickCarousel>
            </div>
          </VouchCategory>

          <VouchCategory
            title="Erholsame Momente am Berg erleben"
            description="Für uns gibt es nichts Schöneres, als die Freizeit in den Tiroler Bergen zu genießen und mit epasnets-Gutscheinen solche Momente zu verschenken. Jetzt zu Ostern Freude bereiten und gemeinsam mit den Goggelen Erlebnisse am Berg verstecken."
            :ids="section_5"
            :theme="'gray'"
            :showButton="false"
            preTitle="Schöne Momente am Berg schenken:"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <div style="padding:100% 0 0 0;position:relative;">
                <iframe
                  src="https://player.vimeo.com/video/595807760?autoplay=1&autopause=0&controls=0&muted=1&loop=1"
                  style="position:absolute;top:0;left:0;width:100%;height:100%;"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </VouchCategory>

          <VouchCategory
            title="Frisches für den Sommer entdecken"
            description="Mit den wärmeren Temperaturen steigt auch die Lust, die eigene Garderobe aufzupeppen. Ob Kleidung, Schuhe, Taschen oder Schmuck – unsere epasnets-Gutscheine bieten für alle etwas. Kleiner Tipp: Perfekt als Ostergeschenk geeignet."
            category="Sport & Adventure"
            :ids="section_6"
            :theme="'white'"
            :showButton="false"
            preTitle="Sommerfrische für die Garderobe schenken:"
            descriptionClass="company-color"
          >
            <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
              <VueSlickCarousel v-bind="sliderOption">
                <img
                  src="@/_assets/img/easter/section_4/1.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_4/2.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_4/3.jpg"
                />
                <img
                  src="@/_assets/img/easter/section_4/4.jpg"
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

          <div class="overflow-hidden relative valentines mt-10">
            <img class="hidden md:block absolute bottom-0 inset-x-0 max-h-full mx-auto object-center object-cover" src="@/_assets/img/header-desktop-min.jpg">
            <img class="absolute block inset-x-0 max-h-full md:hidden mt-4 mx-auto object-center object-cover top-0" src="@/_assets/img/header-mobile-min.jpg">
            <div
              class="content-container header-container flex flex-col items-center px-4 pt-20 pb-60 l lg:py-28 relative z-1"
            >
              <div class="text-center text-white w-11/12 max-w-2xl">
                <p class="font-bold mb-6 mx-auto text-logo text-center max-w-sm md:max-w-2xl text-5xl">
                  Tiroler Momente zu zweit
                </p>
                <button @click="$router.push('/liebe')" class="bg-company company-bg-color inline-flex items-center px-4 py-2 rounded-md text-white w-64">
                  <svg class="bi bi-heart-fill h-10 w-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                  Jetzt die besten Geschenke entdecken
                </button>
              </div>
            </div>
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
      section_1: process.env.VUE_APP_EASTER_1,
      section_2: process.env.VUE_APP_EASTER_2,
      section_3: process.env.VUE_APP_EASTER_3,
      section_4: process.env.VUE_APP_EASTER_4,
      section_5: process.env.VUE_APP_EASTER_5,
      section_6: process.env.VUE_APP_EASTER_6,
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
.valentines {
  background: #fcb6be 0% 0% no-repeat padding-box;
}
</style>
