<template>
  <MainLayout>
    <template #content>
      <div class="content-container flex flex-col w-full h-full items-center justify-center px-8">
        <Header1
          label="Register as"
        />
        <Button
          class="w-full justify-center my-2"
          label="Buyer"
          size="w-full sm:w-1/2 py-3"
          round="rounded-full"
          @onClick="$router.push('/register/buyer')"
        />
        <Button
          class="w-full justify-center my-2"
          label="Seller"
          size="w-full sm:w-1/2 py-3"
          round="rounded-full"
          @onClick="$router.push('/register/seller')"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts';
  import Button from '_components/Button';
  import Header1 from '_components/Headers/Header1';

  export default {
    name: 'Register',
    components: {
      MainLayout,
      Button,
      Header1
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
            title: 'Successful!',
            text: 'Updating the profile.',
            allowOutsideClick: false,
            confirmButtonColor: '#48BB78',
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