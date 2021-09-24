<template>
  <div class="py-10" :class="[bgColor, theme]">
    <div class="content-container mt-10 w-11/12">
      <div class="flex mb-6">
        <div class="flex-1">
          <h2 class="font-bold text-5xl" :class="fontColor">{{ title }}</h2>
          <span class="text-xl description">{{ description }}</span>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="grid md:grid-cols-2 gap-4" v-if="firstVouch">
          <VoucherCard :voucher="voucher" />
          <div class="flex flex-col justify-between">
            <div>
              <div class="font-bold mb-4">{{ firstVouchTitle }}</div>
              <div>{{ firstVouchDescription }}</div>
            </div>
            <span>
              <router-link
                :to="`/vouchers/${secondVouch}`"
                class="inline-block mt-6 px-4 py-2 rounded-md more-button"
              >
                jetzt holen →
              </router-link>
            </span>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4" v-if="secondVouch">
          <VoucherCard :voucher="voucher2" />
          <div class="flex flex-col justify-between">
            <div>
              <div class="font-bold mb-4">{{ secondVouchTitle }}</div>
              <div>{{ secondVouchDescription }}</div>
            </div>
            <span>
              <router-link
                :to="`/vouchers/${secondVouch}`"
                class="inline-block mt-6 px-4 py-2 rounded-md more-button"
              >
                jetzt holen →
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  props: [
    'title',
    'description',
    'category',
    'theme',
    'firstVouch',
    'firstVouchTitle',
    'firstVouchDescription',
    'secondVouch',
    'secondVouchTitle',
    'secondVouchDescription',
  ],
  data() {
    return {
      voucher: [],
      voucher2: [],
      categorySearch: this.category,
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
    VOUCHERS() {
      return this.$store.getters.SELLER_VOUCHERS;
    },
  },
  async mounted() {
    if (this.firstVouch) {
      let vouch1 = await this.$store.dispatch('FETCH_VOUCHER', {
        id: this.firstVouch,
      });

      this.voucher = vouch1.voucher;
    }

    if (this.secondVouch) {
      let vouch2 = await this.$store.dispatch('FETCH_VOUCHER', {
        id: this.secondVouch,
      });

      this.voucher2 = vouch2.voucher;
    }
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
