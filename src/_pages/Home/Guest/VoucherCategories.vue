<template>
  <div class="content-container w-11/12 md:w-9/12 lg:w-1/2">
    <div class="voucher-categories">
      <h2 class="voucher-categories__title text-center text-3xl mb-10 font-display">Finde Deinen Gutschein</h2>
      <div class="voucher-categories__grid grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 lg:gap-7 md:grid-cols-4">
        <router-link
          v-for="(category, index) in CATEGORIES"
          :key="`item-${index}`"
          :to="`/vouchers/category/${$helpers.toSlug(category.name)}`"
          class="voucher-categories__grid-item"
        >
          <img
            src="@/_assets/img/placeholder-400px.jpg"
            class="shadow rounded-lg mb-2"
          />
          <p class="text-sm">{{ category.name }}</p>
        </router-link>
      </div>
    </div>
    <div class="border-b-2 border-input-border my-24" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      }
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
</style>