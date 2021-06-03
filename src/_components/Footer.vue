<template>
  <!-- <div class="text-center px-2 py-4">
    &copy; {{ currentYear }} Epasnets Gmbh
  </div> -->
  <div class="footer py-8 md:py-10 bg-white">
    <ul class="footer__social">
      <li class="px-3"><i class="footer__social-icon fab fa-instagram"></i></li>
      <li class="px-3"><i class="footer__social-icon fab fa-facebook-square"></i></li>
    </ul>
    <ul class="footer__menu">
      <li
        v-for="(menuItem, index) in menus"
        :key="`footer__menu-${index}`"
        class="px-3">
        <a class="footer__menu-item"
          :href="menuItem.link">
          <span v-html="menuItem.title"></span>
        </a>
      </li>
    </ul>
    <ul class="footer__payments w-11/12 md:w-7/12">
      <li
        v-for="(paymentMethod, index) in paymentMethods"
        :key="`footer__payments-${index}`"
        class="px-3">
        <a class="footer__payments-item"
          :href="paymentMethod.link">
          <img class="h-10 w-auto" :src="paymentMethod.icon"/>
          <!-- <i :class="`footer__payments-icon ${paymentMethod.icon}`"></i> -->
        </a>
      </li>
    </ul>
    <div>
      <img class="w-12 mx-auto" src="@/_assets/img/epasnets-heart-light.png">
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
            title: "Anmelden/Registrieren",
            link: "https://www.epasnets.com/login"
          },
          {
            title: "Für Verkäufer",
            link: "https://verkaufen.epasnets.com"
          },
          {
            title: "Hilfe für Käufer",
            link: "https://hilfe.epasnets.com/"
          },
          {
            title: "Über uns",
            link: "https://about.epasnets.com/"
          },
          {
            title: "Kontakt",
            link: "#"
          },
          {
            title: "AGB",
            link: "https://about.epasnets.com/agb/"
          },
          {
            title: "Datenschutz",
            link: "https://about.epasnets.com/datenschutz/"
          },
          {
            title: "Impressum",
            link: "https://about.epasnets.com/impressum/"
          }
        ],
        paymentMethods: [
          {
            icon: "/icon_american-express.png",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "/icon_mastercard.png",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "/icon_sofort.png",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "/icon_visa.png",
            title: "",
            img: "",
            link: "#"
          },
           {
            icon: "/icon_applepay.png",
            title: "",
            img: "",
            link: "#"
          },
           {
            icon: "/icon_googlepay.png",
            title: "",
            img: "",
            link: "#"
          }
        ]
      }
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

  .footer__social-icon, .footer__payments-icon {
    @apply text-3xl;
  }

  .footer__menu {
    @apply flex-wrap;
  }

  .footer__payments {
    @apply py-6 mx-auto;
  }

  .footer__menu-item {
    font: 14px;
    line-height: 24px;
    color: #000;
  }

  .footer__payments {
    @apply border-t border-b;
  }
</style>