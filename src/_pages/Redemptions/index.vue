<template>
  <MainLayout>
    <template #content>
      <Header1
        label="Redemptions"
      />
      <OrderList 
        :data="redemptions"
        role="seller"
      />
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import MainLayout from '_layouts';
  import OrderList from '_components/List/Modules/OrderList/'
  import Header1 from '_components/Headers/Header1';

  export default {
    components: {
      MainLayout,
      OrderList,
      Header1,
    },
    props: [],
    data() {
      return {
        redemptions: [],
      };
    },
    mounted() {
      this.onSetRedemptions()
    },
    methods: {
      onSetRedemptions()
      {
        this.redemptions = [
          {
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'value',
            value: 234
          },{
            name: 'Voucher Name',
            orderNo: '123123',
            user: 'Jasper1',
            date: '31.05.2020',
            type: 'quantity',
            value: 15,
            quantity: 3,
          },
        ]
      }
    }
  }
</script>
<style lang="css" scoped>
</style>