<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          label="My Cart"
        />
        <CartList
          class="mb-3"
          :role="role"
          :data="CARTS"
          @onDelete="onDelete"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import CartList from '_components/List/Modules/CartList/';

  export default {
    components: {
      MainLayout,
      Header1,
      CartList,
    },
    data() {
      return {
        role: null,
        search: ''
      };
    },
    computed: {
      AUTH_USER() {
        return this.$store.getters.AUTH_USER;
      },
      CARTS()
      {
        return this.$store.getters.CARTS
      },
    },
    watch: {
      AUTH_USER(newVal) {
        this.onSetRole();
      }
    },
    mounted() {
      this.onSetRole();
    },
    methods: {
      async onDelete( data )
      {
        await this.$store.dispatch('DELETE_CART', data)
        this.$swal({
          icon: 'success',
          title: 'Successful!',
          text: 'Deleting the voucher from the cart.',
          confirmButtonColor: '#6C757D',
        })
      },
      onSetRole() {
        if (this.AUTH_USER?.data?.user_role) {
          this.role = this.AUTH_USER.data.user_role.role.name;
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>