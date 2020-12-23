<template>
  <div class="flex flex-col w-full">
    <Header2 
      v-if="title != ''"
      :label="title"
    />
    <div class="flex flex-wrap">
      <div
        v-for="(row, index) in data"
        :key="`stat-${index}`"
        class="w-1/2 md:w-1/4	lg:w-1/5"
      >
        <div class="m-2 p-2 shadow-custom rounded text-center card-container">
          <div class="text-xl my-3 font-bold font-display text-gray-900">
            {{ row.value }}
          </div>
          <div class="text-sm font-body font-bold text-gray-900 uppercase h-12 sm:h-auto">
            {{ row.type }}
          </div>
          <div class="text-xs min-h-12 mb-1 font-body font-semibold text-gray-700 lowercase">
            {{ row.title }} 
          </div>
          <div class="mb-3 font-body font-semibold text-gray-700 h-6">
            <div v-if="row.extra" class="text-xs">
              {{ row.extra.title || '' }}
            </div>
            <div v-if="row.extra" class="text-2xs">
              {{ row.extra.value || '' }}
            </div>
            <div v-if="row.extra" class="text-2xs">
              {{ row.extra.help_text || '' }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.length <= 0" class="py-2 text-lg">
        Noch keine Daten vorhanden.
      </div>
    </div>
  </div>
</template>
<script>
  import Header2 from '_components/Headers/Header2';

  export default {
    components: {
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
      }
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="css" scoped>
  .card-container {
    min-height: 125px;
  }
</style>