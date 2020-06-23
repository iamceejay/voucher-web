<template>
  <div class="flex flex-col w-full">
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <div 
      class="scroll-horizontal scroll"
    >
      <CategoryCard
        v-for="(categ, index) in data"
        :key="`categ-${index}`"
        :data="categ"
        class="m-2"
      />
      <div v-if="data.length <= 0" class="py-2 text-lg">
        Keine Daten gefunden.
      </div>
    </div>
  </div>
</template>
<script>
  import CategoryCard from './CategoryCard'
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
      CategoryCard,
      Header2,
    },
    props: {
      title: {
        type: String,
        default: ''
      }, data: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style lang="css" scoped>
</style>