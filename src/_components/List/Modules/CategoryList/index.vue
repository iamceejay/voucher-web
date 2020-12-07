<template>
  <div class="flex flex-col w-full">
    <Header2
      v-if="title != ''"
      :label="title"
    />
    <div
      class="w-full relative flex self-center category-container mb-8"
    >
      <button
        class="slider-icon slider-icon-left visible"
        @click="onSlideTo('slidePre')"
      >
        <i class="fas fa-chevron-circle-left" />
      </button>
      <button
        class="slider-icon slider-icon-right visible"
        @click="onSlideTo('slideNext')"
      >
        <i class="fas fa-chevron-circle-right" />
      </button>
      <slider
        ref="slider"
        :options="options"
      >
        <slideritem
          v-for="(categ, index) in data"
          :key="`voucher-${index}`"
          class="slider-item-custom"
        >
          <CategoryCard
            :key="`categ-${index}`"
            :data="categ"
          />
        </slideritem>
      </slider>

      <div v-if="data.length <= 0" class="py-2 text-lg">
        Keine Daten gefunden.
      </div>
    </div>
  </div>
</template>
<script>
  import CategoryCard from './CategoryCard'
  import Header2 from '_components/Headers/Header2';
  import { slider, slideritem } from 'vue-concise-slider'

  export default {
    components: {
      CategoryCard,
      Header2,
      slider,
      slideritem,
    },
    props: {
      title: {
        type: String,
        default: ''
      }, data: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        options: {
          pagination: false,
          thresholdDistance: 100, // Sliding distance threshold
          thresholdTime: 300, // Sliding time threshold decision
          grabCursor: true, // Scratch style
          speed: 300,
          loop: false,
        },
      }
    },
    created() {
    },
    methods: {
      onSlideTo(action)
      {
        this.$refs.slider.$emit(action)
      }
    }
  }
</script>
<style lang="css" scoped>
  .category-container {
    /* min-height: 155px; */
  }

  .category-container .slider-item-custom {
      flex: 0 0 20.333333%;
  }

  .slider-icon {
    position: absolute;
    top: 50%;
    z-index: 100;
    color: #ff5563;
    font-size: 20px;
  }
  .slider-copy {
    visibility: hidden;
  }
  .slider-icon.slider-icon-left {
    left: 0;
  }
  .slider-icon.slider-icon-right {
    right: 0;
  }
  .slider-container {
    white-space: unset !important;
  }
  .slider-wrapper .slider-item {
    font-size: unset;
    text-align: unset;
    color: unset;
    /* visibility: hidden; */
  }
  .slider-wrapper .slider-item .voucher-card-container {
    margin-right: 0px !important;
  }
  .slider-wrapper .slider-item.slider-active {
    visibility: visible;
  }
  .slider-pagination {
    position: unset !important;
  }
  .slider-pagination-bullet {
    height: 10px !important;
    width: 10px !important;
  }
  .swiper-container-horizontal .slider-pagination-bullet-active, .swiper-container-vertical .slider-pagination-bullet-active {
    background: #ff5563 !important;
  }
</style>