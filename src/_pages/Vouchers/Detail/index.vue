<template>
  <component :is="activeComponent" />
</template>
<script>
import SellerDetails from './Seller.vue';
import CustomerDetails from './Guest.vue';

export default {
  components: {
    SellerDetails,
    CustomerDetails,
  },
  computed: {
    AUTH_USER() {
      return this.$store.getters.AUTH_USER;
    },
    activeComponent() {
      return this.AUTH_USER.role.name == 'seller'
        ? 'SellerDetails'
        : 'CustomerDetails';
    },
  },
};
</script>
