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
        label="Neueste"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isNewest ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['isNewest'])"
      />
      <Button
        :key="`isMostPopular-${isMostPopular}`"
        class="py-2 px-1 w-full md:w-40"
        label="Beliebteste"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isMostPopular ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['isMostPopular'])"
      />
      <Button
        :key="`isLowestPrice-${isLowestPrice}`"
        class="py-2 px-1 w-full md:w-40"
        :label="`${ !isLowestPrice ? 'Günstigster' : 'Günstigster' } Preis`"
        size="w-full md:w-40 py-1"
        round="rounded-full"
        fontSize="text-xs"
        :variant="`${ !isLowestPrice ? 'primary' : 'info' }`"
        @onClick="$emit('onFilter', ['isLowestPrice'])"
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
      }, isMostPopular: {
        type: Boolean,
        default: false
      }, isNewest: {
        type: Boolean,
        default: false
      }, isLowestPrice: {
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