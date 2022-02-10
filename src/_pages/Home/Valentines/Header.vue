<template>
  <div class="-mt-10">
    <div class="overflow-hidden relative valentines">
      <img class="hidden md:block absolute bottom-0 inset-x-0 max-h-full mx-auto object-center object-cover" src="@/_assets/img/header-desktop-min.jpg">
      <img class="absolute block inset-x-0 max-h-full md:hidden mt-4 mx-auto object-center object-cover top-0" src="@/_assets/img/header-mobile-min.jpg">
      <div
        class="content-container header-container flex flex-col items-center px-4 pt-20 pb-60 l lg:py-28 relative z-1"
      >
        <div class="text-center text-white w-11/12 max-w-2xl">
          <p class="text-2xl md:text-4xl font-bold mb-3">
            Liebe verschenken mit
          </p>
          <p class="font-bold leading-10 mb-6 text-logo">
            epasnets
          </p>
          <p class="text-2xl md:text-4xl font-bold">
            Gutscheinen
          </p>
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
.valentines {
  background: #fcb6be 0% 0% no-repeat padding-box;
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

.text-logo {
  font-size: 60px;
}

@screen md {
  .text-logo {
    font-size: 100px;
  }
}
</style>
