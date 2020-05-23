<template>
  <MainLayout>
    <template #content>
      <div v-if="!isLoading" class="flex flex-col w-full">
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
        <AdminHome 
          v-if="role === 'admin'"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import SellerHome from './Seller'
  import UserHome from './User'
  import GuestHome from './Guest'
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
      async AUTH_USER(newVal)
      {
        this.isLoading = true
        await this.onSetRole()
        this.isLoading = false
      }
    },
    mounted() {
      (async() => {
        this.isLoading = true
        await this.onSetRole()
        this.isLoading = false
      })()
    },
    methods: {
      async onSetRole()
      {
        let auth = await localStorage.getItem('_auth') 
        this.role = auth ? JSON.parse(auth).data.user_role.role.name : null
      }
    }
  }
</script>
<style lang='css' scoped>
</style>