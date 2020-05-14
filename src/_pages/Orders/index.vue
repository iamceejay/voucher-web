<template>
  <MainLayout>
    <template #content>
      <Header1
        label="Statistics"
      />
      <StatisticList 
        :data="stats"
      />
      <Header1
        label="Orders"
      />
      <OrderList 
        :role="role"
        :data="orders"
      />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import StatisticList from '_components/List/Modules/StatisticList/';
  import OrderList from '_components/List/Modules/OrderList/'
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Home',
    components: {
      MainLayout,
      StatisticList,
      OrderList,
      Header1,
    },
    data() {
      return {
        role: null,
        orders: [],
        stats: [],
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
      AUTH_USER(newVal)
      {
        this.onSetRole()
      }
    },
    mounted() {
      this.onSetRole()
      this.onSetStats()
      this.onSetOrders()
    },
    methods: {
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
      onSetStats()
      {
        this.stats = [
          {
            type: 'Vouchers used',
            title: '',
            value: '23'
          },{
            type: 'Vouchers bought',
            title: '',
            value: '€13,456'
          }
        ]
      },
      onSetOrders()
      {
        this.orders = [
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
<style lang='css' scoped>
</style>