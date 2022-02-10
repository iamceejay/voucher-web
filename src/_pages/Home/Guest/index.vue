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
          <a
            v-for="(category, index) in CATEGORIES"
            :key="`item-${index}`"
            :href="`/vouchers/category/${$helpers.toSlug(category.name)}`"
            class="border border-black flex items-center px-3 py-1"
          >
            <p class="text-sm">{{ category.name }}</p>
          </a>
        </div>
      </div>

      <div class="overflow-hidden relative valentines mt-10">
        <img class="hidden md:block absolute bottom-0 inset-x-0 max-h-full mx-auto object-center object-cover" src="@/_assets/img/header-desktop-min.jpg">
        <img class="absolute block inset-x-0 max-h-full md:hidden mt-4 mx-auto object-center object-cover top-0" src="@/_assets/img/header-mobile-min.jpg">
        <div
          class="content-container header-container flex flex-col items-center px-4 pt-20 pb-60 l lg:py-28 relative z-1"
        >
          <div class="text-center text-white w-11/12 max-w-2xl">
            <p class="font-bold mb-6 mx-auto text-logo text-center max-w-sm md:max-w-2xl">
              Tiroler Momente zum Valentinstag
            </p>
            <button class="bg-company company-bg-color inline-flex items-center px-4 py-2 rounded-md text-white w-64">
              <svg class="bi bi-heart-fill h-10 w-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              Jetzt die besten Geschenke entdecken
            </button>
          </div>
        </div>
      </div>

      <VouchCategory
        title="Ab in die Berge"
        description="Wer liebt nicht auch die frische Luft, die Aussicht und das Erlebnis?"
        category="Sport & Adventure"
        :ids="section_1"
        :showButton="false"
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
        title="Wellness"
        description="Wohlfühlen, Genuss, Erholung, Ruhe, Auszeit und Entspannung-gönn dir!"
        category="Wellness & Gesundheit"
        :ids="section_2"
        :theme="'peach'"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <VueSlickCarousel v-bind="sliderOption">
            <img src="@/_assets/img/Startpage/Wellness Bildershow/Bild 1.jpg" />
            <img src="@/_assets/img/Startpage/Wellness Bildershow/Bild 2.jpg" />
            <img src="@/_assets/img/Startpage/Wellness Bildershow/Bild 3.jpg" />
            <img src="@/_assets/img/Startpage/Wellness Bildershow/Bild 4.jpg" />
            <img src="@/_assets/img/Startpage/Wellness Bildershow/Bild 5.jpg" />
          </VueSlickCarousel>
        </div>
      </VouchCategory>

      <div class="py-10">
        <div class="content-container mt-10 w-11/12">
          <div class="flex flex-col gap-6 mb-6 md:flex-row">
            <div class="flex-1">
              <h2 class="font-bold text-5xl company-color">
                Spricht dich das auch an?
              </h2>
              <span class="text-xl">Aktuell angesagt</span>
            </div>
          </div>
          <div class="text-center vouch-category">
            <VueSlickCarousel v-bind="categoryOption">
              <div
                class="category-wrapper flex flex-col items-center px-0 md:px-5"
                v-for="(category, index) in categories"
                :key="index"
              >
                <div class="bg-black bg-opacity-25 catgory-image h-80">
                  <img
                    class="object-cover h-80 w-full"
                    :src="category.image"
                  >
                </div>
                <div>
                  <a
                    :href="category.route"
                    class="inline-block -mt-4 px-4 py-2 rounded-md more-button"
                  >
                    {{ category.name }}
                  </a>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>

      <VouchCategory
        title="Fitness & Sport"
        description="Was heute wehtut, macht dich morgen stärker!"
        category="Sport & Adventure"
        :ids="section_3"
        :theme="'gray'"
        :showButton="true"
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

      <div class="content-container w-11/12 py-10">
        <div class="company-color font-bold md:text-5xl text-3xl text-center">
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
          <div class="flex flex-col inline-flex justify-center w-full md:w-1/3">
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

      <VouchCategory
        title="Brunch"
        description="Genieße den perfekten Start in den Tag mit deinen Liebsten!"
        category="Essen & Trinken"
        :ids="section_4"
        :theme="'peach'"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <div style="padding:99.25% 0 0 0;position:relative;">
            <iframe
              src="https://player.vimeo.com/video/595810680?autoplay=1&autopause=0&controls=0&muted=1&loop=1"
              style="position:absolute;top:0;left:0;width:100%;height:100%;"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </VouchCategory>

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

      <div class="py-10 company-bg-color">
        <div class="content-container w-11/12">
          <h2 class="text-center text-3xl mb-10 font-medium text-white">
            Unternehmen die bereits dabei sind
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-1-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-2-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-3-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-4-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-5-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-6-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-7-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-8-min.webp">
            </div>
            <div class="py-3">
              <img class="w-1/2 mx-auto" src="/images/companies/company-9-min.webp">
            </div>
          </div>
        </div>
      </div>

      <VouchCategory
        title="Kurse"
        description="Etwas LERNEN und mit der Zeit darin immer geübter werden, ist das nicht auch eine FREUDE!?"
        category="Kurse"
        :ids="section_5"
        :theme="'gray'"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <VueSlickCarousel v-bind="sliderOption">
            <img src="@/_assets/img/Startpage/Kurse Bildershow/Bild 1.jpg" />
            <img src="@/_assets/img/Startpage/Kurse Bildershow/Bild 2.jpg" />
            <img src="@/_assets/img/Startpage/Kurse Bildershow/Bild 3.jpg" />
            <img src="@/_assets/img/Startpage/Kurse Bildershow/Bild 4.jpg" />
            <img src="@/_assets/img/Startpage/Kurse Bildershow/Bild 5.jpg" />
          </VueSlickCarousel>
        </div>
      </VouchCategory>

      <VouchCategory
        title="Adventure"
        description="Jedes Abenteuer ist nur eine Entscheidung von dir entfernt!"
        category="Sport & Adventure"
        :ids="section_6"
        :theme="'peach'"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <div style="padding:100% 0 0 0;position:relative;">
            <iframe
              src="https://player.vimeo.com/video/595825713?autoplay=1&autopause=0&controls=0&muted=1&loop=1"
              style="position:absolute;top:0;left:0;width:100%;height:100%;"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </VouchCategory>

      <VouchCategory
        title="Kulinarik"
        description="Essen ist eine Kunst, Genießen ein Glück, Zusammensein ein Geschenk!"
        category="Essen & Trinken"
        :ids="section_7"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <VueSlickCarousel v-bind="sliderOption">
            <img
              src="@/_assets/img/Startpage/Kulinarik Bildershow/Bild 1.jpg"
            />
            <img
              src="@/_assets/img/Startpage/Kulinarik Bildershow/Bild 2.jpg"
            />
            <img
              src="@/_assets/img/Startpage/Kulinarik Bildershow/Bild 3.jpg"
            />
            <img
              src="@/_assets/img/Startpage/Kulinarik Bildershow/Bild 4.jpg"
            />
            <img
              src="@/_assets/img/Startpage/Kulinarik Bildershow/Bild 5.jpg"
            />
          </VueSlickCarousel>
        </div>
      </VouchCategory>

      <VouchCategory
        title="Tiere"
        description="Für unsere vierbeinigen Freunde ist natürlich auch gedacht!"
        category="Tiere"
        :ids="section_8"
        :theme="'gray'"
        :showButton="true"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <div style="padding:100% 0 0 0;position:relative;">
            <iframe
              src="https://player.vimeo.com/video/618703269?autoplay=1&autopause=0&controls=0&muted=1&loop=1"
              style="position:absolute;top:0;left:0;width:100%;height:100%;"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </VouchCategory>

      <TwoColumnVouch
        title="Etwas kniffliges für die Ganze Familie"
        description=""
        category="Kurzurlaub"
        :firstVouch="2"
        :firstVouchTitle="'Du willst Spaß, Rätseln und im Team arbeiten?'"
        :firstVouchDescription="
          'Dann ist das spektakuläre Escape Room Erlebnis in Innsbruck-Kufstein genau das richtige für dich! Erlebe mit der ganzen Familie ein spannendes Abenteuer mit kniffligen Aufgaben, verzaubernde Räume oder für die Horror liebhabenden schrecklich schöne Überraschungen.'
        "
        :secondVouch="2"
        :secondVouchTitle="
          'Schaffst Du es ein rätselhaftes Abenteuer in nur 60 Minuten zu lösen?'
        "
        :secondVouchDescription="
          'Escape Room PerrplexxX bietet dir und deiner Familie, Freunden und Bekannten ein unvergessliches Erlebnis voller Spaß, Zusammenarbeit und kniffligen Aufgaben. Es ist für jeden was dabei, für Jung und Alt bis zu Horror Liebhaber und „Langfinger“ die schon immer mal ein Gemälde stehlen wollten.'
        "
      />

      <VouchCategory
        title="Für die ganze familie"
        description="Die besten Momente erlebt man nur mit der ganzen Familie."
        category="Sport & Adventure"
        :ids="section_9"
        :theme="'peach'"
        :showButton="false"
      >
        <div class="bg-black bg-opacity-25 w-full md:mx-10 md:w-1/2">
          <VueSlickCarousel v-bind="sliderOption">
            <img src="@/_assets/img/Startpage/Family/Bild 1.jpg" />
            <img src="@/_assets/img/Startpage/Family/Bild 2.jpg" />
            <img src="@/_assets/img/Startpage/Family/Bild 3.jpg" />
            <img src="@/_assets/img/Startpage/Family/Bild 4.jpg" />
            <img src="@/_assets/img/Startpage/Family/Bild 5.jpg" />
          </VueSlickCarousel>
        </div>
      </VouchCategory>

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

    <!-- <SellerContent v-if="AUTH_USER.role.name === null" /> -->

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
      section_1: process.env.VUE_APP_SECTION_1,
      section_2: process.env.VUE_APP_SECTION_2,
      section_3: process.env.VUE_APP_SECTION_3,
      section_4: process.env.VUE_APP_SECTION_4,
      section_5: process.env.VUE_APP_SECTION_5,
      section_6: process.env.VUE_APP_SECTION_6,
      section_7: process.env.VUE_APP_SECTION_7,
      section_8: process.env.VUE_APP_SECTION_8,
      section_9: process.env.VUE_APP_SECTION_9,
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
              centerMode: true
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
          name: 'Genuss'
        },
        {
          image: '/categories/fitness.webp',
          route: '/vouchers/category/sport-&-adventure',
          name: 'Fitness',
        },
        {
          image: '/categories/tiere.webp',
          route: '/vouchers/category/tiere',
          name: 'Tiere'
        },
        {
          image: '/categories/kurse.webp',
          route: '/vouchers/category/kurse',
          name: 'Kurse'
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
.valentines {
  background: #fcb6be 0% 0% no-repeat padding-box;
}
.text-logo {
  font-size: 25px;
}

@screen lg {
  .text-logo {
    font-size: 55px;
  }
}
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
