<template>
  <span>
   <component v-bind:is="currentTabComponent"></component>
  </span>
</template>
<script>
import Buyer from './Buyer'
import Seller from './Seller'

export default {
  name: 'Profile',
  components: {
    Seller,
    Buyer
  },
  computed: {
    currentTabComponent() {
      return this.$store.getters.AUTH_USER.role.name == 'seller' ? 'Seller' : 'Buyer'
    }
  },
}
</script>
