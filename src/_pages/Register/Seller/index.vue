<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col w-full h-full">
        <RegisterStep1 
          v-if="step == 1"
          @onChangeStep="onChangeStep"
        />
        <RegisterStep2 
          v-if="step == 2"
          @onChangeStep="onChangeStep"
        />
        <RegisterStep3 
          v-if="step == 3"
          @onChangeStep="onChangeStep"
        />
      </div>
    </template>
  </MainLayout>
</template>
<script>
  import MainLayout from '_layouts'
  import Button from '_components/Button'
  import RegisterStep1 from '_components/Modules/Register/Seller/Step1/'
  import RegisterStep2 from '_components/Modules/Register/Seller/Step2/'
  import RegisterStep3 from '_components/Modules/Register/Seller/Step3/'

  export default {
    name: 'Register',
    components: {
      MainLayout,
      RegisterStep1,
      RegisterStep2,
      RegisterStep3,
    },
    data() {
      return {
        role: null,
        submitting: false,
        step: 1
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
      onChangeStep( step )
      {
        this.step = step
      },
      onSubmit( isValid )
      {
        if( !isValid ) {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: 'Updating the profile.',
            confirmButtonColor: '#6C757D',
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