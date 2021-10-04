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
        <VueSlickCarousel v-bind="voucherOption" v-if="vouchers.length && !loading">
          <VoucherCard
            v-for="(voucher, index) in vouchers"
            :key="`voucher-${index}`"
            :voucher="voucher"
            :showRegion="true"
          />
        </VueSlickCarousel>
        <div class="wrapper" v-else>
          <div class="wrapper-cell">
            <div class="image"></div>
            <div class="text">
              <div class="text-line"> </div>
              <div class="text-line"></div>
              <div class="text-line"></div>
              <div class="text-line"></div>
            </div>
          </div>
        </div>
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
      loading: true,
      vouchers: [],
      categorySearch: this.category,
      voucherOption: {
        arrows: true,
        dots: false,
        focusOnSelect: true,
        infinite: true,
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
              arrows: false,
              centerPadding: '20px'
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
    this.loading = false
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

.wrapper-cell {
  display: flex;
  margin-bottom: 30px;
}

@-webkit-keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.animated-background, .text-line, .image {
  -webkit-animation-duration: 1.25s;
          animation-duration: 1.25s;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
          animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  background: #F6F6F6;
  background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  background-size: 800px 104px;
  height: 96px;
  position: relative;
}

.image {
  height: 400px;
  width: 100%;
}

</style>
