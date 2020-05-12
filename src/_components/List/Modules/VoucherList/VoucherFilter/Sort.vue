<template>
  <div class="w-full flex flex-col">
    <Header4 
      v-if="sortLabel != ''"
      class="px-1"
      :label="sortLabel"
    />
    <div class="flex flex-row">
      <Button
        :key="`isNewest-${isNewest}`"
        class="py-2 px-1 w-full md:w-40"
        label="Newest"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isNewest ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['newest'])"
      />
      <Button
        :key="`isPopular-${isPopular}`"
        class="py-2 px-1 w-full md:w-40"
        label="Most Popular"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isPopular ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['popular'])"
      />
      <Button
        :key="`isLowest-${isLowest}`"
        class="py-2 px-1 w-full md:w-40"
        :label="`${ !isLowest ? 'Lowest' : 'Highest' } Price`"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isLowest ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['lowest'])"
      />
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button/'
  import Header4 from '_components/Headers/Header4';

  export default {
    components: {
      Button,
      Header4,
    },
    props: {
      sortLabel: {
        type: String,
        default: ''
      }, isPopular: {
        type: Boolean,
        default: false
      }, isNewest: {
        type: Boolean,
        default: false
      }, isLowest: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>