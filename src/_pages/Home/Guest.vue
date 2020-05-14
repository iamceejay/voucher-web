<template>
  <div class="flex flex-col w-full">
    <Header1
      label="Vouchers"
    />
    <VoucherList
      class="mb-3"
      :data="VOUCHERS"
      :withQR="false"
    />
  </div>
</template>
<script>
  import VoucherList from '_components/List/Modules/VoucherList/';
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      VoucherList,
      Header1,
    },
    data() {
      return {
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
      },
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>