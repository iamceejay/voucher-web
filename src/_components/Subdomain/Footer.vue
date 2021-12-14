<template>
  <!-- <div class="text-center px-2 py-4">
    &copy; {{ currentYear }} Epasnets Gmbh
  </div> -->
  <div>
    <div class="footer py-8 md:py-10" style="background: var(--company-color, #1D4F55); color: var(--text-color, #fff)">
      <ul class="footer__menu">
        <li
          class="px-3">
          <router-link class="footer__menu-item"
            to="/impressum"
          >
            <span>Impressum</span>
          </router-link>
        </li>
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
      <a href="https://epasnets.com" target="_blank" class="flex items-center justify-center">
        <span class="text-sm mr-1">Powered by</span>
        <img class="h-4 mt-0.5" src="@/_assets/img/footer.svg">
      </a>
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