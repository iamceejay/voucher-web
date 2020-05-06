<template>
  <div class="w-full flex flex-col">
    <div class="font-bold text-lg py-2">
      Quicklinks
    </div>
    <div class="flex flex-col">
      <Button
        class="py-2"
        label="Show my vouchers"
        size="w-64 py-2"
        variant="info"
        round="rounded-full"
      />
      <Button
        class="py-2"
        label="Create new voucher"
        size="w-64 py-2"
        variant="info"
        round="rounded-full"
      />
    </div>
  </div>
</template>
<script>
  import Button from '_components/Button';

  export default {
    components: {
      Button,
    },
    props: [],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      
    }
  }
</script>
<style lang="css" scoped>
</style>