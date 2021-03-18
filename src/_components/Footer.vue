<template>
  <!-- <div class="text-center px-2 py-4">
    &copy; {{ currentYear }} Epasnets Gmbh
  </div> -->
  <div class="footer py-8 md:py-10 bg-white">
    <ul class="footer__social">
      <li><i class="footer__social-icon fab fa-instagram"></i></li>
      <li><i class="footer__social-icon fab fa-facebook-square"></i></li>
    </ul>
    <ul class="footer__menu">
      <li
        v-for="(menuItem, index) in menus"
        :key="`footer__menu-${index}`">
        <a class="footer__menu-item" 
          :href="menuItem.link">
          <span v-html="menuItem.title"></span>
        </a>
      </li>
    </ul>
    <ul class="footer__payments w-11/12 md:w-3/4">
      <li
        v-for="(paymentMethod, index) in paymentMethods"
        :key="`footer__payments-${index}`">
        <a class="footer__payments-item"
          :href="paymentMethod.link">
          <i :class="`footer__payments-icon ${paymentMethod.icon}`"></i>
        </a>
      </li>
    </ul>
    <div>
      <img class="w-12 mx-auto" src="@/_assets/img/epasnets-loader.png">
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
            link: "#"
          },
          {
            title: "Gutscheine Kategorien",
            link: "#"
          },
          {
            title: "FAQ",
            link: "#"
          },
          {
            title: "Fu&#776;r Verka&#776;ufer",
            link: "#"
          },
          {
            title: "Kontakt",
            link: "#"
          },
          {
            title: "Impressum",
            link: "#"
          },
          {
            title: "Datenshutz",
            link: "#"
          },
          {
            title: "AGB",
            route: "#"
          }
        ],
        paymentMethods: [
          {
            icon: "fab fa-cc-amex",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "fab fa-cc-mastercard",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "fab fa-paypal",
            title: "",
            img: "",
            link: "#"
          },
          {
            icon: "fas fa-money-bill-wave",
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
    @apply px-2;
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
    @apply border-t-2 border-b-2;
  }
</style>