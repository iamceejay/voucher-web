<template>
  <div class="w-full flex flex-col">
    <div class="font-bold text-lg py-2">
      Quicklinks
    </div>
    <div class="flex flex-col">
      <router-link to="/vouchers">
        <Button
          class="py-2"
          label="Show my vouchers"
          size="w-64 py-2"
          variant="info"
          round="rounded-full"
        />
      </router-link>
      <router-link to="/vouchers/new">
        <Button
          class="py-2"
          label="Create new voucher"
          size="w-64 py-2"
          variant="info"
          round="rounded-full"
        />
      </router-link>
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