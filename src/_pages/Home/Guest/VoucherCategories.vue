<template>
  <div>
    <h2 class="text-center text-3xl mb-10 font-display">Finde Deinen Gutschein</h2>
    <div class="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6">
      <router-link
        v-for="(category, index) in CATEGORIES"
        :key="`item-${index}`"
        :to="`/vouchers/category/${$helpers.toSlug(category.name)}`"
      >
        <img
          src="@/_assets/img/placeholder-400px.jpg"
          class="shadow rounded-lg mb-2"
        />
        <p class="text-sm">{{ category.name }}</p>
      </router-link>
    </div>
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