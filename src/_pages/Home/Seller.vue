<template>
  <div class="flex flex-col w-full">
    <Header1
      label="Hi Company!"
    />
    <router-link to="/scanner">
      <Button
        class="py-2 mt-3 mb-4"
        label="Scan Voucher"
        size="w-full md:w-64 py-4"
        round="rounded-full"
      />
    </router-link>
    <SaleStatistics />
    <Quicklinks />
  </div>
</template>
<script>
  import Button from '_components/Button';
  import SaleStatistics from '_components/Modules/Home/SaleStatistics';
  import Quicklinks from '_components/Modules/Home/Quicklinks';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      Header1,
      Button,
      SaleStatistics,
      Quicklinks
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>