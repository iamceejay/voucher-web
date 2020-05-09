<template>
  <MainLayout>
    <template #content>
      <div class="font-bold text-lg py-2">
        Create new voucher
      </div>
      <router-link
        to="vouchers/new"
      >
        <Button
          class="p-2"
          label="Create new voucher"
          size="w-full sm:w-64 py-2"
          variant="info"
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

  export default {
    name: 'Vouchers',
    components: {
      Button,
      MainLayout,
      VoucherList
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