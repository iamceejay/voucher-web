<template>
  <div class="flex flex-col w-full">
    <div
      v-for="(row, index) in data"
      :key="`scanner-${index}`"
      class="w-full md:w-1/2 flex flex-row"
    >
      <div class="w-4/5 text-sm px-5 py-2">
        {{ `${index+1}. ${row.firstName} ${row.lastName}` }}
      </div>
      <div class="w-1/5">
        <Button
          class="py-2"
          label="Delete"
          size="w-full py-1"
          variant="info"
          round="rounded-full"
          fontSize="text-xs"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button'

  export default {
    components: {
      Button,
    },
    props: {
      data: {
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
</style>