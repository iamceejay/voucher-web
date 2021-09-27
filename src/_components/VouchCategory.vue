<template>
  <div class="py-10" :class="[bgColor, theme]">
    <div class="content-container mt-10 w-11/12">
      <div class="flex flex-col gap-6 mb-6 md:flex-row">
        <div class="flex-1">
          <h2 class="font-bold text-5xl" :class="fontColor">{{ title }}</h2>
          <span class="text-xl description">{{ description }}</span>
        </div>
        <slot></slot>
      </div>
      <div class="vouch-category">
        <span class="block mb-6 text-xl" :class="fontColor"
          >Lust auf mehr?</span
        >
        <VueSlickCarousel v-bind="voucherOption" v-if="vouchers.length">
          <VoucherCard
            v-for="(voucher, index) in vouchers"
            :key="`voucher-${index}`"
            :voucher="voucher"
            :showRegion="true"
          />
        </VueSlickCarousel>
      </div>
      <router-link
        :to="`/vouchers/category/${$helpers.toSlug('Sport & Adventure')}`"
        class="inline-block mt-6 px-4 py-2 rounded-md more-button"
      >
        Mehr entdecken →
      </router-link>
    </div>
  </div>
</template>
<script src="https://player.vimeo.com/api/player.js"></script>
<script>
import VoucherCard from '_components/List/Modules/VoucherList/VoucherCard/';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  components: {
    VoucherCard,
    VueSlickCarousel,
  },
  props: ['title', 'description', 'category', 'theme', 'ids'],
  data() {
    return {
      vouchers: [],
      categorySearch: this.category,
      voucherOption: {
        arrows: true,
        dots: false,
        focusOnSelect: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        rows: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        draggable: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              centerMode: true,
            },
          },
        ],
      },
    };
  },
  computed: {
    fontColor() {
      let font = {
        peach: 'text-white',
      };
      return font[this.theme] || 'company-color';
    },
    bgColor() {
      let bg = {
        peach: 'company-bg-color',
        gray: 'gray',
      };
      return bg[this.theme] || 'bg-white';
    },
  },
  async mounted() {
    let ids = this.ids.split(',');
    let params = {
      page: 1,
      paginate: ids.length,
      isNewest: false,
      isLowestPrice: false,
      isMostPopular: false,
      isRegion: [],
      isPrice: [],
      targets: [],
      seasons: [],
      subcategory: [],
      ids: ids,
    };
    const data = await this.$store.dispatch('FETCH_SEARCH_VOUCHERS', params);
    this.vouchers = data.vouchers.data;
  },
};
</script>
<style>
.more-button {
  background: #ff5563;
  @apply text-white;
}
.gray {
  background: #ededed;
}
.peach .more-button {
  background: white;
  color: #ff5563;
}
.peach .description {
  color: white;
}
.gray .description {
  color: #ff5563;
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

.peach .vouch-category .slick-prev:before,
.peach .vouch-category .slick-next:before {
  color: white;
}
.vouch-category .slick-prev:before {
  margin-left: -15px;
}
.vouch-category .slick-list {
  padding-bottom: 15px;
}
</style>
