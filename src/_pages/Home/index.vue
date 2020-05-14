<template>
  <MainLayout>
    <template #content>
      <GuestHome 
        v-if="role === null"
      />
      <SellerHome 
        v-if="role === 'seller'"
      />
      <UserHome 
        v-if="role === 'user'"
      />
      <ScannerUserHome 
        v-if="role === 'scanner'"
      />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import SellerHome from './Seller'
  import UserHome from './User'
  import GuestHome from './Guest'
  import ScannerUserHome from './ScannerUser'

  export default {
    name: 'Home',
    components: {
      MainLayout,
      SellerHome,
      UserHome,
      GuestHome,
      ScannerUserHome,
    },
    data() {
      return {
        role: null
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
    },
    methods: {
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      }
    }
  }
</script>
<style lang='css' scoped>
</style>