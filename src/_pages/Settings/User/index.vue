<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full">
        <Header1
          label="Global Settings"
        />
      </div>
      <div class="font-semibold text-lg px-2">
        Username | Company Name
      </div>
      <PayoutForm />
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Header1 from '_components/Headers/Header1';
  import PayoutForm from '_components/Modules/Payout/PayoutForm'

  export default {
    components: {
      MainLayout,
      Header1,
      PayoutForm,
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