<template>
  <MainLayout>
    <template #content>
      <div class="w-full flex flex-col">
        <div class="font-bold text-lg py-2">
          Scanner Users
        </div>
        <ScannerUserList 
          :data="SCANNER_USERS"
        />
        <router-link to="/scanner-users/new">
          <Button
            class="py-2 w-full md:w-1/2"
            label="Add new user"
            size="w-full py-1"
            variant="info"
            round="rounded-full"
            fontSize="text-xs"
          />
        </router-link>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import Button from '_components/Button'
  import MainLayout from '_layouts'
  import ScannerUserList from '_components/List/Modules/ScannerUserList'

  export default {
    name: 'Dashboard',
    components: {
      MainLayout,
      Button,
      ScannerUserList
    },
    data() {
      return {
      }
    },
    computed: {
      SCANNER_USERS()
      {
        return this.$store.getters.SCANNER_USERS
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang='css' scoped>
  .container {
    /* margin-top: -100px; */
    width: 40%;
  }
  .header-container {
    font-size: 28px;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  .content-container {
  }
  @media only screen and (max-width: 599px) {
    .container {
      width: 90% !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .container {
      width: 60%;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .container {
      width: 50%;
    }
  }
</style>