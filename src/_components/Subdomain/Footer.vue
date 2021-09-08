<template>
  <!-- <div class="text-center px-2 py-4">
    &copy; {{ currentYear }} Epasnets Gmbh
  </div> -->
  <div>
    <div class="flex flex-col items-center px-4 py-10 text-black">
      <div class="font-medium mb-2 text-lg">Verantwortlich für den Inhalt</div>
      <div class="mb-6">{{ USER.company.name }}, {{ USER.detail.address }}, {{ USER.detail.zip_code }}, {{ USER.detail.city }}</div>
      <a v-if="USER.company.link" :href="USER.company.link" target="_blank" class="company-bg-color px-5 py-3 rounded-md text-sm text-white">zum Impressum</a>
    </div>
    <div class="footer py-8 md:py-10" style="background: var(--company-color, #1D4F55); color: var(--text-color, #fff)">
      <ul class="footer__menu">
        <li
          v-for="(menuItem, index) in menus"
          :key="`footer__menu-${index}`"
          class="px-3">
          <a class="footer__menu-item"
            :href="menuItem.link"
            target="_blank">
            <span v-html="menuItem.title"></span>
          </a>
        </li>
      </ul>
      <div class="flex items-center justify-center">
        <span class="text-sm mr-1">Powered by</span>
        <img class="h-4 mt-0.5" src="@/_assets/img/footer.svg">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
    },
    data() {
      return {
        menus: [
          {
            title: "Impressum",
            link: "https://about.epasnets.com/impressum/"
          },
          {
            title: "Datenschutz",
            link: "https://about.epasnets.com/datenschutz/"
          },
          {
            title: "AGB",
            link: "https://about.epasnets.com/agb/"
          },
        ],
      }
    },
    computed: {
      USER() {
        return this.$store.getters.COMPANY;
      },
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style lang="css" scoped>
  .footer__social, .footer__menu, .footer__payments {
    @apply flex items-center justify-center mb-8;
  }

  :is(.footer__social, .footer__menu, .footer__payments) li {
    @apply px-3;
  }

  .footer__menu {
    @apply flex-wrap;
  }

  .footer__menu-item {
    font-size: 14px;
    line-height: 18px;
  }

  .footer__payments {
    @apply border-t border-b;
  }
</style>