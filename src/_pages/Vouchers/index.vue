<template>
  <MainLayout>
    <template #content>
      <Header1
        label="Create new voucher"
      />
      <router-link
        to="vouchers/new"
      >
        <Button
          class="p-2 mt-3 mb-5"
          label="Create new voucher"
          size="w-full sm:w-64 py-4"
          round="rounded-full"
        />
      </router-link>
      <VoucherList 
        :data="VOUCHERS"
      />
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import VoucherList from '_components/List/Modules/VoucherList/';
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Vouchers',
    components: {
      Button,
      MainLayout,
      VoucherList,
      Header1
    },
    data() {
      return {
        submitting: false
      }
    },
    computed: {
      VOUCHERS()
      {
        return this.$store.getters.VOUCHERS
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