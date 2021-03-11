<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full h-full items-center justify-center px-8">
        <Header1
          label="Registrieren"
        />
        <div class="container flex flex-col items-center">
          <RegisterTabs />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import Header1 from '_components/Headers/Header1';
  import RegisterTabs from '_components/Modules/Register/Tabs'

  export default {
    name: 'Register',
    components: {
      MainLayout,
      Button,
      Header1,
      RegisterTabs
    },
    data() {
      return {
        role: null,
        submitting: false
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
      },
    },
    created() {
      this.onSetRole()
    },
    methods: {
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$swal({
            icon: 'success',
            title: 'Erfolgreich!',
            text: 'Updating the profile.',
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
            confirmButtonText: 'Bestätigen'
          });
        }
      },
      onSetRole()
      {
        if( this.AUTH_USER?.data?.user_role ) {
          this.role = this.AUTH_USER.data.user_role.role.name
        }
      },
    }
  }
</script>
<style lang='css' scoped>
</style>