<template>
  <MainLayout>
    <template #content>
      <div class="w-full h-screen flex flex-col">
        <div class="font-bold text-lg py-2">
          Redemptions
        </div>
        <OrderList 
          :data="redemptions"
          role="seller"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button';
  import MainLayout from '_layouts';
  import OrderList from '_components/List/Modules/OrderList/'

  export default {
    components: {
      MainLayout,
      OrderList,
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