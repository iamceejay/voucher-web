<template>
  <div class="-mt-10">
    <div class="guest-header company-bg-color">
      <div
        class="content-container header-container flex flex-col items-center px-4 pt-8 pb-32 lg:pt-16 lg:pb-48 relative"
      >
        <div class="text-center text-white w-11/12 max-w-2xl">
          <h1 class="font-body text-xl md:text-3xl lg:text-4xl mb-1 font-bold">
            Weil Regionalität auch beim Verschenken den Unterschied macht
          </h1>
          <p
            class="font-body text-xs md:text-sm lg:text-lg w-full lg:w-9/12 mx-auto"
          >
            Entdecke Gutscheine von Tiroler Unternehmen zum verschenken und
            selber genießen.
          </p>
        </div>
        <div
          class="search-box bg-dirty w-11/12 max-w-lg flex flex-col items-center py-6 md:py-8 lg:py-10 absolute"
        >
          <router-link
            class="flex flex-col w-11/12 lg:w-9/12"
            to="/vouchers/search"
          >
            <SearchInputField
              id="search-voucher"
              class="w-full"
              font="text-xs lg:text-sm"
              placeholder="Suche nach Aktivitäten oder Unternehmen"
              :submitButton="false"
            />
          </router-link>
          <div class="search-box__details w-11/12 md:9/12 lg:w-8/12">
            <div
              v-for="(item, index) in searchBoxItems"
              :key="`item-${index}`"
              class="search-box__details-item"
            >
              <svg class="icon opacity-75">
                <use :xlink:href="`/icons/sprite.svg#${item.spriteIcon}`" />
              </svg>
              <p class="text-xs">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInputField from '_components/Form/SearchInputField';

export default {
  components: {
    SearchInputField,
  },
  data() {
    return {
      searchBoxItems: [
        {
          spriteIcon: 'palette',
          label: 'Personalisieren',
        },
        {
          spriteIcon: 'cloud-arrow-down',
          label: 'Downloaden',
        },
        {
          spriteIcon: 'gift',
          label: 'Verschenken',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="css" scoped>
.guest-header {
  margin-bottom: calc(var(--bottomSpacing));
}
.search-box {
  bottom: calc(var(--bottomSpacing) * -1);
  border-radius: 20px;
}
.search-box >>> .input-field {
  @apply bg-white;
}
.search-box__details {
  @apply flex flex-wrap pt-2 justify-around;
}
.search-box__details-item {
  @apply flex flex-col items-center;
}
.icon {
  @apply h-6 w-6 text-peach mb-1;
}
</style>
