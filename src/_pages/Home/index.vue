<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full">
        <GuestHome 
          v-if="AUTH_USER.role.name === null"
        />
        <SellerHome 
          v-if="AUTH_USER.role.name === 'seller'"
        />
        <UserHome 
          v-if="AUTH_USER.role.name === 'user'"
        />
        <ScannerUserHome 
          v-if="AUTH_USER.role.name === 'scanner'"
        />
        <AdminHome 
          v-if="AUTH_USER.role.name === 'admin'"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import SellerHome from './Seller'
  import UserHome from './User'
  import GuestHome from './Guest/'
  import AdminHome from './Admin'
  import ScannerUserHome from './ScannerUser'

  export default {
    name: 'Home',
    components: {
      MainLayout,
      SellerHome,
      UserHome,
      AdminHome,
      GuestHome,
      ScannerUserHome,
    },
    data() {
      return {
        role: null,
        isLoading: true,
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      }
    },
    watch: {
    },
    mounted() {
      
    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
</style>